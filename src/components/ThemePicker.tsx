import { useMemo, useState } from 'react';
import { getThemes } from '../themes/registry';
import { useAppStore } from '../store/useAppStore';

// 微信平台按行业分类筛选（其它平台暂无行业分类，仅显示「全部」）
const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'premium', label: '高级感' },
  { key: 'business', label: '商务' },
  { key: 'government', label: '政务' },
  { key: 'news', label: '资讯' },
  { key: 'game', label: '游戏' },
] as const;

export function ThemePicker() {
  const platform = useAppStore((s) => s.platform);
  const themeId = useAppStore((s) => s.themeId);
  const setTheme = useAppStore((s) => s.setTheme);
  const themes = useMemo(() => getThemes(platform), [platform]);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]['key']>('all');

  const visible = useMemo(
    () => (cat === 'all' ? themes : themes.filter((t) => t.tags?.includes(cat))),
    [themes, cat],
  );

  return (
    <div className="panel__content">
      {platform === 'wechat' && (
        <div className="theme-filter">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`theme-filter__chip ${cat === c.key ? 'theme-filter__chip--active' : ''}`}
              onClick={() => setCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      <div className="theme-grid">
        {visible.map((t) => (
          <div
            key={t.id}
            className={`theme-card ${themeId === t.id ? 'theme-card--active' : ''}`}
            onClick={() => setTheme(t.id)}
          >
            <div className="theme-card__name">{t.name}</div>
            <div className="theme-card__desc">{t.description}</div>
          </div>
        ))}
        {visible.length === 0 && <div className="theme-empty">该分类暂无模板</div>}
      </div>
    </div>
  );
}
