# 插件工程链路手册（DSH）

> **这是什么**：给 DeepSeek Harness（DSH）做第三方插件的"施工手册 + 坑单"。
> **来源**：`dsh-colors`（多彩Harness）0.9.9 → 0.9.11 的完整实战，包含全部踩过的坑与验证过的结论。
> **用法**：下次做插件先读 §0 清单，再按 §2 起骨架；卡住查 §11 故障速查。
> **维护**：本文件是唯一真源（工作区内）。建议另存一份到笔记/网盘；若放一份进插件仓库 `docs/`，就自动获得 git 备份与历史。

---

## 0. 十分钟快速开始（Checklist）

| # | 做 | 命令 / 动作 | 验收标准 |
|---|---|---|---|
| 1 | 起骨架 | 目录 + `package.json`（§2） | `dsh plugin --profile <档案> add <路径或 github:owner/repo>` 不报错 |
| 2 | 写宿主半 | `index.js`（可以先是空壳） | 档案里出现该插件条目，无 loader 报错 |
| 3 | 写客户端半 | `src/**` → `node build.mjs` → `client.js` | 硬刷新后界面出现（席位生效） |
| 4 | 定状态 | 一个 `STORAGE_KEY` + 迁移旧键（§4） | 刷新/重启后设置不丢 |
| 5 | 过安全红线 | 对照 §5 逐条自查 | 不订阅 `theme/change`、不用 `setInterval`、全屏浮层只 1 个 |
| 6 | 写断言 | 四套测试（§6） | 全绿，且"测试这个测试"能变红 |
| 7 | 打包 + 自校验 | `tools/make-manifest.mjs` → `tools/package.mjs` | MANIFEST 逐文件 0 不匹配；产出 `.tgz`/`.zip` |
| 8 | 部署 | 备份 → 合并复制 → 刷新（§8） | 开发副本与部署副本哈希一致 |
| 9 | 发布 | `git commit/push` → tag → Release（§9） | 别人能 `dsh plugin add github:owner/repo` |
| 10 | 上架 | 向精选列表提 PR（§9.3） | 仓库有 `dsh-plugin` topic；描述与代码一致 |

---

## 1. 心智模型

* **一个插件＝两半**：宿主半（跑在 DSH 进程里，Node）＋ 客户端半（跑在浏览器/Electron 渲染进程）。
  * 宿主半：注册工具（tools）、服务、审批、连接外部系统。
  * 客户端半：注册界面席位（slots）、样式、状态。
* **DSH 是"一切皆插件"**：模型、工具、沙箱、会话存储、UI、甚至 agent loop 本身都是插件层。所以"扩展点"非常多，但**能安全用的只有官方席位与官方服务**。
* **"装得上"的判据**：`package.json` 里必须有 `dsh.bundle.patch`（指向 `cordis.patch.yml`）；只有 `dsh.client` 是**装不上**的（这是精选列表里被拒最多的一类）。
* **纯聚合包不收录**（精选列表规则）：自己不带行为的"依赖清单包"不单独收录。

---

## 2. 最小骨架

```
dsh-myplugin/
  package.json       # 必需：dsh.bundle.patch（+ 有界面时 dsh.client）
  cordis.patch.yml   # loader patch：把插件插进档案
  index.js           # 宿主半（空壳也行，令牌层可以全在客户端）
  client.js          # 客户端半的构建产物（唯一交给宿主加载的客户端文件）
  src/               # 源码：lib/（纯逻辑）· client/（界面与席位）· data/ · styles/
  tests/             # 断言（至少一套）
  docs/              # PRD / ARCHITECTURE / USER-GUIDE / TEST-REPORT / RESTORE / HANDOFF
  tools/             # make-manifest.mjs（清单自校验）· package.mjs（打包）
```

`package.json` 关键片段：

```jsonc
{
  "name": "dsh-myplugin",
  "version": "0.1.0",
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },  // ← 必需
    "client": { "platform": "web" }               // ← 只有需要界面时
  }
}
```

`cordis.patch.yml` 最低内容：

```yaml
- insert:
    - id: my-plugin-id
      name: dsh-myplugin      # 包名，与 package.json 的 name 一致
```

客户端半的加载协议（本宿主实测）：

```js
window.__ModuleLoader__.load({
  id: '<客户端模块 id>',
  factory(require) {
    // 返回 { inject, apply }：inject 声明需要的服务，apply(ctx) 里注册席位/样式
    return { inject: ['theme', 'slots'], apply(ctx) { /* … */ } };
  },
});
```

> 客户端半只能用宿主给的服务（如 `theme`、`slots`）；**不要**在这里 import 第三方库凑体积——256 KiB/文件的限制与"无运行时依赖"是加分项。

---

## 3. 席位地图（实测结论，含坑）

| 席位 | 能做什么 | 实测约束 / 坑 |
|---|---|---|
| `settings.section` | 一个完整设置页（`id`/`order`/`label`） | 首选！一个插件一个页面，最稳 |
| `settings.general.item` | 通用页里的单行设置项 | 只适合单个开关/一行控件 |
| `settings.launcher` | 账号行/启动器位置 | **单席位**，官方占用者 `priority: 0`；要用更低值（如 `-1`）才能"遮蔽"，停用即还原 |
| `shell.overlay` | 帧级浮层（色条、HUD） | **全屏浮层只准 1 个**，`z-index` 固定低值，多个会互相盖 |
| `conversation.composer.dock` | 输入框附近的常驻动作区 | 适合放动作按钮，不适合放长文本 |
| `sidebar.session.row.leading` | 会话行首标记（竖杠/圆点） | **只在会话"空闲"行挂载**；运行中的行不显示——这是宿主行为，不是 bug |
| `sidebar.workspaces.session.menu.item` | 会话「…」菜单项 | 与上一行配合：菜单里选，行首显示 |
| `sidebar.panellist` + `main` | 侧栏常驻入口 + 整页工作台 | 两处 **id 必须一致**；`main` 的键 `conversation`/`plugins`/`schedules` 已被占 |
| `sidebar.footer.action` | 侧栏底部动作 | owner 会把条目**竖排**堆叠 → **做不到"与某个按钮并排"**，想并排请放弃该席位 |

两条铁律：

1. **想"并排"先查 owner 的布局**（竖排堆叠的席位不可能并排）。
2. **单席位用 `priority` 抢位**：数值越小越靠后渲染；要"盖住"官方项就用比它更小的值，并保证停用能还原。

---

## 4. 状态与存储

* 一个版本化键：`dsh-myplugin.state.v1`（改结构就升 v2 并写迁移）。
* **旧键迁移**必须做（改名/重构时用户数据不能丢）：一次读多个 `LEGACY_KEYS`，迁移后写新键。
* 数值上限要有（例如头像 1 MB、单会话 200 条），超限**降级而不是崩**。
* 客户端状态只放"可重建"的东西；真实凭据放宿主凭据存储，**永远不进浏览器**。

---

## 5. 安全红线（照抄自查）

| 编号 | 红线 | 为什么 |
|---|---|---|
| S1 | **不订阅 `theme/change`** | `overrideTokens` 会发该事件，订阅后重绘＝自激循环＝渲染进程 OOM（本项目曾经的崩溃根因） |
| S2 | **不用 `setInterval` 轮询重绘** | 同上，改为"事件驱动 + 上限计数" |
| S4 | **全屏浮层最多 1 个** | 多个浮层互相盖、渲染成本翻倍 |
| S5 | **颜色令牌里不放渐变** | 渐变会与"叠加"设计冲突，且不可预测 |
| S14 | **不做渐变文字**（`background-clip:text`） | 会把 `color:transparent` 继承给行内 `code`，芯片变空白块——本项目已整条移除 |
| — | 所有渲染包在 `safeComponent` 里 | 单个组件抛错不该让整页白屏 |
| — | 熔断器 + 一键停绘 | 出事时用户能自救，不需要重装 |
| — | 自检故障**可见**（显示「故障【render:…】」） | 白屏是最难排查的形态 |

---

## 6. 测试：四套断言 + "测试这个测试"

| 套 | 断言什么（示例） | 本项目项数 |
|---|---|---|
| breaker | 窗口内重绘 N 次就熔断；窗口滚动后重新计数 | 13 |
| state | 旧键迁移、随机+锁不打架、还原出厂真的清空 | 59 |
| wcag | 每套配色 × 每个令牌的对比度阈值；标记色 ≥3:1 且互不重复 | 492 |
| bundle 冒烟 | 构建产物里配色齐全；不含深色变体；**不含已删除的功能**（防复活） | 128 |

**"测试这个测试"**：故意造一个坏值，确认测试会变红。
— 本项目踩过：第一版元素类型守卫**永远通过**（假绿灯），补了"故意造坏值"的用例才发现。

**诚实边界**：断言只能证逻辑，**证不了观感**（"这个效果好看吗/看得出变化吗"）。那部分必须真机走查，并把结论写进 `docs/TEST-REPORT.md`。

---

## 7. 构建 / 清单 / 打包

```powershell
node build.mjs                 # src/ → client.js（单一产物）
node tests/*.mjs               # 四套断言
node tools/make-manifest.mjs   # 重新生成 MANIFEST.sha256（覆盖所有受版本控制的文件）
node tools/package.mjs         # 跑断言 + 生成清单 + 产出 dist/*.tgz 与 *.zip
```

* **清单自校验**：把 MANIFEST 里每条哈希重算一遍，必须 **0 不匹配**。这是"交付物与源码一致"的唯一机器证明。
* 归档里必须带 `MANIFEST.sha256`、`LICENSE`、`THIRD-PARTY.md`。
* 每次改文档/源码后**重生成清单**，否则自校验会失败（这是好事：它会抓住你忘了的事）。

---

## 8. 部署与回滚（本节是血泪）

**正确姿势**：

1. 先备份目标目录（时间戳后缀）。
2. **只合并、不删除**：`robocopy <src> <dst> /E`（**绝不要**先 `Remove-Item -Recurse` 再复制）。
3. 需要把档案指向开发目录时用 junction；改档案文本前先备份。
4. 部署后校验关键文件哈希（开发副本 ≡ 部署副本）。
5. 客户端半改动 → **硬刷新**即可；宿主半或 manifest 改动 → 需要重启 `dsh web`。

**踩过的坑（真实事故）**：

* ❌ **"部署脚本先删目标目录再复制"抹掉了两次 `.git`**——不是 `/MIR` 的错，是那句 `Remove-Item -Recurse -Force`。恢复靠 `git init` + `git fetch --depth 1` + `reset origin/main`，代价很大。**删目标目录这一步已永久移除**。
* ❌ PowerShell 陷阱：`$ErrorActionPreference='Stop'` 下 **git/node 把进度写到 stderr** 会让脚本中断 → 统一用 `cmd /c "… 2>&1"`。
* ❌ `@(@('a','b'))` 会**拍平**成 2 元素数组 → 批量"查找替换"助手会替换单个字符（本项目曾因此毁掉 `package.json`）。改文件一律用直接字符串 `.Replace`。
* ❌ `"$login/$name: …"` 会被解析成变量 `$login` + 字面量：用 `${login}`。
* ❌ 读 UTF-8 的 `.ps1` 要 `-Encoding utf8`；脚本不能直接 `&` 运行（执行策略）→ 管道给 `Invoke-Expression`。

---

## 9. 发布与上架

### 9.1 发布（自己的仓库）

```powershell
git add -A; git commit -m "…"; git push origin main
git tag v0.1.0; git push origin v0.1.0      # 归档随 tag
# Release 里挂 dist/*.zip 与 *.tgz
```

别人安装：`dsh plugin --profile <档案> add github:<owner>/<repo>`（可选 `#v0.1.0` 钉版本）。

### 9.2 市场（dshmarket）到底怎么读数据

* **每次打开实时拉** `https://awesome-dsh-plugin.com/plugins.json`（无过期缓存兜底）；连不上会报原因并提供重试。
* 该 JSON 由精选列表仓库 `awesome-dsh-plugin/awesome-dsh-plugin` 的 **CI 每日编译** `data/plugins/*.yml` 得到。
* 市场的**安装来源被硬限制在精选列表内**——所以"上了 GitHub"≠"市场能搜到"。
* 网络不通时可换镜像：环境变量 `DSHM_REGISTRY_URL` 指向同结构 `plugins.json`。

### 9.3 上架：一个 PR，一个文件

`data/plugins/<owner>__<repo>.yml`（monorepo 子包：`owner__repo--packages-my-plugin.yml`）：

```yaml
url: https://github.com/<owner>/<repo>      # 必须精确等于仓库地址
name: <owner>/<repo>                        # monorepo 子包用 owner/repo#subname
category: theme                             # 见下方合法取值
description:
  en: 一句话，讲功能，不用形容词最高级
  zh: 一句话（可选，维护者会补）
```

合法 `category`：`agi ui usage theme model identity session memory tools wsl browser vision voice docs skill workflow git notify dev security remote market fun`

**硬性要求**（评审会逐条看）：

1. `package.json` 声明 `dsh.bundle` manifest（决定"装得上"）；
2. 仓库有真实可用代码（占位/纯 README 不收）；
3. **仓库创建满 1 天**（自动检查；专拦"创建几分钟就提 PR"）；
4. 仓库加 **`dsh-plugin`** topic；
5. 描述**必须与代码一致**（会被逐条核对；不能出现已删除的功能）；
6. 分类选贴近的即可，选不准维护者会改，不会打回。

**队列真相（2026-10-08 实测，供预期管理）**：

* 收录是**人工评审 + 大致按创建时间顺序**；当时仓库有 **≈826 个未处理 PR**，正在合并的是 **9-28 创建**的 PR；
* 每天合并量约 10~20 条；因此"提交后通常一天内生效"指的是**合并之后**站点/CI 的收录速度，**不是评审排队时间**；
* 结论：**提交后要有"以周计"的心理准备**；**不要撤回重提**（重提＝排到队尾）。
* 合并后：CI 重编译 `plugins.json` → 市场下次打开即出现，**无需重启、无需重装**。

---

## 10. 主题 / 配色工程要点（若做"外观类"插件）

* **叠加而非覆盖**：配色只写颜色令牌；效果只写行为令牌（透明度/阴影/描边/滚动条/贴图）。两者独立，可任意组合。
* **令牌分层**：`<pkg>` → `:accents` → `:finish` → `:workspace`；主通道＝插件 `<style>`（`!important`），次通道＝`ctx.theme.overrideTokens`。
* **必须有兜底**：用户没选配色时，效果回退到中性浅色（不要猜宿主品牌色）。
* **标记类颜色要推导**：从当前配色推导出一组标记色，约束 ≥3:1 对比度、互不重复（否则浅色配色下标记看不见）。
* **不提供深色变体**（如果你只做浅色）：用断言把"不含深色"钉住，避免以后手滑。

---

## 11. 故障速查

| 现象 | 最可能原因 | 处理 |
|---|---|---|
| 设置页/整页**白屏** | React 渲染期抛错，且抛在 `try/catch` 之外（例如 `h(样式对象, …)` 把对象当元素类型；React 报 #130） | 检查所有 `h()` 第一个参数是不是**元素类型或字符串** |
| 渲染进程 OOM / 越用越卡 | 订阅了 `theme/change` 并重绘（自激循环） | 退订；改事件驱动 |
| 样式不生效 | 令牌被宿主后写的规则覆盖 | 用 `!important`；或改走 `overrideTokens` |
| 席位不显示 | 处于该席位的"不满足条件"状态（如会话运行中）；或 owner 布局竖排 | 见 §3 的约束列 |
| 插件"装不上" | `package.json` 只有 `dsh.client`，缺 `dsh.bundle.patch` | 补 `dsh.bundle.patch` + `cordis.patch.yml` |
| 清单自校验失败 | 改了文件没重生成清单 | 跑 `tools/make-manifest.mjs` 再提交 |
| 部署后仓库 `.git` 没了 | 部署脚本删过目标目录 | 恢复：`git init` → `git fetch --depth 1` → `git reset origin/main`；并**永久删掉那句删除命令** |
| `web_fetch` 报 "non-public IP" | 本机 DNS 是 **fake-ip**（`198.18.0.0/15`），而抓取工具有"非公网地址拒取"的防 SSRF 检查 | 见 §12 说明；临时用"走系统代理的命令行抓取"替代，或把域名加进代理的 `fake-ip-filter` |
| `git push` 报 `Connection was reset` / `Could not connect to server` | **同一个 fake-ip 根因**：git/curl 默认**不走** Windows 系统代理（而 .NET / PowerShell 会走，所以出现"命令行能调 API、git 却推不动"的怪现象） | 让**这一条命令**走代理，不动任何配置：`git -c http.proxy=http://127.0.0.1:7890 -c https.proxy=http://127.0.0.1:7890 push origin main`（实测：直连失败 → 加代理参数即成功） |

---

## 12. 术语表

| 词 | 意思 |
|---|---|
| **bundle / patch** | 插件的清单（`package.json` 的 `dsh.bundle`）与它要打进档案的那段 loader 配置（`cordis.patch.yml`） |
| **席位（slot）** | 宿主留给插件挂界面的位置（§3 表） |
| **令牌（token）** | 主题的颜色/尺寸变量；插件写令牌，宿主负责把它变成样式 |
| **断言（assertion）** | 把"我保证…"写成每次都能自动检查的一行代码；跑测试时要么绿要么红 |
| **冒烟测试（smoke）** | 只验证"最基本的能跑/产物里该有的都在"的粗粒度测试 |
| **MANIFEST** | 交付物里所有文件的哈希清单，用于证明"交付物 == 源码" |
| **fake-ip** | 代理软件让域名解析成 `198.18.x.x` 假地址、由代理自己远端解析的模式；会让"本地解析后做安全检查"的工具误判 |
| **FDE** | Forward Deployed Engineer，驻场交付工程师（把通用平台翻成客户业务系统的人） |

---

*本手册随项目演进更新；任何一条结论若与实测冲突，以实测为准，并把冲突写回本文件。*
