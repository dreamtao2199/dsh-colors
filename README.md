# 多彩Harness · dsh-colors

给 DeepSeek Harness 的**配色与表面效果**插件：22 套仅浅色的成品配色、14 种可叠加的表面效果、
十二时辰自动轮换、工作区配色绑定、会话颜色标记、账号行昵称/头像，以及主栏里的一个工作台。

> 版本 `0.9.9`（首个准正式版）· MIT · 仅浅色（不提供深色模式）

## 特性

| 组 | 内容 |
|---|---|
| 配色库 | 22 套：Pantone 年度色 4 · 中国传统色 14 · 莫兰迪高级灰 4；＋「官方原色」位置 |
| 表面效果 | 14 种，**单选**：毛玻璃 / 渐变雾面 / 纤维 / 云絮 / 和纸 / 牛皮纸 / 亚麻 / 直纹纸 / 网点 / 扫描线 / 硬描边 / 焦点描边 / 浮层投影 / 描金滚动条；**与配色叠加，互不覆盖** |
| 展示顺序 | 配色库与表面效果按**字数升序 → 同字数按拼音**排列（「官方原色」/「无」固定在最前） |
| 随机 | 「随机一套」＝配色 × 效果 随机组合（22×14 = 308 种），带**锁配色 / 锁效果**两把锁；「随机排程」＝给四个时辰各抽一套 |
| 自动切换 | 间隔（1 小时 / 1 天 / 1 周 / 1 月，锚定固定钟点）与**十二时辰**（四段，名称取起始时辰）互斥 |
| 手动优先 | 手动选色（含随机）**优先到下一个时段边界**，到点自动交还排程——不再永久关闭自动切换 |
| 工作区 | 每工作区可绑定配色（仅强调色 / 整套），帧顶细线色条标识当前工作区 |
| 会话标记 | 给单个对话手选颜色，行首竖杠标出；未标记的会话保持素净。颜色取自当前主题 |
| 账号行 | 昵称 + 头像（内联编辑器：拖动/缩放/亮度对比饱和 → 输出 256×256 PNG），停用即还原官方账号入口 |
| 安全 | 安全模式一键停绘、还原出厂（二次确认）、熔断器、自检故障可见 |

## 安装

```powershell
# 从 GitHub（推荐，无需 npm 账号）
dsh plugin --profile desktop add github:<owner>/dsh-colors#v0.9.9

# 本地开发安装
dsh plugin --profile desktop add C:\path\to\dsh-colors
```

装完**重启 `dsh web`** 并强制刷新浏览器。`dsh web` 建议绑定 `127.0.0.1`。

## 目录

```
client.js        构建产物（浏览器半；唯一交给 DSH 加载的客户端文件）
index.js         宿主半（空壳，令牌层全部在客户端）
src/lib/         引擎：color / palette-layer / accents / finishes / schedule / status / breaker
src/client/      界面与席位：state / panel / workbench / avatar-editor / session-colors / dock-signal / workspace-bar / account-row / index
src/data/        palettes.json（22 套）· textures.js（8 张 128×128 无缝贴图，base64）
src/styles/      markdown-note.js（对话标注：只换色，无底纹、无渐变）
tests/           四套断言（676 项）
docs/            PRD / ARCHITECTURE / USER-GUIDE / TEST-REPORT / RESTORE / HANDOFF
```

## 构建与测试

```powershell
node build.mjs                 # src/ → client.js
node tests/breaker.test.mjs    # 13
node tests/state.test.mjs      # 56
node tests/wcag.test.mjs       # 492
node tests/bundle-smoke.mjs    # 115
```

## 设计要点

* **叠加而非覆盖**：配色只写颜色令牌，效果只写行为令牌（透明度/阴影/描边/滚动条/贴图）；未选配色时效果回退到
  `NEUTRAL_LIGHT`（不猜宿主的品牌色）。
* **只走官方席位**：`settings.section`、`sidebar.panellist` + `main`、`conversation.composer.dock`、`shell.overlay`、
  `sidebar.session.row.leading`、`sidebar.workspaces.session.menu.item`、`settings.launcher`。
  唯一的"重"操作是账号行以 `priority: -1` **遮蔽**官方账号行（停用即还原）。
* **不订阅 `theme/change`**：`overrideTokens` 会发该事件，订阅它并重绘＝自激循环＝渲染进程 OOM（本插件曾经的崩溃根因）。
* 详情见 `docs/ARCHITECTURE.md` 与 `docs/PRD.md`。

## 许可

MIT，见 `LICENSE`；第三方素材说明见 `THIRD-PARTY.md`。