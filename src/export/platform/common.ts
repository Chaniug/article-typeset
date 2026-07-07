// 平台无关的兜底后处理。

/** 把图片 src 的 http:// 升级为 https://（微信要求图片必须 https）。 */
export function ensureHttpsImages(html: string): string {
  return html.replace(/(<img[^>]*\ssrc=")http:\/\//gi, '$1https://');
}
