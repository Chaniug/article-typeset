// 富文本复制：把排版好的 HTML 写入剪贴板，粘贴进微信编辑器即保留样式。

export async function copyRichText(html: string, plain: string): Promise<boolean> {
  try {
    const ClipboardItemCtor = (window as any).ClipboardItem;
    if (navigator.clipboard && typeof ClipboardItemCtor !== 'undefined') {
      // 安全：ClipboardItem 需要同步 Blob
      const item = new ClipboardItemCtor({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([item]);
      return true;
    }
  } catch {
    // 降级到 execCommand
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = plain;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
