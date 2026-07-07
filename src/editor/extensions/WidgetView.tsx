import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';

const VARIANTS: { value: string; label: string }[] = [
  { value: 'follow', label: '引导关注' },
  { value: 'like', label: '点赞·在看' },
  { value: 'qr', label: '二维码' },
  { value: 'past', label: '往期推荐' },
  { value: 'timeline', label: '时间轴' },
  { value: 'steps', label: '步骤条' },
];

export function WidgetView({ node, updateAttributes }: NodeViewProps) {
  const variant = node.attrs.variant ?? 'follow';
  const text = node.attrs.text ?? '';
  return (
    <NodeViewWrapper className="nv-widget" style={{ margin: '14px 0', border: '1px dashed #d0d5dd', borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
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
              padding: '3px 12px',
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
        value={text}
        placeholder="自定义文案（留空用默认，多个用 / 分隔）"
        onChange={(e) => updateAttributes({ text: e.target.value })}
        style={{
          display: 'block',
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          padding: '6px 8px',
          fontSize: 13,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ fontSize: 11, color: '#9aa0a6', marginTop: 6 }}>动态组件（关注/在看含 SVG 动效，粘贴到微信可保留）</div>
    </NodeViewWrapper>
  );
}
