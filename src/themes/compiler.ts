import { Theme, DividerType } from './types';
import { toInlineStyle, escapeHtml } from '../lib/utils';

/** 根容器（页面级）内联样式，供平台后处理包裹使用。 */
export function baseStyle(theme: Theme, maxWidth?: string): string {
  return toInlineStyle({
    maxWidth: maxWidth ?? theme.base.maxWidth ?? '677px',
    margin: '0 auto',
    background: theme.base.background ?? '#ffffff',
    padding: theme.base.padding ?? '16px',
    fontFamily: theme.base.fontFamily,
    fontSize: theme.base.fontSize,
    lineHeight: theme.base.lineHeight,
    color: theme.base.color,
  });
}

export function headingStyle(theme: Theme, level: 1 | 2 | 3): string {
  return toInlineStyle(theme.heading[`h${level}`]);
}

export function paragraphStyle(theme: Theme): string {
  return toInlineStyle(theme.paragraph.base);
}

export function leadStyle(theme: Theme): string {
  return toInlineStyle(theme.paragraph.lead ?? theme.paragraph.base);
}

export function quoteStyle(theme: Theme): string {
  return toInlineStyle(theme.quote);
}

export function cardStyle(theme: Theme): string {
  return toInlineStyle(theme.card);
}

export function imageStyle(theme: Theme): string {
  return toInlineStyle({
    display: 'block',
    width: theme.image.maxWidth ?? '100%',
    margin: '0 auto',
    borderRadius: theme.image.borderRadius,
    border: theme.image.border,
  });
}

export function captionStyle(theme: Theme): string {
  return toInlineStyle({
    margin: '6px 0 0',
    fontSize: theme.image.captionFontSize ?? '13px',
    color: theme.image.captionColor ?? theme.tokens.muted,
    textAlign: theme.image.captionAlign ?? 'center',
  });
}

export function codeStyle(theme: Theme): string {
  return toInlineStyle({
    background: theme.code.background,
    color: theme.code.color,
    fontFamily: theme.code.fontFamily,
    padding: theme.code.padding,
    borderRadius: theme.code.borderRadius,
  });
}

export function linkStyle(theme: Theme): string {
  return toInlineStyle({ color: theme.tokens.primary, textDecoration: 'none' });
}

export function listStyle(): string {
  return toInlineStyle({ paddingLeft: '1.4em', margin: '0 0 16px', color: 'inherit' });
}

export function listItemStyle(): string {
  return toInlineStyle({ margin: '0 0 8px' });
}

/** 分隔线渲染（line / dots / emoji / gradient）。 */
export function dividerHtml(theme: Theme, variant: DividerType): string {
  const d = theme.divider;
  const margin = d.margin ?? '20px 0';
  const color = d.color ?? theme.tokens.primary;
  switch (variant) {
    case 'emoji':
      return `<p style="${toInlineStyle({
        textAlign: 'center',
        margin,
        fontSize: '16px',
        color: theme.tokens.muted,
        letterSpacing: '2px',
      })}">${escapeHtml(d.content ?? '✨ ✨ ✨')}</p>`;
    case 'dots':
      return `<p style="${toInlineStyle({
        textAlign: 'center',
        margin,
        letterSpacing: '8px',
        color,
        fontSize: '18px',
      })}">•••</p>`;
    case 'gradient':
      return `<section style="${toInlineStyle({
        height: '3px',
        margin,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        border: 0,
        padding: 0,
      })}"></section>`;
    case 'line':
    default:
      return `<hr style="${toInlineStyle({
        border: 0,
        borderTop: `1px solid ${color}`,
        margin,
      })} />`;
  }
}
