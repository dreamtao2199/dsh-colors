/**
 * Four-state agent status: pure data and classification, no React.
 *
 * The field names come from the shipped `SessionSnapshot` contract, which really does carry
 * `running` and `lastAgentError` — so "running" and "error" are read, not guessed. The
 * awaiting-approval signal is probed across the plausible field names and degrades to
 * "not shown" rather than to a wrong badge.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

const STATES = [
  {
    id: 'running',
    name: '运行中',
    indicator: '#2F7D6B',
    text: '#2F7D6B',
    animated: true,
    note: '转圈圈：旋转弧线，静态色块表达不了"进行中"',
  },
  {
    id: 'awaiting',
    name: '等待审批',
    indicator: '#B0781E',
    text: '#99681A',
    animated: false,
    note: '需要你介入，四态里最该被看见',
  },
  {
    id: 'error',
    name: '出错',
    indicator: '#B4432F',
    text: '#B4432F',
    animated: false,
    note: '失败或中断，收敛不刺眼',
  },
  {
    id: 'done',
    name: '已完成',
    indicator: '#6B7F8C',
    text: '#61747F',
    animated: false,
    note: '静息态，不抢注意力',
  },
];

const STATE_BY_ID = STATES.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});

const PRIORITY = ['error', 'awaiting', 'running', 'done'];

/** The awaiting-approval signal is not named consistently across builds; probe, don't guess. */
function awaitingSignal(snapshot) {
  if (!snapshot) return false;
  if (snapshot.pendingInteraction) return true;
  if (snapshot.awaitingApproval) return true;
  if (snapshot.awaitingApprovals && snapshot.awaitingApprovals.length) return true;
  if (snapshot.pendingSubmissions && snapshot.pendingSubmissions.length) return true;
  return false;
}

/**
 * Classify one session snapshot. Returns null when the row has nothing to say
 * (blank session, no activity) — an absent badge beats a wrong one.
 */
function classifySession(snapshot) {
  if (!snapshot) return null;
  if (snapshot.lastAgentError) return 'error';
  if (snapshot.running) return 'running';
  if (awaitingSignal(snapshot)) return 'awaiting';
  if (snapshot.blank) return null;
  if (snapshot.promptAttempted) return 'done';
  return null;
}

/** Worst state across sessions: error beats awaiting beats running beats done. */
function combineStates(ids) {
  const set = ids.filter(Boolean);
  if (!set.length) return null;
  for (const id of PRIORITY) {
    if (set.indexOf(id) >= 0) return id;
  }
  return null;
}

/** Tint for text vs indicator: the indicator may sit at 3:1, text must clear 4.5:1. */
function stateColors(id) {
  const state = STATE_BY_ID[id];
  return state ? { indicator: state.indicator, text: state.text, animated: state.animated } : null;
}

/* @bundle:strip-start */
export { STATES, STATE_BY_ID, PRIORITY, awaitingSignal, classifySession, combineStates, stateColors };
/* @bundle:strip-end */
