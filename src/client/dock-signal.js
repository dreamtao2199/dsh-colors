/**
 * Session-aware signal + status chip, mounted under the composer.
 *
 * Why this slot: `conversation.composer.dock` is the one stable seat that receives
 * `sessionId` directly AND gets `useSession` (the per-session runtime snapshot carrying
 * `running` / `lastAgentError`) plus `useSessions` / `useWorkspaces`. That makes it both the
 * precise "which conversation am I looking at" signal that workspace-bound accents need, and
 * the honest place to show the four-state indicator as a rotating arc.
 *
 * Note: `sidebar.session.row.leading` was the wrong seat for this — its catalog states it
 * mounts only for rows whose primary state is idle, so a live indicator there would vanish
 * exactly when it matters.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

/* @bundle:strip-start */
import { classifySession, stateColors } from '../lib/status.js';
/* @bundle:strip-end */

const identityHook = (selector) => selector(null);

function sessionView(sessionsSnapshot, sessionId) {
  if (!sessionsSnapshot || !sessionId) return null;
  if (sessionsSnapshot.byId && sessionsSnapshot.byId[sessionId]) return sessionsSnapshot.byId[sessionId];
  if (sessionsSnapshot[sessionId]) return sessionsSnapshot[sessionId];
  return null;
}

/**
 * Workspace for a session. The sessions store exposes the session's own view; the field may
 * be `workspaceId` or only `cwd` — probe both, and never invent one.
 */
function workspaceOf(view) {
  if (!view) return null;
  if (typeof view.workspaceId === 'string') return view.workspaceId;
  if (view.workspace && typeof view.workspace.id === 'string') return view.workspace.id;
  if (typeof view.cwd === 'string') return 'cwd:' + view.cwd;
  return null;
}

/** Optional label for a detected workspace, for the settings mapping table. */
function workspaceLabel(workspacesSnapshot, workspaceId) {
  if (!workspacesSnapshot || !workspaceId) return null;
  const items = workspacesSnapshot.items || [];
  const hit = items.find((item) => item && item.id === workspaceId);
  if (hit) return hit.title || hit.name || workspaceId;
  if (workspaceId.indexOf('cwd:') === 0) {
    const parts = workspaceId.slice(4).split(/[\\/]/).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : workspaceId;
  }
  return workspaceId;
}

function createDockSignal(deps) {
  const store = deps.store;
  const report = deps.report;
  const h = deps.h;

  function Arc(props) {
    const size = props.size || 14;
    const stroke = 2;
    const r = (size - stroke) / 2;
    const c = size / 2;
    return h(
      'svg',
      {
        width: size,
        height: size,
        viewBox: '0 0 ' + size + ' ' + size,
        'aria-hidden': true,
        style: props.animated
          ? { animation: 'dsh-theme-spin 1s linear infinite', display: 'block' }
          : { display: 'block' },
      },
      h('circle', { cx: c, cy: c, r, fill: 'none', stroke: props.track, strokeWidth: stroke }),
      h('circle', {
        cx: c,
        cy: c,
        r,
        fill: 'none',
        stroke: props.color,
        strokeWidth: stroke,
        strokeLinecap: 'round',
        strokeDasharray: String(2 * Math.PI * r),
        strokeDashoffset: String(2 * Math.PI * r * 0.35),
      }),
    );
  }

  function Dot(props) {
    return h('span', {
      style: {
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: props.color,
      },
    });
  }

  return function DockSignal(props) {
    // Always call through a stable function so the hook order cannot depend on props.
    const useSession = props && props.useSession ? props.useSession : identityHook;
    const useSessions = props && props.useSessions ? props.useSessions : identityHook;
    const useWorkspaces = props && props.useWorkspaces ? props.useWorkspaces : identityHook;

    const sessionSnap = useSession((s) => s);
    const sessionsSnap = useSessions((s) => s);
    const workspacesSnap = useWorkspaces((s) => s);

    const sessionId = props && props.sessionId ? props.sessionId : null;
    const state = classifySession(sessionSnap);
    const view = sessionView(sessionsSnap, sessionId);
    const workspaceId = workspaceOf(view);
    const label = workspaceLabel(workspacesSnap, workspaceId);
    const current = store.snapshot();

    const announce = React.useEffect;
    announce(() => {
      report({ sessionId, workspaceId, label, state });
    }, [sessionId, workspaceId, label, state]);

    const colors = stateColors(state);
    // PRD FR-7: the chip is opt-in. The seat still mounts because it carries the workspace
    // signal that drives the workspace palette layer.
    if (!current.status.chip) return null;
    const showState = Boolean(current.status.enabled && colors);
    const workspacePalette = workspaceId ? current.workspace.map[workspaceId] : null;
    const showWorkspace =
      Boolean(current.workspace.enabled && workspaceId && workspacePalette && current.status.enabled);

    if (!showState && !showWorkspace) return null;

    const chip = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11,
      lineHeight: '18px',
      padding: '1px 8px',
      borderRadius: 999,
      border: '1px solid var(--dsw-alias-border-l1)',
      background: 'var(--dsw-alias-bg-layer-2)',
      color: 'var(--dsw-alias-label-secondary)',
    };

    return h(
      'div',
      { style: { display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '2px 0' } },
      showWorkspace
        ? h(
            'span',
            { style: chip, title: '工作区配色绑定' },
            h(Dot, { color: workspacePalette ? paletteAccent(workspacePalette, deps.paletteById) : colors.text }),
            (label || '工作区') + ' · 已绑定配色',
          )
        : null,
      showState
        ? h(
            'span',
            { style: chip, title: colorsStateTitle(state) },
            colors.animated
              ? h(Arc, { color: colors.indicator, animated: true, track: 'var(--dsw-alias-border-l1)' })
              : h(Dot, { color: colors.indicator }),
            h('span', { style: { color: 'var(--dsw-alias-label-primary)' } }, stateName(state)),
          )
        : null,
    );
  };
}

function paletteAccent(paletteId, paletteById) {
  const palette = paletteById ? paletteById(paletteId) : null;
  return palette ? palette.light.brand : 'var(--dsw-alias-brand-primary)';
}

function stateName(state) {
  const names = { running: '运行中', awaiting: '等待审批', error: '出错', done: '已完成' };
  return names[state] || state;
}

function colorsStateTitle(state) {
  return 'Agent 状态：' + stateName(state);
}

/* @bundle:strip-start */
export { createDockSignal, sessionView, workspaceOf, workspaceLabel };
/* @bundle:strip-end */
