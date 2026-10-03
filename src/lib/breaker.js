/**
 * Repaint circuit breaker.
 *
 * Why this exists: the theme service's `overrideTokens` emits the documented `theme/change`
 * event. A plugin that listens to `theme/change` and repaints inside that listener therefore
 * feeds itself — paint → overrideTokens → theme/change → paint — and the renderer runs out of
 * memory (the crash log said exactly that: `Desktop renderer exited: oom`, with no JS error).
 *
 * Three guards, cheapest first:
 *   1. re-entrancy: a repaint already in progress rejects a nested one;
 *   2. rate window: more than `limit` repaints inside `windowMs` trips the breaker;
 *   3. once tripped it stays tripped until something explicit resets it, so a feedback loop
 *      can never run again in that session.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

const BREAKER_DEFAULTS = { limit: 24, windowMs: 2000 };

function createBreaker(options) {
  const opts = options || {};
  const limit = typeof opts.limit === 'number' ? opts.limit : BREAKER_DEFAULTS.limit;
  const windowMs = typeof opts.windowMs === 'number' ? opts.windowMs : BREAKER_DEFAULTS.windowMs;

  let count = 0;
  let windowStart = 0;
  let tripped = false;
  let running = false;

  return {
    /** `'ok'` to proceed; `'reentrant'`, `'tripped'` to skip. */
    enter(now) {
      if (tripped) return 'tripped';
      if (running) return 'reentrant';
      const t = typeof now === 'number' ? now : Date.now();
      if (windowStart === 0 || t - windowStart > windowMs) {
        windowStart = t;
        count = 0;
      }
      count += 1;
      if (count > limit) {
        tripped = true;
        return 'tripped';
      }
      running = true;
      return 'ok';
    },

    exit() {
      running = false;
    },

    reset() {
      tripped = false;
      running = false;
      count = 0;
      windowStart = 0;
    },

    state() {
      return { tripped, running, count, limit, windowMs };
    },
  };
}

/* @bundle:strip-start */
export { createBreaker, BREAKER_DEFAULTS };
/* @bundle:strip-end */
