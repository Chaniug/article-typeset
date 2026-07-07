import { Theme } from '../../themes/types';
import { baseStyle } from '../../themes/compiler';

/** 用根 <section> 包裹正文，写入页面级内联样式（微信约束）。 */
export function wrapWechat(theme: Theme, innerHtml: string, maxWidth?: string): string {
  return `<section style="${baseStyle(theme, maxWidth)}">${innerHtml}</section>`;
}

/** 微信后处理：去 class/id、去 <style>/<script>、div 转 section。 */
export function sanitizeWechat(html: string): string {
  let out = html.replace(/\sclass="[^"]*"/g, '').replace(/\sclass='[^']*'/g, '');
  out = out.replace(/\sid="[^"]*"/g, '').replace(/\sid='[^']*'/g, '');
  out = out.replace(/<style[\s\S]*?<\/style>/gi, '');
  out = out.replace(/<script[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<div\b/gi, '<section').replace(/<\/div>/gi, '</section>');
  return out;
}
