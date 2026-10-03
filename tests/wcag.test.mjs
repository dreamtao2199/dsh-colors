/**
 * Accessibility self-check for the palette library.
 *
 * This is the gate that replaces "looks fine to me": every palette must clear its WCAG
 * thresholds, and the generated theme layer must be light-only (dark slot === light slot)
 * with valid CSS values for every token.
 *
 * Run: node tests/wcag.test.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { contrastRatio, isHexColor } from '../src/lib/color.js';
import { buildLayer, auditPalette, CORE_TOKENS, LAYER_TOKEN_ORDER } from '../src/lib/palette-layer.js';
import { markColors, MARK_NEUTRAL } from '../src/lib/accents.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(HERE, '..', 'src', 'data', 'palettes.json'), 'utf8'));
const palettes = data.palettes;

const failures = [];
const check = (ok, label) => {
  if (!ok) failures.push(label);
  console.log((ok ? 'PASS  ' : 'FAIL  ') + label);
};

const isCssColor = (v) => isHexColor(v) || /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/.test(v);

// ---------------------------------------------------------------- library shape

check(palettes.length === 22, 'library holds 22 palettes (got ' + palettes.length + ')');
check(new Set(palettes.map((p) => p.id)).size === palettes.length, 'palette ids are unique');
check(
  palettes.every((p) => ['A', 'B', 'C'].includes(p.group)),
  'every palette belongs to exactly one of the three systems (A/B/C)',
);
check(
  palettes.every((p) => !p.dark),
  'no palette ships a dark variant (dark mode removed by decision)',
);

const counts = palettes.reduce((acc, p) => ({ ...acc, [p.group]: (acc[p.group] || 0) + 1 }), {});
check(counts.A === 4 && counts.B === 14 && counts.C === 4, 'group split is A4 / B14 / C4 (' + JSON.stringify(counts) + ')');

// ------------------------------------------------------------- contrast audit

const thresholds = [
  ['textOnBg', 7, 'primary text on base background'],
  ['textOnSurface', 7, 'primary text on raised surface'],
  ['secondaryOnBg', 4.5, 'secondary text on base background'],
  ['tertiaryOnBg', 4.5, 'tertiary text on base background'],
  ['accentOnBg', 4.5, 'accent on base background'],
  ['accentOnSurface', 4.5, 'accent on raised surface'],
  ['whiteOnAccent', 4.5, 'white text on a filled accent button'],
];

const pad = (v, n) => String(v).padEnd(n);
const num = (v, n) => v.toFixed(2).padEnd(n);

console.log(
  '\n' +
    pad('id', 15) + pad('name', 10) + pad('grp', 5) + pad('accent', 9) +
    pad('txt/bg', 8) + pad('txt/sf', 8) + pad('2nd/bg', 8) + pad('3rd/bg', 8) +
    pad('acc/bg', 8) + 'wht/acc',
);

for (const palette of palettes) {
  const a = auditPalette(palette);
  console.log(
    pad(a.id, 15) + pad(a.name, 10) + pad(a.group, 5) + pad(a.accent, 9) +
    num(a.textOnBg, 8) + num(a.textOnSurface, 8) + num(a.secondaryOnBg, 8) +
    num(a.tertiaryOnBg, 8) + num(a.accentOnBg, 8) + a.whiteOnAccent.toFixed(2),
  );
  for (const [field, min, what] of thresholds) {
    check(a[field] >= min, a.name + ': ' + what + ' ' + a[field].toFixed(2) + ' >= ' + min);
  }
}

// ------------------------------------------------------------------ layer shape

for (const palette of palettes) {
  const layer = buildLayer(palette);
  for (const key of CORE_TOKENS) {
    check(Boolean(layer[key]), palette.name + ': core token present ' + key);
  }
  check(
    Object.keys(layer).length === LAYER_TOKEN_ORDER.length,
    palette.name + ': layer carries all ' + LAYER_TOKEN_ORDER.length + ' tokens',
  );
  check(
    Object.keys(layer).every((k) => layer[k].light === layer[k].dark),
    palette.name + ': dark slot mirrors light (no dark mode)',
  );
  check(
    Object.keys(layer).every((k) => isCssColor(layer[k].light)),
    palette.name + ': every value is a valid CSS color',
  );
}

// ------------------------------------------------- session marks derived from the palette

for (const palette of palettes) {
  const marks = markColors(palette);
  const allDistinct = new Set(marks.map((m) => m.toUpperCase())).size === marks.length;
  const allVisible = marks.every((m) => contrastRatio(m, palette.light.bg) >= 3);
  check(marks.length === 6 && allDistinct, palette.name + ': six session marks, all tellable apart');
  check(
    allVisible,
    palette.name + ': every session mark clears 3:1 on the palette background (non-text contrast)',
  );
}
const neutralMarks = markColors(null);
check(
  neutralMarks.length === 6 && neutralMarks.join(',') === MARK_NEUTRAL.join(',') &&
    new Set(neutralMarks).size === 6,
  'with no palette active the marks fall back to the documented neutral family',
);

// ------------------------------------------------------------------ edge layers

check(Object.keys(buildLayer(palettes[0])).length > 0, 'a normal palette yields a non-empty layer');
check(
  LAYER_TOKEN_ORDER.filter((k) => CORE_TOKENS.includes(k)).length === CORE_TOKENS.length,
  'every core token is part of the emitted layer order',
);

console.log('\n' + (failures.length ? 'FAILURES: ' + failures.length : 'ALL CHECKS PASSED'));
if (failures.length) {
  console.log(failures.slice(0, 12).join('\n'));
  process.exit(1);
}
