import { describe, it, expect } from 'vitest';
import { exportDocument } from '../src/export';
import { getTheme } from '../src/themes/registry';
import type { PMNode } from '../src/export/serializer';

describe('标题装饰变体', () => {
  const morandi = getTheme('wechat-morandi')!;
  it('block 变体生成色块 span（带背景）', () => {
    const doc: PMNode = {
      type: 'doc',
      content: [{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '小标题' }] }],
    };
    const html = exportDocument(doc, morandi, 'wechat');
    expect(html).toMatch(/<span[^>]*background[^>]*>/);
    expect(html).toContain('小标题');
  });

  const techRing = getTheme('wechat-techring')!;
  it('number 变体自动编号 01 / 02', () => {
    const doc: PMNode = {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '一' }] },
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '二' }] },
      ],
    };
    const html = exportDocument(doc, techRing, 'wechat');
    expect(html).toContain('>01<');
    expect(html).toContain('>02<');
  });

  const cyber = getTheme('wechat-cyber')!;
  it('gradient 变体生成 background-clip:text 渐变文字', () => {
    const doc: PMNode = {
      type: 'doc',
      content: [{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '标题' }] }],
    };
    const html = exportDocument(doc, cyber, 'wechat');
    expect(html).toMatch(/background-clip:text/);
    expect(html).toMatch(/color:transparent/);
  });
});

describe('重点高亮', () => {
  const cyber = getTheme('wechat-cyber')!;
  it('highlight 标记渲染带背景的 span', () => {
    const doc: PMNode = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', marks: [{ type: 'highlight' }], text: '重点' }],
        },
      ],
    };
    const html = exportDocument(doc, cyber, 'wechat');
    expect(html).toMatch(/<span[^>]*background[^>]*>重点<\/span>/);
  });
});

describe('多图并排', () => {
  const base = getTheme('wechat-minimal-light')!;
  it('imageGrid 渲染 flex 行与多张图', () => {
    const doc: PMNode = {
      type: 'doc',
      content: [
        {
          type: 'imageGrid',
          attrs: {
            images: [
              { src: 'https://x.com/a.png', caption: 'A' },
              { src: 'https://x.com/b.png', caption: 'B' },
            ],
          },
        },
      ],
    };
    const html = exportDocument(doc, base, 'wechat');
    expect(html).toMatch(/display:flex/);
    expect(html).toContain('https://x.com/a.png');
    expect(html).toContain('https://x.com/b.png');
  });
});

describe('字框组件', () => {
  const base = getTheme('wechat-minimal-light')!;
  it('icon 卡片渲染 flex + 圆形徽标', () => {
    const doc: PMNode = {
      type: 'doc',
      content: [{ type: 'card', attrs: { variant: 'icon', icon: '💡', title: 'T', body: 'B' } }],
    };
    const html = exportDocument(doc, base, 'wechat');
    expect(html).toMatch(/display:flex/);
    expect(html).toContain('💡');
  });
});

describe('动态小组件（SVG SMIL 动效）', () => {
  const base = getTheme('wechat-minimal-light')!;
  it('follow 组件保留 <svg> 与 animateTransform（微信后处理不剥离）', () => {
    const doc: PMNode = { type: 'doc', content: [{ type: 'widget', attrs: { variant: 'follow' } }] };
    const html = exportDocument(doc, base, 'wechat');
    expect(html).toContain('<svg');
    expect(html).toContain('animateTransform');
    expect(html).not.toMatch(/<style[\s\S]*?<\/style>/i);
  });
  it('like 组件保留飘心动画 animate', () => {
    const doc: PMNode = { type: 'doc', content: [{ type: 'widget', attrs: { variant: 'like' } }] };
    const html = exportDocument(doc, base, 'wechat');
    expect(html).toContain('<svg');
    expect(html).toContain('<animate');
  });
});
