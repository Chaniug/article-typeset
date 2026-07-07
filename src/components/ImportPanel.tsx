import { useState } from 'react';
import type { Editor } from '@tiptap/react';
import { markdownToHtml } from '../import/markdown';
import { docxToHtml } from '../import/docx';
import { urlToHtml, isLinkImportEnabled } from '../import/url';

type Tab = 'paste' | 'markdown' | 'docx' | 'url';

export function ImportPanel({ editor }: { editor: Editor | null }) {
  const [tab, setTab] = useState<Tab>('paste');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');

  const flash = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(''), 2200);
  };

  const load = (html: string) => {
    if (!editor) return;
    editor.commands.setContent(html, true);
    flash('已导入到编辑器');
  };

  const doPaste = () => {
    if (!text.trim()) return flash('请先粘贴内容');
    load(text);
  };

  const doMarkdown = () => {
    if (!text.trim()) return flash('请先粘贴 Markdown');
    try {
      load(markdownToHtml(text));
    } catch {
      flash('Markdown 解析失败');
    }
  };

  const doDocx = async (file: File) => {
    try {
      const html = await docxToHtml(file);
      load(html);
    } catch {
      flash('docx 解析失败');
    }
  };

  const doUrl = async () => {
    if (!isLinkImportEnabled()) return flash('未配置链接代理，功能不可用（见 worker/README）');
    if (!url.trim()) return flash('请输入文章链接');
    try {
      const html = await urlToHtml(url);
      load(html);
    } catch (e: any) {
      flash(e?.message || '抓取失败');
    }
  };

  return (
    <div className="panel__content">
      <div className="tabs">
        {([
          ['paste', '粘贴'],
          ['markdown', 'Markdown'],
          ['docx', 'Word'],
          ['url', '链接'],
        ] as [Tab, string][]).map(([k, label]) => (
          <button
            key={k}
            className={`tab ${tab === k ? 'tab--active' : ''}`}
            onClick={() => setTab(k)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'paste' && (
        <>
          <div className="field">
            <span className="field__label">直接粘贴 HTML 或富文本</span>
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="把网页/文档里的内容粘贴到这里…"
            />
          </div>
          <button className="btn btn--block" onClick={doPaste}>
            导入到编辑器
          </button>
        </>
      )}

      {tab === 'markdown' && (
        <>
          <div className="field">
            <span className="field__label">Markdown 源码</span>
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="# 标题&#10;正文 **加粗**…"
            />
          </div>
          <button className="btn btn--block" onClick={doMarkdown}>
            解析并导入
          </button>
        </>
      )}

      {tab === 'docx' && (
        <>
          <div className="field">
            <span className="field__label">上传 .docx 文档</span>
            <input
              type="file"
              accept=".docx"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) doDocx(f);
              }}
            />
          </div>
          <p className="muted">浏览器内解析，文件不会上传到任何服务器。</p>
        </>
      )}

      {tab === 'url' && (
        <>
          <div className="field">
            <span className="field__label">文章链接</span>
            <input
              className="input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
            />
          </div>
          <button className="btn btn--block" onClick={doUrl}>
            抓取正文并导入
          </button>
          {!isLinkImportEnabled() && (
            <div className="notice">
              未检测到链接代理。请部署 worker/ 下的 Cloudflare Worker，并在 .env 中设置
              VITE_LINK_PROXY_URL。
            </div>
          )}
        </>
      )}

      {msg && <p className="muted">{msg}</p>}
    </div>
  );
}
