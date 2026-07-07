# 主题贡献指南

一套「主题」就是一个实现了 `Theme` 接口的纯数据对象。引擎在导出序列化阶段把它编译成内联样式，因此**新增主题不需要写任何渲染逻辑**。

## Theme 字段速查

```ts
interface Theme {
  id: string;          // 唯一 id，如 'wechat-my-theme'
  name: string;        // 展示名
  platform: 'wechat' | 'xiaohongshu' | 'bilibili' | 'baijiahao' | 'common';
  description?: string;
  author?: string;
  tags?: string[];     // 如 'minimal' | 'dark' | 'news'
  base: ThemeBase;     // 页面级：maxWidth / background / padding / fontFamily / fontSize / lineHeight / color
  tokens: TypographyTokens; // primary / secondary / muted / radius / space
  heading: Record<'h1'|'h2'|'h3', BlockStyle>;
  paragraph: { base: BlockStyle; lead?: BlockStyle };
  divider: DividerStyle;   // type: 'line'|'dots'|'emoji'|'gradient'
  quote: QuoteStyle;
  card: CardStyle;
  image: ImageStyle;
  list: ListStyle;
  code: CodeStyle;
}
```

`BlockStyle` 支持的字段：`fontSize` / `fontWeight` / `color` / `lineHeight` / `marginTop` / `marginBottom` / `textAlign` / `letterSpacing` / `background` / `borderLeft` / `padding` / `textIndent`。

## 最小主题示例

```ts
import { Theme } from '../types';

export const sunrise: Theme = {
  id: 'wechat-sunrise',
  name: '破晓',
  platform: 'wechat',
  description: '暖橙点缀的清新排版。',
  base: {
    maxWidth: '677px',
    background: '#ffffff',
    padding: '16px',
    fontFamily: "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif",
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#2b2b2b',
  },
  tokens: { primary: '#ff7a45', secondary: '#ffa940', muted: '#8c8c8c', radius: '8px', space: '16px' },
  heading: {
    h1: { fontSize: '24px', fontWeight: 700, color: '#1a1a1a', borderLeft: '5px solid #ff7a45', paddingLeft: '12px' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#1a1a1a', borderLeft: '4px solid #ff7a45', paddingLeft: '10px' },
    h3: { fontSize: '17px', fontWeight: 600, color: '#1a1a1a', borderLeft: '3px solid #ff7a45', paddingLeft: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.75' } },
  divider: { type: 'gradient', color: '#ff7a45' },
  quote: { background: '#fff7f0', borderLeft: '4px solid #ff7a45', padding: '12px 16px' },
  card: { background: '#fff7f0', border: '1px solid #ffe7d1', borderRadius: '8px', padding: '16px' },
  image: { borderRadius: '8px', maxWidth: '100%', captionColor: '#8c8c8c', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff7a45', bullet: '•' },
  code: { background: '#fff7f0', color: '#d4380d', fontFamily: "'SFMono-Regular',Consolas,monospace", padding: '2px 6px', borderRadius: '4px' },
};
```

## 自测清单

新增主题后，请确认导出的 HTML 满足微信公众号约束：

- [ ] 不含 `class=` 属性
- [ ] 不含 `<style>` / `<script>` 标签
- [ ] 根容器为 `<section>`
- [ ] 字号使用 `px`（如 `font-size:16px`）
- [ ] 中文字体回退包含 `PingFang SC` / `Microsoft YaHei`
- [ ] 图片 `src` 为 `https` 且 `width:100%`

这些约束由 `src/export/platform/wechat.ts` 与 `src/export/serializer.ts` 保证，并已被 `tests/` 覆盖。
