# 架构与开发说明 · dsh-colors

> 给下一个接手的人（或下一轮的我）。读完这一份就能改代码而不踩雷。

## 1. 运行模型

DSH 插件 = 一个 **bundle**（npm 包形状）。本包有两个半边：

| 半边 | 文件 | 作用 |
|---|---|---|
| 宿主半 | `index.js` | 只导出空 `apply()`。所有工作都在客户端 |
| 客户端半 | `client.js` | **构建产物**：`window.__ModuleLoader__.load({ id, factory })`，`factory` 返回 `{ inject: ['theme','slots'], apply(ctx) }` |
| 清单 | `package.json` 的 `dsh.bundle.patch` / `dsh.client` | 告诉 DSH 这是一个 bundle，patch 往 profile 注入一行 |

`src/` 是唯一真源；`build.mjs` 按 `SOURCES` 顺序把 18 个文件**拼接**成一个 factory 体，
并剥掉 `/* @bundle:strip-start */ … /* @bundle:strip-end */` 之间的测试专用 import/export。

⚠️ **拼接顺序即语义**：`const` 在同一函数体里按顺序求值，`src/data/textures.js` 必须排在
`src/lib/finishes.js` 之前（后者在模块作用域就读取 `TEXTURE_TILES`）。函数声明会被提升，顺序无碍。

## 2. 层模型（配色与效果叠加）

每次激活只写 **4 层**，顺序固定：

```
<SOURCE>             10 个官方 alias 令牌（底、面、文字、边框 l1/l2、侧栏、品牌色）
<SOURCE>:accents     派生令牌（按档位裁剪 5/15/20 项）＋ 三态语义色和声化
<SOURCE>:finish       效果令牌（透明度/阴影/描边/滚动条）— 与配色无关，永远解析
<SOURCE>:workspace    工作区强调色切片（仅强调色或整套）
```

颜色走两条通道：**主通道**是插件自有 `<style>`（`:root,html,body{--token:value !important}`），
**次通道**是 `ctx.theme.overrideTokens`（只传合法颜色值，异常不中断）。

不变量：

* 颜色令牌里**永远**不能出现渐变/滤镜值（会让所有 `color-mix()` 消费者失效）；渐变写成
  `html{background-image:…}` 规则。
* 效果与配色**叠加**：`resolveFinishes(state.finishes, palette || null)` —— 没有配色时用
  `NEUTRAL_LIGHT` 兜底。**这是 0.9.9 修的 B1：曾经 `palette ? … : {}` 会把 14 种效果全丢掉。**

## 3. 席位（slots）

| 席位 | kind | 我们的用途 | 关键约束 |
|---|---|---|---|
| `settings.section` | list | 完整控制面板（一页） | `{ id, order, label }` |
| `sidebar.footer.action` | list | **侧栏底部快捷入口**（与「插件广场」并排） | `{ id, order, label }`；order 9 紧邻 skillhub-plaza 的 8；ownerProps 只有 `{ wide }`，**没有导航 API**，所以按钮自带动作＝随机一套 |
| ~~`sidebar.panellist` + `main`~~ |  — | 0.9.10 **移除**（主导航里再放一个入口与设置页重复） | 要恢复：`{ name: 'sidebar.panellist', id, order, label }` + `{ name: 'main', key: <同 id> }` |
| `conversation.composer.dock` | list | 状态采集 + 可选状态条 | ownerProps 给 `sessionId`/`useSession` |
| `shell.overlay` | list | 帧顶工作区色条 | 层本身 click-through，`pointer-events:none` |
| `sidebar.session.row.leading` | list | 会话标记竖杠 | **官方只在"该行空闲"时挂载**，运行中会消失 |
| `sidebar.workspaces.session.menu.item` | list | 「…」菜单里的颜色选择 | 只传 `{ id, order, label }` |
| `settings.launcher` | **single** | 账号行（昵称+头像） | **同优先级会被拒**；用 `priority: -1` 遮蔽（数值最小者渲染） |

会话标记的**行绘制**用声明式 CSS（`[data-session-id="…"]::before`），不做 DOM 变更：
宿主若改了属性名，最坏情况是"标记不显示"，而不是树被改坏。

## 4. 安全不变式（不可协商）

| 编号 | 内容 | 为什么 |
|---|---|---|
| S1 | **不订阅 `theme/change`** | `overrideTokens` 会发这个事件；订阅＋重绘＝自激循环＝渲染进程 OOM（真实事故） |
| S2 | bundle 内无 `setInterval`；默认状态零定时器 | 周期性工作 = 不可控成本；时间切换只用**一个** `setTimeout`，锚定钟点 |
| S3 | 每次激活恰好 4 层 | 防止层层叠加 |
| S4 | 全屏覆盖层 ≤1 且 `z-index: 1` | 历史事故：4 张全屏层 + `z-index: 2147483000` |
| S5 | 颜色令牌内不得含渐变/滤镜 | `color-mix()` 会被静默作废 |
| S6 | 2 秒内 >24 次重绘即熔断，只能手动解除 | 风暴必须自己停下 |
| S7 | 组件渲染异常被 `safeComponent` 兜住 | 我们的 bug 不能带崩宿主渲染树 |
| S8 | 席位注册先于任何绘制 | 2.1.0 事故：绘制先抛异常 → 所有入口消失 |
| S9 | 无深色模式（dark 槽位＝light） | 明确排除，不是暂缓 |
| S10 | 卸载时清空全部层与样式表 | 不留残影 |
| S11 | 单席位替换只在启用时注册、用更低优先级遮蔽、停用完全还原 | 账号行 |
| S12 | 持久化失败不静默（配额/隐私模式上报为可见故障） | 曾经"设置默默不保存" |
| S13 | 插槽注册被拒不得向宿主抛出 | 回调可能在该席位**之后**才被声明时执行 |
| S14 | ~~渐变字~~ 已移除：正文渐变会破坏行内 `code`，标题行渐变需要改宿主 DOM → 两者都不做 | 冒烟断言「无 gradientText / 无 background-clip:text」 |
| S15 | 会话标记只做声明式 CSS，不改宿主 DOM 结构 | 宿主升级不应崩 |

## 5. 状态与存储

* 单一 key：`dsh-colors.state.v1`；**兼容读取**旧 key `dsh-theme-celadon.state.v3/v2/v1`（改名不丢设置）。
* `manual = { paletteId, until }`：`until = 0` 表示没有排程在跑（永久有效）；否则到点交还排程。
* `locks = { palette, finish }`：随机按钮的两把锁。
* `sessionColors = { sessionId: '#RRGGBB' }`，上限 200 条。
* 头像：入口文件 ≤1MB，**输出统一 256×256 PNG**（约 20–40KB），因为 localStorage 只有几 MB 且按 UTF-16 计费。

## 6. 常见坑（都踩过）

1. **拼接顺序**：数据文件必须在消费者之前。
2. **单席位**：`settings.launcher` 同优先级注册会被 slot core 拒绝，报错原文已写进 `index.js` 注释。
3. **回调时机**：`ctx.slots.inject(key, cb)` 的 `cb` 可能在**该席位之后**才被声明时执行 → 注册必须自带 try/catch。
4. **测试用假 React**：`tests/bundle-smoke.mjs` 用 `{args:[type, props, ...children]}` 模拟元素树；遍历文本时**标签名也是字符串**，断言要排除 `div/span/svg/rect` 之类。
5. **重命名**：改包名要同时改 4 处（`package.json`、客户端 `SOURCE`、`cordis.patch.yml`、profile 的依赖行与 bundles 列表）＋存储 key 迁移。