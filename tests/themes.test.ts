import { describe, it, expect } from 'vitest';
import { getThemes, getThemeSafe, defaultThemeId } from '../src/themes/registry';

describe('theme registry', () => {
  it('提供至少 3 套微信主题', () => {
    const wechat = getThemes('wechat');
    expect(wechat.length).toBeGreaterThanOrEqual(3);
  });

  it('主题必需字段完整且符合微信规范', () => {
    for (const t of getThemes()) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.base.fontFamily).toMatch(/PingFang SC|Microsoft YaHei|Songti SC|Noto Serif SC/);
      expect(t.base.fontSize).toMatch(/px$/);
      expect(t.heading.h1).toBeDefined();
      expect(t.heading.h2).toBeDefined();
      expect(t.heading.h3).toBeDefined();
      expect(t.paragraph.base).toBeDefined();
      expect(t.quote).toBeDefined();
      expect(t.card).toBeDefined();
    }
  });

  it('getThemeSafe 永不返回 undefined', () => {
    expect(getThemeSafe('not-exist').id).toBe(defaultThemeId);
  });
});
