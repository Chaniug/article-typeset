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
