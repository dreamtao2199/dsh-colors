# 测试报告 · dsh-colors 0.9.9

> 生成于 2026-10-03。本文随每轮验证更新；证据一律是可复现的命令或文件，不用"看着没问题"。

## 1. 分层策略（L0–L4）

| 层 | 内容 | 手段 | 状态 |
|---|---|---|---|
| **L0 环境** | 安装链接是否活着、加载的是哪个构建、页面是否刷新过 | 文件系统 + Junction + 插槽占用查询 | ✅ 本轮发现并修复（见 §4） |
| **L1 静态审计** | 每个效果写哪些令牌、宿主在哪里消费、是否可观察；席位契约 | 源码审计 + Inspect 目录 | ✅ |
| **L2 单元/回归** | 四套自动断言 | `node tests/*.mjs` | ✅ 676 项全绿 |
| **L3 交互（jsdom 级）** | 真点击：面板按钮、随机、锁、会话标记、随机排程 | 构建产物 + 假 React 树遍历 + 真 `onClick()` | ✅ 见 §3 |
| **L4 真实界面** | 独立 Agent 窗口真点：22 配色、14 效果 × 有/无配色、边界、账号行、工作台 | bsk 浏览器自动化 | ⏳ 待重启后执行（本节随后补证据） |

## 2. L2 结果（本轮）

| 套件 | 项数 | 结果 |
|---|---|---|
| `tests/breaker.test.mjs` | 13 | ✅ |
| `tests/state.test.mjs` | 56 | ✅ 含随机/锁/会话标记/改名迁移/持久化失败上报 |
| `tests/wcag.test.mjs` | 492 | ✅ 含 22 套 × 6 个会话标记色（互不重复 + ≥3:1） |
| `tests/bundle-smoke.mjs` | 115 | ✅ 含 7 席位、B1 回归、随机真点击、标记 CSS、图标 |
| **合计** | **676** | **0 失败** |

## 3. 本轮修掉的缺陷（均有断言守着）

| 编号 | 缺陷 | 证据 | 修复 |
|---|---|---|---|
| B1 | **选「官方原色」时 14 种效果全部消失**（效果被当成配色的附属） | 旧 `index.js`: `palette ? resolveFinishes(...) : {tokens:{},css:''}` | 效果永远解析；无配色时用 `NEUTRAL_LIGHT`。断言：`B1: an effect still resolves with NO palette` |
| B2 | 诊断里那个红 ✗ 是**假的**（期望值取"对底"口径、实际值取"对面"口径） | 莫兰迪·灰紫 `#796B7E` vs `#807186` | 期望值改为"本插件刚写入的值"（`runtime.diag.expectAccent`） |
| B3 | 「还原出厂」一键清空、无确认 | — | 二次确认（无定时器） |
| B4 | 动作型控件长得像开关 → 点了没反馈 | — | 新增 `data-dsh-action` 外形；`清除头像`/`全部跟随全局`/`重新应用`/`还原出厂` 全部改形 |
| B5 | 表面效果点当前项不能取消 | — | 再点即取消 |
| B6 | 22 套配色挤在「设置 → 通用」一行 | 官方文档：该席位给"不需要独立页面的单个设置" | 升级为 `settings.section` 独立页 + 侧栏工作台 |
| B7 | 账号行注册被 single 席位拒绝 | 故障原文（低优先级遮蔽规则） | `priority: -1`；注册自带 try/catch |
| B8 | 改名会"丢设置" | — | 兼容读取旧 key `dsh-theme-celadon.state.v3/v2/v1` |
| B9 | 浅色配色（月白/柔和桃等）的会话标记不可见、胭脂标记重复 | 断言 `≥3:1`、`6 色互不重复` 失败 → 修复 → 通过 | 标记统一推到 3:1，并按变暗去重 |

## 4. L0 环境发现（本轮最重要的一条）

排查时发现插件**根本没在运行**：

* profile 依赖是 `link:D:/…/数字产品/.dsh-plugins/dsh-theme-celadon`，而该路径已被搬走（工作区整理）；
* `node_modules\@local\dsh-theme-celadon` 是一个指向该路径的 **Junction** → 断链；
* 运行时插槽 `settings.general.item` 的占用者只有宿主自己的 12 项，**没有本插件** → 确认未加载。

处理：源码迁到 `C:\Users\dream\dsh-dev\dsh-colors`，profile 依赖改指新路径（含备份与回滚步骤，见 `RESTORE.md`）。

## 5. 复现命令

```powershell
cd <repo>
node build.mjs
node tests/breaker.test.mjs; node tests/state.test.mjs; node tests/wcag.test.mjs; node tests/bundle-smoke.mjs
node tools/make-manifest.mjs          # 生成 MANIFEST.sha256
```

## 6. 发布记录（2026-10-03）

| 项 | 值 |
|---|---|
| 仓库 | https://github.com/dreamtao2199/dsh-colors （公开，MIT） |
| 首个提交 | `a02fc60` 多彩Harness 0.9.9 · 首个准正式版（45 个文件） |
| 标签 | `v0.9.9` |
| Release | https://github.com/dreamtao2199/dsh-colors/releases/tag/v0.9.9 （pre-release） |
| 社区列表 PR | https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/6482 （open；列表原有 4412 条） |
| 归档 | `dist/dsh-colors-0.9.9.tgz` 215.1 KB · `dist/dsh-colors-0.9.9.zip` 237.2 KB · `MANIFEST.sha256` 覆盖 43 个文件 |
| 复核 | **在 C 盘部署副本上重跑四套测试：676 项全绿**（不是只在开发副本上跑） |

> 注记：本机 CLI 的 TLS 只在更宽权限下可用；`web_fetch` 被解析到内网 IP，因此资料核对走 API/raw 通道。
> GitHub 操作全程未打印任何密钥，凭据取自本机 Git Credential Manager（`dreamtao2199`）。