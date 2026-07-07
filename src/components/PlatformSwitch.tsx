import { platforms } from '../platforms';
import { useAppStore } from '../store/useAppStore';
import { getThemes } from '../themes/registry';

export function PlatformSwitch() {
  const platform = useAppStore((s) => s.platform);
  const setPlatform = useAppStore((s) => s.setPlatform);
  const setTheme = useAppStore((s) => s.setTheme);

  const onSelect = (id: typeof platform) => {
    if (!platforms.find((p) => p.id === id)?.enabled) return;
    setPlatform(id);
    // 切换到新平台时，自动选中该平台的第一个模板
    const first = getThemes(id)[0];
    if (first) setTheme(first.id);
  };

  return (
    <div className="tabs">
      {platforms.map((p) => (
        <button
          key={p.id}
          className={`tab ${platform === p.id ? 'tab--active' : ''}`}
          onClick={() => onSelect(p.id as typeof platform)}
          disabled={!p.enabled}
          title={p.enabled ? p.description : '敬请期待'}
        >
          {p.name}
          {!p.enabled ? '（敬请期待）' : ''}
        </button>
      ))}
    </div>
  );
}
