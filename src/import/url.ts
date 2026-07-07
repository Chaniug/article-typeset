import { Readability } from '@mozilla/readability';
import { sanitizeHtml } from './sanitize';

const PROXY = import.meta.env.VITE_LINK_PROXY_URL;

/** 是否配置了链接导入代理（Cloudflare Worker）。 */
export function isLinkImportEnabled(): boolean {
  return Boolean(PROXY);
}

/** 文章链接 -> 正文 HTML：经 Worker 代理抓取，浏览器内用 Readability 提取。 */
export async function urlToHtml(url: string): Promise<string> {
  if (!PROXY) throw new Error('未配置链接代理（VITE_LINK_PROXY_URL）');
  const res = await fetch(`${PROXY}?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`抓取失败（${res.status}）`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const article = new Readability(doc).parse();
  const content = article?.content ?? doc.body.innerHTML;
  return sanitizeHtml(content);
}
