// 通用工具：内联样式拼接、HTML 转义等。这些函数不依赖 DOM，纯字符串处理。

export function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

export type StyleValue = string | number | undefined;

/** 把 camelCase 的样式对象拼成内联 style 字符串（如 {fontSize:'16px'} -> "font-size:16px"）。 */
export function toInlineStyle(style: Record<string, any>): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(style)) {
    if (v === undefined || v === null || v === '') continue;
    parts.push(`${camelToKebab(k)}:${v}`);
  }
  return parts.join(';');
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function escapeAttr(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** 递归取出节点中的纯文本（用于复制时的 text/plain 兜底）。 */
export function getNodeText(node: any): string {
  if (!node) return '';
  if (node.type === 'text') return node.text ?? '';
  if (!node.content) return '';
  return node.content.map(getNodeText).join('');
}
