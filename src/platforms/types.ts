// 平台约束：决定布局引擎如何后处理导出 HTML。

export interface PlatformConstraint {
  id: 'wechat' | 'xiaohongshu' | 'bilibili' | 'baijiahao';
  name: string;
  description: string;
  /** 正文区最大宽度 */
  maxWidth?: string;
  /** 是否必须全内联（微信=true，剥离 class/style 标签） */
  inlineOnly: boolean;
  /** 是否允许整段 customCss（非微信平台可为 true） */
  supportsCustomCss: boolean;
  /** 是否已实现（未实现则在 UI 中标记为「敬请期待」） */
  enabled: boolean;
}

export const wechat: PlatformConstraint = {
  id: 'wechat',
  name: '微信公众号',
  description: '高要求排版：全内联、section 包裹、px 字号、图片 https。',
  maxWidth: '677px',
  inlineOnly: true,
  supportsCustomCss: false,
  enabled: true,
};

export const xiaohongshu: PlatformConstraint = {
  id: 'xiaohongshu',
  name: '小红书',
  description: 'emoji 标题、色块、分隔，活泼吸睛，适配手机窄屏。',
  maxWidth: '460px',
  inlineOnly: true,
  supportsCustomCss: false,
  enabled: true,
};

export const bilibili: PlatformConstraint = {
  id: 'bilibili',
  name: '哔哩哔哩',
  description: 'B 站专栏图文排版，约束类似微信但更宽松，支持彩色块。',
  maxWidth: '720px',
  inlineOnly: true,
  supportsCustomCss: false,
  enabled: true,
};

export const baijiahao: PlatformConstraint = {
  id: 'baijiahao',
  name: '百家号',
  description: '百家号自媒体图文排版，资讯/清新双风格。',
  maxWidth: '680px',
  inlineOnly: true,
  supportsCustomCss: false,
  enabled: true,
};
