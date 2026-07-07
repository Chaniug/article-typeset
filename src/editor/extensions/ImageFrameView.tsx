import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

const VARIANTS: { value: string; label: string }[] = [
  { value: 'rounded', label: '圆角' },
  { value: 'circle', label: '圆形' },
  { value: 'shadow', label: '投影' },
  { value: 'border', label: '描边' },
  { value: 'plain', label: '无修饰' },
];

export function ImageFrameView({ node, updateAttributes }: NodeViewProps) {
  const variant = node.attrs.variant ?? 'rounded';
  return (
    <NodeViewWrapper className="nv-imageframe" style={{ margin: '14px 0' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
        {VARIANTS.map((v) => (
          <button
            key={v.value}
            type="button"
            onClick={() => updateAttributes({ variant: v.value })}
            style={{
              border: '1px solid #d0d5dd',
              background: variant === v.value ? '#07c160' : '#fff',
              color: variant === v.value ? '#fff' : '#57606a',
              borderRadius: 999,
              padding: '2px 10px',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>
      <input
        className="nv-input"
        value={node.attrs.src}
        onChange={(e) => updateAttributes({ src: e.target.value })}
        placeholder="图片链接 https://…"
        style={{
          display: 'block',
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          padding: '6px 8px',
          fontSize: 13,
          marginBottom: 6,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      {node.attrs.src ? (
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          style={{
            maxWidth: '100%',
            borderRadius: variant === 'circle' ? '50%' : variant === 'plain' ? 0 : 8,
            display: 'block',
            margin: '0 auto',
          }}
        />
      ) : (
        <div
          style={{
            border: '1px dashed #d0d5dd',
            borderRadius: 8,
            padding: 24,
            textAlign: 'center',
            color: '#8a8f99',
            fontSize: 13,
          }}
        >
          填写上方图片链接以预览
        </div>
      )}
      <input
        className="nv-input"
        value={node.attrs.caption}
        onChange={(e) => updateAttributes({ caption: e.target.value })}
        placeholder="图注（可选）"
        style={{
          display: 'block',
          width: '100%',
          border: 'none',
          textAlign: 'center',
          fontSize: 13,
          color: '#8a8f99',
          padding: '6px 0 0',
          outline: 'none',
        }}
      />
    </NodeViewWrapper>
  );
}
