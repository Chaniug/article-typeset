import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getThemeSafe } from '../themes/registry';
import { getPlatform } from '../platforms';
import { exportDocument, getPlainText, copyRichText } from '../export';
import type { PMNode } from '../export/serializer';

export function Preview() {
  const doc = useAppStore((s) => s.doc) as PMNode | null;
  const themeId = useAppStore((s) => s.themeId);
  const platform = useAppStore((s) => s.platform);
  const [status, setStatus] = useState('');

  const html = useMemo(() => {
    if (!doc) return '';
    return exportDocument(doc, getThemeSafe(themeId), platform);
  }, [doc, themeId, platform]);

  const copy = async () => {
    if (!doc) return;
    const ok = await copyRichText(html, getPlainText(doc));
    const name = getPlatform(platform)?.name ?? '目标平台';
    setStatus(ok ? `已复制，去「${name}」粘贴吧！` : '复制失败，请手动复制。');
    setTimeout(() => setStatus(''), 2500);
  };

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <button className="btn btn--primary" onClick={copy} disabled={!doc}>
          复制排版
        </button>
        {status && <span className="muted">{status}</span>}
      </div>
      <iframe
        className="preview__frame"
        title="preview"
        srcDoc={html}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
