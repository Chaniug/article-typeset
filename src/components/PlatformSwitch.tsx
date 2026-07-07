import { platforms } from '../platforms';
import { useAppStore } from '../store/useAppStore';

export function PlatformSwitch() {
  const platform = useAppStore((s) => s.platform);
  const setPlatform = useAppStore((s) => s.setPlatform);
  return (
    <div className="tabs">
      {platforms.map((p) => (
        <button
          key={p.id}
          className={`tab ${platform === p.id ? 'tab--active' : ''}`}
          onClick={() => p.enabled && setPlatform(p.id)}
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
