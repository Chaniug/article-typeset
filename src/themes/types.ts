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
  /** 非微信平台可选的整段 CSS（不内联） */
  customCss?: string;
}
