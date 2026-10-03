/**
 * The control panel: one component, rendered in the settings page AND in the workbench.
 *
 * Copy rules (PRD §5): product interface language, labels ≤6 characters, hints ≤40 characters,
 * no first person, no conversational explanation.
 * Control rules (PRD §5):
 *   * inactive chips carry no border and no outline — they are styled from the plugin
 *     stylesheet via `data-dsh-chip`, which is what removes the click-residue outline;
 *   * an ACTION (`data-dsh-action`) never looks like a switch: a switch that never lights up
 *     reads as "that click did nothing", which is exactly what the action-shaped chips did;
 *   * destructive actions ask twice, without timers (the confirm state is component state).
 *
 * This component calls NO host hooks: `settings.section` and a settings row hand different
 * prop sets, and a hook that appears in one context but not the other changes the hook count
 * between renders — React then throws and the whole page renders blank. The session-mark list
 * therefore lives in the session's own "..." menu, not here.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

function createPanel(deps) {
  const h = deps.h;
  const store = deps.store;
  const runtime = deps.runtime;
  const fault = deps.fault;
  const palettes = deps.palettes;
  const paletteById = deps.paletteById;
  const finishes = deps.finishes;
  const tiers = deps.tiers;
  const intervals = deps.intervals;
  const audit = deps.audit;
  const avatarLimit = deps.avatarLimit || 1024 * 1024;
  const avatarWarn = deps.avatarWarn || 700 * 1024;

  /**
   * One single-select list over ALL surface effects (PRD FR-2). Textures and materials are
   * both "surface effects": they compose with any palette and never replace one, so splitting
   * them into two mutually exclusive groups only taught the user that picking one cancelled
   * the other.
   */
  const surfaceFinishes = finishes;
  const AvatarEditor = createAvatarEditor({
    h,
    store,
    edge: deps.avatarEdge || 256,
    limit: avatarLimit,
  });
  const avatarLimitLabel = Math.max(1, Math.round(avatarLimit / 1048576)) + 'MB';
  const comboCount = palettes.length * finishes.length;

  const CHIP = { appearance: 'none', font: 'inherit', fontSize: 12, lineHeight: '20px', padding: '2px 10px', borderRadius: 999 };
  const ACTION = { appearance: 'none', font: 'inherit', fontSize: 12, lineHeight: '20px', padding: '2px 10px', borderRadius: 6 };
  const TITLE = { fontSize: 13, color: 'var(--dsw-alias-label-primary)', fontWeight: 600 };
  const HINT = { fontSize: 11, color: 'var(--dsw-alias-label-tertiary)' };
  const FIELD = {
    font: 'inherit',
    fontSize: 12,
    color: 'var(--dsw-alias-label-primary)',
    background: 'var(--dsw-alias-bg-layer-1)',
    border: '1px solid var(--dsw-alias-border-l1)',
    borderRadius: 6,
    padding: '1px 6px',
  };
  const ERR = { fontSize: 11, color: 'var(--dsw-alias-state-error-primary)', padding: '2px 0' };
  const ROW = { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' };

  /** One selectable chip. Active state is expressed by CSS, not by inline borders. */
  const chip = (label, active, onClick, key) =>
    h(
      'button',
      {
        key,
        type: 'button',
        'data-dsh-chip': 'true',
        'data-active': active ? 'true' : 'false',
        'aria-pressed': Boolean(active),
        onClick,
        style: CHIP,
      },
      label,
    );

  /** One action button. Different shape on purpose: actions are not switches. */
  const action = (label, onClick, key, tone, disabled) =>
    h(
      'button',
      {
        key,
        type: 'button',
        'data-dsh-action': 'true',
        'data-tone': tone || 'normal',
        'aria-disabled': disabled ? 'true' : 'false',
        onClick: disabled ? undefined : onClick,
        style: ACTION,
      },
      label,
    );

  const group = (title, hint, children) =>
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 6, padding: '6px 0' } },
      h('div', { style: TITLE }, title),
      hint ? h('div', { style: HINT }, hint) : null,
      h(ROW, null, children),
    );

  function Panel(props) {
    const [state, setState] = React.useState(store.snapshot());
    const [confirmReset, setConfirmReset] = React.useState(false);
    const [avatarOpen, setAvatarOpen] = React.useState(false);
    const [nickDraft, setNickDraft] = React.useState(null);
    React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);

    const refresh = () => setState(Object.assign({}, store.snapshot()));

    // The readout must describe the palette that is ACTUALLY applied, not the stored choice:
    // with automation on they differ, and a lying readout is how "clicking does nothing" looks.
    const effectiveId = runtime.diag.lastPaletteId || state.paletteId;
    const activePalette = effectiveId ? paletteById(effectiveId) : null;
    const report = activePalette ? audit(activePalette) : null;
    const detected = Array.from(runtime.workspaces.values());
    const currentWorkspaceId = runtime.currentWorkspaceId ? runtime.currentWorkspaceId() : null;
    const manual = state.manual || {};
    const manualName =
      manual.paletteId && paletteById(manual.paletteId) ? paletteById(manual.paletteId).name : null;
    const marks = state.sessionColors || {};

    // Expected vs actually applied. "Expected" is the exact value this plugin last WROTE for
    // the token (`runtime.diag.expectAccent`), never a value derived some other way: the old
    // readout compared the palette's accent-on-backdrop against the painted accent-on-surface
    // and showed a permanent, meaningless ✗.
    let readback = '—';
    try {
      if (typeof window !== 'undefined' && window.getComputedStyle && document.documentElement) {
        const value = String(
          window.getComputedStyle(document.documentElement).getPropertyValue('--dsw-alias-state-business-primary') || '',
        ).trim();
        readback = value ? value.toUpperCase() : '空';
      }
    } catch (err) {
      readback = '读取失败';
    }
    const expected = runtime.diag.expectAccent ? String(runtime.diag.expectAccent).toUpperCase() : null;
    const readbackOk = Boolean(expected) && readback === expected;
    const effective = runtime.diag.lastSource || '—';
    const finishName = runtime.diag.finish
      ? (finishes.find((f) => f.id === runtime.diag.finish) || {}).name || runtime.diag.finish
      : '无';

    return h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 2, padding: '2px 0' } },

      h(
        'div',
        { style: { display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', paddingBottom: 4 } },
        h('div', { style: { fontSize: 16, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' } }, '多彩Harness'),
        h(
          'div',
          { style: HINT },
          (activePalette ? activePalette.name + ' · ' + (activePalette.note || activePalette.source || '') : '官方原色') +
            ' · 效果 ' + finishName,
        ),
      ),
      group('配色库', '22 套：Pantone 年度色 4 · 中国传统色 14 · 莫兰迪高级灰 4（仅浅色）', [
        chip('官方原色', !state.paletteId, () => store.selectPalette(null, currentWorkspaceId), 'official'),
      ].concat(
        palettes.map((p) =>
          chip(p.name, state.paletteId === p.id, () => store.selectPalette(p.id, currentWorkspaceId), p.id),
        ),
      )),

      h(
        'div',
        { style: HINT },
        activePalette
          ? '当前 ' + activePalette.name + ' · ' + activePalette.source + ' · 强调 ' + report.accent +
            ' · 正文/底 ' + report.textOnBg.toFixed(2) + ' · 强调/底 ' + report.accentOnBg.toFixed(2)
          : '当前 官方原色（无覆盖）',
      ),

      h(ROW, null, [
        action('随机一套', () => {
          if (runtime.randomize) runtime.randomize();
          refresh();
        }, 'dice'),
        chip(state.locks.palette ? '锁配色 开' : '锁配色 关', state.locks.palette, () => {
          store.toggleLock('palette');
          refresh();
        }, 'lock-p'),
        chip(state.locks.finish ? '锁效果 开' : '锁效果 关', state.locks.finish, () => {
          store.toggleLock('finish');
          refresh();
        }, 'lock-f'),
        h('span', { style: HINT }, '共 ' + comboCount + ' 种「配色 × 效果」组合'),
      ]),

      group('表面效果', '单选；与配色叠加，不覆盖', [
        chip('无', state.finishes.length === 0, () => store.patch({ finishes: [] }), 'plain'),
      ].concat(
        surfaceFinishes.map((f) =>
          chip(
            f.name,
            state.finishes[0] === f.id,
            // clicking the active effect clears it — "undo" must not require finding 无
            () => store.patch({ finishes: state.finishes[0] === f.id ? [] : [f.id] }),
            f.id,
          ),
        ),
      )),

      group('作用范围', '控制配色重绘的元素范围', tiers.map((t) =>
        chip(t.name, state.tier === t.id, () => store.patch({ tier: t.id }), t.id))),

      h(
        'div',
        { style: ROW },
        chip(state.status.gradientText ? '正文渐变 开' : '正文渐变 关', state.status.gradientText, () =>
          store.patch({ status: Object.assign({}, state.status, { gradientText: !state.status.gradientText }) }), 'grad'),
        h('span', { style: HINT }, '默认关；开启后标题与加粗走主题渐变'),
      ),

      group('自动切换', '定时轮换与十二时辰互斥；手动选择优先到下一时段', [
        chip('关闭', state.interval === 'off' && !state.rhythm.enabled, () =>
          store.setAutomation({ interval: 'off', rhythm: Object.assign({}, state.rhythm, { enabled: false }) }), 'off'),
      ].concat(
        intervals
          .filter((i) => i.id !== 'off')
          .map((i) =>
            chip(i.name, state.interval === i.id, () =>
              store.setAutomation({ interval: i.id, rhythm: Object.assign({}, state.rhythm, { enabled: false }) }), i.id),
          ),
      ).concat([
        chip('十二时辰', state.rhythm.enabled, () =>
          store.setAutomation({ interval: 'off', rhythm: Object.assign({}, state.rhythm, { enabled: !state.rhythm.enabled }) }), 'rhythm'),
        action('随机排程', () => {
          if (runtime.randomizeRhythm) runtime.randomizeRhythm();
          refresh();
        }, 'rhythm-dice'),
      ])),

      manualName
        ? h('div', { style: HINT }, '手动优先：' + manualName + '（到下一个时段边界交还排程）')
        : null,

      state.rhythm.enabled
        ? h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 2 } },
            state.rhythm.segments.map((segment) =>
              h(
                'div',
                { key: segment.id, style: { display: 'flex', gap: 8, alignItems: 'center' } },
                h('span', { style: Object.assign({}, HINT, { width: 34 }) }, segment.name),
                h('input', {
                  type: 'time',
                  value: segment.start,
                  onChange: (event) => store.setSegment(segment.id, { start: event.target.value }),
                  style: FIELD,
                }),
                h(
                  'select',
                  {
                    value: segment.palette || '',
                    onChange: (event) => store.setSegment(segment.id, { palette: event.target.value }),
                    style: FIELD,
                  },
                  palettes.map((p) => h('option', { key: p.id, value: p.id }, p.name)),
                ),
              ),
            ),
            h('div', { style: HINT }, '名称取起始时辰；切换锚定固定钟点'),
          )
        : null,

      group('工作区配色', '未绑定时跟随全局；帧顶色条标识当前工作区', [
        chip(state.workspace.enabled ? '已启用' : '已停用', state.workspace.enabled, () =>
          store.patch({ workspace: Object.assign({}, state.workspace, { enabled: !state.workspace.enabled }) }), 'ws-on'),
        chip(state.workspace.accentOnly ? '仅强调色' : '整套', state.workspace.accentOnly, () =>
          store.patch({ workspace: Object.assign({}, state.workspace, { accentOnly: !state.workspace.accentOnly }) }), 'ws-scope'),
        action('全部跟随全局', () =>
          store.patch({ workspace: Object.assign({}, state.workspace, { map: {} }) }), 'ws-clear'),
      ]),

      detected.length
        ? h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 2 } },
            detected.map((entry) =>
              h(
                'div',
                { key: entry.id, style: { display: 'flex', gap: 8, alignItems: 'center' } },
                h('span', { style: HINT }, (entry.label || entry.id) + (entry.active ? '（当前）' : '')),
                h(
                  'select',
                  {
                    value: state.workspace.map[entry.id] || 'global',
                    onChange: (event) => store.setWorkspacePalette(entry.id, event.target.value),
                    style: FIELD,
                  },
                  [h('option', { key: 'global', value: 'global' }, '跟随全局')].concat(
                    palettes.map((p) => h('option', { key: p.id, value: p.id }, p.name)),
                  ),
                ),
              ),
            ),
          )
        : h('div', { style: HINT }, '未检测到工作区；打开任一会话后自动识别'),

      group('会话标记', '在会话行的「…」菜单里给单个对话上色，行首出现竖杠', [
        action('清除全部标记', () => store.patch({ sessionColors: {} }), 'marks-clear', 'normal', !Object.keys(marks).length),
      ]),
      h(
        'div',
        { style: HINT },
        Object.keys(marks).length ? '已标记 ' + Object.keys(marks).length + ' 个对话（色板取自当前配色）' : '尚未标记任何对话',
      ),

      group('账号行', '替换侧栏账号入口；停用即还原官方（含快速退出登录）', [
        chip(state.brand.enabled ? '自定义 开' : '自定义 关', state.brand.enabled, () =>
          store.patch({ brand: Object.assign({}, state.brand, { enabled: !state.brand.enabled }) }), 'brand-on'),
        action(state.brand.avatar ? '换头像' : '上传头像', () => setAvatarOpen(!avatarOpen), 'brand-avatar'),
        action('清除头像', () =>
          store.patch({ brand: Object.assign({}, state.brand, { avatar: '' }) }), 'brand-clear', 'normal', !state.brand.avatar),
      ]),

      h(
        'div',
        { style: ROW },
        h('span', { style: HINT }, '昵称'),
        h('input', {
          type: 'text',
          value: nickDraft === null ? state.brand.nickname : nickDraft,
          placeholder: '最多 24 字',
          onChange: (event) => setNickDraft(String(event.target.value).slice(0, 24)),
          style: Object.assign({}, FIELD, { width: 150 }),
        }),
        nickDraft === null
          ? action('改昵称', () => setNickDraft(state.brand.nickname), 'nick')
          : [
              action('确定', () => {
                store.patch({ brand: Object.assign({}, store.snapshot().brand, { nickname: nickDraft }) });
                setNickDraft(null);
              }, 'nick-ok'),
              chip('取消', false, () => setNickDraft(null), 'nick-cancel'),
            ],
      ),

      avatarOpen
        ? h(AvatarEditor, { onClose: () => setAvatarOpen(false) })
        : null,

      state.brand.avatar.length > avatarWarn
        ? h('div', { style: HINT }, '头像较大，接近浏览器存储上限')
        : null,

      group('安全', '安全模式停用全部绘制，可随时恢复', [
        chip(state.safeMode ? '安全模式 开' : '安全模式 关', state.safeMode, () => store.patch({ safeMode: !state.safeMode }), 'safe'),
      ].concat(
        confirmReset
          ? [
              action('确认还原', () => {
                store.reset();
                setConfirmReset(false);
              }, 'reset-yes', 'danger'),
              chip('取消', false, () => setConfirmReset(false), 'reset-no'),
            ]
          : [action('还原出厂', () => setConfirmReset(true), 'reset', 'danger')],
      )),

      group('诊断', '期望值为当前配色计算值，实际值为从 DOM 读回的值', [
        action('重新应用', () => {
          if (runtime.clearFault) runtime.clearFault();
          if (runtime.resetBreaker) runtime.resetBreaker();
          else if (runtime.repaint) runtime.repaint();
          refresh();
        }, 'reapply'),
      ]),

      h(
        'div',
        { style: HINT },
        expected
          ? '强调色 期望 ' + expected + ' · 实际 ' + readback + ' ' + (readbackOk ? '✓' : '✗')
          : '强调色 本档未设 · 实际 ' + readback,
      ),
      h(
        'div',
        { style: HINT },
        '生效来源 ' + effective + ' · 效果 ' + finishName + ' · 标记 ' + Object.keys(marks).length + ' 个 · 重绘 ' +
          runtime.diag.paints + ' 次 · 服务失败 ' + runtime.diag.serviceFails + ' 次 · 被拒值 ' +
          runtime.diag.rejectedValues + ' 个 · 全屏层 ' + runtime.diag.overlays + ' 个 · 熔断 ' +
          (runtime.diag.breakerTripped ? '已触发' : '正常'),
      ),
      fault && fault.message ? h('div', { style: ERR }, '故障【' + fault.stage + '】' + fault.message) : null,
      avatarLimitLabel ? h('div', { style: HINT }, '头像入口限制 ' + avatarLimitLabel + '，输出统一 256×256') : null,
    );
  }

  return Panel;
}

/* @bundle:strip-start */
export { createPanel };
/* @bundle:strip-end */
