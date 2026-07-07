import { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const SERIF = "'Noto Serif SC','Songti SC','STSong',serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// 晚霞渐变：暖色调、标题药丸、emoji 分隔，热情吸睛
export const gradientSunset: Theme = {
  id: 'wechat-gradient-sunset',
  name: '晚霞渐变',
  platform: 'wechat',
  description: '暖橙渐变点缀 + 标题药丸，适合情感、生活方式、好物种草。',
  tags: ['gradient', 'warm', 'vibrant'],
  base: {
    background: '#fff7f2',
    padding: '18px',
    fontFamily: SANS,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#3a2e2a',
  },
  tokens: { primary: '#ff6a3d', secondary: '#ffb347', muted: '#a3897e', radius: '14px', space: '16px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#ff6a3d', marginTop: '30px', marginBottom: '14px', textAlign: 'center', borderBottom: '3px solid #ff6a3d', paddingBottom: '8px' },
    h2: { background: 'linear-gradient(135deg,#ff6a3d,#ffb347)', color: '#fff', padding: '6px 16px', borderRadius: '999px', fontWeight: 700, marginTop: '26px', marginBottom: '12px', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#ff6a3d', borderLeft: '4px solid #ffb347', paddingLeft: '10px', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#3a2e2a' } },
  divider: { type: 'emoji', color: '#ff6a3d', margin: '22px 0', content: '🌅 🌅 🌅' },
  quote: { background: '#fff1e8', borderLeft: '4px solid #ff6a3d', padding: '14px 16px', color: '#6b4f43' },
  card: { background: 'linear-gradient(135deg,#fff7f2,#ffe9d6)', border: '1px solid #ffd9bf', borderRadius: '14px', padding: '18px', boxShadow: '0 6px 18px rgba(255,106,61,.12)' },
  image: { borderRadius: '14px', border: 'none', maxWidth: '100%', captionColor: '#a3897e', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff6a3d', bullet: '🔥' },
  code: { background: '#fff1e8', color: '#d6336c', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
};

// 霓虹暗黑：深色背景 + 霓虹描边，科技/潮流
export const neonDark: Theme = {
  id: 'wechat-neon-dark',
  name: '霓虹暗黑',
  platform: 'wechat',
  description: '深色背景 + 青/品红霓虹，适合科技、游戏、潮流测评。',
  tags: ['dark', 'neon', 'tech'],
  base: {
    background: '#0f1115',
    padding: '18px',
    fontFamily: SANS,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#e6e8ee',
  },
  tokens: { primary: '#00e5ff', secondary: '#ff2d95', muted: '#7a8290', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#00e5ff', marginTop: '30px', marginBottom: '14px', letterSpacing: '1px' },
    h2: { background: 'linear-gradient(90deg,#00e5ff,#ff2d95)', color: '#0f1115', padding: '6px 14px', borderRadius: '10px', fontWeight: 800, marginTop: '26px', marginBottom: '12px', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#ff2d95', borderLeft: '4px solid #ff2d95', paddingLeft: '10px', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#e6e8ee' } },
  divider: { type: 'gradient', color: '#00e5ff', margin: '22px 0' },
  quote: { background: '#161a21', borderLeft: '4px solid #00e5ff', padding: '14px 16px', color: '#aeb6c2' },
  card: { background: '#161a21', border: '1px solid rgba(0,229,255,.35)', borderRadius: '12px', padding: '18px', boxShadow: '0 0 18px rgba(0,229,255,.12)' },
  image: { borderRadius: '12px', border: '1px solid rgba(255,255,255,.08)', maxWidth: '100%', captionColor: '#7a8290', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff2d95', bullet: '▸' },
  code: { background: '#161a21', color: '#00e5ff', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
};

// ins 甜美：柔粉圆角，颜值/穿搭/美食
export const insPink: Theme = {
  id: 'wechat-ins-pink',
  name: 'ins 甜美',
  platform: 'wechat',
  description: '柔粉圆角 + 花瓣分隔，适合穿搭、美妆、美食、旅行。',
  tags: ['pink', 'soft', 'pretty'],
  base: {
    background: '#ffffff',
    padding: '18px',
    fontFamily: SANS,
    fontSize: '16px',
    lineHeight: '1.85',
    color: '#5b4a4a',
  },
  tokens: { primary: '#ff7eb3', secondary: '#ffd6e7', muted: '#b89aa3', radius: '18px', space: '16px' },
  heading: {
    h1: { fontSize: '25px', fontWeight: 800, color: '#ff5e9c', marginTop: '28px', marginBottom: '14px', textAlign: 'center', letterSpacing: '1px' },
    h2: { background: '#ffeaf3', color: '#ff5e9c', padding: '8px 16px', borderRadius: '999px', fontWeight: 700, marginTop: '24px', marginBottom: '12px', display: 'inline-block', border: '1px solid #ffd0e4' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#ff7eb3', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#5b4a4a' } },
  divider: { type: 'emoji', color: '#ff7eb3', margin: '22px 0', content: '🌸 🌸 🌸' },
  quote: { background: '#fff5fa', borderLeft: '4px solid #ffb3d1', padding: '14px 16px', color: '#8a6a78' },
  card: { background: '#fff5fa', border: '1px solid #ffd9e8', borderRadius: '18px', padding: '18px', boxShadow: '0 8px 20px rgba(255,126,179,.15)' },
  image: { borderRadius: '18px', border: 'none', maxWidth: '100%', captionColor: '#b89aa3', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff7eb3', bullet: '💗' },
  code: { background: '#fff5fa', color: '#e0457b', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
};

// 墨韵 Editorial：衬线标题 + 硬阴影卡片，杂志感
export const inkEditorial: Theme = {
  id: 'wechat-ink-editorial',
  name: '墨韵 Editorial',
  platform: 'wechat',
  description: '衬线大标题 + 硬阴影卡片，杂志/深度长文质感。',
  tags: ['editorial', 'serif', 'magazine'],
  base: {
    background: '#fbfaf7',
    padding: '20px',
    fontFamily: SERIF,
    fontSize: '16px',
    lineHeight: '1.85',
    color: '#1c1b19',
  },
  tokens: { primary: '#111111', secondary: '#8a6d3b', muted: '#9a9389', radius: '4px', space: '16px' },
  heading: {
    h1: { fontSize: '30px', fontWeight: 800, color: '#111111', marginTop: '30px', marginBottom: '12px', borderBottom: '2px solid #111111', paddingBottom: '10px', letterSpacing: '1px' },
    h2: { fontSize: '22px', fontWeight: 700, color: '#111111', marginTop: '26px', marginBottom: '12px', borderLeft: '5px solid #111111', paddingLeft: '12px' },
    h3: { fontSize: '18px', fontWeight: 700, color: '#111111', marginTop: '20px', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '4px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#1c1b19' } },
  divider: { type: 'line', color: '#111111', margin: '20px 0' },
  quote: { background: '#f3f0e8', borderLeft: '4px solid #111111', padding: '14px 16px', color: '#4a443a', fontStyle: 'italic' },
  card: { background: '#ffffff', border: '1px solid #111111', borderRadius: '4px', padding: '18px', boxShadow: '4px 4px 0 #111111' },
  image: { borderRadius: '2px', border: '1px solid #ddd', maxWidth: '100%', captionColor: '#9a9389', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#111111', bullet: '▪' },
  code: { background: '#f3f0e8', color: '#8a6d3b', fontFamily: MONO, padding: '2px 6px', borderRadius: '3px' },
};

// 国潮：中国红 + 描金，传统文化/国货
export const guochao: Theme = {
  id: 'wechat-guochao',
  name: '国潮',
  platform: 'wechat',
  description: '中国红 + 描金边框，适合传统文化、国货、节日热点。',
  tags: ['guochao', 'red', 'chinese'],
  base: {
    background: '#fff8f0',
    padding: '18px',
    fontFamily: SERIF,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#3b2a1a',
  },
  tokens: { primary: '#c8102e', secondary: '#e8b04b', muted: '#9c8a6a', radius: '8px', space: '16px' },
  heading: {
    h1: { fontSize: '28px', fontWeight: 800, color: '#c8102e', marginTop: '30px', marginBottom: '14px', textAlign: 'center' },
    h2: { background: 'linear-gradient(135deg,#c8102e,#e8b04b)', color: '#fff', padding: '7px 16px', borderRadius: '8px', fontWeight: 800, marginTop: '26px', marginBottom: '12px', display: 'inline-block', letterSpacing: '1px' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#c8102e', borderLeft: '4px solid #e8b04b', paddingLeft: '10px', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#3b2a1a' } },
  divider: { type: 'emoji', color: '#c8102e', margin: '22px 0', content: '❦ ❦ ❦' },
  quote: { background: '#fdeede', borderLeft: '4px solid #c8102e', padding: '14px 16px', color: '#6b4a2a' },
  card: { background: '#ffffff', border: '2px solid #e8b04b', borderRadius: '8px', padding: '18px', boxShadow: '0 6px 16px rgba(200,16,46,.12)' },
  image: { borderRadius: '8px', border: '2px solid #e8b04b', maxWidth: '100%', captionColor: '#9c8a6a', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#c8102e', bullet: '❖' },
  code: { background: '#fdeede', color: '#c8102e', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
};
