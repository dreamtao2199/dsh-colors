/**
 * Behaviour test for the state store (no browser needed).
 *
 * Covers the defects that made palette switching look broken or destructive:
 *   * a stale persisted effect list from the old multi-select UI must be capped to one;
 *   * a manual palette choice must clear the current workspace binding, and must outrank a
 *     running schedule ONLY until the next boundary — the old build cancelled automation
 *     outright, so one exploratory click threw a standing schedule away;
 *   * an avatar is capped, because localStorage is the only backing store.
 *
 * Run: node tests/state.test.mjs
 */
import { createStore, DEFAULT_STATE, STORAGE_KEY, AVATAR_LIMIT, AVATAR_WARN } from '../src/client/state.js';
import { DEFAULT_SEGMENTS, resolvePaletteId, manualOverride, msUntilNextChange } from '../src/lib/schedule.js';

const failures = [];
const check = (ok, label) => {
  console.log((ok ? 'PASS  ' : 'FAIL  ') + label);
  if (!ok) failures.push(label);
};

function storageWith(value) {
  const store = {};
  if (value !== undefined) store[STORAGE_KEY] = JSON.stringify(value);
  return {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => {
      store[k] = v;
    },
    dump: () => store,
  };
}

// --------------------------------------------------------------------- defaults

const fresh = createStore(storageWith());
const d = fresh.snapshot();
check(d.finishes.length === 0, 'default has no effect enabled (nothing painted globally)');
check(d.safeMode === false, 'default is not safe mode');
check(d.status.chip === false, 'PRD FR-7: the status chip defaults to off');
check(Array.isArray(d.rotation) && d.rotation.length === 0, 'default rotation is empty (= whole library)');
check(Object.keys(d.workspace.map).length === 0, 'default has no workspace binding');

// ------------------------------------------- the stale multi-select trap (PRD S4)

const stale = createStore(
  storageWith({ finishes: ['glass', 'gradient', 'paper', 'film', 'linen', 'scanline'] }),
);
check(stale.snapshot().finishes.length === 1, 'a hostile persisted effect list is capped to ONE');
check(stale.snapshot().finishes[0] === 'glass', 'the cap keeps the first requested effect');

const junk = createStore(storageWith({ finishes: ['not-a-finish', 'linen'] }));
check(
  junk.snapshot().finishes.length === 1 && junk.snapshot().finishes[0] === 'linen',
  'unknown effect ids are dropped before the cap',
);

// account row defaults (PRD FR-9): off, so the shipped launcher is untouched
const account = createStore(storageWith());
check(account.snapshot().brand.enabled === false, 'the custom account row defaults to off (shipped launcher intact)');
check(account.snapshot().brand.nickname === '' && account.snapshot().brand.avatar === '', 'no nickname or avatar is stored by default');
check(AVATAR_LIMIT === 1024 * 1024, 'the avatar cap is 1MB');
check(AVATAR_WARN < AVATAR_LIMIT, 'the storage warning fires before the cap');
const justUnder = 'data:image/png;base64,' + 'A'.repeat(300 * 1024);
const kept = createStore(storageWith({ brand: { enabled: true, nickname: 'T', avatar: justUnder } }));
check(kept.snapshot().brand.avatar === justUnder, 'a 300KB avatar is kept (the old 256KB cap was too tight)');
const oversized = 'data:image/png;base64,' + 'A'.repeat(1200 * 1024);
const capped = createStore(storageWith({ brand: { enabled: true, nickname: 'T', avatar: oversized } }));
check(capped.snapshot().brand.avatar === '', 'an avatar over the 1MB cap is rejected on load');
check(capped.snapshot().brand.nickname === 'T', 'the nickname survives');

// -------------------------------------------------- 十二时辰 (the rhythm segments)
check(
  DEFAULT_SEGMENTS.map((s) => s.name).join('/') === '卯时/巳时/酉时/亥时',
  '十二时辰 segments are named after the 时辰 they START in (05:00 卯, 09:00 巳, 17:00 酉, 21:00 亥)',
);

// --------------------------- manual choice outranks the schedule, but only until the boundary

const store = createStore(
  storageWith({
    paletteId: 'lapis',
    interval: '1h',
    rhythm: { enabled: false },
    workspace: { enabled: true, accentOnly: true, map: { w1: 'moon-white', w2: 'ochre' } },
  }),
);

const before = store.snapshot();
check(before.interval === '1h', 'fixture starts in interval mode');
check(before.workspace.map.w1 === 'moon-white', 'fixture has a workspace binding');

const pickAt = new Date(2026, 0, 1, 10, 20, 0); // 10:20 → next hourly boundary is 11:00
store.selectPalette('cinnabar', 'w1', pickAt);
const after = store.snapshot();
check(after.paletteId === 'cinnabar', 'selectPalette stores the chosen palette');
check(after.interval === '1h', 'selectPalette KEEPS the standing schedule (it is no longer cancelled)');
check(after.rhythm.enabled === false, 'selectPalette leaves rhythm off');
check(after.manual.paletteId === 'cinnabar', 'the pick is recorded as a manual override');
check(
  after.manual.until === new Date(2026, 0, 1, 11, 0, 0).getTime(),
  'the override expires at the next boundary (11:00)',
);
check(after.workspace.map.w1 === undefined, 'selectPalette clears the CURRENT workspace binding');
check(after.workspace.map.w2 === 'ochre', 'other workspace bindings are untouched');

const manualStore = createStore(storageWith({ interval: '1h', paletteId: 'lapis' }));
manualStore.selectPalette('azurite', null, pickAt);
const allIds = ['lapis', 'cinnabar', 'azurite'];
check(
  resolvePaletteId(manualStore.snapshot(), pickAt, allIds) === 'azurite',
  'the manual override outranks the interval rotation',
);
check(
  resolvePaletteId(manualStore.snapshot(), new Date(2026, 0, 1, 11, 0, 0), allIds) !== 'azurite',
  'the schedule takes over again exactly at the boundary',
);
check(
  msUntilNextChange(manualStore.snapshot(), pickAt) === 40 * 60000,
  'the single timer wakes at that boundary and no earlier',
);
check(manualOverride(manualStore.snapshot(), new Date(2030, 0, 1)) === null, 'and the override then expires for good');

// with no schedule running the pick simply stands
const idle = createStore(storageWith({ interval: 'off' }));
idle.selectPalette('azurite', null, pickAt);
check(idle.snapshot().manual.until === 0, 'with no schedule running the pick has no expiry');
check(manualOverride(idle.snapshot(), new Date(2030, 0, 1)) === 'azurite', 'so it still stands years later');
idle.selectPalette(null, null, pickAt);
check(idle.snapshot().manual.paletteId === null, 'choosing the official colors clears the override');

// 十二时辰 is a schedule too: switching it on cancels a pending override on purpose
const rhythmStore = createStore(storageWith({ rhythm: { enabled: true } }));
rhythmStore.selectPalette('azurite', null, pickAt);
check(rhythmStore.snapshot().rhythm.enabled === true, 'selectPalette no longer cancels 十二时辰');
check(
  rhythmStore.snapshot().manual.until === new Date(2026, 0, 1, 17, 0, 0).getTime(),
  'a rhythm override expires at the next 时辰 boundary (17:00)',
);
rhythmStore.setAutomation({ rhythm: { enabled: true } });
check(rhythmStore.snapshot().manual.paletteId === null, 'setAutomation cancels a pending override by design');

// ------------------------------------------------------------------ persistence

const backing = storageWith();
const persisted = createStore(backing);
persisted.patch({ paletteId: 'moon-white' });
check(
  backing.dump()[STORAGE_KEY].indexOf('moon-white') >= 0,
  'state is persisted under the documented key',
);

// S12: a full quota or private mode must not swallow the failure — the user is told
const persistErrors = [];
const failing = createStore(
  {
    getItem: () => null,
    setItem: () => {
      throw new Error('quota exceeded');
    },
  },
  (err) => persistErrors.push(err.message),
);
failing.patch({ paletteId: 'lapis' });
check(
  persistErrors.length === 1 && persistErrors[0] === 'quota exceeded',
  'a failed write is reported to the plugin, not swallowed (S12)',
);
check(failing.snapshot().paletteId === 'lapis', 'the session keeps the state even when the write failed');

// ------------------------------------------------------------ 随机 and its two locks

const diceStore = createStore(storageWith({ paletteId: 'lapis', finishes: ['glass'] }));
diceStore.randomize(['lapis', 'cinnabar', 'azurite'], ['glass', 'linen', 'fiber'], null, pickAt);
const rolled = diceStore.snapshot();
check(rolled.paletteId !== 'lapis', '随机 never repeats the palette that is already active');
check(rolled.finishes.length === 1 && rolled.finishes[0] !== 'glass', '随机 also moves the effect');
check(
  rolled.manual.paletteId === rolled.paletteId,
  'a rolled palette is recorded as a MANUAL pick — same semantics as a click, so a running schedule still resumes',
);

const lockedDice = createStore(
  storageWith({ paletteId: 'lapis', finishes: ['glass'], locks: { palette: true, finish: false } }),
);
lockedDice.randomize(['lapis', 'cinnabar'], ['glass', 'linen'], null, pickAt);
check(lockedDice.snapshot().paletteId === 'lapis', 'a LOCKED palette is left alone by the dice');
check(lockedDice.snapshot().finishes[0] !== 'glass', 'the unlocked effect still moves');
check(diceStore.snapshot().locks.palette === false, 'locks default to off');

// 十二时辰 随机排程: four DISTINCT palettes for the four segments
const rhythmDice = createStore(storageWith({ rhythm: { enabled: true } }));
rhythmDice.randomizeRhythm(['a1', 'a2', 'a3', 'a4', 'a5']);
const picks = rhythmDice.snapshot().rhythm.segments.map((segment) => segment.palette);
check(new Set(picks).size === 4, '随机排程 gives the four 时辰 four distinct palettes');

// ------------------------------------------------------ session marks (PRD FR-10)

const markStore = createStore(storageWith());
markStore.setSessionColor('s1', '#2f7d6b');
check(markStore.snapshot().sessionColors.s1 === '#2F7D6B', 'a session mark is stored upper-cased');
markStore.setSessionColor('s1', null);
check(markStore.snapshot().sessionColors.s1 === undefined, 'a mark can be cleared');
const hostileMarks = createStore(storageWith({ sessionColors: { a: 'red', b: '#123456', c: 42, d: '#ABCDEF' } }));
check(
  Object.keys(hostileMarks.snapshot().sessionColors).sort().join(',') === 'b,d',
  'hostile persisted marks are dropped, valid ones kept',
);

const slotStore = createStore(storageWith());
slotStore.setSessionColor('s1', 3);
check(slotStore.snapshot().sessionColors.s1 === 3, 'a mark can be stored as a SLOT index (so it follows the theme)');
slotStore.setSessionColor('s1', 99);
check(slotStore.snapshot().sessionColors.s1 === 5, 'a slot index is clamped to the six-colour board');
const mixedMarks = createStore(storageWith({ sessionColors: { a: '#123456', b: 2, c: 'nope', d: 9 } }));
check(
  JSON.stringify(mixedMarks.snapshot().sessionColors) === JSON.stringify({ a: '#123456', b: 2 }),
  'legacy hex marks survive, slot indices survive, junk is dropped',
);
// ------------------------------------------------------- the rename must not lose state

const legacyBacking = storageWith();
legacyBacking.setItem('dsh-theme-celadon.state.v3', JSON.stringify({ paletteId: 'cinnabar', finishes: ['linen'] }));
const migratedStore = createStore(legacyBacking);
check(migratedStore.snapshot().paletteId === 'cinnabar', 'state under the pre-rename key is migrated');
check(migratedStore.migratedFrom() === 'dsh-theme-celadon.state.v3', 'the migrated key is reported');
check(STORAGE_KEY === 'dsh-colors.state.v1', 'the new key is the documented one');
const freshBacking = storageWith();
const freshAfterRename = createStore(freshBacking);
freshAfterRename.patch({ paletteId: 'ochre' });
check(
  freshAfterRename.migratedFrom() === null && freshBacking.dump()[STORAGE_KEY].indexOf('ochre') >= 0,
  'a fresh install writes the new key and reports no migration',
);

// --------------------------------------------------------------- notifications

let notifications = 0;
const off = persisted.subscribe(() => {
  notifications += 1;
});
persisted.patch({ tier: 'bold' });
check(notifications === 1, 'subscribers are notified on patch');
off();
persisted.patch({ tier: 'gentle' });
check(notifications === 1, 'unsubscribing stops notifications');

// ----------------------------------------------------------------------- reset

const reset = createStore(storageWith({ paletteId: 'neon', safeMode: true, finishes: ['paper'] }));
reset.reset();
const r = reset.snapshot();
check(r.paletteId === DEFAULT_STATE.paletteId, 'reset restores the default palette');
check(r.safeMode === false && r.finishes.length === 0, 'reset clears safe mode and effects');

console.log('\n' + (failures.length ? 'FAILURES: ' + failures.length : 'ALL CHECKS PASSED'));
process.exit(failures.length ? 1 : 0);
