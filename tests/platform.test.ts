import { describe, it, expect } from 'vitest';
import { exportDocument } from '../src/export';
import { getTheme } from '../src/themes/registry';
import type { PMNode } from '../src/export/serializer';

const doc: PMNode = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '微信标题' }] },
    { type: 'paragraph', content: [{ type: 'text', text: '这是正文。' }] },
  ],
};

describe('wechat export', () => {
  const theme = getTheme('wechat-minimal-light')!;
  const html = exportDocument(doc, theme, 'wechat');

  it('以 <section> 根容器包裹', () => {
    expect(html.startsWith('<section')).toBe(true);
  });
  it('根节点含内联 font-size（px）', () => {
    expect(html).toMatch(/font-size:16px/);
  });
  it('零 class', () => {
    expect(html).not.toMatch(/\sclass=/);
  });
  it('零 <style> / <script>', () => {
    expect(html).not.toMatch(/<style/i);
    expect(html).not.toMatch(/<script/i);
  });
  it('图片 src 强制 https（示例）', () => {
    const doc2: PMNode = {
      type: 'doc',
      content: [{ type: 'image', attrs: { src: 'http://example.com/a.png', alt: 'x' } }],
    };
    const html2 = exportDocument(doc2, theme, 'wechat');
    expect(html2).toContain('https://example.com/a.png');
    expect(html2).not.toContain('http://example.com/a.png');
  });
});
