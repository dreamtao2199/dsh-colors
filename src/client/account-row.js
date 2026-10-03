/**
 * Account row (PRD FR-9): a custom nickname + avatar rendered in the sidebar's account
 * launcher seat (`settings.launcher`).
 *
 * Verified facts behind this file:
 *   * the seat is a `single` slot that takes no id/order — the shipped account menu registers as
 *     `{ name: 'settings.launcher', locale, inject }`;
 *   * the owner hands the occupant `{ wide, settingsOpen, openSettings, openOnboarding }`, so a
 *     replacement row keeps the "open Settings" behaviour without guessing a panel id;
 *   * replacing it SHADOWS the shipped account menu (which is where the quick sign-out lives),
 *     which is why this occupant is registered only while the user has it enabled — disabled
 *     means "not registered at all", so the shipped row returns untouched.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

function createAccountRow(deps) {
  const h = deps.h;
  const store = deps.store;
  const paletteById = deps.paletteById;

  return function AccountRow(props) {
    const [state, setState] = React.useState(store.snapshot());
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);

    const brand = state.brand || {};
    const wide = Boolean(props && props.wide);
    const open = props && typeof props.openSettings === 'function' ? props.openSettings : null;
    const label = brand.nickname && brand.nickname.length ? brand.nickname : '账号';

    // initial block tinted by the active palette, used when no avatar is stored
    const palette = state.paletteId ? paletteById(state.paletteId) : null;
    const tint = palette ? palette.light.brand : 'var(--dsw-alias-brand-primary)';

    const avatar = brand.avatar
      ? h('img', {
          src: brand.avatar,
          alt: '',
          style: { width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', display: 'block' },
        })
      : h(
          'span',
          {
            style: {
              width: 22,
              height: 22,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: tint,
              color: 'var(--dsw-alias-bg-layer-1)',
              fontSize: 11,
              fontWeight: 600,
            },
          },
          label.slice(0, 1).toUpperCase(),
        );

    return h(
      'button',
      {
        type: 'button',
        'data-dsh-account': 'true',
        title: label,
        onClick: open ? () => open() : undefined,
        style: {
          appearance: 'none',
          border: '1px solid transparent',
          background: 'transparent',
          color: 'var(--dsw-alias-label-primary)',
          font: 'inherit',
          fontSize: 12,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '2px 8px',
          borderRadius: 999,
          cursor: open ? 'pointer' : 'default',
          maxWidth: '100%',
          overflow: 'hidden',
        },
      },
      avatar,
      wide
        ? h(
            'span',
            { style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
            label,
          )
        : null,
    );
  };
}

/* @bundle:strip-start */
export { createAccountRow };
/* @bundle:strip-end */
