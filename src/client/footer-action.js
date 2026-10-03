/**
 * Footer quick action (PRD FR-11): the permanent one-click entry for this plugin.
 *
 * Placement: `sidebar.footer.action` — the same band that already holds 插件广场
 * (`skillhub-plaza`, order 8). Registering at order 9 puts this button right beside it, which
 * is exactly the slot the user pointed at; the shipped cost meter / cordis panel live in the
 * same band at orders 0–2.
 *
 * The seat's ownerProps are only `{ wide }` (no navigation helper), so the button must be
 * self-contained: one click = 随机一套 (a new palette + effect). The tooltip names the palette
 * currently in force, so the button doubles as a readout, and `wide === false` (56px rail)
 * degrades to the icon alone.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

function createFooterAction(deps) {
  const h = deps.h;
  const store = deps.store;
  const runtime = deps.runtime;
  const paletteById = deps.paletteById;

  return function FooterAction(props) {
    const [state, setState] = React.useState(store.snapshot());
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
    const wide = !props || props.wide !== false;
    const palette = state.paletteId ? paletteById(state.paletteId) : null;
    const brand = palette ? palette.light.brand : '#8A8F98';
    const counter = palette && palette.noteAccent ? palette.noteAccent : '#B0781E';
    const third = palette ? palette.light.sunken : '#F2F3F5';
    const label = '多彩Harness';
    const title = '随机换一套配色与效果（当前 ' + (palette ? palette.name : '官方原色') + '）';

    return h(
      'button',
      {
        type: 'button',
        'data-dsh-chip': 'true',
        'data-active': 'false',
        'data-dsh-footer': 'true',
        title,
        'aria-label': title,
        onClick: () => {
          if (runtime.randomize) runtime.randomize();
        },
        style: {
          appearance: 'none',
          font: 'inherit',
          fontSize: 12,
          lineHeight: '18px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 8px',
          borderRadius: 8,
          cursor: 'pointer',
          maxWidth: '100%',
          overflow: 'hidden',
        },
      },
      h(
        'svg',
        { viewBox: '0 0 24 24', width: 14, height: 14, focusable: 'false', 'aria-hidden': true },
        h('rect', { x: 3.5, y: 6.5, width: 12, height: 12, rx: 3, fill: third, transform: 'rotate(-9 9 12)' }),
        h('rect', { x: 6.5, y: 5, width: 12, height: 12, rx: 3, fill: counter, opacity: 0.92, transform: 'rotate(-2 12 11)' }),
        h('rect', { x: 9.5, y: 4, width: 12, height: 12, rx: 3, fill: brand }),
      ),
      wide ? h('span', { style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, label) : null,
    );
  };
}

/* @bundle:strip-start */
export { createFooterAction };
/* @bundle:strip-end */