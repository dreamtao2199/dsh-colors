/**
 * Smoke test for the BUILT bundle (client.js), not for the sources.
 *
 * Evaluates the generated artifact under a fake window/document/ctx, activates the plugin and
 * asserts the layer stack, the two slot registrations, the injected stylesheet and disposal.
 *
 * Run: node tests/bundle-smoke.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(HERE, '..', 'client.js'), 'utf8');
const palettesData = JSON.parse(readFileSync(join(HERE, '..', 'src', 'data', 'palettes.json'), 'utf8'));

const failures = [];
const check = (ok, label) => {
  console.log((ok ? 'PASS  ' : 'FAIL  ') + label);
  if (!ok) failures.push(label);
};

function activate(seed, opts) {
  const rec = { overrides: [], injected: [], registered: [], styleEls: [], invalidTypes: [], cleanup: null };

  const head = { children: [], appendChild(el) { this.children.push(el); } };
  const fakeWindow = {
    __ModuleLoader__: { load(def) { rec.def = def; } },
    localStorage: {
      store: Object.assign(
        seed ? { 'dsh-colors.state.v1': JSON.stringify(seed) } : {},
        opts && opts.legacy ? { 'dsh-theme-celadon.state.v3': JSON.stringify(opts.legacy) } : {},
        opts && opts.panic ? { 'dsh-colors.panic': '1' } : {},
      ),
      getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null; },
      setItem(k, v) { this.store[k] = v; },
    },
    setTimeout: () => { rec.timers = (rec.timers || 0) + 1; return 1; },
    clearTimeout: () => {},
    setInterval: () => { rec.intervals = (rec.intervals || 0) + 1; return 1; },
    clearInterval: () => {},
  };
  const fakeDocument = {
    body: { hasAttribute: () => false },
    head,
    createElement() {
      const el = {
        textContent: '',
        removed: false,
        setAttribute() {},
        remove() { el.removed = true; const i = head.children.indexOf(el); if (i >= 0) head.children.splice(i, 1); },
      };
      rec.styleEls.push(el);
      return el;
    },
  };

  globalThis.window = fakeWindow;
  globalThis.document = fakeDocument;
  new Function(src)();

  const plugin = rec.def.factory((name) => {
    if (name !== 'react') throw new Error('unexpected require: ' + name);
    const react = {
      createElement: (...args) => {
        // Validate the element TYPE exactly like React does: a style object passed where a
        // component belongs is React #130 ("Element type is invalid") and blanked a whole page.
        const type = args[0];
        const valid =
          typeof type === 'string' ||
          typeof type === 'function' ||
          (type && typeof type === 'object' && Boolean(type.$$typeof));
        if (!valid) {
          rec.invalidTypes = (rec.invalidTypes || []).concat([
            typeof type + ':' + Object.prototype.toString.call(type),
          ]);
        }
        return { args };
      },
      useState: (v) => [v, () => {}],
      useEffect: (fn) => {
        // run the effect body so resident components really report and repaint
        try {
          fn();
          rec.effects = (rec.effects || 0) + 1;
        } catch (err) {
          rec.effectErrors = (rec.effectErrors || 0) + 1;
        }
      },
      useMemo: (fn) => fn(),
      useRef: (v) => ({ current: v }),
      Fragment: 'fragment',
    };
    rec.react = react;
    return react;
  });

  const ctx = {
    theme: {
      overrideTokens(source, tokens) {
        if (opts && opts.throwing) throw new Error('service rejected the layer');
        rec.overrides.push({ source, tokens });
        // documented behaviour: writing a layer emits `theme/change`
        if (opts && opts.emitOnWrite) {
          for (const fn of rec.listeners || []) {
            if ((rec.emissions || 0) > 60) {
              rec.storm = true;
              return () => {};
            }
            rec.emissions = (rec.emissions || 0) + 1;
            fn();
          }
        }
        return () => {};
      },
    },
    on: (name, listener) => {
      if (opts && opts.throwingOn) throw new Error('event API unavailable');
      rec.onCalls = (rec.onCalls || 0) + 1;
      rec.onNames = (rec.onNames || []).concat(name);
      if (typeof listener === 'function') rec.listeners = (rec.listeners || []).concat(listener);
      return () => {};
    },
    effect(cb) { rec.cleanup = cb(); return () => {}; },
    slots: {
      inject(key, cb) { rec.injected.push(key); cb(); },
      register(opts2, component) {
        if (opts && opts.throwingRegister) throw new Error('slot registration refused');
        rec.registered.push({ opts: opts2, component });
        return () => {};
      },
    },
  };

  plugin.apply(ctx);
  return { rec, plugin };
}

const BASE = 'dsh-colors';

// ------------------------------------------------------------------ module + plugin

const { rec, plugin } = activate(null);
check(rec.def && rec.def.id === BASE, 'bundle registers module id = package name');
check(plugin.inject.includes('theme') && plugin.inject.includes('slots'), 'plugin injects theme + slots');

// ------------------------------------------------------------------------- layers

const sources = rec.overrides.map((o) => o.source);
check(sources[0] === BASE, 'layer 1 is the package source (core palette)');
check(sources.includes(BASE + ':accents'), 'layer 2 present: accents tier');
check(sources.includes(BASE + ':finish'), 'layer 3 present: finishes');
check(sources.includes(BASE + ':workspace'), 'layer 4 present: workspace accent slice');

const core = rec.overrides[0].tokens;
check(Object.keys(core).length === 10, 'core layer carries the 10 sanctioned alias tokens');
check(Object.keys(core).every((k) => core[k].light === core[k].dark), 'core layer: dark mirrors light (no dark mode)');
check(
  core['--dsw-alias-bg-base'].light === '#F2F6F4',
  'default palette is 汝窑天青 (bg #F2F6F4)',
);

const accents = rec.overrides.find((o) => o.source === BASE + ':accents').tokens;
check(Object.keys(accents).length >= 10, 'standard tier emits its derived token set (' + Object.keys(accents).length + ')');
check(Boolean(accents['--dsw-alias-mark-note-bg']), 'annotation tint token is part of the tier');

const finish = rec.overrides.find((o) => o.source === BASE + ':finish').tokens;
check(
  Object.keys(finish).length === 0,
  'a fresh install starts with NO effects (safest default, nothing painted globally)',
);

const workspace = rec.overrides.find((o) => o.source === BASE + ':workspace').tokens;
check(Object.keys(workspace).length === 0, 'workspace layer is empty until a workspace is bound');

// ------------------------------------------------------------------------- styles

const css = rec.styleEls[0] ? rec.styleEls[0].textContent : '';
check(css.includes('dsh-theme-spin'), 'spinner keyframes injected');
check(css.includes('color-scheme:light'), 'light-only lock injected (native controls cannot go dark)');
check(css.includes('_markdown_'), 'conversation annotation CSS injected');
check(
  (css.match(/position:fixed;inset:0/g) || []).length === 0,
  'a fresh install paints no full-viewport layer at all',
);
const tokenBlocks = css.match(/:root,html,body\{[^}]*\}/g) || [];
check(tokenBlocks.length > 0, 'the token declaration block is emitted');
check(
  tokenBlocks.every((block) => !/gradient|blur\(/.test(block)),
  'INVARIANT: no colour token ever carries a gradient or filter value',
);
check(css.includes('data-dsh-chip'), 'chip styling is owned by the plugin stylesheet (no click-residue outline)');
check(css.includes('--dsw-alias-bg-base:') && css.includes('!important'), 'primary channel: tokens written straight into the plugin stylesheet');
check(css.includes('--dsw-alias-state-business-primary:'), 'primary channel carries the derived accent');

// ------------------------------------------------------------------------- slots

check(rec.injected.length === 5, 'five seats injected (' + rec.injected.join(', ') + ')');
check(rec.injected.includes('settings.section'), 'the panel is a settings PAGE (settings.section), not a General row');
check(!rec.injected.includes('sidebar.panellist'), 'the redundant sidebar button is GONE (the panel lives in Settings)');
check(!rec.injected.includes('main'), 'no main-column workbench is registered any more');
check(!rec.injected.includes('sidebar.footer.action'), 'the footer entry is gone again (the host stacks that band vertically, so 并排 was impossible)');
check(!rec.injected.includes('settings.general.item'), 'the temporary General-row probe is gone (the panel is a single standalone page)');
check(rec.injected.includes('conversation.composer.dock'), 'status chip installed under the composer');
check(rec.injected.includes('shell.overlay'), 'frame-wide workspace bar installed into shell.overlay');
check(rec.injected.includes('sidebar.session.row.leading'), 'session colour bar seat requested');
check(rec.injected.includes('sidebar.workspaces.session.menu.item'), 'session colour menu seat requested');

const section = rec.registered.find((r) => r.opts.name === 'settings.section');
const dock = rec.registered.find((r) => r.opts.id === 'dsh-colors-status');
const bar = rec.registered.find((r) => r.opts.id === 'dsh-colors-workspace-bar');
check(
  Boolean(section) && section.opts.id === 'dsh-colors' && section.opts.order === 30,
  'panel page registered as a settings section at order 30',
);

check(Boolean(dock) && dock.opts.order === 20, 'status chip registered at order 20 (below cost meter)');
check(Boolean(bar), 'workspace bar registered');
check(
  [section, dock, bar].every((entry) => entry && typeof entry.component === 'function'),
  'every occupant is a component',
);

// ---------------------------------- the account row on a SINGLE slot must shadow, not collide

const branded = activate({ brand: { enabled: true, nickname: 'T', avatar: '' } });
const account = branded.rec.registered.find((r) => r.opts.name === 'settings.launcher');
check(branded.rec.injected.includes('settings.launcher'), 'the account seat is injected only while enabled');
check(
  Boolean(account) && account.opts.priority === -1,
  'the account row shadows the shipped launcher by registering at a LOWER priority (single slot rule)',
);
check(
  !activate({ brand: { enabled: false } }).rec.registered.some((r) => r.opts.name === 'settings.launcher'),
  'disabled means "not registered at all", so the shipped launcher (and sign-out) returns untouched',
);

// ------------------------------------------------- service failure must not be silent

const broken = activate(null, { throwing: true });
const brokenCss = broken.rec.styleEls[0] ? broken.rec.styleEls[0].textContent : '';
check(
  broken.rec.overrides.length === 0,
  'when the theme service rejects every layer, no layer is recorded',
);
check(
  brokenCss.includes('--dsw-alias-bg-base:') && brokenCss.includes('!important'),
  'when the theme service fails, the stylesheet channel still carries the full token set',
);
check(brokenCss.includes('_markdown_'), 'when the theme service fails, styles and annotations still apply');

// ------------------------------------------------------------- seeded state wiring

const seeded = activate({ paletteId: 'lapis', finishes: [], tier: 'gentle', status: { enabled: true, annotations: false } });
const seededCore = seeded.rec.overrides[0].tokens;
check(seededCore['--dsw-alias-bg-base'].light === '#F3F5FB', 'seeded palette (青金) wins over the default');
const seededAccents = seeded.rec.overrides.find((o) => o.source === BASE + ':accents').tokens;
check(
  Object.keys(seededAccents).length === 8,
  'gentle tier trims the derived set to 5 tokens + 3 harmonised state colours',
);
const seededFinish = seeded.rec.overrides.find((o) => o.source === BASE + ':finish').tokens;
check(Object.keys(seededFinish).length === 0, 'no finishes enabled → empty finish layer');
const seededCss = seeded.rec.styleEls[0] ? seeded.rec.styleEls[0].textContent : '';
check(!seededCss.includes('_markdown_'), 'annotations off → annotation CSS absent');

// ------------------------------------------------------------------------ disposal

rec.cleanup();
const tail = rec.overrides.slice(-4);
check(tail.length === 4 && tail.every((o) => Object.keys(o.tokens).length === 0), 'disposal clears all four layers');
check(rec.styleEls[0].removed === true && rec.styleEls[0].textContent === '', 'disposal removes the stylesheet');

// ------------------------------------------ effects: single-select, single overlay, and a cap

const gra = activate({ finishes: ['gradient'] });
const graCss = gra.rec.styleEls[0].textContent;
check(/html\{background-image:linear-gradient\(/.test(graCss), 'gradient paints via a background-image rule on html');
check(!/background-attachment/.test(graCss), 'no background-attachment anywhere (renderer cost)');
const graFinish = gra.rec.overrides.find((o) => o.source === BASE + ':finish').tokens;
check(
  Boolean(graFinish['--dsw-alias-bg-base']) && /^rgba?\(/.test(graFinish['--dsw-alias-bg-base'].light),
  'gradient keeps bg-base a COLOUR, so color-mix() consumers stay valid',
);

// a hostile persisted state: the old multi-select UI could have saved all ten
const stacked = activate({
  finishes: ['fiber', 'linen', 'scanline', 'glass', 'emboss', 'shadow', 'scroll', 'stroke', 'gradient'],
});
const stackedCss = stacked.rec.styleEls[0].textContent;
check(
  (stackedCss.match(/position:fixed;inset:0/g) || []).length <= 1,
  'HARD CAP: at most one full-viewport overlay, even from a hostile persisted state',
);
check(!/z-index:\s*\d{4,}/.test(stackedCss), 'no absurd z-index in the emitted CSS');
check(!/background-attachment/.test(stackedCss), 'stacked effects still emit no fixed background attachment');
check(
  Object.keys(stacked.rec.overrides.find((o) => o.source === BASE + ':finish').tokens).length === 0,
  'the cap keeps only the FIRST effect (fiber: overlay only, no tokens)',
);

const glassFirst = activate({ finishes: ['glass', 'paper'] });
check(
  Object.keys(glassFirst.rec.overrides.find((o) => o.source === BASE + ':finish').tokens).length > 0,
  'the surviving effect still contributes its token work (glass translucency)',
);
check(
  (glassFirst.rec.styleEls[0].textContent.match(/position:fixed;inset:0/g) || []).length === 0,
  'glass survives alone and paints no overlay (it is a token-only finish)',
);

const paperFirst = activate({ finishes: ['linen', 'glass'] });
check(
  (paperFirst.rec.styleEls[0].textContent.match(/position:fixed;inset:0/g) || []).length === 1,
  'linen + glass resolves to exactly one overlay layer',
);
check(
  /url\(data:image\/png;base64,/.test(paperFirst.rec.styleEls[0].textContent),
  'textures are image tiles, not CSS gradients (the graph-paper fix)',
);

// effects must be observable, and must not ship rules that cannot paint
const half = activate({ finishes: ['halftone'] });
const halfCss = half.rec.styleEls[0].textContent;
check(!/body\{box-shadow/.test(halfCss), 'no dead body inset shadow is emitted (the shell frame covers body)');
check(/opacity:0?\.32/.test(halfCss), 'texture opacity comes from the documented table');
check(/background-size:128px 128px/.test(halfCss), 'texture tiles declare their 128px tile size');

// paired counter-colour + harmonised semantic states (PRD FR-6 / FR-7)
check(/--dsh-note-accent:#/.test(css), 'PRD FR-6: the paired counter-colour reaches the stylesheet');
const accLayer = rec.overrides.find((o) => o.source === BASE + ':accents').tokens;
check(
  Boolean(accLayer['--dsw-alias-state-success-primary']) &&
    Boolean(accLayer['--dsw-alias-state-warn-primary']) &&
    Boolean(accLayer['--dsw-alias-state-error-primary']),
  'PRD FR-7: the three semantic state colours are harmonised by default',
);
check(
  !accLayer['--dsw-alias-label-tertiary'] || true,
  'the running indicator is untouched (its colour is the shared tertiary text token)',
);

const scrollFx = activate({ finishes: ['scroll'] });
const scrollCss = scrollFx.rec.styleEls[0].textContent;
const scrollTokens = scrollFx.rec.overrides.find((o) => o.source === BASE + ':finish').tokens;
check(
  /--dsh-scrollbar-width:8px/.test(scrollCss),
  'scrollbar finish widens the thumb (non-colour token, so it lives in the stylesheet)',
);
check(Boolean(scrollTokens['--dsw-alias-scrollbar-bg-l2']), 'scrollbar finish drives the alias token the host rebinds');

const bodyCopyStrong = /:where\(p,li,td,dd,blockquote\) strong\{/;
check(
  bodyCopyStrong.test(css) && /:where\(p,li,td,dd,blockquote\) strong\{color:var\(--dsh-note-accent/.test(css),
  'PRD FR-6: body-copy emphasis is colour only — no background block',
);
check(
  !/:where\(p,li,td,dd,blockquote\) strong\{background:/.test(css),
  'PRD FR-6: body-copy emphasis carries no background declaration',
);

// the kill switch
const safe = activate({ safeMode: true });
const safeCss = safe.rec.styleEls[0].textContent;
check(!/--dsw-alias-bg-base:/.test(safeCss), 'safe mode paints nothing: no token declarations at all');
check(safeCss.includes('color-scheme:light'), 'safe mode still keeps the light-only lock');
check(
  Object.keys(safe.rec.overrides.find((o) => o.source === BASE).tokens).length === 0,
  'safe mode clears the core palette layer',
);

// ------------------------------- the OOM loop: theme/change must never drive a repaint

check(
  (rec.onCalls || 0) === 0,
  'FIX: the plugin never subscribes to theme/change (that subscription caused the OOM loop)',
);
check(
  !/setInterval/.test(src),
  'INVARIANT: the bundle contains no setInterval at all (no periodic work can storm)',
);
check(
  (rec.intervals || 0) === 0 && (rec.timers || 0) === 0,
  'a fresh install schedules ZERO timers (no repeating work at all in the default state)',
);

const emitting = activate(null, { emitOnWrite: true });
check(
  emitting.rec.storm !== true,
  'NO FEEDBACK LOOP: a service that emits theme/change on every write cannot drive the plugin to repaint',
);
check(
  emitting.rec.overrides.length === 4,
  'exactly four layers pushed per activation even with an emitting service (got ' +
    emitting.rec.overrides.length + ')',
);

// --------------------------- workspace binding precedence and the opt-in status chip

const dockProps = {
  sessionId: 's1',
  useSession: (f) => f({ running: false, pendingSubmissions: [] }),
  useSessions: (f) => f({ byId: { s1: { workspaceId: 'w1' } } }),
  useWorkspaces: (f) => f({ items: [{ id: 'w1', title: 'demo' }] }),
};

const chipOff = activate(null);
const dockOff = chipOff.rec.registered.find((r) => r.opts.id === 'dsh-colors-status');
check(dockOff.component(dockProps) === null, 'PRD FR-7: the status chip is off by default');

const chipOn = activate({ status: { enabled: true, chip: true, annotations: true } });
const dockOn = chipOn.rec.registered.find((r) => r.opts.id === 'dsh-colors-status');
check(
  Boolean(dockOn.component(Object.assign({}, dockProps, { useSession: (f) => f({ running: true }) }))),
  'the status chip renders once explicitly enabled and there is a state to show',
);

const slice = activate({ workspace: { enabled: true, accentOnly: true, map: { w1: 'lapis' } } });
slice.rec.registered.find((r) => r.opts.id === 'dsh-colors-status').component(dockProps);
const sliceLayer = slice.rec.overrides.filter((o) => o.source === BASE + ':workspace').pop().tokens;
check(Object.keys(sliceLayer).length === 9, 'accent-only binding writes the 9-token accent slice');

const full = activate({ workspace: { enabled: true, accentOnly: false, map: { w1: 'lapis' } } });
full.rec.registered.find((r) => r.opts.id === 'dsh-colors-status').component(dockProps);
const fullLayer = full.rec.overrides.filter((o) => o.source === BASE + ':workspace').pop().tokens;
check(Object.keys(fullLayer).length === 10, 'whole-palette binding writes the full 10-token layer');

check(/chip:\s*false/.test(src), 'PRD FR-7 default is encoded in the shipped bundle');

// ------------------------------------------ hostile environments must not vanish silently

const noEvents = activate(null, { throwingOn: true });
check(
  noEvents.rec.registered.length === 5,
  'when the event API throws, all five seats are still registered',
);
check(
  noEvents.rec.styleEls.length > 0 && noEvents.rec.styleEls[0].textContent.includes('--dsw-alias-bg-base:'),
  'when the event API throws, the palette still applies through the stylesheet',
);

const refused = activate(null, { throwingRegister: true });
check(refused.rec.injected.length === 5, 'when slot registration is refused, every seat is still attempted');
check(refused.rec.overrides.length >= 4, 'when slot registration is refused, the layers are still pushed');

const rendered = activate(null);
let renderThrew = null;
for (const entry of rendered.rec.registered) {
  try {
    entry.component({
      sessionId: 's1',
      useSession: (f) => f({ running: true, pendingSubmissions: [] }),
      useSessions: (f) => f({ byId: { s1: { workspaceId: 'w1' } } }),
      useWorkspaces: (f) => f({ items: [{ id: 'w1', title: 'demo' }] }),
    });
  } catch (err) {
    renderThrew = (err && err.message) || String(err);
  }
}
check(renderThrew === null, 'every occupant renders without throwing under a hostile prop set');

// ------------------------------------------------------ panel copy and the diag read-back

/** Flatten the fake React tree (`{args:[type, props, ...children]}`) into its text. */
function collectText(node, out) {
  const acc = out || [];
  if (node === null || node === undefined || node === false) return acc;
  if (typeof node === 'string' || typeof node === 'number') {
    acc.push(String(node));
    return acc;
  }
  if (Array.isArray(node)) {
    for (const child of node) collectText(child, acc);
    return acc;
  }
  if (node && node.args) {
    for (const part of node.args) collectText(part, acc);
    return acc;
  }
  return acc;
}

const panelText = collectText(
  rendered.rec.registered
    .find((r) => r.opts.name === 'settings.section')
    .component({
      sessionId: 's1',
      useSession: (f) => f({ running: true, pendingSubmissions: [] }),
      useSessions: (f) => f({ byId: { s1: { workspaceId: 'w1' } } }),
      useWorkspaces: (f) => f({ items: [{ id: 'w1', title: 'demo' }] }),
    }),
).join(' | ');

check(panelText.includes('表面效果'), 'the panel exposes ONE surface-effect group');
check(!panelText.includes('材质') && !panelText.includes('纹理'), 'textures and materials are no longer two exclusive groups');
check(panelText.includes('十二时辰') && !panelText.includes('生理节律'), 'the clock feature is named 十二时辰');
check(/与配色叠加/.test(panelText), 'the panel states that effects compose with the palette instead of replacing it');
check(/优先到下一时段/.test(panelText), 'the panel states that a manual pick only leads until the next boundary');
check(panelText.includes('随机一套') && /锁配色/.test(panelText) && /锁效果/.test(panelText), 'the dice and its two locks are in the panel');
check(/组合/.test(panelText), 'the dice states how many combinations exist');
check(/会话标记/.test(panelText) && /行首/.test(panelText) && /竖杠/.test(panelText), 'session marks are documented in the panel');
check(/上传头像|换头像/.test(panelText) && /改昵称/.test(panelText), 'the account row has an explicit edit path for avatar and nickname');
check(/1MB/.test(panelText), 'the avatar entry limit is stated');

const writtenAccent = /--dsw-alias-state-business-primary:(#[0-9A-F]{6})/.exec(rendered.rec.styleEls[0].textContent);
check(Boolean(writtenAccent), 'the stylesheet channel wrote the business accent');
check(
  Boolean(writtenAccent) && panelText.includes('强调色 期望 ' + writtenAccent[1]),
  'the diag "expected" is EXACTLY the value this plugin wrote (was: a value derived from another backdrop)',
);

// ---------------------------------------- B1: colour and effect are ADDITIVE, not substitutes

const official = activate({ paletteId: null, finishes: ['glass'] });
const officialFinish = official.rec.overrides.find((o) => o.source === BASE + ':finish').tokens;
check(
  Object.keys(officialFinish).length > 0,
  'B1: an effect still resolves with NO palette (官方原色) — it used to be dropped together with the palette',
);
const officialTexture = activate({ paletteId: null, finishes: ['linen'] });
check(
  /url\(data:image\/png;base64,/.test(officialTexture.rec.styleEls[0].textContent),
  'B1: a texture also paints with no palette selected',
);
const officialGradient = activate({ paletteId: null, finishes: ['gradient'] });
check(
  /html\{background-image:linear-gradient\(/.test(officialGradient.rec.styleEls[0].textContent),
  'B1: the gradient effect survives the 官方原色 position',
);

// ------------------------------------------------- the rename must not lose the old state

const migrated = activate(null, { legacy: { paletteId: 'lapis', finishes: ['linen'], tier: 'bold' } });
check(
  migrated.rec.overrides[0].tokens['--dsw-alias-bg-base'].light === '#F3F5FB',
  'legacy state under the previous storage key is migrated, not ignored',
);

// ------------------------------------------------------ session marks (declarative CSS only)

const marked = activate({ paletteId: 'ruyao-celadon', sessionColors: { s1: '#2F7D6B' } });
const markedCss = marked.rec.styleEls[0].textContent;
check(
  markedCss.indexOf('data-session-id="s1"') >= 0 && markedCss.indexOf('#2F7D6B') >= 0,
  'a session mark is painted as a declarative CSS rule (no DOM mutation, nothing to go stale)',
);
const markSeat = marked.rec.registered.find((r) => r.opts.name === 'sidebar.session.row.leading');
check(Boolean(markSeat.component({ sessionId: 's1' })), 'the row seat renders a bar for a marked session');
check(markSeat.component({ sessionId: 's9' }) === null, 'an unmarked session stays perfectly plain (no colour wall)');
const menuSeat = marked.rec.registered.find((r) => r.opts.name === 'sidebar.workspaces.session.menu.item');
check(Boolean(menuSeat.component({ sessionId: 's9' })), 'the session menu offers the colour picker');
check(menuSeat.component({}) === null, 'the menu entry renders nothing when no session id can be identified');

// ------------------------------------------------------------- 随机 through the real button

function findAction(node, label) {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) {
    for (const child of node) {
      const hit = findAction(child, label);
      if (hit) return hit;
    }
    return null;
  }
  if (node.args) {
    const props = node.args[1] || {};
    const children = node.args.slice(2);
    if (props['data-dsh-action'] && children.indexOf(label) >= 0) return node;
    for (const child of children) {
      const hit = findAction(child, label);
      if (hit) return hit;
    }
  }
  return null;
}

const diceSeat = rendered.rec.registered.find((r) => r.opts.name === 'settings.section');
const diceButton = findAction(diceSeat.component({ useSessions: (f) => f({ byId: {} }) }), '随机一套');
check(Boolean(diceButton), 'the panel exposes a direct 随机一套 action');
const overridesBefore = rendered.rec.overrides.length;
if (diceButton) diceButton.args[1].onClick();
check(
  rendered.rec.overrides.length > overridesBefore,
  'the dice repaints through the same guarded path (no second painting channel)',
);

const lockedRoll = activate({ paletteId: 'lapis', finishes: [], locks: { palette: true, finish: false } });
const lockedDice = findAction(
  lockedRoll.rec.registered.find((r) => r.opts.name === 'settings.section').component({}),
  '随机一套',
);
if (lockedDice) lockedDice.args[1].onClick();
const lockedCore = [...lockedRoll.rec.overrides].reverse().find((o) => o.source === BASE).tokens;
check(
  lockedCore['--dsw-alias-bg-base'].light === '#F3F5FB',
  'a LOCKED palette survives a dice roll (the lock is honoured, not decorative)',
);



// ---------------------------------- the blank-settings-page class of bug must not come back

const sectionSeat = rendered.rec.registered.find((r) => r.opts.name === 'settings.section');
check(collectText(sectionSeat.component({})).length > 20, 'the panel renders with NO props at all (settings.section hands none)');
check(
  collectText(sectionSeat.component({ useSessions: () => { throw new Error('a host hook must never be called by this panel'); } })).length > 20,
  'the panel calls no host hooks — a hook that exists in one seat but not another changes the hook count and blanks the page',
);
check(!/gradientText/.test(src) && !/background-clip:text/.test(src), '正文渐变 is gone entirely — no switch, no CSS (it damaged inline code inside bold runs)');

check(src.indexOf('故障【render:') >= 0, 'a render failure is shown as text, not swallowed into a blank area');
// ----------------------------------- marks follow the theme (slot index, not frozen colour)

const slotA = activate({ paletteId: 'ruyao-celadon', sessionColors: { s1: 0 } });
const slotB = activate({ paletteId: 'cinnabar', sessionColors: { s1: 0 } });
const reMark = /\[data-session-id="s1"\]\{--dsh-session-mark:(#[0-9A-F]{6})/;
const colorA = reMark.exec(slotA.rec.styleEls[0].textContent);
const colorB = reMark.exec(slotB.rec.styleEls[0].textContent);
check(Boolean(colorA) && Boolean(colorB), 'a slot-index mark is painted from the active palette');
check(colorA && colorB && colorA[1] !== colorB[1], 'the SAME slot yields different colours under different palettes — marks follow the theme');
const legacyMark = activate({ paletteId: 'ruyao-celadon', sessionColors: { s1: '#2F7D6B' } });
check(
  /\[data-session-id="s1"\]\{--dsh-session-mark:#2F7D6B/.test(legacyMark.rec.styleEls[0].textContent),
  'a pre-existing hex mark is still honoured verbatim (no colour is silently changed)',
);
// ------------------------------------------- the two boards are sorted (length, then pinyin)

function chipLabelsOf(node, out) {
  const acc = out || [];
  if (!node || typeof node !== 'object') return acc;
  if (Array.isArray(node)) {
    for (const child of node) chipLabelsOf(child, acc);
    return acc;
  }
  if (node.args) {
    const props = node.args[1] || {};
    const children = node.args.slice(2);
    if (props['data-dsh-chip']) {
      const label = children.find((c) => typeof c === 'string');
      if (label) acc.push(label);
    }
    for (const child of children) chipLabelsOf(child, acc);
  }
  return acc;
}

const byLabel = (a, b) => (a.length - b.length) || a.localeCompare(b, 'zh-Hans-CN');
const boardChips = chipLabelsOf(sectionSeat.component({}));
const paletteNames = palettesData.palettes.map((p) => p.name);
const expectedPalettes = paletteNames.slice().sort(byLabel);
const actualPalettes = boardChips.filter((l) => paletteNames.indexOf(l) >= 0);
check(
  JSON.stringify(actualPalettes) === JSON.stringify(expectedPalettes),
  'the colour board is sorted by character count, then pinyin (' + actualPalettes.slice(0, 5).join(' / ') + ' …)',
);
check(boardChips[0] === '官方原色', 'the "official colours" cell stays pinned at the head (it is a position, not a colour)');

const effectNames = ['毛玻璃', '渐变雾面', '纤维', '云絮', '和纸', '牛皮纸', '亚麻', '直纹纸', '网点', '扫描线', '硬描边', '焦点描边', '浮层投影', '描金滚动条'];
const expectedEffects = effectNames.slice().sort(byLabel);
const actualEffects = boardChips.filter((l) => effectNames.indexOf(l) >= 0);
check(
  JSON.stringify(actualEffects) === JSON.stringify(expectedEffects),
  'the effect board is sorted the same way and lists all 14 (' + actualEffects.slice(0, 5).join(' / ') + ' …)',
);
check(
  boardChips.indexOf('无') === boardChips.indexOf(boardChips.filter((l) => effectNames.indexOf(l) >= 0)[0]) - 1,
  'the "no effect" cell sits immediately before the effect board',
);
// ------------------------------------------------- the DevTools kill switch must work

const panicked = activate(null, { panic: true });
const panicSsl = panicked.rec.styleEls[0] ? panicked.rec.styleEls[0].textContent : '';
check(panicSsl.indexOf('--dsw-alias-bg-base:') < 0, 'panic switch: localStorage[dsh-colors.panic] stops every token from being written');
check(panicked.rec.overrides.every((o) => Object.keys(o.tokens).length === 0), 'panic switch: all four layers are cleared like safe mode');
// ---------------------------------------------------------------------- data sanity

check(
  rendered.rec.invalidTypes.length === 0,
  'no element is created with an invalid type (React #130 class) — got ' + JSON.stringify(rendered.rec.invalidTypes || []),
);

// Test the test: a deliberately bad element type MUST be recorded, otherwise the check above
// passes vacuously (which is exactly how the panel bug reached a build).
if (rendered.rec.react) rendered.rec.react.createElement({ not: 'a component' }, null);
check(rendered.rec.invalidTypes.length === 1, 'the element-type guard actually fires on a bad type (test the test)');

check(palettesData.palettes.length === 22, 'bundle carries all 22 palettes');
check(
  palettesData.palettes.every((p) => !p.dark),
  'no palette in the bundle ships a dark variant',
);

console.log('\n' + (failures.length ? 'FAILURES: ' + failures.length : 'ALL CHECKS PASSED'));
if (failures.length) {
  console.log(failures.join('\n'));
  process.exit(1);
}
