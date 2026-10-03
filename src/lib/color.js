/**
 * Color engine: sRGB relative luminance, WCAG contrast, and hue-preserving derivation.
 *
 * Every threshold decision in this plugin comes from here, so an accent is never a color
 * somebody eyeballed: it is the palette's identity hue pushed along the lightness axis
 * until it clears the ratio the interface actually needs.
 *
 * Bundling note: the `@bundle:strip` block exists only for Node-side tests; the bundler
 * removes it before inlining this file into the Client artifact (the browser gets plain
 * function declarations inside the module factory).
 */

/** Parse `#rgb` / `#rrggbb` into `[r, g, b]`; throws on anything else. */
function hexToRgb(hex) {
  if (typeof hex !== 'string') throw new TypeError('hexToRgb expects a string, got ' + typeof hex);
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new TypeError('not a hex color: ' + hex);
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(rgb) {
  return (
    '#' +
    rgb
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

/** `rgba(...)` string for a hex color at the given alpha (used by translucent finishes). */
function toRgba(hex, alpha) {
  const [r, g, b] = hexToRgb(hex);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

/** WCAG 2.x channel linearization. */
function _linearize(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(color) {
  const [r, g, b] = typeof color === 'string' ? hexToRgb(color) : color;
  return 0.2126 * _linearize(r) + 0.7152 * _linearize(g) + 0.0722 * _linearize(b);
}

/** WCAG contrast ratio, 1..21. Accepts hex strings or `[r,g,b]`. */
function contrastRatio(a, b) {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/** Linear blend in sRGB: ratio 0 → a, ratio 1 → b. */
function mixHex(a, b, ratio) {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  return rgbToHex(ra.map((v, i) => v + (rb[i] - v) * ratio));
}

function darken(hex, ratio) {
  return mixHex(hex, '#000000', ratio);
}

function lighten(hex, ratio) {
  return mixHex(hex, '#FFFFFF', ratio);
}

/**
 * Return the identity hue pushed toward black until it clears `target` against `backdrop`.
 * This is what makes a pale Pantone color usable as link or button fill without letting go
 * of its hue family. Never returns something worse than the input.
 */
function usableAccent(brand, backdrop, target) {
  const want = target === undefined ? 4.5 : target;
  if (contrastRatio(brand, backdrop) >= want) return brand;
  let best = brand;
  for (let step = 1; step <= 100; step += 1) {
    best = darken(brand, step / 100);
    if (contrastRatio(best, backdrop) >= want) return best;
  }
  return best;
}

/** The same push, but upward — for text sitting on a dark fill. */
function usableOn(brand, backdrop, target) {
  const want = target === undefined ? 4.5 : target;
  if (contrastRatio(brand, backdrop) >= want) return brand;
  let best = brand;
  for (let step = 1; step <= 100; step += 1) {
    best = lighten(brand, step / 100);
    if (contrastRatio(best, backdrop) >= want) return best;
  }
  return best;
}

function isHexColor(value) {
  return typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
}

/**
 * Walk from `from` toward `towards` and return the furthest point that still clears
 * `target` against `backdrop`. Used for secondary text: as light as accessibility allows,
 * never lighter.
 */
function maxBlendForContrast(from, towards, backdrop, target) {
  const want = target === undefined ? 4.5 : target;
  let best = from;
  for (let step = 0; step <= 100; step += 1) {
    const candidate = mixHex(from, towards, step / 100);
    if (contrastRatio(candidate, backdrop) < want) break;
    best = candidate;
  }
  return best;
}

/* @bundle:strip-start */
export {
  hexToRgb,
  rgbToHex,
  toRgba,
  relativeLuminance,
  contrastRatio,
  mixHex,
  darken,
  lighten,
  usableAccent,
  usableOn,
  isHexColor,
  maxBlendForContrast,
};
/* @bundle:strip-end */
