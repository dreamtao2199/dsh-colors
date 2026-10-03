/**
 * Unit test for the repaint circuit breaker.
 * Run: node tests/breaker.test.mjs
 */
import { createBreaker, BREAKER_DEFAULTS } from '../src/lib/breaker.js';

const failures = [];
const check = (ok, label) => {
  console.log((ok ? 'PASS  ' : 'FAIL  ') + label);
  if (!ok) failures.push(label);
};

// ------------------------------------------------------------------ normal operation

const b = createBreaker({ limit: 5, windowMs: 1000 });
let ok = 0;
for (let i = 0; i < 5; i += 1) {
  if (b.enter(1000) === 'ok') ok += 1;
  b.exit();
}
check(ok === 5, 'five repaints inside the window are all allowed');
check(b.state().tripped === false, 'the breaker is not tripped at exactly the limit');

// --------------------------------------------------------------------- re-entrancy

const r = createBreaker({ limit: 5, windowMs: 1000 });
check(r.enter(1000) === 'ok', 'first entry is allowed');
check(r.enter(1000) === 'reentrant', 'a nested repaint is refused while one is running');
r.exit();
check(r.enter(1000) === 'ok', 'after exit, a new repaint is allowed again');

// ------------------------------------------------------------------- trip + stickiness

const t = createBreaker({ limit: 3, windowMs: 1000 });
for (let i = 0; i < 3; i += 1) {
  t.enter(1000);
  t.exit();
}
check(t.enter(1000) === 'tripped', 'the 4th repaint inside the window trips the breaker');
check(t.state().tripped === true, 'the tripped state is recorded');
check(t.enter(999999) === 'tripped', 'a tripped breaker stays tripped even long after the window');

// ----------------------------------------------------------------------------- reset

t.reset();
check(t.state().tripped === false && t.state().count === 0, 'reset clears the tripped state');
check(t.enter(999999) === 'ok', 'after reset the breaker allows repaints again');

// ---------------------------------------------------------------- window rolls over

const w = createBreaker({ limit: 2, windowMs: 1000 });
w.enter(1000); w.exit();
w.enter(1100); w.exit();
check(w.enter(1500) === 'tripped', 'the third repaint inside the window trips it');
const w2 = createBreaker({ limit: 2, windowMs: 1000 });
w2.enter(1000); w2.exit();
w2.enter(1100); w2.exit();
check(w2.enter(2500) === 'ok', 'a repaint after the window rolls over starts a fresh count');

// -------------------------------------------------------------------------- defaults

check(
  BREAKER_DEFAULTS.limit > 0 && BREAKER_DEFAULTS.windowMs > 0,
  'documented defaults exist (' + BREAKER_DEFAULTS.limit + ' paints / ' + BREAKER_DEFAULTS.windowMs + 'ms)',
);

console.log('\n' + (failures.length ? 'FAILURES: ' + failures.length : 'ALL CHECKS PASSED'));
process.exit(failures.length ? 1 : 0);
