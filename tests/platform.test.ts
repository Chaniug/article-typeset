import { describe, it, expect } from 'vitest';
import { exportDocument } from '../src/export';
import { getTheme, getThemes } from '../src/themes/registry';
import { platforms } from '../src/platforms';
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

describe('所有已启用平台导出均为内联（section 包裹、零 class/style/script）', () => {
  for (const p of platforms.filter((x) => x.enabled)) {
    it(`${p.id} 导出合规`, () => {
      const theme = getThemes(p.id)[0];
      expect(theme, `${p.id} 应有模板`).toBeTruthy();
      const html = exportDocument(doc, theme, p.id as any);
      expect(html.startsWith('<section')).toBe(true);
      expect(html).not.toMatch(/\sclass=/);
      expect(html).not.toMatch(/<style/i);
      expect(html).not.toMatch(/<script/i);
    });
  }
});

describe('模板库完整性', () => {
  it('每个平台都有模板且 id 唯一', () => {
    const all = getThemes();
    const ids = all.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of platforms) {
      expect(getThemes(p.id).length).toBeGreaterThan(0);
    }
  });
});

