import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

export function CardView({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper
      className="nv-card"
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 14,
        margin: '14px 0',
        background: '#fafafa',
      }}
    >
      <input
        className="nv-input"
        value={node.attrs.title}
        onChange={(e) => updateAttributes({ title: e.target.value })}
        placeholder="卡片标题"
        style={{
          display: 'block',
          width: '100%',
          border: 'none',
          borderBottom: '1px solid #e5e7eb',
          background: 'transparent',
          fontWeight: 700,
          fontSize: 15,
          padding: '4px 0',
          marginBottom: 8,
          outline: 'none',
        }}
      />
      <textarea
        className="nv-input"
        value={node.attrs.body}
        onChange={(e) => updateAttributes({ body: e.target.value })}
        placeholder="卡片内容"
        rows={3}
        style={{
          display: 'block',
          width: '100%',
          border: 'none',
          background: 'transparent',
          resize: 'vertical',
          fontSize: 14,
          lineHeight: 1.6,
          outline: 'none',
        }}
      />
    </NodeViewWrapper>
  );
}
