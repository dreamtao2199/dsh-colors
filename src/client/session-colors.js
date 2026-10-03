/**
 * Session colour marks (PRD FR-10).
 *
 * A mark is a per-CONVERSATION manual colour, so a long session list can be navigated by
 * recognition instead of by reading titles. Three design rules, all deliberate:
 *
 *   * the palette comes from the ACTIVE THEME (`markColors`), never from a private colour
 *     set — a mark has to look like part of the theme, not pasted on top of it;
 *   * nothing is automatic: unmarked rows stay perfectly plain, so the sidebar cannot turn
 *     into a colour wall (that is why the plugin does NOT colour rows by unread/running);
 *   * assignment goes through OFFICIAL seats only — the session menu and our own panel. The
 *     row decoration uses the official `sidebar.session.row.leading` seat plus a declarative
 *     stylesheet rule keyed on the host's `data-session-id`; there is no DOM mutation, so the
 *     worst case is a mark that does not show, never a broken tree.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

/**
 * Defensive session-id read: the row seat, the menu seat and our own panel hand different
 * props, and guessing an id from a wrong field would paint the wrong row.
 */
function sessionIdOf(props) {
  if (!props || typeof props !== 'object') return null;
  for (const name of ['sessionId', 'id', 'key']) {
    if (typeof props[name] === 'string' && props[name]) return props[name];
  }
  for (const name of ['session', 'item', 'entry', 'row', 'value']) {
    const candidate = props[name];
    if (!candidate || typeof candidate !== 'object') continue;
    if (typeof candidate.id === 'string' && candidate.id) return candidate.id;
    if (typeof candidate.sessionId === 'string' && candidate.sessionId) return candidate.sessionId;
  }
  return null;
}

/** The six mark colours for the palette currently chosen (neutral family when none is). */
function markOptions(paletteById, state) {
  const palette = state && state.paletteId ? paletteById(state.paletteId) : null;
  return markColors(palette);
}

/** One swatch button; shared by the menu seat and the panel. */
function swatchButton(h, color, active, onClick, key) {
  return h('button', {
    key,
    type: 'button',
    'data-dsh-swatch': 'true',
    'data-active': active ? 'true' : 'false',
    title: color,
    'aria-label': color,
    onClick,
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      background: color,
      border: '1px solid var(--dsw-alias-border-l2)',
      cursor: 'pointer',
      padding: 0,
    },
  });
}

/** Session row decoration: a 3px bar, only for marked sessions. */
function createSessionMark(deps) {
  const h = deps.h;
  const store = deps.store;
  return function SessionMark(props) {
    const [state, setState] = React.useState(store.snapshot());
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
    const id = sessionIdOf(props);
    const color = id && state.sessionColors ? state.sessionColors[id] : null;
    if (!color) return null;
    return h('span', {
      'data-dsh-session-mark': 'true',
      'aria-hidden': true,
      style: {
        display: 'inline-block',
        width: 3,
        height: 14,
        borderRadius: 2,
        background: color,
        verticalAlign: 'middle',
      },
    });
  };
}

/** Session "..." menu entry: pick a colour, or clear it. */
function createSessionMenu(deps) {
  const h = deps.h;
  const store = deps.store;
  const paletteById = deps.paletteById;
  return function SessionMenu(props) {
    const [state, setState] = React.useState(store.snapshot());
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
    const id = sessionIdOf(props);
    if (!id) return null;
    const current = state.sessionColors ? state.sessionColors[id] : null;
    const options = markOptions(paletteById, state);
    return h(
      'div',
      {
        'data-dsh-session-menu': 'true',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 8px',
          fontSize: 12,
          color: 'var(--dsw-alias-label-primary)',
        },
      },
      h('span', { style: { color: 'var(--dsw-alias-label-tertiary)' } }, '颜色标记'),
      options.map((color, index) =>
        swatchButton(h, color, current === color, () => store.setSessionColor(id, color), 'm' + index),
      ),
      h(
        'button',
        {
          type: 'button',
          'data-dsh-chip': 'true',
          'data-active': 'false',
          'aria-disabled': current ? 'false' : 'true',
          onClick: () => store.setSessionColor(id, null),
          style: { font: 'inherit', fontSize: 12, padding: '0 8px', borderRadius: 6, cursor: 'pointer' },
        },
        '清除',
      ),
    );
  };
}

/* @bundle:strip-start */
export { sessionIdOf, markOptions, swatchButton, createSessionMark, createSessionMenu };
/* @bundle:strip-end */
