import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getThemeSafe } from '../themes/registry';
import { getPlatform } from '../platforms';
import { exportDocument, getPlainText, copyRichText } from '../export';
import type { PMNode } from '../export/serializer';

/** 递归收集文档中所有图片 URL，用于「图片检查」诊断。 */
function collectImages(doc: PMNode | null): string[] {
  const out: string[] = [];
  const walk = (n: any) => {
    if (!n || typeof n !== 'object') return;
    if (n.type === 'image' && n.attrs?.src) out.push(n.attrs.src);
    else if (n.type === 'imageFrame' && n.attrs?.src) out.push(n.attrs.src);
    else if (n.type === 'imageGrid' && Array.isArray(n.attrs?.images))
      n.attrs.images.forEach((im: any) => im?.src && out.push(im.src));
    (n.content ?? []).forEach(walk);
  };
  walk(doc);
  return out;
}

/** 常见对微信有防盗链的图床/占位图服务，粘贴后易破图。 */
const RISKY_HOST = /picsum\.photos|unsplash|lorempixel|dummyimage|placeholder|\.psd|\/tmp\//i;

export function Preview() {
  const doc = useAppStore((s) => s.doc) as PMNode | null;
  const themeId = useAppStore((s) => s.themeId);
  const platform = useAppStore((s) => s.platform);
  const [status, setStatus] = useState('');
  const [compat, setCompat] = useState(true);
  const [imgCheck, setImgCheck] = useState<string[] | null>(null);

  const html = useMemo(() => {
    if (!doc) return '';
    // 预览默认微信兼容（所见即所得），可切到完整效果看动效
    return exportDocument(doc, getThemeSafe(themeId), platform, { compat });
  }, [doc, themeId, platform, compat]);

  const copy = async () => {
    if (!doc) return;
    // 复制始终走兼容模式（微信/各平台粘贴安全：去 SVG、去 absolute、透明字回退）
    const safe = exportDocument(doc, getThemeSafe(themeId), platform, { compat: true });
    const ok = await copyRichText(safe, getPlainText(doc));
    const name = getPlatform(platform)?.name ?? '目标平台';
    setStatus(ok ? `已复制（兼容版），去「${name}」粘贴吧！` : '复制失败，请手动复制。');
    setTimeout(() => setStatus(''), 2500);
  };

  const openImgCheck = () => setImgCheck(collectImages(doc));

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <button className="btn btn--primary" onClick={copy} disabled={!doc}>
          复制排版
        </button>
        <button
          className="btn"
          onClick={() => setCompat((c) => !c)}
          title="切换预览：微信兼容（所见即所得）/ 完整效果（含动效演示）"
        >
          {compat ? '预览：微信兼容' : '预览：完整效果'}
        </button>
        <button className="btn" onClick={openImgCheck} disabled={!doc}>
          图片检查
        </button>
        {status && <span className="muted">{status}</span>}
      </div>
      {imgCheck && (
        <div className="imgcheck">
          <div className="imgcheck__head">
            <strong>图片检查（{imgCheck.length} 张）</strong>
            <button className="btn btn--sm" onClick={() => setImgCheck(null)}>
              关闭
            </button>
          </div>
          {imgCheck.length === 0 ? (
            <p className="muted">文档中暂无图片。</p>
          ) : (
            <ul className="imgcheck__list">
              {imgCheck.map((u, i) => {
                const isHttp = u.startsWith('http://');
                const risky = !isHttp && RISKY_HOST.test(u);
                return (
                  <li key={i} className="imgcheck__item">
                    <span className={isHttp || risky ? 'tag tag--warn' : 'tag tag--ok'}>
                      {isHttp ? 'HTTP' : risky ? '注意' : 'HTTPS'}
                    </span>
                    <span className="imgcheck__url">{u}</span>
                    <p className="imgcheck__tip">
                      {isHttp
                        ? '⚠️ 非 https，复制时会自动升级；但若图床不支持 https 访问仍会破图。'
                        : risky
                          ? '⚠️ 此类图床/占位图可能对微信有防盗链，若粘贴后破图请换自有图床或微信素材库图片。'
                          : '✅ https 图片，微信可加载（仍请确保图床允许微信服务器抓取）。'}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
      <iframe
        className="preview__frame"
        title="preview"
        srcDoc={html}
        sandbox="allow-same-origin"
      />
    </div>
  );
}
