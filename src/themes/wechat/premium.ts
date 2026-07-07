import { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const SERIF = "'Noto Serif SC','Songti SC','STSong',serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// 莫兰迪：低饱和灰调，克制高级，适合生活方式/设计/读书
export const morandi: Theme = {
  id: 'wechat-morandi',
  name: '莫兰迪灰调',
  platform: 'wechat',
  description: '低饱和灰绿/灰褐，克制留白，适合生活方式、设计、读书类长文。',
  tags: ['morandi', 'muted', 'elegant'],
  base: { background: '#f4f3f0', padding: '20px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.85', color: '#4a4742' },
  tokens: { primary: '#8a8a7a', secondary: '#b0a595', muted: '#9a958c', radius: '10px', space: '18px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, color: '#4a4742', marginTop: '30px', marginBottom: '14px', variant: 'underline', accentColor: '#8a8a7a', paddingBottom: '8px', display: 'inline-block' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#4a4742', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#8a8a7a', blockColor: '#fff', blockPadding: '6px 16px', blockRadius: '8px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#4a4742', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#b0a595', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#4a4742' } },
  divider: { type: 'gradient', color: '#b0a595', margin: '22px 0' },
  quote: { background: '#efece6', borderLeft: '4px solid #8a8a7a', padding: '14px 16px', color: '#6b6760' },
  card: { background: '#efece6', border: '1px solid #ddd8cf', borderRadius: '10px', padding: '18px', boxShadow: 'none' },
  image: { borderRadius: '10px', border: 'none', maxWidth: '100%', captionColor: '#9a958c', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#8a8a7a', bullet: '▪' },
  code: { background: '#efece6', color: '#8a6d3b', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(176,165,149,.35)', color: '#4a4742', radius: '3px' },
};

// 赛博霓虹：深色 + 渐变发光，科技/游戏/潮流
export const cyber: Theme = {
  id: 'wechat-cyber',
  name: '赛博霓虹',
  platform: 'wechat',
  description: '深色底 + 青/品红渐变发光标题，科技、游戏、潮流测评首选。',
  tags: ['cyber', 'neon', 'dark', 'dynamic'],
  base: { background: '#0b0e14', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#e7ecf3' },
  tokens: { primary: '#21e6c1', secondary: '#ff3df0', muted: '#6b7585', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, marginTop: '30px', marginBottom: '14px', variant: 'gradient', gradientFrom: '#21e6c1', gradientTo: '#ff3df0', textShadow: '0 0 12px rgba(33,230,193,.5)' },
    h2: { fontSize: '20px', fontWeight: 800, color: '#0b0e14', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: 'linear-gradient(90deg,#21e6c1,#ff3df0)', blockColor: '#0b0e14', blockPadding: '6px 16px', blockRadius: '10px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#ff3df0', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#ff3df0', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#e7ecf3' } },
  divider: { type: 'gradient', color: '#21e6c1', margin: '22px 0' },
  quote: { background: '#121723', borderLeft: '4px solid #21e6c1', padding: '14px 16px', color: '#aeb6c2' },
  card: { background: '#121723', border: '1px solid rgba(33,230,193,.4)', borderRadius: '12px', padding: '18px', boxShadow: '0 0 20px rgba(33,230,193,.15)' },
  image: { borderRadius: '12px', border: '1px solid rgba(255,255,255,.08)', maxWidth: '100%', captionColor: '#6b7585', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff3df0', bullet: '▸' },
  code: { background: '#121723', color: '#21e6c1', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(255,61,240,.25)', color: '#ffe3fb', radius: '3px' },
};

// 孟菲斯：撞色 + 硬阴影，活泼有记忆点
export const memphis: Theme = {
  id: 'wechat-memphis',
  name: '孟菲斯撞色',
  platform: 'wechat',
  description: '珊瑚红/蓝/黄撞色 + 硬阴影，活泼有记忆点，适合年轻化、活动、干货盘点。',
  tags: ['memphis', 'pop', 'colorful'],
  base: { background: '#fffef7', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#1f1f1f' },
  tokens: { primary: '#ff5a5f', secondary: '#3d5afe', muted: '#8a8a8a', radius: '14px', space: '16px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 900, color: '#1f1f1f', marginTop: '30px', marginBottom: '14px', variant: 'underline', accentColor: '#ff5a5f', paddingBottom: '6px', display: 'inline-block' },
    h2: { fontSize: '20px', fontWeight: 800, color: '#1f1f1f', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#ffd23f', blockColor: '#1f1f1f', blockPadding: '6px 16px', blockRadius: '14px' },
    h3: { fontSize: '16px', fontWeight: 800, color: '#1f1f1f', marginTop: '20px', marginBottom: '8px', variant: 'pill', blockBg: '#3d5afe', blockColor: '#fff', blockPadding: '4px 14px', blockRadius: '999px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#1f1f1f' } },
  divider: { type: 'dots', color: '#ff5a5f', margin: '22px 0' },
  quote: { background: '#fff', border: '3px solid #1f1f1f', borderLeft: '8px solid #ff5a5f', borderRadius: '14px', padding: '14px 16px', color: '#1f1f1f' },
  card: { background: '#fff', border: '3px solid #1f1f1f', borderRadius: '14px', padding: '18px', boxShadow: '5px 5px 0 #ff5a5f' },
  image: { borderRadius: '14px', border: '3px solid #1f1f1f', maxWidth: '100%', captionColor: '#8a8a8a', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff5a5f', bullet: '◆' },
  code: { background: '#fff', color: '#ff5a5f', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px', border: '1px solid #1f1f1f' },
  highlight: { background: '#ffe14d', color: '#1f1f1f', radius: '3px' },
};

// 奶油轻奢：暖金描边，质感温润
export const cream: Theme = {
  id: 'wechat-cream',
  name: '奶油轻奢',
  platform: 'wechat',
  description: '暖金描边 + 大圆角，温润轻奢，适合美妆、家居、母婴、高端生活方式。',
  tags: ['cream', 'luxury', 'soft', 'gold'],
  base: { background: '#fdfbf7', padding: '20px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.85', color: '#4a4036' },
  tokens: { primary: '#c9a36b', secondary: '#e8d9bf', muted: '#a89a86', radius: '16px', space: '18px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, marginTop: '30px', marginBottom: '14px', variant: 'gradient', gradientFrom: '#c9a36b', gradientTo: '#e8c89b' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#8a6d3b', marginTop: '26px', marginBottom: '12px', variant: 'block', blockBg: '#f3ead8', blockColor: '#8a6d3b', blockPadding: '8px 18px', blockRadius: '16px', border: '1px solid #e8d9bf' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#8a6d3b', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#c9a36b', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.85', color: '#4a4036' } },
  divider: { type: 'gradient', color: '#c9a36b', margin: '22px 0' },
  quote: { background: '#faf4e8', borderLeft: '4px solid #c9a36b', padding: '14px 16px', color: '#7a6a52' },
  card: { background: '#fffdf9', border: '1px solid #ece2d0', borderRadius: '16px', padding: '18px', boxShadow: '0 10px 30px rgba(201,163,107,.12)' },
  image: { borderRadius: '16px', border: '1px solid #ece2d0', maxWidth: '100%', captionColor: '#a89a86', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#c9a36b', bullet: '❖' },
  code: { background: '#faf4e8', color: '#8a6d3b', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
  highlight: { background: 'rgba(201,163,107,.3)', color: '#4a4036', radius: '3px' },
};

// 留白杂志：极简衬线，高级冷淡
export const whitespace: Theme = {
  id: 'wechat-whitespace',
  name: '留白杂志',
  platform: 'wechat',
  description: '极简衬线 + 大量留白 + 细线分隔，杂志/深度长文质感。',
  tags: ['minimal', 'editorial', 'serif', 'whitespace'],
  base: { background: '#ffffff', padding: '24px', fontFamily: SERIF, fontSize: '16px', lineHeight: '1.9', color: '#222222' },
  tokens: { primary: '#111111', secondary: '#888888', muted: '#aaaaaa', radius: '2px', space: '20px' },
  heading: {
    h1: { fontSize: '30px', fontWeight: 800, color: '#111111', marginTop: '34px', marginBottom: '14px', variant: 'underline', accentColor: '#111111', paddingBottom: '10px', letterSpacing: '1px', display: 'inline-block' },
    h2: { fontSize: '22px', fontWeight: 700, color: '#111111', marginTop: '28px', marginBottom: '12px', variant: 'bar', accentColor: '#111111', paddingLeft: '12px' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#111111', marginTop: '22px', marginBottom: '8px', variant: 'underline', accentColor: '#dddddd', paddingBottom: '4px', display: 'inline-block' },
  },
  paragraph: { base: { margin: '0 0 18px', lineHeight: '1.9', color: '#222222' } },
  divider: { type: 'line', color: '#111111', margin: '24px 0' },
  quote: { background: '#fafafa', borderLeft: '4px solid #111111', padding: '16px 18px', color: '#444444', fontStyle: 'italic' },
  card: { background: '#fafafa', border: '1px solid #eeeeee', borderRadius: '2px', padding: '18px', boxShadow: 'none' },
  image: { borderRadius: '2px', border: '1px solid #eeeeee', maxWidth: '100%', captionColor: '#aaaaaa', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#111111', bullet: '—' },
  code: { background: '#fafafa', color: '#666666', fontFamily: MONO, padding: '2px 6px', borderRadius: '2px' },
  highlight: { background: 'rgba(0,0,0,.06)', color: '#111111', radius: '2px' },
};

// 科技光圈：蓝青渐变，理性通透
export const techRing: Theme = {
  id: 'wechat-techring',
  name: '科技光圈',
  platform: 'wechat',
  description: '蓝青渐变 + 编号标题，理性通透，适合科技、数码、职场干货。',
  tags: ['tech', 'blue', 'gradient', 'number'],
  base: { background: '#f7f9fc', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#1b2733' },
  tokens: { primary: '#2f6bff', secondary: '#00c2ff', muted: '#8a98a8', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, marginTop: '30px', marginBottom: '14px', variant: 'gradient', gradientFrom: '#2f6bff', gradientTo: '#00c2ff' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#1b2733', marginTop: '26px', marginBottom: '12px', variant: 'number', accentColor: '#2f6bff' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#1b2733', marginTop: '20px', marginBottom: '8px', variant: 'bar', accentColor: '#00c2ff', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#1b2733' } },
  divider: { type: 'gradient', color: '#2f6bff', margin: '22px 0' },
  quote: { background: '#eef3ff', borderLeft: '4px solid #2f6bff', padding: '14px 16px', color: '#3a4a63' },
  card: { background: '#ffffff', border: '1px solid #e3ecff', borderRadius: '12px', padding: '18px', boxShadow: '0 8px 24px rgba(47,107,255,.1)' },
  image: { borderRadius: '12px', border: '1px solid #e3ecff', maxWidth: '100%', captionColor: '#8a98a8', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#2f6bff', bullet: '◆' },
  code: { background: '#eef3ff', color: '#2f6bff', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(47,107,255,.18)', color: '#1b2733', radius: '3px' },
};

export const premiumWechatThemes: Theme[] = [
  morandi,
  cyber,
  memphis,
  cream,
  whitespace,
  techRing,
];
