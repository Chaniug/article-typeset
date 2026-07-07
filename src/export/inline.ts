// 兜底内联器：把导入的外部（带 class 的）HTML 的 <style> 规则合并到元素 style，
// 并移除 class/id/<style>/<script>，保证最终「全内联、无 class」。
// 微信主链路由 serializer 直接内联，不依赖本文件；本文件仅用于 docx / 链接导入的成品兜底。

export function inlineExternalHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const rules: { selector: string; style: string }[] = [];
  doc.querySelectorAll('style').forEach((styleEl) => {
    const css = styleEl.textContent || '';
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(css))) {
      rules.push({ selector: m[1].trim(), style: m[2].trim() });
    }
    styleEl.remove();
  });

  doc.querySelectorAll('script').forEach((s) => s.remove());

  doc.querySelectorAll('*').forEach((el) => {
    for (const r of rules) {
      try {
        if ((el as Element).matches(r.selector)) {
          const existing = el.getAttribute('style') || '';
          el.setAttribute('style', (existing ? existing.replace(/;?\s*$/, ';') : '') + r.style);
        }
      } catch {
        // 非法选择器，跳过
      }
    }
    el.removeAttribute('class');
    el.removeAttribute('id');
  });

  return doc.body.innerHTML;
}
