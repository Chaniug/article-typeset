import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import type { GridImage } from './ImageGrid';

const SAMPLE =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='400'%20height='300'%3E%3Crect%20width='400'%20height='300'%20fill='%23eef2ff'/%3E%3Ctext%20x='50%25'%20y='50%25'%20font-family='sans-serif'%20font-size='22'%20text-anchor='middle'%20dominant-baseline='middle'%20fill='%236070f0'%3EImage%3C/text%3E%3C/svg%3E";

export function ImageGridView({ node, updateAttributes }: NodeViewProps) {
  const images = (node.attrs.images ?? []) as GridImage[];
  const setImg = (i: number, patch: Partial<GridImage>) => {
    const next = images.map((im, idx) => (idx === i ? { ...im, ...patch } : im));
    updateAttributes({ images: next });
  };
  const count = images.length;

  return (
    <NodeViewWrapper className="nv-grid" style={{ margin: '14px 0', border: '1px dashed #d0d5dd', borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#57606a' }}>
        <span>多图并排（{count} 张）</span>
        <button type="button" onClick={() => updateAttributes({ images: [...images, { src: '', caption: '' }] })} style={btn}>
          ＋ 加一张
        </button>
        {count > 1 && (
          <button type="button" onClick={() => updateAttributes({ images: images.slice(0, -1) })} style={btn}>
            － 减一张
          </button>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {images.map((im, i) => (
          <div key={i} style={{ flex: 1 }}>
            <input
              className="nv-input"
              value={im.src}
              placeholder="图片链接 https://"
              onChange={(e) => setImg(i, { src: e.target.value })}
              style={input}
            />
            {im.src ? (
              <img src={im.src} alt={im.caption} style={{ width: '100%', borderRadius: 8, display: 'block', marginTop: 6 }} />
            ) : (
              <img src={SAMPLE} alt="" style={{ width: '100%', borderRadius: 8, display: 'block', marginTop: 6, opacity: 0.7 }} />
            )}
            <input
              className="nv-input"
              value={im.caption}
              placeholder="图注"
              onChange={(e) => setImg(i, { caption: e.target.value })}
              style={{ ...input, textAlign: 'center', marginTop: 4 }}
            />
          </div>
        ))}
      </div>
    </NodeViewWrapper>
  );
}

const btn: React.CSSProperties = {
  border: '1px solid #d0d5dd',
  background: '#fff',
  borderRadius: 6,
  padding: '2px 8px',
  fontSize: 12,
  cursor: 'pointer',
};
const input: React.CSSProperties = {
  display: 'block',
  width: '100%',
  border: '1px solid #e5e7eb',
  borderRadius: 6,
  padding: '5px 7px',
  fontSize: 12,
  outline: 'none',
  boxSizing: 'border-box',
};
