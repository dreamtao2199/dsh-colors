/**
 * Accent tiers: how much of the interface a palette is allowed to repaint.
 *
 * Ownership split that keeps this file honest:
 *   palette-layer.js  → the 10 sanctioned alias tokens (base, surfaces, text, sidebar)
 *   THIS FILE         → every derived token, filtered by the active tier
 *   finishes.js       → behaviour tokens (translucency, elevation, strokes, scrollbars)
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

/* @bundle:strip-start */
import { mixHex, darken, contrastRatio, maxBlendForContrast, usableAccent } from './color.js';
/* @bundle:strip-end */

const TIERS = {
  gentle: {
    id: 'gentle',
    name: '克制',
    note: '只动 4 处：发丝描边、焦点环、悬停底色、链接',
    tokens: [
      '--dsw-alias-border-l1',
      '--dsw-alias-border-l3',
      '--dsw-focus-ring-color',
      '--dsw-alias-interactive-bg-hover',
      '--dsw-alias-link',
    ],
  },
  standard: {
    id: 'standard',
    name: '标准',
    note: '默认档：加上二级/三级文字、业务强调色、实心按钮、菜单图标、代码块、标注底纹',
    tokens: [
      '--dsw-alias-border-l1',
      '--dsw-alias-border-l2',
      '--dsw-alias-border-l3',
      '--dsw-alias-border-l4',
      '--dsw-focus-ring-color',
      '--dsw-alias-interactive-bg-hover',
      '--dsw-alias-label-secondary',
      '--dsw-alias-label-tertiary',
      '--dsw-alias-link',
      '--dsw-alias-state-business-primary',
      '--dsw-alias-button-primary-fill',
      '--dsw-alias-button-primary-hover',
      '--dsw-alias-menu-icon',
      '--dsw-alias-markdown-code-block',
      '--dsw-alias-mark-note-bg',
    ],
  },
  bold: {
    id: 'bold',
    name: '张扬',
    note: '再加上菜单材质、开关滑块、工具提示、骨架屏',
    tokens: [
      '--dsw-alias-border-l1',
      '--dsw-alias-border-l2',
      '--dsw-alias-border-l3',
      '--dsw-alias-border-l4',
      '--dsw-focus-ring-color',
      '--dsw-alias-interactive-bg-hover',
      '--dsw-alias-label-secondary',
      '--dsw-alias-label-tertiary',
      '--dsw-alias-link',
      '--dsw-alias-state-business-primary',
      '--dsw-alias-button-primary-fill',
      '--dsw-alias-button-primary-hover',
      '--dsw-alias-menu-icon',
      '--dsw-alias-markdown-code-block',
      '--dsw-alias-mark-note-bg',
      '--dsw-menu-surface-fill',
      '--dsw-alias-switch-thumb',
      '--dsw-alias-tooltip-key-bg',
      '--dsw-alias-bg-skeleton',
    ],
  },
};

const TIER_ORDER = ['gentle', 'standard', 'bold'];

/** Accent pushed against the raised surface — where links, buttons and chips live. */
function surfaceAccent(spec) {
  const start = spec.brand;
  if (contrastRatio(start, spec.surface) >= 4.5) return start;
  let best = start;
  for (let step = 1; step <= 100; step += 1) {
    best = darken(start, step / 100);
    if (contrastRatio(best, spec.surface) >= 4.5) return best;
  }
  return best;
}

/** Every token this palette can contribute, before tier filtering. */
function allAccentTokens(palette) {
  const s = palette.light;
  const surface = s.surface;
  const sunken = s.sunken || s.surface;
  const accent = surfaceAccent(s);

  return {
    '--dsw-alias-border-l1': mixHex(surface, accent, 0.16),
    '--dsw-alias-border-l2': mixHex(surface, accent, 0.26),
    '--dsw-alias-border-l3': mixHex(surface, accent, 0.34),
    '--dsw-alias-border-l4': mixHex(surface, accent, 0.42),
    '--dsw-focus-ring-color': accent,
    '--dsw-alias-interactive-bg-hover': mixHex(surface, accent, 0.08),
    '--dsw-alias-label-secondary': maxBlendForContrast(s.text, surface, s.bg, 4.5),
    '--dsw-alias-label-tertiary': maxBlendForContrast(s.text, s.bg, s.bg, 4.5),
    '--dsw-alias-link': accent,
    '--dsw-alias-state-business-primary': accent,
    '--dsw-alias-button-primary-fill': accent,
    '--dsw-alias-button-primary-hover': darken(accent, 0.12),
    '--dsw-alias-menu-icon': mixHex(s.text, accent, 0.25),
    '--dsw-alias-markdown-code-block': mixHex(surface, accent, 0.05),
    '--dsw-alias-mark-note-bg': mixHex(surface, accent, 0.14),
    '--dsw-menu-surface-fill': mixHex(surface, accent, 0.03),
    '--dsw-alias-switch-thumb': mixHex(surface, accent, 0.06),
    '--dsw-alias-tooltip-key-bg': mixHex(sunken, accent, 0.1),
    '--dsw-alias-bg-skeleton': mixHex(sunken, accent, 0.07),
  };
}

/** Token name → value for one tier. Unknown tiers fall back to `standard`. */
function tierTokens(tierId, palette) {
  const all = allAccentTokens(palette);
  const tier = TIERS[tierId] || TIERS.standard;
  const out = {};
  for (const key of tier.tokens) {
    if (all[key] !== undefined) out[key] = all[key];
  }
  return out;
}

/**
 * Harmonise the host's three semantic state colours toward the active palette (PRD FR-7).
 *
 * success stays green, warn stays amber, error stays red — only saturation and temperature
 * move, so the learned meaning survives while the palette is felt. Every value is pushed
 * until it clears 4.5:1 on the palette's own base background.
 *
 * The RUNNING indicator is deliberately absent: its colour comes from
 * `--dsw-alias-label-tertiary`, so recolouring it would tint every tertiary text in the app.
 */
const SEMANTIC_ANCHORS = {
  '--dsw-alias-state-success-primary': '#2E7D5B',
  '--dsw-alias-state-warn-primary': '#B0781E',
  '--dsw-alias-state-error-primary': '#B4432F',
};

function harmonyTokens(palette) {
  const s = palette.light;
  const out = {};
  for (const key of Object.keys(SEMANTIC_ANCHORS)) {
    out[key] = usableAccent(mixHex(SEMANTIC_ANCHORS[key], s.brand, 0.28), s.bg, 4.5);
  }
  return out;
}

/**
 * Six session-mark colours derived from ONE palette (PRD FR-10).
 *
 * Marks must never look pasted on: the first two are the palette's own brand and its paired
 * counter-colour, and the rest are that brand blended toward fixed hues, so the whole family
 * keeps the palette's temperature while staying tellable apart.
 *
 * Two rules are enforced here rather than left to taste:
 *   * every mark is pushed until it clears 3:1 against the palette background — that is the
 *     non-text contrast standard for a graphical object, and a pale palette's near-white brand
 *     would otherwise paint an invisible bar;
 *   * marks are de-duplicated (a light palette can collapse two blends onto one colour), by
 *     nudging the loser further toward its anchor until it is distinct.
 *
 * With no palette active we fall back to the documented neutral family — we do not invent a
 * brand colour.
 */
const MARK_ANCHORS = ['#2F7D6B', '#B0781E', '#A63A5A', '#3A5FA8'];
const MARK_NEUTRAL = ['#8A8F98', '#4D6BFE', '#2F7D6B', '#B0781E', '#A63A5A', '#3A5FA8'];
const MARK_MIN_CONTRAST = 3;

function markColors(palette) {
  if (!palette || !palette.light) return MARK_NEUTRAL.slice();
  const spec = palette.light;
  const brand = spec.brand;
  const note = palette.noteAccent || spec.text;
  const seen = {};
  const out = [];

  const push = (candidate, anchor) => {
    let value = usableAccent(candidate, spec.bg, MARK_MIN_CONTRAST);
    let step = 0;
    while (seen[value] && step < 6) {
      step += 1;
      // Nudge by DARKENING, not by mixing toward the anchor: for a palette whose brand already
      // equals an anchor (胭脂 #A63A5A) mixing toward it is a no-op and the duplicate survives.
      value = usableAccent(darken(candidate, 0.14 * step), spec.bg, MARK_MIN_CONTRAST);
    }
    seen[value] = true;
    out.push(value);
  };

  push(brand, spec.text);
  push(note, spec.text);
  MARK_ANCHORS.forEach((anchor) => push(mixHex(brand, anchor, 0.55), anchor));
  return out;
}

/**
 * Workspace accent layer: a narrow slice that can sit on top of a global palette without
 * repainting surfaces — this is what "nested workspace color" means in practice.
 */
function workspaceTokens(palette) {
  const s = palette.light;
  const accent = surfaceAccent(s);
  return {
    '--dsw-alias-brand-primary': s.brand,
    '--dsw-alias-link': accent,
    '--dsw-focus-ring-color': accent,
    '--dsw-alias-state-business-primary': accent,
    '--dsw-alias-button-primary-fill': accent,
    '--dsw-alias-button-primary-hover': darken(accent, 0.12),
    '--dsw-alias-border-l1': mixHex(s.surface, accent, 0.16),
    '--dsw-alias-mark-note-bg': mixHex(s.surface, accent, 0.14),
    '--dsw-specific-sidebar-fill': s.sidebar,
  };
}

/* @bundle:strip-start */
export {
  TIERS,
  TIER_ORDER,
  tierTokens,
  allAccentTokens,
  workspaceTokens,
  surfaceAccent,
  harmonyTokens,
  SEMANTIC_ANCHORS,
  MARK_ANCHORS,
  MARK_NEUTRAL,
  markColors,
};
/* @bundle:strip-end */
