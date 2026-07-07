import type { Editor } from '@tiptap/react';

interface Props {
  editor: Editor | null;
}

export function Toolbar({ editor }: Props) {
  if (!editor) return null;

  const B = ({
    label,
    onClick,
    active,
    title,
  }: {
    label: string;
    onClick: () => void;
    active?: boolean;
    title?: string;
  }) => (
    <button type="button" title={title} className={active ? 'is-active' : ''} onClick={onClick}>
      {label}
    </button>
  );

  const insertNode = (type: string, attrs: Record<string, any> = {}) =>
    editor.chain().focus().insertContent({ type, attrs }).run();

  const insertDivider = (variant: 'line' | 'dots' | 'emoji' | 'gradient') =>
    insertNode('divider', { variant });

  const insertImage = () => {
    const url = window.prompt('图片链接（https://）');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('链接地址（留空取消链接）', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="editor__toolbar">
      <B label="B" title="加粗" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
      <B label="I" title="斜体" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
      <B label="U" title="下划线" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} />
      <B label="S" title="删除线" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
      <B label="✨高亮" title="重点高亮" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleMark('highlight').run()} />
      <B label="链接" title="链接" active={editor.isActive('link')} onClick={setLink} />
      <span style={{ width: 1, background: '#eee', margin: '0 2px' }} />
      <B label="H1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
      <B label="H2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
      <B label="H3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
      <span style={{ width: 1, background: '#eee', margin: '0 2px' }} />
      <B label="• 列表" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
      <B label="1. 列表" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
      <B label="引用" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
      <span style={{ width: 1, background: '#eee', margin: '0 2px' }} />
      <B label="图片" onClick={insertImage} />
      <B label="卡片" onClick={() => insertNode('card', { variant: 'default', title: '提示', body: '' })} />
      <B label="字框" onClick={() => insertNode('card', { variant: 'note', icon: '📌', title: '便签', body: '' })} />
      <B label="四角框" onClick={() => insertNode('card', { variant: 'frame', icon: '◆', title: '要点', body: '' })} />
      <B label="标签框" onClick={() => insertNode('card', { variant: 'tag', icon: '标签', title: 'NOTE', body: '' })} />
      <B label="信息框" onClick={() => insertNode('card', { variant: 'info', title: '提示', body: '' })} />
      <B label="警示框" onClick={() => insertNode('card', { variant: 'warning', title: '注意', body: '' })} />
      <B label="引用框" onClick={() => insertNode('quoteBox', { text: '' })} />
      <B label="图框" onClick={() => insertNode('imageFrame', { src: '', caption: '', variant: 'rounded' })} />
      <B label="多图" onClick={() => insertNode('imageGrid', { images: [{ src: '', caption: '' }, { src: '', caption: '' }] })} />
      <span style={{ width: 1, background: '#eee', margin: '0 2px' }} />
      <B label="关注" onClick={() => insertNode('widget', { variant: 'follow' })} />
      <B label="在看" onClick={() => insertNode('widget', { variant: 'like' })} />
      <B label="二维码" onClick={() => insertNode('widget', { variant: 'qr' })} />
      <B label="往期" onClick={() => insertNode('widget', { variant: 'past' })} />
      <B label="雷达" onClick={() => insertNode('widget', { variant: 'radar' })} />
      <B label="扫描" onClick={() => insertNode('widget', { variant: 'scanline' })} />
      <B label="脉冲" onClick={() => insertNode('widget', { variant: 'pulse' })} />
      <span style={{ width: 1, background: '#eee', margin: '0 2px' }} />
      <B label="— 线" onClick={() => insertDivider('line')} />
      <B label="•••" onClick={() => insertDivider('dots')} />
      <B label="✨" onClick={() => insertDivider('emoji')} />
      <B label="▰" onClick={() => insertDivider('gradient')} />
    </div>
  );
}
