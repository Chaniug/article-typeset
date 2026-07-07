import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

export function ImageFrameView({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className="nv-imageframe" style={{ margin: '14px 0' }}>
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
        }}
      />
      {node.attrs.src ? (
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          style={{ maxWidth: '100%', borderRadius: 8, display: 'block', margin: '0 auto' }}
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
