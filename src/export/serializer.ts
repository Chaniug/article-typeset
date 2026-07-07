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

/** 英文衬线（用于层叠/超大锚点的装饰底纹，营造杂志感）。 */
const SERIF_EN = "Georgia,'Times New Roman',serif";

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

/** 粘贴兼容模式开关：微信/各平台编辑器会剥离 <svg>、position:absolute、
 *  background-clip:text 透明字等写法，compat 下生成平台安全的降级 HTML。
 *  由 serialize() 同步设置，renderBlock 内同步用完，无竞态。 */
let COMPAT = false;

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
    fontFamily: s.fontFamily,
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
      fontFamily: s.fontFamily,
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
      fontFamily: s.fontFamily,
      borderBottom: s.borderBottom ?? `3px solid ${accent}`,
      paddingBottom: s.paddingBottom ?? '6px',
      display: s.display ?? 'inline-block',
    });
    return `<${tag} style="${style}">${inner}</${tag}>`;
  }

  if (variant === 'gradient') {
    const from = s.gradientFrom ?? accent;
    const to = s.gradientTo ?? theme.tokens.secondary;
    if (COMPAT) {
      // 微信不支持 background-clip:text，透明字会不可见 → 回退渐变起色实色
      const gstyle = toInlineStyle({
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: from,
      });
      return `<${tag} style="${wrap}"><span style="${gstyle}">${inner}</span></${tag}>`;
    }
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

  // —— 层叠标题（叠放）：超大半透明底纹垫底，小标题叠在其上产生纵深 ——
  if (variant === 'layered') {
    const decor = s.decorText ?? '01';
    const decorSize = s.decorSize ?? '64px';
    const decorColor = s.decorColor ?? 'rgba(0,0,0,.07)';
    const frontStyle = toInlineStyle({
      display: 'block',
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
      textAlign: s.textAlign,
    });
    const wrapStyle = toInlineStyle({
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
      lineHeight: s.lineHeight,
    });
    if (COMPAT) {
      // 微信剥离 position:absolute，改用负 margin 让小标题压在大字底纹上形成叠放
      const backStyle = toInlineStyle({
        display: 'block',
        fontSize: decorSize,
        fontWeight: 900,
        lineHeight: 0.8,
        letterSpacing: '2px',
        color: decorColor,
        fontFamily: s.decorFont ?? SERIF_EN,
        margin: '0 0 -0.42em',
        textAlign: s.textAlign,
        userSelect: 'none',
        pointerEvents: 'none',
      });
      return `<${tag} style="${wrapStyle}"><span style="${backStyle}">${escapeHtml(
        decor,
      )}</span><span style="${frontStyle}">${inner}</span></${tag}>`;
    }
    const backStyle = toInlineStyle({
      position: 'absolute',
      left: s.decorAlign === 'right' ? 'auto' : '0',
      right: s.decorAlign === 'right' ? '0' : 'auto',
      top: s.decorTop ?? '-0.32em',
      fontSize: decorSize,
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '2px',
      color: decorColor,
      fontFamily: s.decorFont ?? SERIF_EN,
      margin: 0,
      zIndex: 0,
      userSelect: 'none',
      pointerEvents: 'none',
    });
    const frontStyleRel = toInlineStyle({
      position: 'relative',
      zIndex: 1,
      display: 'inline-block',
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
    });
    const wrapRel = toInlineStyle({
      position: 'relative',
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
      lineHeight: s.lineHeight,
    });
    return `<${tag} style="${wrapRel}"><span style="${backStyle}">${escapeHtml(
      decor,
    )}</span><span style="${frontStyleRel}">${inner}</span></${tag}>`;
  }

  // —— 超大锚点标题（display）：大号装饰英文/数字在上，小标题在下，强字号对比 ——
  if (variant === 'display') {
    const decor = s.decorText ?? '01';
    const decorSize = s.decorSize ?? '76px';
    const decorColor = s.decorColor ?? 'rgba(0,0,0,.10)';
    const backStyle = toInlineStyle({
      display: 'block',
      fontSize: decorSize,
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '2px',
      color: decorColor,
      fontFamily: s.decorFont ?? SERIF_EN,
      margin: '0 0 8px',
      textAlign: s.textAlign,
      userSelect: 'none',
      pointerEvents: 'none',
    });
    const frontStyle = toInlineStyle({
      display: 'block',
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
      textAlign: s.textAlign,
    });
    const wrapStyle = toInlineStyle({
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
      lineHeight: s.lineHeight,
    });
    return `<${tag} style="${wrapStyle}"><span style="${backStyle}">${escapeHtml(
      decor,
    )}</span><span style="${frontStyle}">${inner}</span></${tag}>`;
  }

  // —— 竖排标题（vertical）：逐字竖排（右起传统阅读），微信稳妥兼容 ——
  if (variant === 'vertical') {
    if (COMPAT) {
      // 微信对 flex 竖排支持不稳定，退化为普通横向标题（保留字号/颜色）
      const style = toInlineStyle({
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        color: s.color,
        letterSpacing: s.letterSpacing,
        fontFamily: s.fontFamily,
        textAlign: s.textAlign,
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        lineHeight: s.lineHeight,
      });
      return `<${tag} style="${style}">${inner}</${tag}>`;
    }
    const chars = Array.from(getNodeText(node));
    const charStyle = toInlineStyle({
      display: 'block',
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
      lineHeight: 1.25,
    });
    const wrapStyle = toInlineStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems:
        s.textAlign === 'center'
          ? 'center'
          : s.textAlign === 'right'
            ? 'flex-end'
            : 'flex-start',
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
    });
    const innerChars = chars
      .map((ch) => `<span style="${charStyle}">${ch === ' ' ? '&nbsp;' : escapeHtml(ch)}</span>`)
      .join('');
    return `<${tag} style="${wrapStyle}">${innerChars}</${tag}>`;
  }

  // —— 描边镂空标题（stroke）：描边 + 透明/浅填充，杂志感 ——
  if (variant === 'stroke') {
    const wrapStyle = toInlineStyle({
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
      lineHeight: s.lineHeight,
    });
    if (COMPAT) {
      // 透明字在部分微信环境不可见，回退实色（描边色），保留 webkit 描边增效
      const gstyle = toInlineStyle({
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        color: s.color && s.color !== 'transparent' ? s.color : accent,
        WebkitTextStroke: `${s.strokeWidth ?? '1.5px'} ${accent}`,
        letterSpacing: s.letterSpacing,
        fontFamily: s.fontFamily,
        lineHeight: s.lineHeight,
      });
      return `<${tag} style="${wrapStyle}"><span style="${gstyle}">${inner}</span></${tag}>`;
    }
    const gstyle = toInlineStyle({
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color ?? 'transparent',
      WebkitTextStroke: `${s.strokeWidth ?? '1.5px'} ${accent}`,
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
      lineHeight: s.lineHeight,
    });
    return `<${tag} style="${wrapStyle}"><span style="${gstyle}">${inner}</span></${tag}>`;
  }

  // —— 衬线文艺标题（serif）：衬线字体 + 细线，编辑式排版 ——
  if (variant === 'serif') {
    const style = toInlineStyle({
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      color: s.color,
      fontFamily: s.fontFamily ?? "Georgia,'Songti SC','Source Han Serif SC',serif",
      letterSpacing: s.letterSpacing,
      borderBottom: s.borderBottom ?? `2px solid ${accent}`,
      paddingBottom: s.paddingBottom ?? '8px',
      display: s.display ?? 'inline-block',
      marginTop: s.marginTop,
      marginBottom: s.marginBottom,
      textAlign: s.textAlign,
    });
    return `<${tag} style="${style}">${inner}</${tag}>`;
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
    fontFamily: s.fontFamily,
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
  const secondary = theme.tokens.secondary;
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

  // —— 四角框（frame）：科技感角标框，四角装饰线 ——
  if (variant === 'frame') {
    const outerStyle = toInlineStyle({
      background: theme.card.background ?? '#fff',
      border: `2px solid ${primary}`,
      borderRadius: radius,
      padding: '6px',
      margin: '18px 0',
    });
    const innerStyle = toInlineStyle({
      border: `1px solid ${secondary}`,
      borderRadius: `calc(${radius} - 2px)`,
      padding: '16px 18px',
    });
    if (COMPAT) {
      // 微信剥离 position:absolute，改用双线嵌套框保留科技感，无角标定位
      return `<section style="${outerStyle}"><section style="${innerStyle}"><p style="${titleStyle}">${escapeHtml(
        icon ? `${icon} ${title}` : title,
      )}</p><p style="${bodyStyle}">${escapeHtml(body)}</p></section></section>`;
    }
    const boxStyle = toInlineStyle({
      position: 'relative',
      background: theme.card.background ?? '#fff',
      border: theme.card.border ?? `1px solid ${primary}`,
      borderRadius: radius,
      padding: '20px 22px',
      margin: '18px 0',
    });
    const corner = (pos: 'tl' | 'tr' | 'bl' | 'br') => {
      const m: Record<string, string> = {
        tl: 'top:6px;left:6px;border-top-width:2px;border-left-width:2px;border-right-width:0;border-bottom-width:0',
        tr: 'top:6px;right:6px;border-top-width:2px;border-right-width:2px;border-left-width:0;border-bottom-width:0',
        bl: 'bottom:6px;left:6px;border-bottom-width:2px;border-left-width:2px;border-right-width:0;border-top-width:0',
        br: 'bottom:6px;right:6px;border-bottom-width:2px;border-right-width:2px;border-left-width:0;border-top-width:0',
      };
      return toInlineStyle({
        position: 'absolute',
        top: pos === 'tl' || pos === 'tr' ? '6px' : 'auto',
        left: pos === 'tl' || pos === 'bl' ? '6px' : 'auto',
        right: pos === 'tr' || pos === 'br' ? '6px' : 'auto',
        bottom: pos === 'bl' || pos === 'br' ? '6px' : 'auto',
        width: '14px',
        height: '14px',
        borderTop: m[pos].includes('border-top-width:2px') ? '2px solid' : '0',
        borderLeft: m[pos].includes('border-left-width:2px') ? '2px solid' : '0',
        borderRight: m[pos].includes('border-right-width:2px') ? '2px solid' : '0',
        borderBottom: m[pos].includes('border-bottom-width:2px') ? '2px solid' : '0',
        borderColor: secondary,
      });
    };
    return `<section style="${boxStyle}"><span style="${corner('tl')}"></span><span style="${corner(
      'tr',
    )}"></span><span style="${corner('bl')}"></span><span style="${corner(
      'br',
    )}"></span><p style="${titleStyle}">${escapeHtml(
      icon ? `${icon} ${title}` : title,
    )}</p><p style="${bodyStyle}">${escapeHtml(body)}</p></section>`;
  }

  // —— 标签框（tag）：顶部带一个标签胶囊的框 ——
  if (variant === 'tag') {
    const label = icon || title || 'NOTE';
    const boxStyle = toInlineStyle({
      position: 'relative',
      background: theme.card.background ?? '#fff',
      border: theme.card.border ?? `1px solid ${primary}55`,
      borderLeft: `4px solid ${primary}`,
      borderRadius: radius,
      padding: '20px 18px 16px',
      margin: '22px 0 16px',
    });
    const tagStyle = toInlineStyle({
      position: 'absolute',
      top: '-12px',
      left: '14px',
      background: primary,
      color: '#fff',
      fontSize: '12px',
      fontWeight: 700,
      padding: '3px 12px',
      borderRadius: '999px',
      letterSpacing: '1px',
    });
    if (COMPAT) {
      // 微信剥离 position:absolute，标签用负 margin 上移压在边框上
      const boxCompat = toInlineStyle({
        background: theme.card.background ?? '#fff',
        border: theme.card.border ?? `1px solid ${primary}55`,
        borderLeft: `4px solid ${primary}`,
        borderRadius: radius,
        padding: '0 18px 16px',
        margin: '22px 0 16px',
      });
      const tagCompat = toInlineStyle({
        display: 'inline-block',
        background: primary,
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
        padding: '3px 12px',
        borderRadius: '999px',
        letterSpacing: '1px',
        margin: '-28px 0 12px',
      });
      return `<section style="${boxCompat}"><span style="${tagCompat}">${escapeHtml(
        label,
      )}</span><p style="${bodyStyle}">${escapeHtml(body || title)}</p></section>`;
    }
    return `<section style="${boxStyle}"><span style="${tagStyle}">${escapeHtml(
      label,
    )}</span><p style="${bodyStyle}">${escapeHtml(body || title)}</p></section>`;
  }

  // —— 信息框 / 警示框（info / warning）——
  if (variant === 'info' || variant === 'warning') {
    const isW = variant === 'warning';
    const bg = isW ? 'rgba(245,158,11,.12)' : 'rgba(59,130,246,.10)';
    const bd = isW ? '#f59e0b' : '#3b82f6';
    const ic = isW ? '⚠' : 'ℹ';
    const boxStyle = toInlineStyle({
      background: bg,
      border: `1px solid ${bd}55`,
      borderLeft: `4px solid ${bd}`,
      borderRadius: radius,
      padding: '14px 16px',
      margin: '16px 0',
    });
    return `<section style="${boxStyle}"><p style="${toInlineStyle({
      margin: '0 0 4px',
      fontWeight: 700,
      color: bd,
    })}">${ic} ${escapeHtml(title || (isW ? '注意' : '提示'))}</p><p style="${bodyStyle}">${escapeHtml(
      body,
    )}</p></section>`;
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
    extra.objectFit = 'cover';
    extra.border = `3px solid ${theme.tokens.primary}`;
    if (COMPAT) {
      // 微信不支持 aspect-ratio，圆形图改用固定尺寸居中
      extra.width = '200px';
      extra.height = '200px';
      extra.margin = '0 auto';
    } else {
      extra.aspectRatio = '1 / 1';
    }
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
    width: extra.width ?? '100%',
    height: extra.height,
    margin: extra.margin ?? '0 auto',
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
    if (COMPAT) {
      // 微信剥离 <svg>，箭头用字符
      const arrow = '<span style="display:inline-block;margin-left:6px;font-size:18px;">⬇</span>';
      return `<section style="${box}">${escapeHtml(
        text || '点击上方蓝字「关注我们」，不错过每篇干货',
      )}${arrow}</section>`;
    }
    const arrow = `<svg width="20" height="20" viewBox="0 0 24 24" style="vertical-align:middle;margin-left:6px" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><animateTransform attributeName="transform" type="translate" values="0 3; 0 -3; 0 3" dur="1.3s" repeatCount="indefinite"/></path></svg>`;
    return `<section style="${box}">${escapeHtml(text || '点击上方蓝字「关注我们」，不错过每篇干货')}${arrow}</section>`;
  }

  if (variant === 'like') {
    const row = toInlineStyle({
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      margin: '18px 0',
    });
    if (COMPAT) {
      // 微信剥离 <svg>，爱心用字符；inline-flex 不稳，按钮改用 inline-block
      const pill = (color: string) =>
        toInlineStyle({
          display: 'inline-block',
          background: '#fff',
          color,
          border: `1.5px solid ${color}`,
          borderRadius: '999px',
          padding: '8px 18px',
          fontSize: '14px',
          fontWeight: 700,
          margin: '0 5px',
        });
      const heart = `<span style="color:${secondary}">❤</span>`;
      return `<section style="${row}"><span style="${pill(
        primary,
      )}">👍 点赞</span><span style="${pill(secondary)}">❤ 在看 ${heart}</span></section>`;
    }
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
    return `<section style="${row}"><span style="${pill(
      primary,
    )}">👍 点赞</span><span style="${pill(secondary)}">❤ 在看 ${heart}</span></section>`;
  }

  if (variant === 'qr') {
    const src = node.attrs?.src ?? '';
    const box = toInlineStyle({
      background: theme.card.background ?? '#f6f8fa',
      border: theme.card.border ?? `1px solid ${primary}`,
      borderRadius: radius,
      padding: '18px',
      margin: '18px 0',
      textAlign: 'center',
    });
    const labelStyle = toInlineStyle({
      margin: 0,
      fontWeight: 700,
      color: theme.base.color,
    });
    if (src) {
      // 有真实二维码图片，直接渲染 <img>（微信要求 https）
      const qr = toInlineStyle({
        width: '140px',
        height: '140px',
        margin: '0 auto 10px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
      });
      return `<section style="${box}"><img src="${escapeAttr(src)}" alt="二维码" style="${qr}" /><p style="${labelStyle}">${escapeHtml(
        text || '长按识别二维码，关注我们',
      )}</p></section>`;
    }
    if (COMPAT) {
      // 无图片：微信不渲染 conic-gradient，用纯色虚线占位 + 文案提示
      const qr = toInlineStyle({
        width: '120px',
        height: '120px',
        lineHeight: '120px',
        margin: '0 auto 10px',
        background: '#fff',
        border: `2px dashed ${primary}`,
        borderRadius: '8px',
        color: primary,
        fontSize: '13px',
        fontWeight: 700,
      });
      return `<section style="${box}"><section style="${qr}">二维码</section><p style="${labelStyle}">${escapeHtml(
        text || '长按识别二维码，关注我们',
      )}</p></section>`;
    }
    const qr = toInlineStyle({
      width: '120px',
      height: '120px',
      margin: '0 auto 10px',
      background: `repeating-conic-gradient(#222 0 25%, #fff 0 50%) 50% / 16px 16px`,
      borderRadius: '8px',
      border: '4px solid #fff',
      boxShadow: '0 4px 14px rgba(0,0,0,.12)',
    });
    return `<section style="${box}"><section style="${qr}"></section><p style="${labelStyle}">${escapeHtml(
      text || '长按识别二维码，关注我们',
    )}</p></section>`;
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

  // —— 雷达脉冲（radar）：同心圆向外扩散，科技感“动态图标” ——
  if (variant === 'radar') {
    const box = toInlineStyle({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: theme.card.background ?? '#f6f8fa',
      border: `1px solid ${primary}55`,
      borderRadius: radius,
      padding: '12px 16px',
      margin: '16px 0',
    });
    const label = `<span style="${toInlineStyle({
      fontWeight: 600,
      color: theme.base.color,
    })}">${escapeHtml(text || '持续更新中…')}</span>`;
    if (COMPAT) {
      // 微信剥离 <svg>，用纯 HTML 实心圆点替代
      const radarIcon = `<span style="${toInlineStyle({
        display: 'inline-block',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: primary,
        flex: '0 0 auto',
        marginRight: '4px',
      })}"></span>`;
      return `<section style="${box}">${radarIcon}${label}</section>`;
    }
    const ring = (begin: number) =>
      `<circle cx="22" cy="22" r="4" fill="none" stroke="${primary}" stroke-width="2" opacity="0">` +
      `<animate attributeName="r" values="4;21" dur="2s" begin="${begin}s" repeatCount="indefinite"/>` +
      `<animate attributeName="opacity" values="0.85;0" dur="2s" begin="${begin}s" repeatCount="indefinite"/>` +
      `</circle>`;
    const svg = `<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">${ring(
      0,
    )}${ring(1)}<circle cx="22" cy="22" r="3.5" fill="${primary}"/></svg>`;
    return `<section style="${box}">${svg}${label}</section>`;
  }

  // —— 扫描线（scanline）：HUD 扫描动效，科技感分隔/状态 ——
  if (variant === 'scanline') {
    const txt = text || 'SCANNING…';
    if (COMPAT) {
      // 微信剥离 <svg>，用静态 HUD 框（顶部高亮线）替代
      const box = toInlineStyle({
        background: theme.card.background ?? '#fff',
        border: `1px solid ${primary}55`,
        borderTop: `3px solid ${primary}`,
        borderRadius: radius,
        padding: '14px 16px',
        margin: '16px 0',
        textAlign: 'center',
        fontWeight: 600,
        color: theme.base.color,
        letterSpacing: '1px',
      });
      return `<section style="${box}">${escapeHtml(txt)}</section>`;
    }
    const svg = `<svg width="100%" height="48" preserveAspectRatio="none" viewBox="0 0 100 48" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="100" height="48" fill="${primary}12"/>` +
      `<line x1="0" y1="0" x2="0" y2="48" stroke="${primary}" stroke-width="2">` +
      `<animate attributeName="x1" values="0;100;0" dur="2.6s" repeatCount="indefinite"/>` +
      `<animate attributeName="x2" values="0;100;0" dur="2.6s" repeatCount="indefinite"/>` +
      `</line>` +
      `<text x="50" y="29" text-anchor="middle" font-size="13" fill="${theme.base.color}">${escapeHtml(
        txt,
      )}</text></svg>`;
    const box = toInlineStyle({
      background: theme.card.background ?? '#fff',
      border: `1px solid ${primary}55`,
      borderRadius: radius,
      overflow: 'hidden',
      margin: '16px 0',
    });
    return `<section style="${box}">${svg}</section>`;
  }

  // —— 脉冲点（pulse）：呼吸闪烁的状态点 + 文案 ——
  if (variant === 'pulse') {
    const box = toInlineStyle({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'center',
      margin: '16px 0',
      color: theme.base.color,
      fontWeight: 600,
    });
    if (COMPAT) {
      // 微信剥离 <svg>，用字符圆点替代
      const dot = `<span style="color:${primary};font-size:14px;line-height:1;">●</span>`;
      return `<section style="${box}">${dot}<span>${escapeHtml(text || '实时同步')}</span></section>`;
    }
    const dot = `<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="4" fill="${primary}"><animate attributeName="opacity" values="1;0.25;1" dur="1.2s" repeatCount="indefinite"/></circle></svg>`;
    return `<section style="${box}">${dot}<span>${escapeHtml(text || '实时同步')}</span></section>`;
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

export interface SerializeOptions {
  /** 微信/各平台粘贴兼容模式：去除 <svg> 动效、position:absolute、透明渐变字等平台会剥离的写法 */
  compat?: boolean;
}

/** 将 ProseMirror JSON 文档序列化为「全内联样式」的 HTML（不含根容器）。 */
export function serialize(doc: PMNode, theme: Theme, opts: SerializeOptions = {}): string {
  COMPAT = !!opts.compat;
  const ctx: Ctx = { hCounters: {} };
  const content = doc.content ?? [];
  return content.map((node) => renderBlock(node, theme, ctx)).join('');
}

/** 取文档纯文本（用于复制时的 text/plain 兜底）。 */
export function getPlainText(doc: PMNode): string {
  return getNodeText(doc);
}
