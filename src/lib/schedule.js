/**
 * Time policy: fixed clock anchors, four editable day segments (十二时辰), mutual exclusion,
 * and a manual choice that stays in front until the next boundary.
 *
 * Decisions behind this file:
 *   * Intervals are anchored to the CLOCK, not to "the last time something changed" — a
 *     drifting anchor makes the next switch unpredictable, which is the classic timer bug.
 *   * Rhythm and interval are mutually exclusive: two clocks fighting over one palette
 *     leaves nobody able to say which one wins.
 *   * Segment starts are user-editable; segments are ordered by start time and wrap.
 *   * A manual pick used to SWITCH AUTOMATION OFF, which made one click silently cancel a
 *     standing schedule. It now outranks the schedule only until the next boundary and then
 *     hands control back (`manualOverride`), so a schedule survives a look around.
 *   * Default segment names are the 时辰 each segment STARTS in (05:00 卯, 09:00 巳,
 *     17:00 酉, 21:00 亥) — accurate, not decorative; a user-edited clock keeps its name.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

const INTERVALS = [
  { id: 'off', name: '关', minutes: 0 },
  { id: '1h', name: '1 小时', minutes: 60 },
  { id: '1d', name: '1 天', minutes: 1440 },
  { id: '1w', name: '1 周', minutes: 10080 },
  { id: '1m', name: '1 月', minutes: 43200 },
];

const DEFAULT_SEGMENTS = [
  { id: 'dawn', name: '卯时', start: '05:00', palette: 'ruyao-celadon' },
  { id: 'day', name: '巳时', start: '09:00', palette: 'cloud-dancer' },
  { id: 'dusk', name: '酉时', start: '17:00', palette: 'mocha-mousse' },
  { id: 'night', name: '亥时', start: '21:00', palette: 'moon-white' },
];

const DAY_MINUTES = 1440;

/** `"07:30"` → 450. Invalid input falls back to the default for that index. */
function parseClock(text, fallback) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(text || '').trim());
  if (!m) return fallback;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return fallback;
  return h * 60 + min;
}

function formatClock(totalMinutes) {
  const t = ((totalMinutes % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
  const h = Math.floor(t / 60);
  const m = t % 60;
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

/** Normalize user input: valid starts only, stable identity, sorted by start. */
function normalizeSegments(input) {
  const source = Array.isArray(input) && input.length ? input : DEFAULT_SEGMENTS;
  const byId = {};
  for (const fallback of DEFAULT_SEGMENTS) {
    const given = source.find((s) => s && s.id === fallback.id) || {};
    byId[fallback.id] = {
      id: fallback.id,
      name: fallback.name,
      start: formatClock(parseClock(given.start, parseClock(fallback.start, 0))),
      palette: typeof given.palette === 'string' ? given.palette : fallback.palette,
    };
  }
  return DEFAULT_SEGMENTS.map((s) => byId[s.id]).sort((a, b) => parseClock(a.start, 0) - parseClock(b.start, 0));
}

/** Which segment covers `date`. */
function segmentAt(segments, date) {
  const list = normalizeSegments(segments);
  const now = date.getHours() * 60 + date.getMinutes();
  let current = list[list.length - 1];
  for (const segment of list) {
    if (parseClock(segment.start, 0) <= now) current = segment;
  }
  return current;
}

/** When the covering segment changes next (today or tomorrow). */
function nextSegmentChange(segments, date) {
  const list = normalizeSegments(segments);
  const now = date.getHours() * 60 + date.getMinutes();
  const upcoming = list
    .map((s) => ({ s, at: parseClock(s.start, 0) }))
    .filter((entry) => entry.at > now)
    .sort((a, b) => a.at - b.at)[0];
  const minutes = upcoming ? upcoming.at : list[0] ? parseClock(list[0].start, 0) + DAY_MINUTES : DAY_MINUTES;
  const next = new Date(date.getTime());
  next.setHours(0, 0, 0, 0);
  next.setMinutes(minutes);
  return next;
}

/** Next fixed-clock boundary for an interval id (`1d` → next 06:00, `1w` → next Monday 06:00). */
function nextIntervalBoundary(intervalId, date) {
  const next = new Date(date.getTime());
  if (intervalId === '1h') {
    next.setMinutes(0, 0, 0);
    next.setHours(next.getHours() + 1);
    return next;
  }
  if (intervalId === '1w') {
    next.setHours(6, 0, 0, 0);
    const day = next.getDay(); // 0 = Sunday
    const delta = (8 - day) % 7 || 7;
    next.setDate(next.getDate() + delta);
    return next;
  }
  if (intervalId === '1m') {
    next.setHours(6, 0, 0, 0);
    next.setDate(1);
    next.setMonth(next.getMonth() + 1);
    return next;
  }
  // 1d and anything unknown
  next.setHours(6, 0, 0, 0);
  if (next.getTime() <= date.getTime()) next.setDate(next.getDate() + 1);
  return next;
}

function intervalById(id) {
  return INTERVALS.find((entry) => entry.id === id) || INTERVALS[0];
}

/** Mutual exclusion lives here, so no caller has to remember it. */
function activeMode(state) {
  if (state.rhythm && state.rhythm.enabled) return 'rhythm';
  if (state.interval && state.interval !== 'off') return 'interval';
  return 'off';
}

/**
 * When the current policy next changes its mind, as an epoch timestamp.
 * `0` means "never" — nothing is scheduled, so a choice made now simply stands.
 */
function nextBoundaryMs(state, date) {
  const mode = activeMode(state);
  if (mode === 'rhythm') return nextSegmentChange(state.rhythm.segments, date).getTime();
  if (mode === 'interval') return nextIntervalBoundary(state.interval, date).getTime();
  return 0;
}

/**
 * The palette a manual pick is still entitled to hold, or `null` once the schedule takes over.
 *
 * `until === 0` (no automation running) means the pick has no expiry: with nothing scheduled
 * there is nothing to hand control back to, which is the plain "I chose this" case.
 */
function manualOverride(state, date) {
  const manual = state && state.manual;
  if (!manual || !manual.paletteId) return null;
  if (!manual.until) return manual.paletteId;
  return date.getTime() < manual.until ? manual.paletteId : null;
}

/** The override record a manual pick should store: valid until the next boundary. */
function manualRecord(paletteId, state, date) {
  return { paletteId: paletteId || null, until: nextBoundaryMs(state, date) };
}

/** A cleared override, for callers that must not let a stale one survive. */
function noManual() {
  return { paletteId: null, until: 0 };
}

/** The palette this instant resolves to: manual pick, then rhythm, then interval rotation. */
function resolvePaletteId(state, date, allIds) {
  const manual = manualOverride(state, date);
  if (manual) return manual;
  const mode = activeMode(state);
  if (mode === 'rhythm') {
    const segment = segmentAt(state.rhythm.segments, date);
    return segment.palette || null;
  }
  if (mode === 'interval') {
    // An empty rotation means "the whole library" (PRD FR-4).
    const ids = state.rotation && state.rotation.length ? state.rotation : allIds || [];
    if (!ids.length) return null;
    const step = Math.floor(date.getTime() / (intervalById(state.interval).minutes * 60000));
    return ids[((step % ids.length) + ids.length) % ids.length];
  }
  return null;
}

/**
 * Milliseconds until the policy next wants attention (for the single plugin timer).
 *
 * A pending manual expiry counts as a boundary: if the schedule was changed from elsewhere
 * while an override was held, the timer still wakes to hand control back on time.
 */
function msUntilNextChange(state, date) {
  const mode = activeMode(state);
  let ms = 0;
  if (mode === 'rhythm') ms = nextSegmentChange(state.rhythm.segments, date).getTime() - date.getTime();
  else if (mode === 'interval') ms = nextIntervalBoundary(state.interval, date).getTime() - date.getTime();

  const manual = state && state.manual;
  if (manual && manual.paletteId && manual.until) {
    const remaining = manual.until - date.getTime();
    if (remaining > 0 && (ms === 0 || remaining < ms)) ms = remaining;
  }
  return ms > 0 ? Math.max(1000, ms) : 0;
}

/* @bundle:strip-start */
export {
  INTERVALS,
  DEFAULT_SEGMENTS,
  DAY_MINUTES,
  parseClock,
  formatClock,
  normalizeSegments,
  segmentAt,
  nextSegmentChange,
  nextIntervalBoundary,
  intervalById,
  activeMode,
  nextBoundaryMs,
  manualOverride,
  manualRecord,
  noManual,
  resolvePaletteId,
  msUntilNextChange,
};
/* @bundle:strip-end */
