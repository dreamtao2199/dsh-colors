/**
 * Packaging: build → tests → manifest → archives.
 *
 * Produces two artifacts from ONE staged tree:
 *   dist/dsh-colors-<ver>.tgz   npm-shaped (top directory `package/`) — installable
 *   dist/dsh-colors-<ver>.zip   top directory `dsh-colors-<ver>/` — the archival copy
 *
 * No npm/npx dependency: the tarball is written by tar(1) via `tar -czf`, and the zip by the
 * same bsdtar with `-a` (auto format by extension). Child processes run with stdio: 'inherit'
 * because piped stdio is unavailable in confined environments.
 *
 * Run: node tools/package.mjs
 */
import { readFileSync, mkdirSync, rmSync, copyFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(REPO, 'package.json'), 'utf8'));
const NAME = pkg.name;
const VER = pkg.version;
const DIST = join(REPO, 'dist');
const STAGE = join(DIST, 'stage');

function run(cmd, args) {
  const res = spawnSync(cmd, args, { cwd: REPO, stdio: 'inherit', shell: false });
  if (res.error) throw res.error;
  if (res.status !== 0) throw new Error(cmd + ' exited ' + res.status);
}

function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(relative(REPO, full).replace(/\\/g, '/'));
  }
  return out;
}

console.log('== build ==');
run(process.execPath, ['build.mjs']);
console.log('== tests ==');
for (const t of ['breaker.test.mjs', 'state.test.mjs', 'wcag.test.mjs', 'bundle-smoke.mjs']) {
  run(process.execPath, [join('tests', t)]);
}
console.log('== manifest ==');
run(process.execPath, [join('tools', 'make-manifest.mjs')]);

const SINGLES = [
  'index.js', 'client.js', 'build.mjs', 'cordis.patch.yml', 'icon.svg', 'package.json',
  'README.md', 'CHANGELOG.md', 'LICENSE', 'THIRD-PARTY.md', 'MANIFEST.sha256', 'MANIFEST.txt',
];
const TREE = ['src', 'tests', 'docs', 'tools', 'locale'];
const include = SINGLES.filter((f) => existsSync(join(REPO, f)));
for (const dir of TREE) {
  if (existsSync(join(REPO, dir))) include.push(...walk(join(REPO, dir), []));
}

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });

for (const scope of ['package', NAME + '-' + VER]) {
  for (const rel of include) {
    const target = join(STAGE, scope, rel);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(REPO, rel), target);
  }
}

const tgz = join(DIST, NAME + '-' + VER + '.tgz');
const zip = join(DIST, NAME + '-' + VER + '.zip');
run('tar', ['-czf', tgz, '-C', STAGE, 'package']);
run('tar', ['-a', '-c', '-f', zip, '-C', STAGE, NAME + '-' + VER]);

console.log('\nartifacts:');
for (const file of [tgz, zip]) {
  const size = statSync(file).size;
  console.log('  ' + relative(REPO, file) + '  ' + (size / 1024).toFixed(1) + ' KB');
}
console.log('  files per archive: ' + include.length);