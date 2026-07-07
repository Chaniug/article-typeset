import { serialize } from './serializer';
import { wrapWechat, sanitizeWechat } from './platform/wechat';
import { ensureHttpsImages } from './platform/common';
import { Theme } from '../themes/types';
import type { PMNode } from './serializer';

export type PlatformId = 'wechat' | 'xiaohongshu' | 'bilibili' | 'baijiahao';

/** 一键排版核心：文档 + 主题 + 平台 -> 可复制的内联 HTML。 */
export function exportDocument(doc: PMNode, theme: Theme, platform: PlatformId = 'wechat'): string {
  const inner = serialize(doc, theme);
  if (platform === 'wechat') {
    let html = wrapWechat(theme, inner);
    html = ensureHttpsImages(html);
    html = sanitizeWechat(html);
    return html;
  }
  return inner;
}

export { serialize, getPlainText } from './serializer';
export { copyRichText } from './clipboard';
