# 恢复与验真 · dsh-colors

> 目标：**十年后拿到一个 zip，也能恢复到可用并验证它没被改过。**

## 1. 从归档恢复

```powershell
# 1) 解压（zip 或 tgz 都行）
Expand-Archive dsh-colors-0.9.9.zip -DestinationPath C:\Users\dream\dsh-dev\
#    或： tar -xzf dsh-colors-0.9.9.tgz -C C:\Users\dream\dsh-dev\

# 2) 验真：逐个文件核对哈希
cd C:\Users\dream\dsh-dev\dsh-colors
Get-Content MANIFEST.sha256 | ForEach-Object {
  $h, $p = $_ -split '  ', 2
  $calc = (Get-FileHash -Algorithm SHA256 -LiteralPath $p).Hash.ToLower()
  if ($calc -ne $h) { "MISMATCH $p" } else { "ok $p" }
}

# 3) 重建并自测
node build.mjs
node tests/breaker.test.mjs; node tests/state.test.mjs; node tests/wcag.test.mjs; node tests/bundle-smoke.mjs

# 4) 安装到 profile
dsh plugin --profile desktop add C:\Users\dream\dsh-dev\dsh-colors
#    或从 GitHub：dsh plugin --profile desktop add github:<owner>/dsh-colors#v0.9.9

# 5) 重启 dsh web 并强制刷新浏览器
```

## 2. profile 手工修复（当 link 断链时）

profile 目录：`C:\Users\dream\.dsh\profiles\desktop\`

```powershell
# 备份
Copy-Item package.json "package.json.bak-$(Get-Date -Format yyyyMMdd-HHmmss)"
Copy-Item pnpm-lock.yaml "pnpm-lock.yaml.bak-$(Get-Date -Format yyyyMMdd-HHmmss)"

# 依赖行（package.json 的 dependencies 与 dsh.profile.bundles 各一处）
#   "dsh-colors": "link:C:/Users/dream/dsh-dev/dsh-colors"

# node_modules 里的联接（不需要跑 pnpm install）
cmd /c mklink /J "C:\Users\dream\.dsh\profiles\desktop\node_modules\dsh-colors" "C:\Users\dream\dsh-dev\dsh-colors"
```

之后**完全重启 dsh web**（bundle 列表在启动时读取）。

> 事故记录：DSH 的"不加载任何插件重启"会把 `cordis.patch.yml` 写回默认并清空 bundle 列表。
> 好版本备份在 `…\.deepseek\.dsh-plugins\_recovery\`（`cordis.patch.yml`、`profile-package.json`）。

## 3. 卸载

```powershell
dsh plugin --profile desktop remove dsh-colors
```
或从插件页停用；插件卸载时会清空自己写入的全部令牌层与样式表（S10）。设置数据保留在
localStorage 的 `dsh-colors.state.v1`，需要时在浏览器控制台删除即可。