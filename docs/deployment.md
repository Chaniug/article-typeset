# 部署指南

本项目是纯静态站点（React + Vite + TypeScript），构建产物为 `dist/`，可托管到任意静态平台。当前默认推荐 **GitHub Pages**（由 GitHub Actions 自动构建发布），也可部署到 Cloudflare Pages。

> `vite.config.ts` 中 `base` 已设为相对路径 `./`，因此同一份构建产物同时兼容：
> - GitHub Pages 默认子路径 `https://<user>.github.io/<repo>/`
> - 后续绑定的自定义域名（根路径）

## 1. 构建本地验证

```bash
npm install
npm run build     # 产物输出到 dist/
npm run preview   # 本地预览构建结果
```

## 2. 部署到 GitHub Pages（推荐，零额外服务）

利用 GitHub Actions 自动构建并发布到 GitHub Pages，默认域名为 `https://<user>.github.io/<repo>/`，后续可在仓库 Settings → Pages → Custom domain 绑定自有域名。

### 方式 A：网页端启用（最直观）
1. 确保代码已推送到 GitHub 默认分支 `main`（本仓库已包含 `.github/workflows/deploy.yml`）。
2. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
3. push 到 `main`（或手动在 Actions 页触发 `Deploy to GitHub Pages`）即自动构建并发布。
4. 完成后访问 `https://<user>.github.io/<repo>/`。

### 方式 B：通过 CLI 启用
```bash
# 将仓库 Pages 站点配置为「由 GitHub Actions 工作流部署」
gh api -X POST /repos/<owner>/<repo>/pages -f build_type=workflow
```

### 绑定自定义域名（稍后自行操作）
- 仓库 **Settings → Pages → Custom domain** 输入你的域名，按提示添加 CNAME 记录并完成验证。
- 勾选 **Enforce HTTPS**（证书自动签发）。
- 自定义域名生效后再访问，无需重新构建（`base: './'` 已保证路径正确）。

## 3. 部署到 Cloudflare Pages（备选）

1. 登录 Cloudflare 控制台 → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 选择你的 GitHub 仓库。
3. 构建设置：
   - **Framework preset**：`Vite`
   - **Build command**：`npm run build`
   - **Output directory**：`dist`
   - **Node.js version**：`20`（可在「Settings → Build & deployments → Environment variables」设置 `NODE_VERSION=20`；`package.json` 的 `engines` 也已声明）。
4. 保存并部署。每次 push 到主分支会自动重新构建。
5. 绑定自有域名：
   - **Custom domains** → 输入你的 CF 域名（如 `typeset.example.com`）。
   - 若域名 DNS 托管在 Cloudflare，CNAME / 验证自动完成；否则按提示添加 CNAME 记录指向 `<project>.pages.dev`。
   - HTTPS 证书默认自动签发。

## 4. 可选：链接导入代理（Cloudflare Worker）

文章链接导入需要绕过浏览器跨域限制，由一个极小的 Cloudflare Worker 充当代理。详见 [`worker/README.md`](../worker/README.md)。

部署后，在项目根目录创建 `.env`：

```bash
VITE_LINK_PROXY_URL=https://your-worker.<sub>.workers.dev
```

不设该变量时，「链接导入」会提示不可用，其余功能不受影响。

## 5. 环境变量说明

| 变量 | 作用 | 是否必填 |
|------|------|----------|
| `VITE_LINK_PROXY_URL` | 链接导入的 Worker 代理地址 | 否（仅链接导入需要） |

所有变量均在**构建期**注入（Vite 的 `import.meta.env`），部署时请在对应平台的 Environment variables 中配置。
