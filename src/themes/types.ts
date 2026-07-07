// 主题 / 模板数据模型。主题即纯数据，序列化阶段据此生成内联样式。

export type Platform = 'wechat' | 'xiaohongshu' | 'bilibili' | 'baijiahao' | 'common';

export type DividerType = 'line' | 'dots' | 'emoji' | 'gradient';

export interface ThemeBase {
  /** 正文区最大宽度，微信建议 '677px' */
  maxWidth?: string;
  background?: string;
  padding?: string;
  /** 必须含中文回退：-apple-system,'PingFang SC',... */
  fontFamily: string;
  /** 基准字号，微信用 'px'，如 '16px' */
  fontSize: string;
  lineHeight: string;
  color: string;
}

export interface TypographyTokens {
  primary: string;
  secondary: string;
  muted: string;
  radius: string;
  /** 垂直节奏单位 */
  space: string;
}

/** 标题装饰变体：plain 普通 / block 色块 / pill 药丸 / bar 竖线 / number 编号 / underline 下划线 / gradient 渐变文字 */
export type HeadingVariant =
  | 'plain'
  | 'block'
  | 'pill'
  | 'bar'
  | 'number'
  | 'underline'
  | 'gradient';

export interface BlockStyle {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  lineHeight?: string;
  marginTop?: string;
  marginBottom?: string;
  margin?: string;
  padding?: string;
  paddingLeft?: string;
  paddingBottom?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  display?: string;
  letterSpacing?: string;
  background?: string;
  borderLeft?: string;
  borderRight?: string;
  borderTop?: string;
  borderBottom?: string;
  border?: string;
  borderRadius?: string;
  textIndent?: string;
  /** 标题装饰变体（仅标题生效） */
  variant?: HeadingVariant;
  /** 装饰强调色：bar/underline/number/gradient 用 */
  accentColor?: string;
  /** 色块标题背景（block/pill） */
  blockBg?: string;
  /** 色块标题文字色（block/pill） */
  blockColor?: string;
  blockRadius?: string;
  blockPadding?: string;
  /** 渐变文字起止色（gradient） */
  gradientFrom?: string;
  gradientTo?: string;
  /** 文字阴影，用于霓虹/发光标题 */
  textShadow?: string;
}

export interface DividerStyle {
  type: DividerType;
  color?: string;
  height?: string;
  margin?: string;
  /** emoji 分隔内容，如 '✨ ✨ ✨' */
  content?: string;
}

export interface QuoteStyle {
  background?: string;
  borderLeft?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  color?: string;
  fontStyle?: string;
}

export interface CardStyle {
  background?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  boxShadow?: string;
}

export interface ImageStyle {
  borderRadius?: string;
  border?: string;
  maxWidth?: string;
  captionColor?: string;
  captionFontSize?: string;
  captionAlign?: string;
}

export interface ListStyle {
  markerColor?: string;
  bullet?: string;
}

export interface CodeStyle {
  background?: string;
  color?: string;
  fontFamily?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
}

export interface HighlightStyle {
  /** 高亮底色，如 'rgba(255,225,0,.45)' */
  background: string;
  /** 高亮文字色 */
  color?: string;
  /** 圆角 */
  radius?: string;
}

export interface Theme {
  id: string;
  name: string;
  platform: Platform;
  description?: string;
  author?: string;
  tags?: string[];
  base: ThemeBase;
  tokens: TypographyTokens;
  heading: Record<'h1' | 'h2' | 'h3', BlockStyle>;
  paragraph: { base: BlockStyle; lead?: BlockStyle };
  divider: DividerStyle;
  quote: QuoteStyle;
  card: CardStyle;
  image: ImageStyle;
  list: ListStyle;
  code: CodeStyle;
  /** 重点内容高亮样式（inline 标记） */
  highlight?: HighlightStyle;
  /** 非微信平台可选的整段 CSS（不内联） */
  customCss?: string;
}
