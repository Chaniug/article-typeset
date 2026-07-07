import type { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// 糖果色：马卡龙粉，软萌治愈
export const xhsCandy: Theme = {
  id: 'xhs-candy',
  name: '糖果色',
  platform: 'xiaohongshu',
  description: '马卡龙粉 + 圆角药丸标题，软萌治愈，适合美妆/穿搭/日常。',
  tags: ['candy', 'pastel', 'cute'],
  base: {
    background: '#ffffff',
    padding: '14px',
    fontFamily: SANS,
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#5a4a52',
  },
  tokens: { primary: '#ff8fab', secondary: '#bde0fe', muted: '#b0a0a8', radius: '16px', space: '14px' },
  heading: {
    h1: { fontSize: '22px', fontWeight: 800, color: '#ff5d8f', marginTop: '22px', marginBottom: '10px', textAlign: 'center', letterSpacing: '1px' },
    h2: { background: '#ffe3ec', color: '#ff5d8f', padding: '6px 14px', borderRadius: '999px', fontWeight: 700, marginTop: '20px', marginBottom: '10px', display: 'inline-block' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#ff8fab', marginTop: '16px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 14px', lineHeight: '1.8', color: '#5a4a52' } },
  divider: { type: 'emoji', color: '#ff8fab', margin: '18px 0', content: '🍬 🍬 🍬' },
  quote: { background: '#fff0f5', borderLeft: '4px solid #ff8fab', padding: '12px 14px', color: '#8a6a78' },
  card: { background: '#fff0f5', border: '1px solid #ffd6e6', borderRadius: '16px', padding: '16px', boxShadow: '0 6px 16px rgba(255,143,171,.15)' },
  image: { borderRadius: '16px', border: 'none', maxWidth: '100%', captionColor: '#b0a0a8', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff8fab', bullet: '🍭' },
  code: { background: '#fff0f5', color: '#e0457b', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
};

// 多巴胺：高饱和撞色，元气炸裂
export const xhsDopamine: Theme = {
  id: 'xhs-dopamine',
  name: '多巴胺',
  platform: 'xiaohongshu',
  description: '粉 + 青撞色 + 闪电分隔，高能量吸睛，适合测评/探店/打卡。',
  tags: ['dopamine', 'vibrant', 'bold'],
  base: {
    background: '#fffef5',
    padding: '14px',
    fontFamily: SANS,
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#2b2b2b',
  },
  tokens: { primary: '#ff3d7f', secondary: '#00c2a8', muted: '#888', radius: '14px', space: '14px' },
  heading: {
    h1: { fontSize: '23px', fontWeight: 900, color: '#ff3d7f', marginTop: '22px', marginBottom: '10px', textAlign: 'center', letterSpacing: '1px' },
    h2: { background: 'linear-gradient(135deg,#ff3d7f,#ffb800)', color: '#fff', padding: '7px 15px', borderRadius: '12px', fontWeight: 800, marginTop: '20px', marginBottom: '10px', display: 'inline-block' },
    h3: { fontSize: '16px', fontWeight: 800, color: '#00c2a8', borderLeft: '4px solid #ffb800', paddingLeft: '10px', marginTop: '16px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 14px', lineHeight: '1.8', color: '#2b2b2b' } },
  divider: { type: 'emoji', color: '#ff3d7f', margin: '18px 0', content: '⚡️ ⚡️ ⚡️' },
  quote: { background: '#eafff8', borderLeft: '4px solid #00c2a8', padding: '12px 14px', color: '#1f5a52' },
  card: { background: 'linear-gradient(135deg,#fff0f6,#eafff8)', border: '1px solid #ffd6e8', borderRadius: '14px', padding: '16px', boxShadow: '0 6px 16px rgba(255,61,127,.15)' },
  image: { borderRadius: '14px', border: 'none', maxWidth: '100%', captionColor: '#888', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff3d7f', bullet: '🔥' },
  code: { background: '#eafff8', color: '#ff3d7f', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
};

// 极简有力：黑白硬阴影，干净高级
export const xhsMinimalBold: Theme = {
  id: 'xhs-minimal-bold',
  name: '极简有力',
  platform: 'xiaohongshu',
  description: '黑白 + 硬阴影卡片，干净高级，适合观点/干货/清单。',
  tags: ['minimal', 'bold', 'clean'],
  base: {
    background: '#ffffff',
    padding: '14px',
    fontFamily: SANS,
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#1a1a1a',
  },
  tokens: { primary: '#111111', secondary: '#ff4d4d', muted: '#999', radius: '10px', space: '14px' },
  heading: {
    h1: { fontSize: '24px', fontWeight: 900, color: '#111111', marginTop: '24px', marginBottom: '10px', letterSpacing: '-.5px', borderBottom: '3px solid #111111', paddingBottom: '8px' },
    h2: { fontSize: '19px', fontWeight: 800, color: '#111111', marginTop: '20px', marginBottom: '10px', borderLeft: '5px solid #ff4d4d', paddingLeft: '10px' },
    h3: { fontSize: '16px', fontWeight: 800, color: '#111111', marginTop: '16px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 14px', lineHeight: '1.8', color: '#1a1a1a' } },
  divider: { type: 'line', color: '#111111', margin: '18px 0' },
  quote: { background: '#f5f5f5', borderLeft: '4px solid #ff4d4d', padding: '12px 14px', color: '#444' },
  card: { background: '#fafafa', border: '1px solid #111111', borderRadius: '10px', padding: '16px', boxShadow: '3px 3px 0 #111111' },
  image: { borderRadius: '10px', border: '1px solid #eee', maxWidth: '100%', captionColor: '#999', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff4d4d', bullet: '●' },
  code: { background: '#f5f5f5', color: '#111111', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
};

// 杂志感：红块标题 + 编号，封面级排版
export const xhsEditorial: Theme = {
  id: 'xhs-editorial',
  name: '杂志感',
  platform: 'xiaohongshu',
  description: '红块标题 + 编号小标题，封面级杂志排版，适合干货长文/测评。',
  tags: ['editorial', 'magazine', 'red'],
  base: { background: '#ffffff', padding: '14px', fontFamily: SANS, fontSize: '15px', lineHeight: '1.85', color: '#2b2b2b' },
  tokens: { primary: '#ff2442', secondary: '#ffb300', muted: '#999', radius: '14px', space: '14px' },
  heading: {
    h1: { fontSize: '23px', fontWeight: 900, color: '#fff', marginTop: '22px', marginBottom: '10px', variant: 'block', blockBg: '#ff2442', blockColor: '#fff', blockPadding: '8px 16px', blockRadius: '12px' },
    h2: { fontSize: '18px', fontWeight: 800, color: '#ff2442', marginTop: '20px', marginBottom: '10px', variant: 'number', accentColor: '#ff2442' },
    h3: { fontSize: '15px', fontWeight: 800, color: '#2b2b2b', marginTop: '16px', marginBottom: '8px', variant: 'bar', accentColor: '#ff2442', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 14px', lineHeight: '1.85', color: '#2b2b2b' } },
  divider: { type: 'emoji', color: '#ff2442', margin: '18px 0', content: '📌 📌 📌' },
  quote: { background: '#fff0f2', borderLeft: '4px solid #ff2442', padding: '12px 14px', color: '#7a2a38' },
  card: { background: '#fff5f6', border: '1px solid #ffd9de', borderRadius: '14px', padding: '16px', boxShadow: '0 6px 16px rgba(255,36,66,.12)' },
  image: { borderRadius: '14px', border: 'none', maxWidth: '100%', captionColor: '#999', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff2442', bullet: '🔥' },
  code: { background: '#fff0f2', color: '#ff2442', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
  highlight: { background: 'rgba(255,36,66,.15)', color: '#ff2442', radius: '3px' },
};

// 极光：粉青渐变标题，梦幻吸睛
export const xhsAurora: Theme = {
  id: 'xhs-aurora',
  name: '极光',
  platform: 'xiaohongshu',
  description: '粉→青渐变标题 + 圆角字框，梦幻吸睛，适合穿搭/旅行/生活方式。',
  tags: ['aurora', 'gradient', 'dreamy'],
  base: { background: '#fbfaff', padding: '14px', fontFamily: SANS, fontSize: '15px', lineHeight: '1.85', color: '#3a3550' },
  tokens: { primary: '#a86bff', secondary: '#42d6c3', muted: '#9a93b0', radius: '16px', space: '14px' },
  heading: {
    h1: { fontSize: '23px', fontWeight: 900, marginTop: '22px', marginBottom: '10px', variant: 'gradient', gradientFrom: '#a86bff', gradientTo: '#42d6c3' },
    h2: { fontSize: '18px', fontWeight: 800, color: '#fff', marginTop: '20px', marginBottom: '10px', variant: 'block', blockBg: 'linear-gradient(135deg,#a86bff,#42d6c3)', blockColor: '#fff', blockPadding: '6px 16px', blockRadius: '999px' },
    h3: { fontSize: '15px', fontWeight: 800, color: '#a86bff', marginTop: '16px', marginBottom: '8px', variant: 'bar', accentColor: '#42d6c3', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 14px', lineHeight: '1.85', color: '#3a3550' } },
  divider: { type: 'emoji', color: '#a86bff', margin: '18px 0', content: '✨ ✨ ✨' },
  quote: { background: '#f3eeff', borderLeft: '4px solid #a86bff', padding: '12px 14px', color: '#5a4a7a' },
  card: { background: '#f7f2ff', border: '1px solid #e2d4ff', borderRadius: '16px', padding: '16px', boxShadow: '0 8px 20px rgba(168,107,255,.15)' },
  image: { borderRadius: '16px', border: 'none', maxWidth: '100%', captionColor: '#9a93b0', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#a86bff', bullet: '💜' },
  code: { background: '#f3eeff', color: '#a86bff', fontFamily: MONO, padding: '2px 6px', borderRadius: '8px' },
  highlight: { background: 'rgba(168,107,255,.18)', color: '#4a2f7a', radius: '3px' },
};

export const xiaohongshuThemes: Theme[] = [xhsCandy, xhsDopamine, xhsMinimalBold, xhsEditorial, xhsAurora];
