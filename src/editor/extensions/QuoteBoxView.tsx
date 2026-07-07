import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

export function QuoteBoxView({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper
      className="nv-quotebox"
      style={{
        borderLeft: '4px solid #07c160',
        background: '#f6f8fa',
        borderRadius: 6,
        padding: '12px 16px',
        margin: '14px 0',
      }}
    >
      <textarea
        className="nv-input"
        value={node.attrs.text}
        onChange={(e) => updateAttributes({ text: e.target.value })}
        placeholder="引用内容…"
        rows={3}
        style={{
          display: 'block',
          width: '100%',
          border: 'none',
          background: 'transparent',
          resize: 'vertical',
          fontSize: 14,
          lineHeight: 1.7,
          color: '#57606a',
          outline: 'none',
        }}
      />
    </NodeViewWrapper>
  );
}
