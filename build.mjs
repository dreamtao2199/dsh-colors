/**
 * Minimal bundler for this plugin.
 *
 * The browser half has no module system: `window.__ModuleLoader__.load({ factory })` evaluates
 * one file. So the sources are authored as plain declarations (testable through the guarded
 * export blocks) and concatenated into the factory body here. `@bundle:strip` blocks — the
 * test-only imports and exports — are removed on the way in.
 *
 * Run: node build.mjs
 */
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

const SOURCES = [
  'src/lib/color.js',
  'src/lib/breaker.js',
  // data first: finishes.js reads TEXTURE_TILES at module scope
  'src/data/textures.js',
  'src/lib/palette-layer.js',
  'src/lib/accents.js',
  'src/lib/finishes.js',
  'src/lib/schedule.js',
  'src/lib/status.js',
  'src/styles/markdown-note.js',
  'src/client/state.js',
  'src/client/session-colors.js',
  'src/client/avatar-editor.js',
  'src/client/dock-signal.js',
  'src/client/workspace-bar.js',
  'src/client/account-row.js',
  'src/client/panel.js',
  'src/client/workbench.js',
  'src/client/index.js',
];

const strip = (code) =>
  code.replace(/\/\* @bundle:strip-start \*\/[\s\S]*?\/\* @bundle:strip-end \*\//g, '/* stripped for bundle */');

const pkg = JSON.parse(read('package.json'));
const data = JSON.parse(read('src/data/palettes.json'));

const body = SOURCES.map((rel) => '    /* ---- ' + rel + ' ---- */\n' + strip(read(rel)).trim())
  .join('\n\n')
  .split('\n')
  .map((line) => (line.length ? '  ' + line : line))
  .join('\n');

const banner = [
  '/**',
  ' * GENERATED FILE — do not edit by hand.',
  ' * Source of truth: src/ ; rebuild with `node build.mjs`.',
  ' * ' + pkg.name + ' v' + pkg.version,
  ' */',
].join('\n');

const out =
  banner +
  '\n' +
  "window.__ModuleLoader__.load({\n" +
  "  id: '" + pkg.name + "',\n" +
  '  factory(require) {\n' +
  "    const React = require('react');\n" +
  '    const h = React.createElement;\n' +
  '    const PALETTES = ' + JSON.stringify(data.palettes) + ';\n' +
  '\n' +
  body +
  '\n\n' +
  '    return createPlugin({ h, palettes: PALETTES, finishes: FINISHES });\n' +
  '  },\n' +
  '});\n';

const target = join(ROOT, 'client.js');
writeFileSync(target, out, 'utf8');
const size = statSync(target).size;
console.log('built ' + target);
console.log('  version : ' + pkg.version);
console.log('  sources : ' + SOURCES.length + ' files');
console.log('  palettes: ' + data.palettes.length);
console.log('  bytes   : ' + size);
