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

describe('字框与动态组件', () => {
  it('四角框(frame)：渲染四个角标 span', () => {
    const theme = getTheme('wechat-tech-cyber')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'card', attrs: { variant: 'frame', icon: '◆', title: '要点', body: '框线内容' } }] },
      theme,
    );
    const corners = html.match(/<span style="[^"]*position:\s*absolute[^"]*">/g) ?? [];
    expect(corners.length).toBeGreaterThanOrEqual(4);
    expect(html).toContain('要点');
    expect(html).toContain('框线内容');
  });

  it('标签框(tag)：渲染顶部标签胶囊', () => {
    const theme = getTheme('wechat-tech-hud')!;
    const html = serialize(
      { type: 'doc', content: [{ type: 'card', attrs: { variant: 'tag', icon: '标签', title: 'NOTE', body: '标签框内容' } }] },
      theme,
    );
    expect(html).toContain('标签');
    expect(html).toContain('标签框内容');
  });

  it('信息框/警示框(info/warning)：渲染提示与注意', () => {
    const theme = getTheme('wechat-tech-cyber')!;
    const info = serialize({ type: 'doc', content: [{ type: 'card', attrs: { variant: 'info', title: '提示', body: '信息' } }] }, theme);
    const warn = serialize({ type: 'doc', content: [{ type: 'card', attrs: { variant: 'warning', title: '注意', body: '警告' } }] }, theme);
    expect(info).toContain('提示');
    expect(warn).toContain('注意');
  });

  it('雷达脉冲(radar)：使用 SVG SMIL 动效', () => {
    const theme = getTheme('wechat-tech-cyber')!;
    const html = serialize({ type: 'doc', content: [{ type: 'widget', attrs: { variant: 'radar' } }] }, theme);
    expect(html).toContain('<animate');
    expect(html).toContain('持续更新中');
  });

  it('扫描线(scanline)与脉冲点(pulse)：含 SMIL 动效', () => {
    const theme = getTheme('wechat-tech-data')!;
    const scan = serialize({ type: 'doc', content: [{ type: 'widget', attrs: { variant: 'scanline' } }] }, theme);
    const pulse = serialize({ type: 'doc', content: [{ type: 'widget', attrs: { variant: 'pulse' } }] }, theme);
    expect(scan).toContain('<animate');
    expect(pulse).toContain('<animate');
  });
});
