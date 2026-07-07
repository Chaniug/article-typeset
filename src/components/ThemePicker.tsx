import { useMemo } from 'react';
import { getThemes } from '../themes/registry';
import { useAppStore } from '../store/useAppStore';

export function ThemePicker() {
  const platform = useAppStore((s) => s.platform);
  const themeId = useAppStore((s) => s.themeId);
  const setTheme = useAppStore((s) => s.setTheme);
  const themes = useMemo(() => getThemes(platform), [platform]);

  return (
    <div className="panel__content">
      {themes.map((t) => (
        <div
          key={t.id}
          className={`theme-card ${themeId === t.id ? 'theme-card--active' : ''}`}
          onClick={() => setTheme(t.id)}
        >
          <div className="theme-card__name">{t.name}</div>
          <div className="theme-card__desc">{t.description}</div>
        </div>
      ))}
    </div>
  );
}
