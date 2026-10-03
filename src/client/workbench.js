/**
 * Workbench: the plugin's own place in the main column (PRD FR-11).
 *
 * Why a panel and not only a settings row: a theme system has ~10 groups — colours, effects,
 * scope, schedule, workspaces, session marks, account, safety, diagnostics. The official
 * `settings.general.item` seat is documented for "a single setting that needs no page of its
 * own", so the panel moved to a `settings.section` page and, in parallel, became a
 * `sidebar.panellist` + `main` pair — the same pattern the shipped 插件广场 / 计划 pane use,
 * which is what puts a permanent, discoverable button in the main interface.
 *
 * The header carries at most three direct actions, deliberately: 随机一套 / 官方原色 /
 * 安全模式. Everything else lives in the panel below it.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

function createWorkbench(deps) {
  const h = deps.h;
  const store = deps.store;
  const runtime = deps.runtime;
  const paletteById = deps.paletteById;
  const Panel = createPanel(deps);

  return function Workbench(props) {
    const [state, setState] = React.useState(store.snapshot());
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
    const palette = state.paletteId ? paletteById(state.paletteId) : null;
    const refresh = () => setState(Object.assign({}, store.snapshot()));

    const quick = (label, onClick, key, active) =>
      h(
        'button',
        {
          key,
          type: 'button',
          'data-dsh-action': 'true',
          onClick,
          style: {
            appearance: 'none',
            font: 'inherit',
            fontSize: 12,
            padding: '3px 12px',
            borderRadius: 6,
            cursor: 'pointer',
          },
        },
        label,
      );

    return h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 10, padding: '18px 22px', maxWidth: 960 } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' } },
        h('div', { style: { fontSize: 18, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' } }, '多彩Harness'),
        h(
          'div',
          { style: { fontSize: 12, color: 'var(--dsw-alias-label-tertiary)' } },
          palette ? palette.name + ' · ' + (palette.note || palette.source || '') : '官方原色',
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' } },
        quick('随机一套', () => {
          if (runtime.randomize) runtime.randomize();
          refresh();
        }, 'wb-dice'),
        quick('官方原色', () => {
          store.selectPalette(null, runtime.currentWorkspaceId ? runtime.currentWorkspaceId() : null);
          refresh();
        }, 'wb-official'),
        quick(state.safeMode ? '安全模式 开' : '安全模式 关', () => {
          store.patch({ safeMode: !state.safeMode });
          refresh();
        }, 'wb-safe'),
      ),
      h(Panel, props),
    );
  };
}

/**
 * The sidebar icon: three stacked colour cards, painted with the ACTIVE theme's colours.
 *
 * This seat is ours to draw (`ownerProps` only hands `{ size, active }`), so the icon is a
 * colour illustration rather than a monochrome glyph — and because it reads the live palette,
 * the button itself changes when the theme does. `active` only modulates opacity: the host
 * keeps full control of the label and the hit area.
 */
function createWorkbenchIcon(deps) {
  const h = deps.h;
  const store = deps.store;
  const paletteById = deps.paletteById;

  return function WorkbenchIcon(props) {
    const [state, setState] = React.useState(store.snapshot());
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
    const size = (props && props.size) || 16;
    const active = Boolean(props && props.active);
    const palette = state.paletteId ? paletteById(state.paletteId) : null;
    const brand = palette ? palette.light.brand : '#8A8F98';
    const counter = palette && palette.noteAccent ? palette.noteAccent : '#B0781E';
    const third = palette ? palette.light.sunken : '#F2F3F5';
    const stroke = palette ? palette.light.border1 || palette.light.sunken : '#E6E8EB';

    return h(
      'span',
      {
        'data-dsh-workbench-icon': 'true',
        'aria-hidden': true,
        style: { display: 'inline-grid', placeItems: 'center', opacity: active ? 1 : 0.82 },
      },
      h(
        'svg',
        { viewBox: '0 0 24 24', width: size, height: size, focusable: 'false' },
        h('rect', {
          x: 3.5,
          y: 6.5,
          width: 12,
          height: 12,
          rx: 3,
          fill: third,
          stroke: stroke,
          strokeWidth: 1,
          transform: 'rotate(-9 9 12)',
        }),
        h('rect', {
          x: 6.5,
          y: 5,
          width: 12,
          height: 12,
          rx: 3,
          fill: counter,
          opacity: 0.92,
          transform: 'rotate(-2 12 11)',
        }),
        h('rect', { x: 9.5, y: 4, width: 12, height: 12, rx: 3, fill: brand }),
      ),
    );
  };
}

/* @bundle:strip-start */
export { createWorkbench, createWorkbenchIcon };
/* @bundle:strip-end */
