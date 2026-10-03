# HANDOFF · 交接锚点

> 压缩/新会话后的**第一份必读文件**。读完这一份即可恢复全部关键状态，不必回溯对话。
> 最后更新：2026-10-03 20:xx（版本 **0.9.9** · 插件名 **dsh-colors / 多彩Harness** · 676 项测试全绿 · L4 待重启后执行）

---

## 1. 一句话状态

**多彩Harness**（`dsh-colors`）已完成改名与重写：22 套仅浅色配色、14 种与配色**叠加**的表面效果、字体渐变（由档位承载）、随机一套（308 种组合，带两把锁）与随机排程、十二时辰与间隔排程互斥、手动优先到时段边界、工作区配色与帧顶色条、**会话颜色标记**（声明式 CSS 行首竖杠）、账号行（昵称 + 头像内联编辑器，输出 256×256）、主界面**工作台**（`sidebar.panellist` + `main`）与独立设置页（`settings.section`）。

**构建与测试全绿（676 项）**，`dist/` 里已有 `dsh-colors-0.9.9.tgz` 与 `.zip`（含 `MANIFEST.sha256`）。
**L4（真实界面自动化验证）尚未执行** —— 需要先重启 `dsh web`（本会话不能自己重启，会把自己打断）。

## 2. 关键路径

| 用途 | 路径 |
|---|---|
| 部署目标（= 插件源码目录） | `C:\Users\dream\dsh-dev\dsh-colors` |
| 开发/暂存副本（我在这里改） | `D:\~T~ Empire\~I~\AI\数字产品\.deepseek\.dsh-plugins\dsh-colors` |
| profile | `C:\Users\dream\.dsh\profiles\desktop\` |
| 交付包 | `<repo>\dist\dsh-colors-0.9.9.zip` / `.tgz` |
| 备份与恢复素材 | `…\.deepseek\.dsh-plugins\_recovery\` |
| 贴图生成器 | `…\.dsh-plugins\_tools\make-textures.py` |
| 贴图复检器 | `…\.dsh-plugins\_tools\verify-textures-celadon.py`（注意：名字里的 celadon 指贴图系列，非插件名） |
| 文档 | `docs\PRD.md` / `ARCHITECTURE.md` / `USER-GUIDE.md` / `TEST-REPORT.md` / `RESTORE.md` |

## 3. 构建、测试、打包

```powershell
$repo = "D:\~T~ Empire\~I~\AI\数字产品\.deepseek\.dsh-plugins\dsh-colors"
cd $repo
node build.mjs
node tests\breaker.test.mjs      # 13
node tests\state.test.mjs        # 56
node tests\wcag.test.mjs         # 492
node tests\bundle-smoke.mjs      # 115
node tools\package.mjs           # 构建 + 四套测试 + 清单 + tgz/zip（一条命令）
```

**期望 676 项全绿。** 改完源码必须 `node build.mjs`，再 `deploy`（见 §4）到 C 盘；只改 D 盘副本不会影响运行中的插件。

## 4. 部署（D 盘暂存 → C 盘运行位置 + profile）

部署脚本：`…\.dsh-plugins\_tools\deploy-dsh-colors.ps1`（工作区外写入，需要一次性授权）。
它做 5 件事：备份 profile 两个文件 → 复制源码树到 `C:\Users\dream\dsh-dev\dsh-colors` → 重建 `node_modules\dsh-colors` 目录联接 → 文本级改 profile 的依赖行与 bundles 列表 → 打印校验结果。
**不跑 `pnpm install`、不碰 `cordis.patch.yml`。** 做完**必须重启 `dsh web`** 才生效。

## 5. 席位结论（别重踩）

| 席位 | 用途 | 要点 |
|---|---|---|
| `settings.section` | 完整面板页 | `{ id, order, label }`；官方文档明确 `settings.general.item` 只适合"单个设置" |
| `sidebar.panellist` + `main` | 侧栏常驻按钮 + 整页工作台 | **两处 id 必须一致**；官方已占 `plugins`/`schedules`；ownerProps 只给 `{ size, active }` |
| `conversation.composer.dock` | 状态采集 + 可选状态条 | ownerProps 给 `sessionId`/`useSession`/`useSessions`/`useWorkspaces` |
| `shell.overlay` | 帧顶工作区色条 | click-through，`pointer-events:none` |
| `sidebar.session.row.leading` | 会话标记竖杠 | **官方只在该行空闲时挂载** → 运行中可能不显示（已知限制） |
| `sidebar.workspaces.session.menu.item` | 会话「…」菜单里的颜色选择 | 只传 `{ id, order, label }`；sessionId 要防御式读取 |
| `settings.launcher` | 账号行 | **single 席位，同优先级会被拒**；用 `priority: -1` 遮蔽（数值最小者渲染） |

## 6. 安全不变式（15 条，均有断言）

S1 不订阅 `theme/change`（**OOM 事故根因**）· S2 无 `setInterval`、默认零定时器 · S3 每次激活恰 4 层 · S4 全屏层 ≤1、`z-index:1` · S5 颜色 token 不含渐变/滤镜 · S6 2 秒 >24 次重绘熔断且只能手动解除 · S7 `safeComponent` 兜渲染异常 · S8 席位注册先于绘制 · S9 无深色模式 · S10 卸载清空 · S11 单席位遮蔽仅启用时、可完全还原 · S12 持久化失败可见 · S13 注册被拒不抛回宿主 · **S14 渐变字必须在 `@supports` 内且按最亮一档校验** · **S15 会话标记只写声明式 CSS、不动宿主 DOM**

## 7. 未决 / 下一步

| # | 事项 | 说明 |
|---|---|---|
| 1 | **重启 `dsh web`** | 让新 profile 生效；然后跑 L4 |
| 2 | **L4 全流程验证** | 独立 Agent 窗口：22 配色逐个、14 效果 ×（有/无配色）、十二时辰边界、会话标记、账号行、工作台；截图 + 控制台 + 网络 + 崩溃日志 + 内存 |
| 3 | L4 顺带确认 | ①「费用明细」chip 属于哪个席位（候选：`conversation.session.header.utilities` / `shell.leading` / 主列页签）②`data-session-id` 是否真存在于会话行 DOM（决定标记竖杠走 CSS 还是退到 `row.leading`）③工作区横条是否可见 |
| 4 | GitHub 上架 | 公开仓库 `dsh-colors` → Release `v0.9.9`（挂 tgz/zip/清单）→ 向 `awesome-dsh-plugin/awesome-dsh-plugin` 提一条 PR（社区市场自动收录） |
| 5 | 已知限制（不修） | 无深色模式；旋转圈颜色共享 `--dsw-alias-label-tertiary` 不动；账号行开启后遮蔽官方行（停用即还原）；`row.leading` 空闲才挂载 |

## 8. 约定与偏好（别丢）

* 成果物一律进工作区 `.deepseek\`（全局记忆守则第 15 条）；插件源码放 C 盘 `dsh-dev`。
* 先确认再执行（安装/删除/改系统/影响数据必须问）；讨论态只出草稿。
* 文案：产品界面语言，标签 ≤6 字、说明 ≤40 字，无第一人称。
* 用户经历过三次崩溃，**最在意"别把 DSH 搞挂"**：任何全局 CSS / 全屏层 / 席位替换都要先有能复现故障的断言。
* 用户希望**我自己验证**（Inspect 通道 + 数值断言 + 崩溃日志 + 浏览器自动化），不当验收员。

## 9. 压缩/新会话后的开场动作

1. 读本文件 + `docs/TEST-REPORT.md`。
2. `cd` 到 §3 的 `$repo`，`node build.mjs` 后跑四套测试，确认 **676 项全绿**。
3. 核对 bundle 与 src 同步：`client.js` 里的 `id: 'dsh-colors'` 与 `package.json` 的 `name` 一致；首个贴图 base64 长度 **6588**。
4. 若用户已重启：直接做 §7 的 L4；否则先把 §4 的部署做完再请他重启。