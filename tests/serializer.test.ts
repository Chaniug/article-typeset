import { describe, it, expect } from 'vitest';
import { serialize } from '../src/export/serializer';
import { getTheme } from '../src/themes/registry';
import type { PMNode } from '../src/export/serializer';

const doc: PMNode = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '标题' }] },
    {
      type: 'paragraph',
      content: [{ type: 'text', marks: [{ type: 'bold' }], text: '正文加粗' }],
    },
    {
      type: 'blockquote',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: '引用内容' }] }],
    },
    { type: 'divider', attrs: { variant: 'emoji' } },
    { type: 'card', attrs: { title: '卡片标题', body: '卡片内容' } },
  ],
};

describe('serializer', () => {
  const theme = getTheme('wechat-minimal-light')!;
  const html = serialize(doc, theme);

  it('生成的 HTML 全内联（含 style 属性）', () => {
    expect(html).toContain('style=');
  });
  it('不含 class 属性', () => {
    expect(html).not.toMatch(/\sclass=/);
  });
  it('不含 <style> 标签', () => {
    expect(html).not.toMatch(/<style/i);
  });
  it('正确渲染标题与加粗', () => {
    expect(html).toContain('<h2');
    expect(html).toContain('<strong>正文加粗</strong>');
  });
  it('卡片与 emoji 分隔线渲染', () => {
    expect(html).toContain('卡片标题');
    expect(html).toContain('✨');
  });
});

describe('高级感标题变体', () => {
  it('层叠(layered)：渲染超大底纹 + 绝对定位叠放', () => {
    const theme = getTheme('wechat-adv-layered')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '开篇' }] }] },
      theme,
    );
    expect(html).toContain('开篇');
    expect(html).toContain('01'); // 底纹文字
    expect(html).toMatch(/position:\s*absolute/); // 叠放定位
  });

  it('超大锚点(display)：渲染大号装饰文字在标题上方', () => {
    const theme = getTheme('wechat-adv-display')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '深度报道' }] }] },
      theme,
    );
    expect(html).toContain('深度报道');
    expect(html).toContain('VOL.1');
  });

  it('竖排(vertical)：逐字拆分成独立 span', () => {
    const theme = getTheme('wechat-adv-vertical')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '节气' }] }] },
      theme,
    );
    // 两字应产生两个独立 span
    const spans = html.match(/<span style="[^"]*display:\s*block[^"]*">/g) ?? [];
    expect(spans.length).toBeGreaterThanOrEqual(2);
    expect(html).toContain('节');
    expect(html).toContain('气');
  });

  it('描边(stroke)：使用 -webkit-text-stroke', () => {
    const theme = getTheme('wechat-adv-stroke')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '夜场' }] }] },
      theme,
    );
    expect(html).toContain('-webkit-text-stroke');
    expect(html).toContain('夜场');
  });

  it('衬线(serif)：标题应用衬线字体', () => {
    const theme = getTheme('wechat-adv-serif')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '读书' }] }] },
      theme,
    );
    expect(html).toContain('Songti SC');
    expect(html).toContain('读书');
  });
});
