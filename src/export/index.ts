import { serialize } from './serializer';
import { wrapWechat, sanitizeWechat } from './platform/wechat';
import { ensureHttpsImages } from './platform/common';
import { getPlatform } from '../platforms';
import { Theme } from '../themes/types';
import type { PMNode } from './serializer';

export type PlatformId = 'wechat' | 'xiaohongshu' | 'bilibili' | 'baijiahao';

/** 一键排版核心：文档 + 主题 + 平台 -> 可复制的内联 HTML。
 *  所有平台统一走「根 section 包裹 + 图片 https + 去 class/id」内联管线，
 *  保证粘贴到各平台编辑器后版式稳定。 */
export function exportDocument(doc: PMNode, theme: Theme, platform: PlatformId = 'wechat'): string {
  const inner = serialize(doc, theme);
  const maxWidth = getPlatform(platform)?.maxWidth;
  const html = wrapWechat(theme, inner, maxWidth);
  return sanitizeWechat(ensureHttpsImages(html));
}

export { serialize, getPlainText } from './serializer';
export { copyRichText } from './clipboard';
