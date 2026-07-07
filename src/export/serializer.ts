import { Theme, DividerType } from '../themes/types';
import {
  headingStyle,
  paragraphStyle,
  leadStyle,
  quoteStyle,
  cardStyle,
  imageStyle,
  captionStyle,
  codeStyle,
  linkStyle,
  listStyle,
  listItemStyle,
  dividerHtml,
} from '../themes/compiler';
import { escapeHtml, escapeAttr, toInlineStyle, getNodeText } from '../lib/utils';

export interface PMMark {
  type: string;
  attrs?: Record<string, any>;
}
export interface PMNode {
  type?: string;
  attrs?: Record<string, any>;
  content?: PMNode[];
  marks?: PMMark[];
  text?: string;
}

function renderMarks(text: string, marks: PMMark[] | undefined, theme: Theme): string {
  let out = escapeHtml(text);
  for (const m of marks ?? []) {
    switch (m.type) {
      case 'bold':
        out = `<strong>${out}</strong>`;
        break;
      case 'italic':
        out = `<em>${out}</em>`;
        break;
      case 'underline':
        out = `<u>${out}</u>`;
        break;
      case 'strike':
        out = `<s>${out}</s>`;
        break;
      case 'code':
        out = `<code style="${codeStyle(theme)}">${out}</code>`;
        break;
      case 'link': {
        const href = m.attrs?.href ?? '#';
        out = `<a href="${escapeAttr(href)}" style="${linkStyle(theme)}">${out}</a>`;
        break;
      }
    }
  }
  return out;
}

function renderInline(nodes: PMNode[] | undefined, theme: Theme): string {
  if (!nodes) return '';
  return nodes
    .map((n) => {
      if (n.type === 'text') return renderMarks(n.text ?? '', n.marks, theme);
      if (n.type === 'hardBreak') return '<br/>';
      return '';
    })
    .join('');
}

function renderCard(node: PMNode, theme: Theme): string {
  const title = node.attrs?.title ?? '';
  const body = node.attrs?.body ?? '';
  const titleStyle = toInlineStyle({
    fontWeight: 700,
    fontSize: theme.base.fontSize,
    margin: '0 0 6px',
    color: theme.tokens.primary,
  });
  const bodyStyle = toInlineStyle({ margin: 0, color: theme.base.color, lineHeight: theme.base.lineHeight });
  return `<section style="${cardStyle(theme)}"><p style="${titleStyle}">${escapeHtml(
    title,
  )}</p><p style="${bodyStyle}">${escapeHtml(body)}</p></section>`;
}

function renderQuoteBox(node: PMNode, theme: Theme): string {
  const text = node.attrs?.text ?? '';
  return `<section style="${quoteStyle(theme)}"><p style="margin:0;">${escapeHtml(text)}</p></section>`;
}

function renderImageFrame(node: PMNode, theme: Theme): string {
  const src = node.attrs?.src ?? '';
  const alt = node.attrs?.alt ?? '';
  const caption = node.attrs?.caption ?? '';
  return `<section style="margin:16px 0;"><img src="${escapeAttr(
    src,
  )}" alt="${escapeAttr(alt)}" style="${imageStyle(theme)}" /><p style="${captionStyle(
    theme,
  )}">${escapeHtml(caption)}</p></section>`;
}

function renderDivider(node: PMNode, theme: Theme): string {
  const variant = (node.attrs?.variant ?? theme.divider.type) as DividerType;
  return dividerHtml(theme, variant);
}

export function renderBlock(node: PMNode, theme: Theme): string {
  switch (node.type) {
    case 'paragraph': {
      const isLead = node.attrs?.class === 'lead' || node.attrs?.lead === true;
      const style = isLead ? leadStyle(theme) : paragraphStyle(theme);
      return `<p style="${style}">${renderInline(node.content, theme)}</p>`;
    }
    case 'heading': {
      const level = Math.min(3, Math.max(1, node.attrs?.level ?? 2)) as 1 | 2 | 3;
      const tag = `h${level}`;
      return `<${tag} style="${headingStyle(theme, level)}">${renderInline(
        node.content,
        theme,
      )}</${tag}>`;
    }
    case 'blockquote': {
      const inner = (node.content ?? []).map((c) => renderBlock(c, theme)).join('');
      return `<section style="${quoteStyle(theme)}">${inner}</section>`;
    }
    case 'bulletList':
    case 'orderedList': {
      const tag = node.type === 'orderedList' ? 'ol' : 'ul';
      const items = (node.content ?? [])
        .map((li) => renderBlock(li, theme))
        .join('');
      return `<${tag} style="${listStyle()}">${items}</${tag}>`;
    }
    case 'listItem': {
      const inner = (node.content ?? []).map((c) => renderBlock(c, theme)).join('');
      return `<li style="${listItemStyle()}">${inner}</li>`;
    }
    case 'image': {
      const src = node.attrs?.src ?? '';
      const alt = node.attrs?.alt ?? '';
      return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" style="${imageStyle(
        theme,
      )}" />`;
    }
    case 'horizontalRule':
      return dividerHtml(theme, 'line');
    case 'card':
      return renderCard(node, theme);
    case 'quoteBox':
      return renderQuoteBox(node, theme);
    case 'divider':
      return renderDivider(node, theme);
    case 'imageFrame':
      return renderImageFrame(node, theme);
    default:
      return (node.content ?? []).map((c) => renderBlock(c, theme)).join('');
  }
}

/** 将 ProseMirror JSON 文档序列化为「全内联样式」的 HTML（不含根容器）。 */
export function serialize(doc: PMNode, theme: Theme): string {
  const content = doc.content ?? [];
  return content.map((node) => renderBlock(node, theme)).join('');
}

/** 取文档纯文本（用于复制时的 text/plain 兜底）。 */
export function getPlainText(doc: PMNode): string {
  return getNodeText(doc);
}
