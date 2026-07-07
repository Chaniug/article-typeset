// Cloudflare Worker：链接导入的 CORS 代理。
// 仅做「抓取目标页 HTML」并返回（正文提取在浏览器内用 Readability 完成）。
// 部署：在 worker/ 目录执行 `wrangler deploy`（详见 worker/README.md）。

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) {
      return new Response('Missing ?url= parameter', { status: 400 });
    }

    // 基本安全校验：仅允许 http/https
    if (!/^https?:\/\//i.test(target)) {
      return new Response('Invalid url', { status: 400 });
    }

    try {
      const res = await fetch(target, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ArticleTypesetBot/1.0)',
        },
        redirect: 'follow',
      });
      const body = await res.text();
      return new Response(body, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=600',
        },
      });
    } catch (err) {
      return new Response('Fetch error: ' + (err as Error).message, { status: 502 });
    }
  },
};
