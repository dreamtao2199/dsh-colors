/**
 * Plugin state: one store, one persistence key, one subscription.
 *
 * The store is deliberately dumb — it holds data and notifies. Everything that turns state
 * into theme layers lives in `index.js`, so the panel and the resident components can never
 * disagree about what is active.
 *
 * Rename note (3.2.0 → 0.9.9): the plugin became `dsh-colors`, so the key moved to
 * `dsh-colors.state.v1`. The previous keys are still READ once, so renaming cannot look like
 * "my settings disappeared"; the old key is left in place as a fallback.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

/* @bundle:strip-start */
import { normalizeSegments, manualRecord, noManual } from '../lib/schedule.js';
import { FINISH_BY_ID } from '../lib/finishes.js';
/* @bundle:strip-end */

const STORAGE_KEY = 'dsh-colors.state.v1';

/** Keys this plugin used before the rename, newest first. Read-only fallbacks. */
const LEGACY_KEYS = [
  'dsh-theme-celadon.state.v3',
  'dsh-theme-celadon.state.v2',
  'dsh-theme-celadon.state.v1',
];

/**
 * Hard cap on a picked avatar FILE (before it becomes a data URL).
 *
 * The editor downsamples to 256×256 (~20–40KB), so this is only the entry gate: it stops a
 * 12MP photo from being decoded into a 48MB bitmap before the user ever sees the crop UI.
 */
const AVATAR_LIMIT = 1024 * 1024;

/** Above this many data-URL characters the panel warns about the storage budget. */
const AVATAR_WARN = 700 * 1024;

/** Avatar edge actually stored (the editor always writes exactly this). */
const AVATAR_EDGE = 256;

/** How many per-session colour marks are kept; the oldest are dropped beyond this. */
const SESSION_COLOR_LIMIT = 200;

const DEFAULT_STATE = {
  /** `null` paletteId means the "official colors" position: no layer at all. */
  paletteId: 'ruyao-celadon',
  /**
   * Effects are single-select, and the default is NONE. The old build shipped
   * `['gradient']` and honoured whatever a stale multi-select state contained — which is how
   * four full-viewport layers ended up stacked.
   */
  finishes: [],
  /** Kill switch: when true the plugin paints nothing at all (not even the palette). */
  safeMode: false,
  tier: 'standard',
  interval: 'off',
  /** Empty means "rotate over the whole library"; PRD FR-4. */
  rotation: [],
  rhythm: {
    enabled: false,
    segments: null, // normalized on first read
  },
  /**
   * Manual override (PRD FR-5). `until === 0` means "no schedule is running, so the pick
   * stands"; a timestamp means "the pick outranks the schedule until that instant".
   */
  manual: {
    paletteId: null,
    until: 0,
  },
  /** 随机 locks: a locked axis is left alone by the dice. */
  locks: {
    palette: false,
    finish: false,
  },
  workspace: {
    enabled: true,
    /** workspaceId → palette id, or the literal 'global' to follow the global palette. */
    map: {},
    accentOnly: true,
  },
  /** sessionId → `#RRGGBB`; a manual mark, always picked from the active palette's family. */
  sessionColors: {},
  status: {
    /** Whether the composer-dock status chip is rendered at all (PRD FR-7: default off). */
    enabled: true,
    /** The chip is opt-in; the seat still mounts because it carries the workspace signal. */
    chip: false,
    annotations: true,
    /**
     * 正文/标题渐变上色。Default CLOSED on purpose: as a tier side effect it damaged real
     * conversation text — a `strong` gradient made an inline `code` inside it inherit
     * `color:transparent`, so the chip rendered as a blank block until it was selected.
     * It is now an explicit switch, and the CSS restores descendant colours regardless.
     */
    gradientText: false,
    /**
     * Harmonise the host's three semantic state colours (success / warn / error) toward the
     * active palette. The running indicator is deliberately NOT touched: its colour comes from
     * `--dsw-alias-label-tertiary`, so recolouring it would tint all tertiary text.
     */
    semantic: true,
  },
  /**
   * Account row (PRD FR-9): an optional custom nickname + avatar rendered in the sidebar's
   * account launcher seat. Off by default: while off we do not register the occupant at all,
   * so the shipped account menu (with sign-out) stays exactly as it was.
   */
  brand: {
    enabled: false,
    nickname: '',
    /** Data URL, size-capped; empty means "use the initial block". */
    avatar: '',
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalize(raw) {
  const state = Object.assign(clone(DEFAULT_STATE), raw || {});
  state.rhythm = Object.assign(clone(DEFAULT_STATE.rhythm), (raw && raw.rhythm) || {});
  state.rhythm.segments = normalizeSegments(state.rhythm.segments);

  const manual = (raw && raw.manual) || {};
  state.manual = {
    paletteId: typeof manual.paletteId === 'string' && manual.paletteId ? manual.paletteId : null,
    until: typeof manual.until === 'number' && isFinite(manual.until) && manual.until > 0 ? manual.until : 0,
  };

  const locks = (raw && raw.locks) || {};
  state.locks = { palette: Boolean(locks.palette), finish: Boolean(locks.finish) };

  state.workspace = Object.assign(clone(DEFAULT_STATE.workspace), (raw && raw.workspace) || {});
  state.workspace.map = Object.assign({}, (raw && raw.workspace && raw.workspace.map) || {});

  const marks = (raw && raw.sessionColors) || {};
  const clean = {};
  let kept = 0;
  for (const key of Object.keys(marks)) {
    const value = marks[key];
    if (typeof key !== 'string' || !key) continue;
    if (typeof value !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(value)) continue;
    if (kept >= SESSION_COLOR_LIMIT) break;
    clean[key] = value.toUpperCase();
    kept += 1;
  }
  state.sessionColors = clean;

  state.status = Object.assign(clone(DEFAULT_STATE.status), (raw && raw.status) || {});
  state.brand = Object.assign(clone(DEFAULT_STATE.brand), (raw && raw.brand) || {});
  if (typeof state.brand.nickname !== 'string') state.brand.nickname = '';
  if (typeof state.brand.avatar !== 'string' || state.brand.avatar.length > AVATAR_LIMIT) state.brand.avatar = '';
  state.brand.enabled = Boolean(state.brand.enabled);
  state.safeMode = Boolean(raw && raw.safeMode);

  // Effects: known ids only, and HARD-CAPPED AT ONE. A persisted list from the old
  // multi-select UI must not be able to stack overlays again.
  const requested = Array.isArray(state.finishes) ? state.finishes : clone(DEFAULT_STATE.finishes);
  state.finishes = requested.filter((id) => Boolean(FINISH_BY_ID[id])).slice(0, 1);

  if (!Array.isArray(state.rotation) || !state.rotation.length) state.rotation = clone(DEFAULT_STATE.rotation);
  state.rotation = state.rotation.filter((id) => typeof id === 'string');
  if (!state.rotation.length) state.rotation = clone(DEFAULT_STATE.rotation);
  return state;
}

/** One random member of `list` that is not `exclude` (when the list has an alternative). */
function pickOther(list, exclude) {
  const ids = (list || []).filter((id) => typeof id === 'string' && id);
  if (!ids.length) return null;
  const pool = ids.filter((id) => id !== exclude);
  const source = pool.length ? pool : ids;
  return source[Math.floor(Math.random() * source.length)];
}

/**
 * Create the store. `storage` is injectable so tests can run it without a browser.
 * `onError` receives persistence failures — a full quota is a real, visible problem
 * (settings would silently stop being saved), so it is reported rather than swallowed.
 */
function createStore(storage, onError) {
  const backing = storage || (typeof window !== 'undefined' ? window.localStorage : null);
  let state = DEFAULT_STATE;
  let migratedFrom = null;
  const listeners = new Set();

  function readKey(key) {
    try {
      const text = backing ? backing.getItem(key) : null;
      return text ? JSON.parse(text) : null;
    } catch (err) {
      return null;
    }
  }

  try {
    let raw = readKey(STORAGE_KEY);
    if (!raw) {
      for (const legacy of LEGACY_KEYS) {
        const old = readKey(legacy);
        if (old) {
          raw = old;
          migratedFrom = legacy;
          break;
        }
      }
    }
    state = normalize(raw);
  } catch (err) {
    state = normalize(null);
  }

  function snapshot() {
    return state;
  }

  function persist() {
    try {
      if (backing) backing.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      // private mode or quota: the session keeps the state, but the user is told.
      try {
        if (onError) onError(err);
      } catch (inner) {
        /* an error reporter must never break the store */
      }
    }
  }

  function notify() {
    for (const fn of Array.from(listeners)) {
      try {
        fn(state);
      } catch (err) {
        /* one bad listener must not stop the others */
      }
    }
  }

  /** Shallow merge of a patch; `null` clears a palette back to the official position. */
  function patch(next) {
    state = normalize(Object.assign({}, state, next));
    persist();
    notify();
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function toggleFinish(id) {
    const list = state.finishes.slice();
    const at = list.indexOf(id);
    if (at >= 0) list.splice(at, 1);
    else list.push(id);
    patch({ finishes: list });
  }

  function setSegment(id, changes) {
    const segments = state.rhythm.segments.map((segment) =>
      segment.id === id ? Object.assign({}, segment, changes) : segment,
    );
    patch({ rhythm: Object.assign({}, state.rhythm, { segments }) });
  }

  function setWorkspacePalette(workspaceId, paletteId) {
    const map = Object.assign({}, state.workspace.map);
    if (paletteId === 'global') delete map[workspaceId];
    else map[workspaceId] = paletteId;
    patch({ workspace: Object.assign({}, state.workspace, { map }) });
  }

  /**
   * Global palette choice (PRD FR-5).
   *
   * Three things have to happen or the click looks broken:
   *   1. clear the CURRENT workspace's binding — otherwise that layer keeps overriding the accent;
   *   2. record a MANUAL OVERRIDE that outranks the schedule — a running interval/rhythm resolves
   *      its own palette and would otherwise make the click look like it did nothing;
   *   3. but only UNTIL THE NEXT BOUNDARY. The old build switched automation off outright, so a
   *      single exploratory click silently cancelled a standing schedule; now the schedule
   *      resumes on its own clock and the 自动切换 controls stay untouched.
   *
   * With no schedule running the override has no expiry (`until: 0`), which is the plain
   * "I chose this and it stays chosen" case.
   */
  function selectPalette(paletteId, currentWorkspaceId, now) {
    const map = Object.assign({}, state.workspace.map);
    if (currentWorkspaceId) delete map[currentWorkspaceId];
    patch({
      paletteId,
      manual: paletteId ? manualRecord(paletteId, state, now || new Date()) : noManual(),
      workspace: Object.assign({}, state.workspace, { map }),
    });
  }

  /**
   * Change the automation policy. Switching or stopping automation cancels any pending manual
   * override by design: the user just asked for the schedule to decide.
   */
  function setAutomation(changes) {
    patch(Object.assign({ manual: noManual() }, changes));
  }

  /** Flip one 随机 lock. */
  function toggleLock(axis) {
    const locks = Object.assign({}, state.locks);
    locks[axis] = !locks[axis];
    patch({ locks });
  }

  /**
   * 随机: one dice roll over «palette × effect», honouring the two locks.
   * A rolled palette is written as a MANUAL pick, so it behaves exactly like a click —
   * it leads until the next boundary and then hands control back to a running schedule.
   */
  function randomize(paletteIds, finishIds, currentWorkspaceId, now) {
    const next = {};
    if (!state.locks.palette) {
      const id = pickOther(paletteIds, state.paletteId);
      if (id) {
        next.paletteId = id;
        next.manual = manualRecord(id, state, now || new Date());
        const map = Object.assign({}, state.workspace.map);
        if (currentWorkspaceId) delete map[currentWorkspaceId];
        next.workspace = Object.assign({}, state.workspace, { map });
      }
    }
    if (!state.locks.finish) {
      const id = pickOther(finishIds, (state.finishes || [])[0]);
      if (id) next.finishes = [id];
    }
    patch(next);
  }

  /** 十二时辰 random: four DISTINCT palettes, one per segment. */
  function randomizeRhythm(paletteIds) {
    const ids = (paletteIds || []).filter((id) => typeof id === 'string' && id);
    if (ids.length < 2) return;
    const pool = ids.slice();
    const segments = state.rhythm.segments.map((segment) => {
      const at = Math.floor(Math.random() * pool.length);
      const pick = pool.splice(at, 1)[0] || ids[0];
      return Object.assign({}, segment, { palette: pick });
    });
    patch({ rhythm: Object.assign({}, state.rhythm, { segments }), manual: noManual() });
  }

  function setSessionColor(sessionId, color) {
    if (typeof sessionId !== 'string' || !sessionId) return;
    const marks = Object.assign({}, state.sessionColors);
    if (!color) delete marks[sessionId];
    else marks[sessionId] = String(color).toUpperCase();
    patch({ sessionColors: marks });
  }

  return {
    STORAGE_KEY,
    LEGACY_KEYS,
    AVATAR_LIMIT,
    AVATAR_WARN,
    AVATAR_EDGE,
    migratedFrom: () => migratedFrom,
    snapshot,
    subscribe,
    patch,
    toggleFinish,
    toggleLock,
    setSegment,
    setWorkspacePalette,
    selectPalette,
    setAutomation,
    randomize,
    randomizeRhythm,
    setSessionColor,
    reset: () => patch(clone(DEFAULT_STATE)),
  };
}

/* @bundle:strip-start */
export {
  STORAGE_KEY,
  LEGACY_KEYS,
  DEFAULT_STATE,
  AVATAR_LIMIT,
  AVATAR_WARN,
  AVATAR_EDGE,
  SESSION_COLOR_LIMIT,
  pickOther,
  normalize,
  createStore,
};
/* @bundle:strip-end */
