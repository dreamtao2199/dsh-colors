/**
 * Plugin assembly: state → CSS variables (+ the sanctioned service path) → slots.
 *
 * Hard lesson from 2.1.0, applied as structure rather than intent:
 *
 *   * SLOTS ARE REGISTERED FIRST, each guarded on its own. In 2.1.0 the theme effect ran
 *     before any slot registration; when that path threw, the plugin registered nothing at
 *     all and the interface reverted to stock — no panel, no error, no trace.
 *   * EVERY stage of `apply` is guarded, and every failure lands in `FAULT`, which the panel
 *     renders. A failure nobody can see is worse than a visible error.
 *   * The plugin's own stylesheet is the PRIMARY channel (`!important` CSS variables), so a
 *     rejected `overrideTokens` layer can no longer mean "nothing happens".
 *   * Only valid COLOUR values ever enter a colour token. A gradient in a colour token
 *     silently invalidates every `color-mix()` that consumes it; the gradient is declared as
 *     a `background-image` rule over a translucent base colour instead.
 *   * COLOUR AND EFFECT ARE ADDITIVE. Finishes always resolve, with or without a palette
 *     (`NEUTRAL_LIGHT` is the fallback) — the build up to 0.9.9 dropped all fourteen effects
 *     whenever 官方原色 was selected, which read as "the effect is broken".
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

const SOURCE = 'dsh-colors';
const PANEL_ID = 'dsh-colors';
const DOCK_ID = 'dsh-colors-status';
const BAR_ID = 'dsh-colors-workspace-bar';
const SESSION_BAR_ID = 'dsh-colors-session-mark';
const SESSION_MENU_ID = 'dsh-colors-session-menu';

/** Last internal failure, surfaced in the panel. Never silently swallowed. */
const FAULT = { stage: null, message: null, at: null, count: 0 };

function recordFault(stage, err) {
  FAULT.stage = stage;
  FAULT.message = err && err.message ? err.message : String(err);
  FAULT.at = Date.now();
  FAULT.count += 1;
  // Also say it where a developer can see it: a silent catch once hid a broken seat for days.
  try {
    if (FAULT.count <= 10 && typeof console !== 'undefined' && console.error) {
      console.error('[dsh-colors] ' + stage + ': ' + FAULT.message);
    }
  } catch (inner) {
    /* logging must never break the plugin */
  }
}

/**
 * Clear a fault whose cause has demonstrably gone away — a stage that just succeeded again.
 * Stale red text is its own kind of lie: it kept reporting a rejected slot registration after
 * the registration had been fixed, and `count` is kept so the history is not erased.
 */
function clearFault(stage) {
  if (!stage || FAULT.stage === stage) {
    FAULT.stage = null;
    FAULT.message = null;
    FAULT.at = null;
  }
}

/**
 * Chip styling lives here, not in inline styles, for one concrete reason (PRD §5): inline
 * borders plus the host's focus ring left a persistent outline on every button the user had
 * ever clicked. Inactive chips now have no border and no outline; the focus ring is ours and
 * only appears for keyboard focus.
 *
 * `[data-dsh-action]` is the second control shape: an ACTION (reset, clear, reapply) must not
 * look like a switch, because a switch that never lights up reads as "this click did nothing".
 */
const CHIP_CSS =
  '[data-dsh-chip]{border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-primary);outline:none;cursor:pointer;}' +
  '[data-dsh-chip]:focus{outline:none;}' +
  '[data-dsh-chip]:hover{background:var(--dsw-alias-interactive-bg-hover);}' +
  '[data-dsh-chip]:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));}' +
  '[data-dsh-chip][data-active="true"]{background:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-bg-layer-1);font-weight:600;}' +
  '[data-dsh-chip][aria-disabled="true"]{opacity:.45;cursor:default;}' +
  '[data-dsh-action]{border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);outline:none;cursor:pointer;}' +
  '[data-dsh-action]:hover{background:var(--dsw-alias-interactive-bg-hover);}' +
  '[data-dsh-action]:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));}' +
  '[data-dsh-action][data-tone="danger"]{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary);}' +
  '[data-dsh-swatch]{border:1px solid var(--dsw-alias-border-l2);outline:none;cursor:pointer;padding:0;}' +
  '[data-dsh-swatch][data-active="true"]{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1),0 0 0 4px var(--dsw-alias-state-business-primary);}';

/** Plain token map → the `{ light, dark }` shape; dark mirrors light (no dark mode). */
function wrapTokens(map) {
  const out = {};
  for (const key of Object.keys(map || {})) {
    const value = map[key];
    if (typeof value === 'string' && value.length > 0) out[key] = { light: value, dark: value };
  }
  return out;
}

/** True only for real colour values: gradients, filters and shadows must never enter one. */
function isColorValue(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return true;
  return /^(rgb|rgba|hsl|hsla|color|oklch|lab|lch)\(/i.test(v);
}

/**
 * Wrap a slot component so a render crash can never take the host's tree down with it.
 * The failure is recorded (and shown in the panel); the occupant renders nothing.
 */
function safeComponent(Component, label) {
  return function Guarded(props) {
    try {
      return Component(props);
    } catch (err) {
      // Render the reason, do not swallow it into a blank area. A bare string is a valid
      // React child, so this needs no element factory and cannot itself throw.
      recordFault('render:' + label, err);
      return '故障【render:' + label + '】' + (err && err.message ? err.message : String(err));
    }
  };
}

/** Emergency kill switch readable from DevTools: `localStorage['dsh-colors.panic'] = '1'`. */
function panicFlag() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    return window.localStorage.getItem('dsh-colors.panic') === '1';
  } catch (err) {
    return false;
  }
}

function createPlugin(deps) {  const h = deps.h;
  const palettes = deps.palettes;
  const finishes = deps.finishes;
  const paletteById = (id) => palettes.find((p) => p.id === id) || null;
  const paletteIds = palettes.map((p) => p.id);
  const finishIds = finishes.map((f) => f.id);
  const store = createStore(undefined, (err) => recordFault('storage', err));
  const runtime = {
    workspaces: new Map(),
    current: null,
    repaint: null,
    clearFault: null,
    randomize: null,
    faults: FAULT,
    store,
    palettes,
    paletteById,
    paletteIds,
    finishes,
    finishIds,
    diag: {
      paints: 0,
      lastPaletteId: null,
      lastSource: null,
      /** The accent value this plugin actually WROTE, so the read-back compares like with like. */
      expectAccent: null,
      rejectedValues: 0,
      serviceFails: 0,
      overlays: 0,
      sessionMarks: 0,
      finish: null,
      breakerTripped: false,
    },
  };

  return {
    inject: ['theme', 'slots'],

    apply(ctx) {
      const theme = ctx.theme;
      let styleEl = null;
      let timer = null;
      /**
       * The guard against the failure that took the app down: `overrideTokens` emits the
       * documented `theme/change` event, so a listener that repaints feeds itself and the
       * renderer dies of OOM with no JS error to show for it.
       */
      const breaker = createBreaker();

      function setCss(css) {
        if (!css) {
          if (styleEl) styleEl.textContent = '';
          return;
        }
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.setAttribute('data-dsh-plugin', SOURCE);
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = css;
      }

      /** Merge token layers in order — later layers win. Non-colour values are declared apart. */
      function mergeLayers(layers) {
        const colors = {};
        const extras = [];
        for (const layer of layers) {
          for (const key of Object.keys(layer || {})) {
            const entry = layer[key];
            const value = entry && typeof entry === 'object' ? entry.light : entry;
            if (typeof value !== 'string' || !value) continue;
            if (isColorValue(value)) colors[key] = value;
            else extras.push([key, value]);
          }
        }
        return { colors, extras };
      }

      /** The declaration block for an already-merged layer set. */
      function cssFromMerged(merged) {
        const names = Object.keys(merged.colors);
        let css = '';
        if (names.length) {
          css +=
            ':root,html,body{' +
            names.map((k) => k + ':' + merged.colors[k] + ' !important;').join('') +
            '}';
        }
        for (const pair of merged.extras) {
          css += ':root,html,body{' + pair[0] + ':' + pair[1] + ' !important;}';
        }
        return css;
      }

      function activePalette(now) {
        const state = store.snapshot();
        const scheduled = resolvePaletteId(state, now || new Date(), paletteIds);
        const id = scheduled || state.paletteId;
        return id ? paletteById(id) : null;
      }

      function pushLayer(source, tokens) {
        const colorTokens = {};
        for (const key of Object.keys(tokens || {})) {
          const entry = tokens[key];
          if (entry && typeof entry === 'object' && isColorValue(entry.light)) colorTokens[key] = entry;
          else runtime.diag.rejectedValues += 1;
        }
        try {
          theme.overrideTokens(source, colorTokens);
        } catch (err) {
          runtime.diag.serviceFails += 1;
          recordFault('overrideTokens(' + source + ')', err);
        }
      }

      function paint() {
        const state = store.snapshot();
        const now = new Date();

        // Kill switch first: safe mode paints nothing at all, not even the palette.
        if (state.safeMode || panicFlag()) {
          pushLayer(SOURCE, {});
          pushLayer(SOURCE + ':accents', {});
          pushLayer(SOURCE + ':finish', {});
          pushLayer(SOURCE + ':workspace', {});
          setCss('html{color-scheme:light !important;}body{color-scheme:light !important;}');
          runtime.diag.paints += 1;
          runtime.diag.overlays = 0;
          runtime.diag.lastPaletteId = null;
          runtime.diag.expectAccent = null;
          runtime.diag.finish = null;
          runtime.diag.lastSource = state.safeMode ? 'safe-mode' : 'panic-switch';
          return;
        }

        const palette = activePalette(now);

        const core = palette ? buildLayer(palette) : {};
        const accents = palette ? wrapTokens(tierTokens(state.tier, palette)) : {};
        // PRD FR-7: harmonise the three semantic state colours toward the palette when asked.
        const harmony = palette && state.status.semantic ? wrapTokens(harmonyTokens(palette)) : {};
        // PRD FR-6: the palette's paired counter-colour, consumed by our markdown stylesheet.
        const note = palette && palette.noteAccent ? { '--dsh-note-accent': palette.noteAccent } : {};
        // FR-2: effects are ADDITIVE — they resolve even with no palette at all.
        const finish = resolveFinishes(state.finishes, palette);

        const current = runtime.current;
        const boundId =
          state.workspace.enabled && current && current.workspaceId
            ? state.workspace.map[current.workspaceId]
            : null;
        const bound = boundId ? paletteById(boundId) : null;
        // PRD FR-5: an explicit binding may replace the whole palette, not just the accent.
        const workspaceLayer = bound
          ? state.workspace.accentOnly === false
            ? buildLayer(bound)
            : wrapTokens(workspaceTokens(bound))
          : {};

        pushLayer(SOURCE, core);
        pushLayer(SOURCE + ':accents', Object.assign({}, accents, harmony));
        pushLayer(SOURCE + ':finish', wrapTokens(finish.tokens));
        pushLayer(SOURCE + ':workspace', workspaceLayer);

        let css = SPIN_KEYFRAMES + CHIP_CSS;
        css += 'html{color-scheme:light !important;}body{color-scheme:light !important;}';
        const merged = mergeLayers([core, accents, finish.tokens, workspaceLayer, harmony, note]);
        css += cssFromMerged(merged);
        css += finish.css;
        // Annotations are colour-only. 字体渐变 was removed entirely: the session-title gradient
        // the user wanted would require host-DOM painting, and the conversation-text variant
        // damaged inline code inside bold runs.
        if (state.status.annotations) {
          css += markdownNoteCss();
        }
        css += sessionMarkCss(state, palette);
        setCss(css);

        const manualId = manualOverride(state, now);
        runtime.diag.paints += 1;
        runtime.diag.overlays = finish.overlayCount || 0;
        runtime.diag.lastPaletteId = palette ? palette.id : null;
        // What the DIAGNOSTIC compares against must be the value this plugin just wrote —
        // comparing a palette's on-backdrop accent against an on-surface one is apples to
        // oranges, and produced a permanent red ✗ that meant nothing.
        runtime.diag.expectAccent = merged.colors['--dsw-alias-state-business-primary'] || null;
        runtime.diag.finish = state.finishes.length ? state.finishes[0] : null;
        runtime.diag.sessionMarks = Object.keys(state.sessionColors).length;
        runtime.diag.lastSource = bound
          ? 'workspace:' + bound.id
          : palette
            ? (manualId ? 'manual:' : 'global:') + palette.id
            : 'official';
      }

      /**
       * Session colour marks (PRD FR-10) — the stylesheet half.
       *
       * HONEST STATUS: this half is currently INERT. It keys on a `data-session-id` attribute
       * that this host does NOT render (verified by searching the shipped client for the
       * literal), so what actually paints the bar is the official
       * `sidebar.session.row.leading` seat. The rules are kept because they cost nothing, are
       * declarative (no DOM mutation), and would start working by themselves if a future host
       * version exposes that attribute — but nothing here should be credited for the bar.
       *
       * Marks are resolved from the ACTIVE palette by slot index, so a mark follows the theme.
       */
      function sessionMarkCss(state, palette) {
        const marks = state.sessionColors || {};
        const ids = Object.keys(marks).slice(0, 200);
        if (!ids.length) return '';
        let css = '';
        for (const id of ids) {
          const color = markColorOf(marks[id], palette);
          if (!color || !/^#[0-9a-fA-F]{6}$/.test(color)) continue;
          const safe = id.replace(/["\\]/g, '');
          const sel = '[data-session-id="' + safe + '"]';
          css +=
            sel + '{--dsh-session-mark:' + color + ';}' +
            sel + ' [class*="session"]::before,' +
            sel + '::before{content:"";position:absolute;left:0;top:2px;bottom:2px;width:3px;' +
            'border-radius:2px;background:' + color + ';pointer-events:none;}' +
            sel + '[class*="row"],' + sel + '{position:relative;}';
        }
        return css;
      }

      /** Every path into paint: re-entrancy guard, storm breaker, fault capture. */
      function safePaint(stage) {
        const verdict = breaker.enter();
        if (verdict === 'reentrant') return false;
        if (verdict === 'tripped') {
          if (!runtime.diag.breakerTripped) {
            runtime.diag.breakerTripped = true;
            recordFault(
              'circuit-breaker',
              new Error(
                'repaint storm: ' +
                  breaker.state().count +
                  ' repaints within ' +
                  breaker.state().windowMs +
                  'ms — repainting suspended until reset',
              ),
            );
          }
          return false;
        }
        try {
          paint();
          return true;
        } catch (err) {
          recordFault(stage, err);
          return false;
        } finally {
          breaker.exit();
        }
      }

      function schedule() {
        if (timer) {
          window.clearTimeout(timer);
          timer = null;
        }
        const ms = msUntilNextChange(store.snapshot(), new Date());
        if (ms > 0) {
          timer = window.setTimeout(() => {
            safePaint('timer');
            try {
              schedule();
            } catch (err) {
              recordFault('schedule', err);
            }
          }, Math.min(ms, 2147483000));
        }
      }

      function report(signal) {
        try {
          if (signal.workspaceId) {
            const entry = runtime.workspaces.get(signal.workspaceId) || { id: signal.workspaceId };
            for (const other of runtime.workspaces.values()) other.active = false;
            runtime.workspaces.set(
              signal.workspaceId,
              Object.assign(entry, { label: signal.label || entry.label || signal.workspaceId, active: true }),
            );
          }
          runtime.current = signal;
          paint();
        } catch (err) {
          recordFault('report', err);
        }
      }
      runtime.report = report;

      /**
       * Account row (PRD FR-9). Registered ONLY while enabled: disabling disposes the
       * injection so the shipped account launcher (with its quick sign-out) comes back,
       * instead of leaving an empty seat behind.
       *
       * `settings.launcher` is a SINGLE slot and already has an occupant at the shipped
       * priority 0. The slot core refuses a second occupant at the same priority and says so
       * in the error: "register at a different priority to shadow it (lowest renders)". A lower
       * number is therefore how this occupant takes the seat, which SHADOWS the shipped
       * launcher while enabled (and restores it the moment it is disabled).
       */
      const ACCOUNT_PRIORITY = -1;
      let accountDisposer = null;
      function syncAccountRow() {
        const want = Boolean(store.snapshot().brand.enabled);
        if (want && !accountDisposer) {
          try {
            accountDisposer = ctx.slots.inject('settings.launcher', () => {
              try {
                const disposer = ctx.slots.register(
                  { name: 'settings.launcher', priority: ACCOUNT_PRIORITY },
                  createAccountRow({ h, store, paletteById }),
                );
                clearFault('slot:account');
                return disposer;
              } catch (err) {
                recordFault('slot:account', err);
                return () => {};
              }
            });
          } catch (err) {
            recordFault('slot:account', err);
            accountDisposer = null;
          }
        } else if (!want && accountDisposer) {
          try {
            accountDisposer();
          } catch (err) {
            /* disposal must never throw */
          }
          accountDisposer = null;
        }
      }
      runtime.syncAccountRow = syncAccountRow;

      runtime.repaint = () => {
        safePaint('manual');
        try {
          schedule();
        } catch (err) {
          recordFault('schedule', err);
        }
      };

      /** Manual recovery from a tripped breaker: explicit, never automatic. */
      runtime.resetBreaker = () => {
        breaker.reset();
        runtime.diag.breakerTripped = false;
        return safePaint('manual-reset');
      };
      runtime.breakerState = () => breaker.state();
      /** Clear the fault banner after a retry. A recurring fault re-records itself at once. */
      runtime.clearFault = () => clearFault(null);
      /** 随机: one dice roll over palette × effect, honouring the two locks. */
      runtime.randomize = () =>
        store.randomize(paletteIds, finishIds, currentWorkspaceId(), new Date());
      runtime.randomizeRhythm = () => store.randomizeRhythm(paletteIds);
      function currentWorkspaceId() {
        return runtime.current && runtime.current.workspaceId ? runtime.current.workspaceId : null;
      }
      runtime.currentWorkspaceId = currentWorkspaceId;

      // ------------------------------------------------------------------ 1. slots first
      // A failure later in apply must not be able to take the interface entry points away.
      // Every seat is registered in its own try/catch, so one refusal cannot cascade.
      const panelDeps = {
        h,
        store,
        runtime,
        fault: FAULT,
        palettes,
        paletteById,
        finishes,
        tiers: TIER_ORDER.map((id) => TIERS[id]),
        intervals: INTERVALS,
        audit: auditPalette,
        avatarLimit: AVATAR_LIMIT,
        avatarWarn: AVATAR_WARN,
        avatarEdge: AVATAR_EDGE,
      };

      try {
        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            { name: 'settings.section', id: PANEL_ID, order: 30, label: '多彩Harness' },
            safeComponent(createPanel(panelDeps), 'settings-section'),
          ),
        );
      } catch (err) {
        recordFault('slot:settings-section', err);
      }

      // NOTE (0.9.10): the sidebar button + main-column workbench were REMOVED on request —
      // the panel already lives in Settings, so a second entry in the main navigation was
      // redundant. The seat pair (`sidebar.panellist` + `main`) is documented in
      // docs/ARCHITECTURE.md for anyone who wants it back.

      // NOTE: a quick entry in `sidebar.footer.action` was tried (order 9, right after
      // skillhub-plaza) and REVERTED — the host stacks footer actions vertically, so it could
      // not sit beside 插件广场 as asked. The panel therefore lives in Settings only, and the
      // seat contract is documented in docs/ARCHITECTURE.md if it is ever wanted again.

      // The temporary General-row probe has been removed: the blank page was NOT a seat problem —
      // it was React #130 from `h(ROW, …)` inside the panel (a style object used as an element
      // type). The panel now lives in ONE place: the standalone settings page.

      try {
        ctx.slots.inject('conversation.composer.dock', () =>
          ctx.slots.register(
            { name: 'conversation.composer.dock', id: DOCK_ID, order: 20 },
            safeComponent(createDockSignal({ h, store, report, paletteById }), 'dock'),
          ),
        );
      } catch (err) {
        recordFault('slot:dock', err);
      }

      try {
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            { name: 'shell.overlay', id: BAR_ID, order: 500 },
            safeComponent(createWorkspaceBar({ h, store, runtime, paletteById }), 'bar'),
          ),
        );
      } catch (err) {
        recordFault('slot:bar', err);
      }

      try {
        ctx.slots.inject('sidebar.session.row.leading', () =>
          ctx.slots.register(
            { name: 'sidebar.session.row.leading', id: SESSION_BAR_ID, order: 10 },
            safeComponent(createSessionMark({ h, store, paletteById }), 'session-mark'),
          ),
        );
      } catch (err) {
        recordFault('slot:session-mark', err);
      }

      try {
        ctx.slots.inject('sidebar.workspaces.session.menu.item', () =>
          ctx.slots.register(
            { name: 'sidebar.workspaces.session.menu.item', id: SESSION_MENU_ID, order: 60 },
            safeComponent(createSessionMenu({ h, store, paletteById }), 'session-menu'),
          ),
        );
      } catch (err) {
        recordFault('slot:session-menu', err);
      }

      // --------------------------------------------------- 2. paint once, then subscribe
      safePaint('initial');
      syncAccountRow();

      try {
        schedule();
      } catch (err) {
        recordFault('schedule', err);
      }

      try {
        ctx.effect(() => {
          let offStore = null;
          try {
            offStore = store.subscribe(() => {
              safePaint('store-change');
              syncAccountRow();
              try {
                schedule();
              } catch (err) {
                recordFault('schedule', err);
              }
            });
          } catch (err) {
            recordFault('subscribe', err);
          }
          // NOTE: we deliberately do NOT subscribe to `theme/change`.
          // `overrideTokens` emits that event, so a repainting listener feeds itself:
          // paint → overrideTokens → theme/change → paint → … until the renderer OOMs
          // (that is exactly the crash this version fixes). The subscription bought nothing:
          // there is no dark mode to follow and the finish CSS is scheme-independent.
          return () => {
            try {
              if (offStore) offStore();
            } catch (err) {
              /* disposal must never throw */
            }
            if (timer) {
              window.clearTimeout(timer);
              timer = null;
            }
            runtime.repaint = null;
            ['', ':accents', ':finish', ':workspace'].forEach((suffix) => {
              try {
                theme.overrideTokens(SOURCE + suffix, {});
              } catch (err) {
                /* disposal must not throw */
              }
            });
            try {
              setCss('');
              if (styleEl) {
                styleEl.remove();
                styleEl = null;
              }
            } catch (err) {
              /* nothing else to do */
            }
          };
        });
      } catch (err) {
        recordFault('effect', err);
      }
    },
  };
}

/* @bundle:strip-start */
export {
  createPlugin,
  wrapTokens,
  isColorValue,
  recordFault,
  clearFault,
  FAULT,
  SOURCE,
  PANEL_ID,
  DOCK_ID,
  BAR_ID,
  SESSION_BAR_ID,
  SESSION_MENU_ID,
};
/* @bundle:strip-end */
