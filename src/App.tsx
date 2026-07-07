import { useEditor, EditorContent } from '@tiptap/react';
import { buildExtensions, initialContent } from './editor/extensions';
import { Toolbar } from './editor/Toolbar';
import { PlatformSwitch } from './components/PlatformSwitch';
import { ThemePicker } from './components/ThemePicker';
import { Preview } from './components/Preview';
import { ImportPanel } from './components/ImportPanel';
import { useAppStore } from './store/useAppStore';
import type { PMNode } from './export/serializer';

export default function App() {
  const setDoc = useAppStore((s) => s.setDoc);

  const editor = useEditor({
    extensions: buildExtensions(),
    content: initialContent,
    onUpdate: ({ editor }) => setDoc(editor.getJSON() as unknown as PMNode),
    onCreate: ({ editor }) => setDoc(editor.getJSON() as unknown as PMNode),
  });

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <img src="/favicon.svg" alt="logo" />
          <span>文章排版工具</span>
        </div>
        <PlatformSwitch />
      </header>

      <div className="app__body">
        <aside className="panel">
          <div className="panel__title">导入内容</div>
          <ImportPanel editor={editor} />
        </aside>

        <main className="panel" style={{ borderRight: 'none' }}>
          <Toolbar editor={editor} />
          <div className="editor">
            <EditorContent editor={editor} className="editor__content" />
          </div>
        </main>

        <aside className="panel panel--preview">
          <div className="panel__title">主题</div>
          <div style={{ maxHeight: '38%', overflow: 'auto' }}>
            <ThemePicker />
          </div>
          <div className="panel__title">预览 / 复制</div>
          <Preview />
        </aside>
      </div>
    </div>
  );
}
