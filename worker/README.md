# 链接导入代理（可选 Cloudflare Worker）

文章链接导入需要绕过浏览器跨域（CORS）限制。本 Worker 只做一件事：接收 `?url=`，抓取目标页 HTML 并返回（带 `Access-Control-Allow-Origin: *`）。正文提取在浏览器内用 `@mozilla/readability` 完成，因此 Worker 无需任何 DOM 依赖。

## 部署

```bash
cd worker
npm install -g wrangler      # 若未安装
wrangler login
wrangler deploy
```

部署后你会得到一个地址，例如 `https://article-typeset-link-proxy.<sub>.workers.dev`。

## 前端配置

在项目根目录创建 `.env`（已被 .gitignore 忽略，切勿提交），写入：

```
VITE_LINK_PROXY_URL=https://article-typeset-link-proxy.<sub>.workers.dev
```

不设该变量时，「链接导入」按钮会提示功能不可用，其余功能不受影响。

## 可选：挂到自有域名子路径

若你希望代理与站点同域（如 `https://your-domain.com/api/link`），可在 Cloudflare 仪表盘为该 Worker 配置路由，并将 `VITE_LINK_PROXY_URL` 指向该路径。
