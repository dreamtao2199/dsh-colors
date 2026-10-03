/**
 * Frame-wide workspace colour bar.
 *
 * The user's ask was a visible bar in the MAIN interface marking which workspace is active —
 * not a colour per conversation, which would be noise. The sidebar has no per-workspace row
 * slot (and no stable data attribute to style against), so the bar lives in `shell.overlay`:
 * a frame-wide floating layer above every column, rendered as a hairline strip along the top
 * edge plus a small label. It follows the same signal as the workspace accent layer, so both
 * always agree.
 *
 * Non-interactive by construction (`pointer-events: none`), so it can never eat a click.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

function createWorkspaceBar(deps) {
  const h = deps.h;
  const store = deps.store;
  const runtime = deps.runtime;
  const paletteById = deps.paletteById;

  return function WorkspaceBar() {
    const state = React.useState(0)[0]; // re-render driver only; values come from runtime
    void state;
    const current = runtime.current;
    const config = store.snapshot();
    if (!config.workspace.enabled || !current || !current.workspaceId) return null;

    const boundId = config.workspace.map[current.workspaceId];
    const bound = boundId ? paletteById(boundId) : null;
    const color = bound ? bound.light.brand : 'var(--dsw-alias-border-l2)';
    const label = current.label || current.workspaceId;

    return h(
      'div',
      {
        'aria-hidden': true,
        style: {
          position: 'relative',
          width: '100%',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
      h('div', { style: { height: 3, width: '100%', background: color, opacity: bound ? 1 : 0.35 } }),
      h(
        'div',
        {
          style: {
            marginLeft: 10,
            marginTop: 4,
            fontSize: 10,
            lineHeight: '14px',
            padding: '0 8px',
            borderRadius: '0 0 6px 6px',
            color: 'var(--dsw-alias-label-secondary)',
            background: 'var(--dsw-alias-bg-layer-2)',
            border: '1px solid var(--dsw-alias-border-l1)',
            borderTop: 'none',
          },
        },
        label + (bound ? ' · ' + bound.name : ' · 跟随全局'),
      ),
    );
  };
}

/* @bundle:strip-start */
export { createWorkspaceBar };
/* @bundle:strip-end */
