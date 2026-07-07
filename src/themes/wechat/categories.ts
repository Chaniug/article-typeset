import { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// —— 商务 · 墨蓝金线 —— 浅暖白底 + 深墨蓝字 + 克金细线，西装质感的高级商务，适合咨询/金融/法律
export const bizInk: Theme = {
  id: 'wechat-biz-ink',
  name: '商务·墨蓝金线',
  platform: 'wechat',
  description: '浅暖白底、深墨蓝字、克制金线，西装质感的高级商务排版，适合咨询、金融、法律类长文。',
  tags: ['business', 'elegant', 'gold', 'minimal'],
  base: { background: '#fbfaf8', padding: '20px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.85', color: '#1a2238' },
  tokens: { primary: '#1a2238', secondary: '#c9a36b', muted: '#8a8f9c', radius: '10px', space: '18px' },
  heading: {
    h1: { fontSize: '28px', fontWeight: 800, color: '#1a2238', marginTop: '32px', marginBottom: '14px', variant: 'underline', accentColor: '#c9a36b', paddingBottom: '8px', letterSpacing: '1px', display: 'inline-block' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#fff', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#1a2238', blockColor: '#fff', blockPadding: '8px 18px', blockRadius: '8px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#1a2238', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#c9a36b', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#1a2238' } },
  divider: { type: 'gradient', color: '#c9a36b', margin: '22px 0' },
  quote: { background: '#f3f1ec', borderLeft: '4px solid #c9a36b', padding: '14px 16px', color: '#3a4258' },
  card: { background: '#fff', border: '1px solid #e6e2d8', borderRadius: '10px', padding: '18px', boxShadow: '0 8px 24px rgba(26,34,56,.06)' },
  image: { borderRadius: '10px', border: '1px solid #e6e2d8', maxWidth: '100%', captionColor: '#8a8f9c', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#c9a36b', bullet: '◆' },
  code: { background: '#f3f1ec', color: '#1a2238', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(201,163,107,.28)', color: '#1a2238', radius: '3px' },
};

// —— 商务 · 雾蓝现代 —— 冷白底 + 雾蓝编号标题，干净现代 SaaS/咨询感
export const bizSlate: Theme = {
  id: 'wechat-biz-slate',
  name: '商务·雾蓝现代',
  platform: 'wechat',
  description: '冷白底、雾蓝编号标题，干净利落的现代商务感，适合 SaaS、咨询、职场方法论。',
  tags: ['business', 'modern', 'blue', 'clean'],
  base: { background: '#f4f6f8', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#243b53' },
  tokens: { primary: '#345b8c', secondary: '#7a93b0', muted: '#9aabbd', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, color: '#243b53', marginTop: '30px', marginBottom: '14px', variant: 'underline', accentColor: '#345b8c', paddingBottom: '6px', display: 'inline-block' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#243b53', marginTop: '26px', marginBottom: '12px', variant: 'number', accentColor: '#345b8c' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#243b53', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#7a93b0', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#243b53' } },
  divider: { type: 'line', color: '#cfdae6', margin: '22px 0' },
  quote: { background: '#eef2f7', borderLeft: '4px solid #345b8c', padding: '14px 16px', color: '#35506f' },
  card: { background: '#fff', border: '1px solid #dde6ef', borderRadius: '12px', padding: '18px', boxShadow: '0 6px 18px rgba(52,91,140,.08)' },
  image: { borderRadius: '12px', border: '1px solid #dde6ef', maxWidth: '100%', captionColor: '#9aabbd', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#345b8c', bullet: '▪' },
  code: { background: '#eef2f7', color: '#345b8c', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(52,91,140,.16)', color: '#243b53', radius: '3px' },
};

// —— 政务 · 青绿国风 —— 青绿替代常见红，稳重又不老套的国风政务
export const govGreen: Theme = {
  id: 'wechat-gov-green',
  name: '政务·青绿国风',
  platform: 'wechat',
  description: '极浅青绿底、青绿描块标题，稳重清雅的国风政务排版，适合政策解读、科普、便民服务。',
  tags: ['government', 'green', 'national', 'calm'],
  base: { background: '#f2f6f4', padding: '20px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.85', color: '#1c3d34' },
  tokens: { primary: '#1f7a5a', secondary: '#5a9b86', muted: '#8aa79c', radius: '10px', space: '18px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, color: '#1c3d34', marginTop: '30px', marginBottom: '14px', variant: 'underline', accentColor: '#1f7a5a', paddingBottom: '8px', letterSpacing: '1px', display: 'inline-block' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#fff', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#1f7a5a', blockColor: '#fff', blockPadding: '8px 18px', blockRadius: '8px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#1c3d34', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#5a9b86', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#1c3d34' } },
  divider: { type: 'gradient', color: '#5a9b86', margin: '22px 0' },
  quote: { background: '#e7f1ec', borderLeft: '4px solid #1f7a5a', padding: '14px 16px', color: '#2e574b' },
  card: { background: '#fff', border: '1px solid #d6e6df', borderRadius: '10px', padding: '18px', boxShadow: '0 8px 22px rgba(31,122,90,.08)' },
  image: { borderRadius: '10px', border: '1px solid #d6e6df', maxWidth: '100%', captionColor: '#8aa79c', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#1f7a5a', bullet: '❖' },
  code: { background: '#e7f1ec', color: '#1f7a5a', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(31,122,90,.18)', color: '#1c3d34', radius: '3px' },
};

// —— 政务 · 清朗蓝白 —— 白底 + 圆角蓝 pill 标题，清朗现代政务
export const govBlue: Theme = {
  id: 'wechat-gov-blue',
  name: '政务·清朗蓝白',
  platform: 'wechat',
  description: '白底、圆角蓝 pill 标题、清朗留白，现代亲和的政务排版，适合通告、办事指南、民生资讯。',
  tags: ['government', 'blue', 'clean', 'friendly'],
  base: { background: '#ffffff', padding: '20px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#1f3a5f' },
  tokens: { primary: '#1f5fbf', secondary: '#7aa3e0', muted: '#9aabc4', radius: '14px', space: '18px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, color: '#1f3a5f', marginTop: '30px', marginBottom: '14px', variant: 'bar', accentColor: '#1f5fbf', paddingLeft: '12px' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#fff', marginTop: '26px', marginBottom: '12px', variant: 'pill', blockBg: '#1f5fbf', blockColor: '#fff', blockPadding: '8px 20px', blockRadius: '999px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#1f3a5f', marginTop: '20px', marginBottom: '8px', variant: 'underline', accentColor: '#7aa3e0', paddingBottom: '4px', display: 'inline-block' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#1f3a5f' } },
  divider: { type: 'gradient', color: '#7aa3e0', margin: '22px 0' },
  quote: { background: '#eef4fc', borderLeft: '4px solid #1f5fbf', padding: '14px 16px', color: '#2e4a73' },
  card: { background: '#fff', border: '1px solid #d8e6f7', borderRadius: '14px', padding: '18px', boxShadow: '0 8px 22px rgba(31,95,191,.08)' },
  image: { borderRadius: '14px', border: '1px solid #d8e6f7', maxWidth: '100%', captionColor: '#9aabc4', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#1f5fbf', bullet: '◆' },
  code: { background: '#eef4fc', color: '#1f5fbf', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
  highlight: { background: 'rgba(31,95,191,.16)', color: '#1f3a5f', radius: '3px' },
};

// —— 资讯 · 财经深读 —— 近黑底 + 琥珀金，数据感强的高对比深读
export const newsFinance: Theme = {
  id: 'wechat-news-finance',
  name: '资讯·财经深读',
  platform: 'wechat',
  description: '近黑底、琥珀金标题，高对比数据感的财经深读排版，适合财经、行业研究、硬新闻。',
  tags: ['news', 'finance', 'dark', 'data'],
  base: { background: '#0e1116', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.85', color: '#e8edf2' },
  tokens: { primary: '#f0b429', secondary: '#ffd966', muted: '#7a8390', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '28px', fontWeight: 800, marginTop: '30px', marginBottom: '14px', variant: 'gradient', gradientFrom: '#f0b429', gradientTo: '#ffd966', textShadow: '0 0 16px rgba(240,180,41,.35)' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#f0b429', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#1c2128', blockColor: '#f0b429', blockPadding: '8px 18px', blockRadius: '8px', border: '1px solid rgba(240,180,41,.4)' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#ffd966', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#f0b429', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#e8edf2' } },
  divider: { type: 'gradient', color: '#f0b429', margin: '22px 0' },
  quote: { background: '#161b22', borderLeft: '4px solid #f0b429', padding: '14px 16px', color: '#b9c2cf' },
  card: { background: '#161b22', border: '1px solid rgba(240,180,41,.25)', borderRadius: '12px', padding: '18px', boxShadow: '0 0 24px rgba(240,180,41,.08)' },
  image: { borderRadius: '12px', border: '1px solid rgba(255,255,255,.08)', maxWidth: '100%', captionColor: '#7a8390', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#f0b429', bullet: '▸' },
  code: { background: '#161b22', color: '#ffd966', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(240,180,41,.28)', color: '#fff6e0', radius: '3px' },
};

// —— 资讯 · 报头红 —— 白底 + 强红报头标题，紧凑有力的硬新闻感
export const newsTabloid: Theme = {
  id: 'wechat-news-tabloid',
  name: '资讯·报头红',
  platform: 'wechat',
  description: '白底、强红报头标题、紧凑有力，现代硬新闻排版，适合热点、社会、快讯类内容。',
  tags: ['news', 'red', 'tabloid', 'bold'],
  base: { background: '#fcfcfc', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#16181d' },
  tokens: { primary: '#e60023', secondary: '#ff5a5f', muted: '#9a9aa0', radius: '6px', space: '16px' },
  heading: {
    h1: { fontSize: '28px', fontWeight: 900, color: '#fff', marginTop: '28px', marginBottom: '14px', variant: 'block', blockBg: '#e60023', blockColor: '#fff', blockPadding: '10px 20px', blockRadius: '6px' },
    h2: { fontSize: '20px', fontWeight: 800, color: '#16181d', marginTop: '26px', marginBottom: '12px', variant: 'number', accentColor: '#e60023' },
    h3: { fontSize: '16px', fontWeight: 800, color: '#16181d', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#e60023', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#16181d' } },
  divider: { type: 'dots', color: '#e60023', margin: '22px 0' },
  quote: { background: '#fff', borderLeft: '4px solid #e60023', padding: '14px 16px', color: '#33353b' },
  card: { background: '#fff', border: '1px solid #ececec', borderRadius: '6px', padding: '18px', boxShadow: '0 6px 18px rgba(230,0,35,.08)' },
  image: { borderRadius: '6px', border: '1px solid #ececec', maxWidth: '100%', captionColor: '#9a9aa0', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#e60023', bullet: '◆' },
  code: { background: '#f5f5f5', color: '#e60023', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
  highlight: { background: 'rgba(230,0,35,.14)', color: '#16181d', radius: '3px' },
};

// —— 游戏 · 电竞紫橙 —— 深紫黑底 + 紫橙渐变发光，热血电竞
export const gameEsport: Theme = {
  id: 'wechat-game-esport',
  name: '游戏·电竞紫橙',
  platform: 'wechat',
  description: '深紫黑底、紫橙渐变发光标题，热血电竞风，适合赛事、攻略、硬核测评。',
  tags: ['game', 'esport', 'purple', 'dynamic'],
  base: { background: '#0d0a14', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#f0e9ff' },
  tokens: { primary: '#7c3aed', secondary: '#ff7a18', muted: '#877a9c', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '28px', fontWeight: 800, marginTop: '30px', marginBottom: '14px', variant: 'gradient', gradientFrom: '#7c3aed', gradientTo: '#ff7a18', textShadow: '0 0 14px rgba(124,58,237,.5)' },
    h2: { fontSize: '20px', fontWeight: 800, color: '#fff', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: 'linear-gradient(90deg,#7c3aed,#ff7a18)', blockColor: '#fff', blockPadding: '8px 18px', blockRadius: '10px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#ff7a18', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#ff7a18', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#f0e9ff' } },
  divider: { type: 'gradient', color: '#7c3aed', margin: '22px 0' },
  quote: { background: '#171022', borderLeft: '4px solid #ff7a18', padding: '14px 16px', color: '#cbbde6' },
  card: { background: '#171022', border: '1px solid rgba(124,58,237,.4)', borderRadius: '12px', padding: '18px', boxShadow: '0 0 22px rgba(124,58,237,.18)' },
  image: { borderRadius: '12px', border: '1px solid rgba(255,255,255,.08)', maxWidth: '100%', captionColor: '#877a9c', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff7a18', bullet: '▸' },
  code: { background: '#171022', color: '#c4b5fd', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(255,122,24,.28)', color: '#fff0e6', radius: '3px' },
};

// —— 游戏 · 二次元 —— 浅粉底 + 粉紫渐变，清新活泼的二次元风
export const gameAnime: Theme = {
  id: 'wechat-game-anime',
  name: '游戏·二次元',
  platform: 'wechat',
  description: '浅粉底、粉紫渐变标题、emoji 分隔，清新活泼的二次元风，适合手游、同人、角色安利。',
  tags: ['game', 'anime', 'pink', 'cute'],
  base: { background: '#fdf4fb', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.85', color: '#3a2b4a' },
  tokens: { primary: '#f48fb1', secondary: '#a18cd1', muted: '#b9a8c9', radius: '16px', space: '16px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, marginTop: '30px', marginBottom: '14px', variant: 'gradient', gradientFrom: '#a18cd1', gradientTo: '#fbc2eb' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#fff', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#f48fb1', blockColor: '#fff', blockPadding: '8px 18px', blockRadius: '14px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#fff', marginTop: '20px', marginBottom: '8px', variant: 'pill', blockBg: '#a18cd1', blockColor: '#fff', blockPadding: '4px 14px', blockRadius: '999px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#3a2b4a' } },
  divider: { type: 'emoji', color: '#f48fb1', margin: '20px 0', content: '✨ ✨ ✨' },
  quote: { background: '#fbeef6', borderLeft: '4px solid #f48fb1', padding: '14px 16px', color: '#5a4568' },
  card: { background: '#fff', border: '1px solid #f3dcec', borderRadius: '16px', padding: '18px', boxShadow: '0 10px 26px rgba(244,143,177,.14)' },
  image: { borderRadius: '16px', border: '1px solid #f3dcec', maxWidth: '100%', captionColor: '#b9a8c9', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#f48fb1', bullet: '♥' },
  code: { background: '#fbeef6', color: '#e0529b', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
  highlight: { background: 'rgba(244,143,177,.3)', color: '#3a2b4a', radius: '3px' },
};

export const categoryWechatThemes: Theme[] = [
  bizInk,
  bizSlate,
  govGreen,
  govBlue,
  newsFinance,
  newsTabloid,
  gameEsport,
  gameAnime,
];
