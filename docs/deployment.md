# 部署指南

本项目是纯静态站点（React + Vite + TypeScript），构建产物为 `dist/`，可托管到任意静态平台。推荐 **GitHub（源码）+ Cloudflare Pages（部署）+ 自有 CF 域名** 组合。

## 1. 构建本地验证

```bash
npm install
npm run build     # 产物输出到 dist/
npm run preview   # 本地预览构建结果
```

## 2. 部署到 Cloudflare Pages

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

## 3. 可选：链接导入代理（Cloudflare Worker）

文章链接导入需要绕过浏览器跨域限制，由一个极小的 Cloudflare Worker 充当代理。详见 [`worker/README.md`](../worker/README.md)。

部署后，在项目根目录创建 `.env`：

```
VITE_LINK_PROXY_URL=https://your-worker.<sub>.workers.dev
```

不设该变量时，「链接导入」会提示不可用，其余功能不受影响。

## 4. 环境变量说明

| 变量 | 作用 | 是否必填 |
|------|------|----------|
| `VITE_LINK_PROXY_URL` | 链接导入的 Worker 代理地址 | 否（仅链接导入需要） |

所有变量均在**构建期**注入（Vite 的 `import.meta.env`），部署时请在 Cloudflare Pages 的 Environment variables 中配置。
