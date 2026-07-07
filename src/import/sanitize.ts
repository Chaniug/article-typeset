import DOMPurify from 'dompurify';

/** 清洗导入的 HTML（防 XSS），保留排版常用标签与 style/src。 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['img', 'section', 'figure', 'figcaption', 'hr', 'br'],
    ADD_ATTR: ['style', 'src', 'alt', 'class', 'target', 'rel'],
  });
}
