import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

const VARIANTS: { value: string; label: string }[] = [
  { value: 'default', label: '默认卡片' },
  { value: 'note', label: '便签' },
  { value: 'bubble', label: '对话气泡' },
  { value: 'icon', label: '图标卡' },
  { value: 'step', label: '步骤卡' },
  { value: 'quote', label: '金句卡' },
];

export function CardView({ node, updateAttributes }: NodeViewProps) {
  const variant = node.attrs.variant ?? 'default';
  const showIcon = variant === 'icon' || variant === 'bubble' || variant === 'step';
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
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
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
      {showIcon && (
        <input
          className="nv-input"
          value={node.attrs.icon}
          onChange={(e) => updateAttributes({ icon: e.target.value })}
          placeholder={variant === 'step' ? '编号/emoji，如 1 或 🔥' : '图标 emoji，如 ★ 💡'}
          style={input}
        />
      )}
      <input
        className="nv-input"
        value={node.attrs.title}
        onChange={(e) => updateAttributes({ title: e.target.value })}
        placeholder="卡片标题"
        style={{ ...input, fontWeight: 700, marginTop: showIcon ? 6 : 0 }}
      />
      <textarea
        className="nv-input"
        value={node.attrs.body}
        onChange={(e) => updateAttributes({ body: e.target.value })}
        placeholder="卡片内容"
        rows={3}
        style={{ ...input, resize: 'vertical', marginTop: 6, lineHeight: 1.6 }}
      />
    </NodeViewWrapper>
  );
}

const input: React.CSSProperties = {
  display: 'block',
  width: '100%',
  border: 'none',
  borderBottom: '1px solid #e5e7eb',
  background: 'transparent',
  fontSize: 14,
  padding: '4px 0',
  outline: 'none',
  boxSizing: 'border-box',
};
