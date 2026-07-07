import { marked } from 'marked';
import { sanitizeHtml } from './sanitize';

/** Markdown -> 安全 HTML（再交给编辑器 setContent 解析为结构化文档）。 */
export function markdownToHtml(md: string): string {
  marked.setOptions({ breaks: true, gfm: true });
  const raw = marked.parse(md) as string;
  return sanitizeHtml(raw);
}
