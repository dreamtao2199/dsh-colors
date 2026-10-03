/**
 * Palette → theme layer.
 *
 * Two groups of tokens:
 *   CORE    the sanctioned third-party alias surface (the 14 the Theme provider advertises)
 *   DERIVED the extra tokens a full light surface needs (tertiary text, hairline borders,
 *           link, focus ring, business accent, filled button) — the "standard" accent tier
 *
 * Every token is emitted in BOTH mode slots with the same light value: this build has no
 * dark mode, so an accidental dark preference cannot darken the interface. Secondary and
 * tertiary text are derived by walking toward the background only as far as WCAG allows.
 *
 * Bundling note: the `@bundle:strip` block is test-only and removed by the bundler.
 */

/* @bundle:strip-start */
import { mixHex, darken, usableAccent, maxBlendForContrast, contrastRatio } from './color.js';
/* @bundle:strip-end */

const CORE_TOKENS = [
  '--dsw-alias-brand-primary',
  '--dsw-alias-bg-base',
  '--dsw-alias-bg-layer-1',
  '--dsw-alias-bg-layer-2',
  '--dsw-alias-bg-overlay',
  '--dsw-alias-border-l1',
  '--dsw-alias-border-l2',
  '--dsw-alias-label-primary',
  '--dsw-alias-label-secondary',
  '--dsw-specific-sidebar-fill',
];

/**
 * Derived tokens (borders l3/l4, tertiary text, link, focus ring, business accent, filled
 * buttons) are owned by `accents.js`, which filters them by the active tier. This file stays
 * responsible for the sanctioned alias surface only.
 */
const DERIVED_TOKENS = [];

const LAYER_TOKEN_ORDER = CORE_TOKENS.concat(DERIVED_TOKENS);

/** All light-mode values for one palette, including the accessibility-derived ones. */
function schemeTokens(spec) {
  const surface = spec.surface;
  const text = spec.text;
  const backdrop = spec.bg;
  const accent = usableAccent(spec.brand, backdrop, 4.5);
  const accentOnSurface = usableAccent(accent, surface, 4.5);

  return {
    // ---- core alias surface
    '--dsw-alias-brand-primary': spec.brand,
    '--dsw-alias-bg-base': spec.bg,
    '--dsw-alias-bg-layer-1': surface,
    '--dsw-alias-bg-layer-2': spec.sunken,
    '--dsw-alias-bg-overlay': spec.overlay || surface,
    '--dsw-alias-border-l1': spec.border1 || mixHex(surface, text, 0.1),
    '--dsw-alias-border-l2': spec.border2 || mixHex(surface, text, 0.2),
    '--dsw-alias-label-primary': text,
    '--dsw-alias-label-secondary':
      spec.label2 || maxBlendForContrast(text, surface, backdrop, 4.5),
    '--dsw-specific-sidebar-fill': spec.sidebar,
  };
}

/** The `{ light, dark }` payload the theme service takes; dark mirrors light by design. */
function buildLayer(palette) {
  const values = schemeTokens(palette.light);
  const layer = {};
  for (const key of LAYER_TOKEN_ORDER) {
    const value = values[key];
    if (typeof value === 'string' && value.length > 0) layer[key] = { light: value, dark: value };
  }
  return layer;
}

/** Layer for the "official colors" position: an empty layer clears every override. */
function emptyLayer() {
  return {};
}

/** Contrast report for one palette, used by the tests and by the settings row preview. */
function auditPalette(palette) {
  const s = palette.light;
  const accent = usableAccent(s.brand, s.bg, 4.5);
  return {
    id: palette.id,
    name: palette.name,
    group: palette.group,
    identity: palette.identity || s.brand,
    accent,
    textOnBg: contrastRatio(s.text, s.bg),
    textOnSurface: contrastRatio(s.text, s.surface),
    secondaryOnBg: contrastRatio(maxBlendForContrast(s.text, s.surface, s.bg, 4.5), s.bg),
    tertiaryOnBg: contrastRatio(maxBlendForContrast(s.text, s.bg, s.bg, 4.5), s.bg),
    accentOnBg: contrastRatio(accent, s.bg),
    accentOnSurface: contrastRatio(accent, s.surface),
    whiteOnAccent: contrastRatio('#FFFFFF', accent),
  };
}

/* @bundle:strip-start */
export { CORE_TOKENS, DERIVED_TOKENS, LAYER_TOKEN_ORDER, schemeTokens, buildLayer, emptyLayer, auditPalette };
/* @bundle:strip-end */
