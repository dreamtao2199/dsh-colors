/**
 * MANIFEST.sha256 — one line per file: `<sha256>  <path>`.
 *
 * Deliberately pure (no comment lines), so verification is a two-line loop in PowerShell and
 * nothing has to be skipped. Metadata (version, generated at, environment) goes to MANIFEST.txt.
 *
 * Run: node tools/make-manifest.mjs
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', 'dist', '.git', '.DS_Store']);
const SELF = new Set(['MANIFEST.sha256', 'MANIFEST.txt']);

function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(relative(ROOT, full).replace(/\\/g, '/'));
  }
  return out;
}

const files = walk(ROOT, []).filter((f) => !SELF.has(f)).sort();
const lines = files.map(
  (f) => createHash('sha256').update(readFileSync(join(ROOT, f))).digest('hex') + '  ' + f,
);
writeFileSync(join(ROOT, 'MANIFEST.sha256'), lines.join('\n') + '\n', 'utf8');

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const meta = [
  'package : ' + pkg.name,
  'version : ' + pkg.version,
  'files   : ' + lines.length,
  'built   : ' + new Date().toISOString(),
  'node    : ' + process.version,
  'platform: ' + process.platform + ' ' + process.arch,
].join('\n');
writeFileSync(join(ROOT, 'MANIFEST.txt'), meta + '\n', 'utf8');

console.log('MANIFEST.sha256: ' + lines.length + ' files');
console.log(meta);