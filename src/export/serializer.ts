import { Theme, DividerType, HeadingVariant } from '../themes/types';
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
  highlightStyle,
} from '../themes/compiler';
import { escapeHtml, escapeAttr, toInlineStyle, getNodeText } from '../lib/utils';

export interface PMMark {
  type: string;
  attrs?: Record<string, any>;
}
export interface GridImage {
  src?: string;
  caption?: string;
}
export interface PMNode {
  type?: string;
  attrs?: Record<string, any>;
  content?: PMNode[];
  marks?: PMMark[];
  text?: string;
}

/** 序列化上下文：用于在文档遍历中维护标题/步骤的自动编号。 */
interface Ctx {
  hCounters: Record<number, number>;
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
      case 'highlight':
        out = `<span style="${highlightStyle(theme)}">${out}</span>`;
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

/** 标题装饰渲染：根据 variant 生成「外包装样式 + 内联装饰样式」。 */
function renderHeading(node: PMNode, theme: Theme, ctx: Ctx): string {
  const level = Math.min(3, Math.max(1, node.attrs?.level ?? 2)) as 1 | 2 | 3;
  const tag = `h${level}`;
  const s = theme.heading[`h${level}`];
  const variant: HeadingVariant = s.variant ?? 'plain';
  const inner = renderInline(node.content, theme);

  // 外包装样式（字号/字重/间距/对齐），装饰交给内部 span
  const wrap = toInlineStyle({
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    color: s.color,
    lineHeight: s.lineHeight,
    marginTop: s.marginTop,
    marginBottom: s.marginBottom,
    textAlign: s.textAlign,
    letterSpacing: s.letterSpacing,
    margin: s.margin,
  });

  if (variant === 'plain') {
    return `<${tag} style="${headingStyle(theme, level)}">${inner}</${tag}>`;
  }

  const accent = s.accentColor ?? theme.tokens.primary;

  if (variant === 'bar') {
    const style = toInlineStyle({
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      lineHeight: s.lineHeight,
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
      letterSpacing: s.letterSpacing,
      borderLeft: s.borderLeft ?? `4px solid ${accent}`,
      paddingLeft: s.paddingLeft ?? '12px',
    });
    return `<${tag} style="${style}">${inner}</${tag}>`;
  }

  if (variant === 'underline') {
    const style = toInlineStyle({
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      lineHeight: s.lineHeight,
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
      letterSpacing: s.letterSpacing,
      borderBottom: s.borderBottom ?? `3px solid ${accent}`,
      paddingBottom: s.paddingBottom ?? '6px',
      display: s.display ?? 'inline-block',
    });
    return `<${tag} style="${style}">${inner}</${tag}>`;
  }

  if (variant === 'gradient') {
    const from = s.gradientFrom ?? accent;
    const to = s.gradientTo ?? theme.tokens.secondary;
    const gstyle = toInlineStyle({
      background: `linear-gradient(90deg, ${from}, ${to})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      textShadow: s.textShadow,
    });
    return `<${tag} style="${wrap}"><span style="${gstyle}">${inner}</span></${tag}>`;
  }

  if (variant === 'number') {
    ctx.hCounters[level] = (ctx.hCounters[level] ?? 0) + 1;
    const num = String(ctx.hCounters[level]).padStart(2, '0');
    const badge = toInlineStyle({
      display: 'inline-block',
      minWidth: '1.9em',
      marginRight: '10px',
      padding: '2px 8px',
      background: s.blockBg ?? accent,
      color: s.blockColor ?? '#ffffff',
      borderRadius: s.blockRadius ?? '999px',
      fontWeight: 800,
      textAlign: 'center',
    });
    return `<${tag} style="${wrap}"><span style="${badge}">${num}</span>${inner}</${tag}>`;
  }

  // block / pill：色块包裹文字
  const isPill = variant === 'pill';
  const decor = toInlineStyle({
    display: isPill ? 'inline-block' : 'inline',
    background: s.blockBg ?? accent,
    color: s.blockColor ?? '#ffffff',
    padding: s.blockPadding ?? (isPill ? '6px 18px' : '4px 12px'),
    borderRadius: s.blockRadius ?? (isPill ? '999px' : theme.tokens.radius),
    border: s.border,
    fontWeight: s.fontWeight,
    letterSpacing: s.letterSpacing,
    boxDecorationBreak: 'clone',
    WebkitBoxDecorationBreak: 'clone',
  });
  return `<${tag} style="${wrap}"><span style="${decor}">${inner}</span></${tag}>`;
}

function renderCard(node: PMNode, theme: Theme): string {
  const variant = (node.attrs?.variant ?? 'default') as string;
  const title = node.attrs?.title ?? '';
  const body = node.attrs?.body ?? '';
  const icon = node.attrs?.icon ?? '';
  const primary = theme.tokens.primary;
  const radius = theme.tokens.radius;

  const titleStyle = toInlineStyle({
    fontWeight: 700,
    fontSize: '16px',
    margin: '0 0 6px',
    color: variant === 'default' ? primary : theme.base.color,
  });
  const bodyStyle = toInlineStyle({
    margin: 0,
    color: theme.base.color,
    lineHeight: theme.base.lineHeight,
  });

  if (variant === 'icon' || variant === 'step') {
    const badgeBg = variant === 'step' ? primary : primary;
    const badge = toInlineStyle({
      flex: '0 0 auto',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: badgeBg,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 700,
      marginRight: '12px',
    });
    const boxStyle = toInlineStyle({
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      background: theme.card.background ?? '#f6f8fa',
      border: theme.card.border ?? '1px solid #eef0f3',
      borderRadius: radius,
      padding: '16px',
      margin: '16px 0',
    });
    return `<section style="${boxStyle}"><span style="${badge}">${escapeHtml(
      icon || (variant === 'step' ? '1' : '★'),
    )}</span><div><p style="${titleStyle}">${escapeHtml(title)}</p><p style="${bodyStyle}">${escapeHtml(
      body,
    )}</p></div></section>`;
  }

  if (variant === 'quote') {
    const boxStyle = toInlineStyle({
      background: theme.card.background ?? '#f6f8fa',
      border: theme.card.border ?? `1px solid ${primary}`,
      borderLeft: `4px solid ${primary}`,
      borderRadius: radius,
      padding: '18px 20px',
      margin: '16px 0',
    });
    return `<section style="${boxStyle}"><p style="${toInlineStyle({
      margin: '0 0 6px',
      fontSize: '22px',
      color: primary,
      fontWeight: 800,
      lineHeight: 1,
    })}">“</p><p style="${toInlineStyle({
      margin: 0,
      fontSize: '17px',
      fontStyle: 'italic',
      color: theme.base.color,
      lineHeight: theme.base.lineHeight,
    })}">${escapeHtml(body || title)}</p></section>`;
  }

  if (variant === 'bubble') {
    const boxStyle = toInlineStyle({
      background: theme.card.background ?? '#eef6ff',
      border: theme.card.border ?? `1px solid ${primary}`,
      borderRadius: '18px',
      borderBottomLeftRadius: '4px',
      padding: '14px 16px',
      margin: '16px 0',
    });
    return `<section style="${boxStyle}"><p style="${toInlineStyle({
      margin: '0 0 4px',
      fontWeight: 700,
      color: primary,
    })}">${escapeHtml(icon || '💬')} ${escapeHtml(title)}</p><p style="${bodyStyle}">${escapeHtml(
      body,
    )}</p></section>`;
  }

  if (variant === 'note') {
    const boxStyle = toInlineStyle({
      background: theme.card.background ?? '#fffdf5',
      border: theme.card.border ?? `1px solid ${primary}55`,
      borderLeft: `5px solid ${primary}`,
      borderRadius: radius,
      padding: '16px 18px',
      margin: '16px 0',
      boxShadow: '0 6px 16px rgba(0,0,0,.05)',
    });
    return `<section style="${boxStyle}"><p style="${titleStyle}">${escapeHtml(
      icon ? `${icon} ${title}` : title,
    )}</p><p style="${bodyStyle}">${escapeHtml(body)}</p></section>`;
  }

  // default
  const boxStyle = cardStyle(theme);
  return `<section style="${boxStyle}"><p style="${titleStyle}">${escapeHtml(
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
  const variant = (node.attrs?.variant ?? 'rounded') as string;
  const extra: Record<string, any> = {};
  if (variant === 'circle') {
    extra.borderRadius = '50%';
    extra.aspectRatio = '1 / 1';
    extra.objectFit = 'cover';
    extra.border = `3px solid ${theme.tokens.primary}`;
  } else if (variant === 'shadow') {
    extra.borderRadius = '14px';
    extra.boxShadow = '0 10px 28px rgba(0,0,0,.18)';
  } else if (variant === 'border') {
    extra.borderRadius = '12px';
    extra.border = `2px solid ${theme.tokens.primary}`;
  } else if (variant === 'plain') {
    extra.borderRadius = '0';
  } else {
    extra.borderRadius = theme.image.borderRadius ?? '12px';
  }
  const imgStyle = toInlineStyle({
    display: 'block',
    width: '100%',
    margin: '0 auto',
    borderRadius: extra.borderRadius,
    border: extra.border,
    boxShadow: extra.boxShadow,
    aspectRatio: extra.aspectRatio,
    objectFit: extra.objectFit,
  });
  return `<section style="margin:16px 0;"><img src="${escapeAttr(src)}" alt="${escapeAttr(
    alt,
  )}" style="${imgStyle}" /><p style="${captionStyle(theme)}">${escapeHtml(caption)}</p></section>`;
}

function renderImageGrid(node: PMNode, theme: Theme): string {
  const images = (node.attrs?.images ?? []) as GridImage[];
  const radius = (node.attrs?.radius as string) ?? theme.image.borderRadius ?? '12px';
  const gap = (node.attrs?.gap as string) ?? '8px';
  const n = Math.max(1, images.length);
  const colWidth = `calc((100% - ${gap} * ${n - 1}) / ${n})`;
  const row = toInlineStyle({
    display: 'flex',
    gap,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '16px 0',
  });
  const cols = images
    .map((im) => {
      const imgStyle = toInlineStyle({
        display: 'block',
        width: '100%',
        borderRadius: radius,
        border: theme.image.border,
      });
      return `<section style="${toInlineStyle({
        width: colWidth,
        flex: `0 0 ${colWidth}`,
      })}"><img src="${escapeAttr(im.src ?? '')}" alt="${escapeAttr(
        im.caption ?? '',
      )}" style="${imgStyle}" /><p style="${captionStyle(theme)}">${escapeHtml(im.caption ?? '')}</p></section>`;
    })
    .join('');
  return `<section style="${row}">${cols}</section>`;
}

function renderWidget(node: PMNode, theme: Theme): string {
  const variant = (node.attrs?.variant ?? 'follow') as string;
  const text = (node.attrs?.text as string) ?? '';
  const primary = theme.tokens.primary;
  const secondary = theme.tokens.secondary;
  const radius = theme.tokens.radius;

  if (variant === 'follow') {
    const box = toInlineStyle({
      background: primary,
      color: '#fff',
      borderRadius: radius,
      padding: '14px 18px',
      margin: '18px 0',
      textAlign: 'center',
      fontSize: '15px',
      fontWeight: 600,
      letterSpacing: '1px',
    });
    const arrow = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-left:6px" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><animateTransform attributeName="transform" type="translate" values="0 3; 0 -3; 0 3" dur="1.3s" repeatCount="indefinite"/></path></svg>`;
    return `<section style="${box}">${escapeHtml(text || '点击上方蓝字「关注我们」，不错过每篇干货')}${arrow}</section>`;
  }

  if (variant === 'like') {
    const pill = (color: string) =>
      toInlineStyle({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: '#fff',
        color,
        border: `1.5px solid ${color}`,
        borderRadius: '999px',
        padding: '8px 18px',
        fontSize: '14px',
        fontWeight: 700,
      });
    const heart = `<svg width="18" height="22" viewBox="0 0 18 22" style="vertical-align:middle" xmlns="http://www.w3.org/2000/svg"><text x="9" y="15" font-size="13" text-anchor="middle" fill="${secondary}">❤<animateTransform attributeName="transform" type="translate" values="0 0; 0 -12" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite"/></text></svg>`;
    const row = toInlineStyle({
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      margin: '18px 0',
    });
    return `<section style="${row}"><span style="${pill(
      primary,
    )}">👍 点赞</span><span style="${pill(secondary)}">❤ 在看 ${heart}</span></section>`;
  }

  if (variant === 'qr') {
    const box = toInlineStyle({
      background: theme.card.background ?? '#f6f8fa',
      border: theme.card.border ?? `1px solid ${primary}`,
      borderRadius: radius,
      padding: '18px',
      margin: '18px 0',
      textAlign: 'center',
    });
    const qr = toInlineStyle({
      width: '120px',
      height: '120px',
      margin: '0 auto 10px',
      background: `repeating-conic-gradient(#222 0 25%, #fff 0 50%) 50% / 16px 16px`,
      borderRadius: '8px',
      border: '4px solid #fff',
      boxShadow: '0 4px 14px rgba(0,0,0,.12)',
    });
    return `<section style="${box}"><section style="${qr}"></section><p style="${toInlineStyle({
      margin: 0,
      fontWeight: 700,
      color: theme.base.color,
    })}">${escapeHtml(text || '长按识别二维码，关注我们')}</p></section>`;
  }

  if (variant === 'past') {
    const box = toInlineStyle({
      background: theme.card.background ?? '#f6f8fa',
      border: theme.card.border ?? `1px solid ${primary}55`,
      borderRadius: radius,
      padding: '16px 18px',
      margin: '18px 0',
    });
    const items = (text || '往期推荐一 / 往期推荐二 / 往期推荐三')
      .split('/')
      .map((t) => t.trim())
      .filter(Boolean)
      .map(
        (t) =>
          `<p style="${toInlineStyle({
            margin: '0 0 8px',
            color: primary,
            fontWeight: 600,
          })}">🔗 ${escapeHtml(t)}</p>`,
      )
      .join('');
    return `<section style="${box}"><p style="${toInlineStyle({
      margin: '0 0 10px',
      fontWeight: 800,
      color: theme.base.color,
    })}">📚 往期推荐</p>${items}</section>`;
  }

  if (variant === 'timeline') {
    const events = (text || '阶段一：准备 / 阶段二：执行 / 阶段三：复盘')
      .split('/')
      .map((t) => t.trim())
      .filter(Boolean);
    const box = toInlineStyle({
      background: theme.card.background ?? '#fff',
      border: theme.card.border ?? `1px solid #eef0f3`,
      borderRadius: radius,
      padding: '16px 18px 16px 16px',
      margin: '18px 0',
    });
    const rows = events
      .map((ev, i) => {
        const dot = toInlineStyle({
          flex: '0 0 auto',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: i === 0 ? primary : secondary,
          marginTop: '4px',
          marginRight: '10px',
        });
        return `<section style="${toInlineStyle({
          display: 'flex',
          alignItems: 'flex-start',
          margin: '0 0 12px',
        })}"><span style="${dot}"></span><span style="${toInlineStyle({
          color: theme.base.color,
          fontWeight: 600,
        })}">${escapeHtml(ev)}</span></section>`;
      })
      .join('');
    return `<section style="${box}">${rows}</section>`;
  }

  // steps
  const steps = (text || '第一步 / 第二步 / 第三步')
    .split('/')
    .map((t) => t.trim())
    .filter(Boolean);
  const box = toInlineStyle({
    background: theme.card.background ?? '#f6f8fa',
    borderRadius: radius,
    padding: '16px 18px',
    margin: '18px 0',
  });
  const rows = steps
    .map((st, i) => {
      const badge = toInlineStyle({
        flex: '0 0 auto',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: primary,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 700,
        marginRight: '10px',
      });
      return `<section style="${toInlineStyle({
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 10px',
      })}"><span style="${badge}">${i + 1}</span><span style="${toInlineStyle({
        color: theme.base.color,
      })}">${escapeHtml(st)}</span></section>`;
    })
    .join('');
  return `<section style="${box}">${rows}</section>`;
}

function renderDivider(node: PMNode, theme: Theme): string {
  const variant = (node.attrs?.variant ?? theme.divider.type) as DividerType;
  return dividerHtml(theme, variant);
}

export function renderBlock(node: PMNode, theme: Theme, ctx: Ctx): string {
  switch (node.type) {
    case 'paragraph': {
      const isLead = node.attrs?.class === 'lead' || node.attrs?.lead === true;
      const style = isLead ? leadStyle(theme) : paragraphStyle(theme);
      return `<p style="${style}">${renderInline(node.content, theme)}</p>`;
    }
    case 'heading':
      return renderHeading(node, theme, ctx);
    case 'blockquote': {
      const inner = (node.content ?? []).map((c) => renderBlock(c, theme, ctx)).join('');
      return `<section style="${quoteStyle(theme)}">${inner}</section>`;
    }
    case 'bulletList':
    case 'orderedList': {
      const tag = node.type === 'orderedList' ? 'ol' : 'ul';
      const items = (node.content ?? []).map((li) => renderBlock(li, theme, ctx)).join('');
      return `<${tag} style="${listStyle()}">${items}</${tag}>`;
    }
    case 'listItem': {
      const inner = (node.content ?? []).map((c) => renderBlock(c, theme, ctx)).join('');
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
    case 'imageGrid':
      return renderImageGrid(node, theme);
    case 'widget':
      return renderWidget(node, theme);
    default:
      return (node.content ?? []).map((c) => renderBlock(c, theme, ctx)).join('');
  }
}

/** 将 ProseMirror JSON 文档序列化为「全内联样式」的 HTML（不含根容器）。 */
export function serialize(doc: PMNode, theme: Theme): string {
  const ctx: Ctx = { hCounters: {} };
  const content = doc.content ?? [];
  return content.map((node) => renderBlock(node, theme, ctx)).join('');
}

/** 取文档纯文本（用于复制时的 text/plain 兜底）。 */
export function getPlainText(doc: PMNode): string {
  return getNodeText(doc);
}
