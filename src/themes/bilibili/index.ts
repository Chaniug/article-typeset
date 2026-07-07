import type { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// bili 粉：B 站粉 + 播放键分隔，UP 主风
export const biliPink: Theme = {
  id: 'bili-pink',
  name: 'B 站粉',
  platform: 'bilibili',
  description: 'B 站粉 + 播放键分隔，UP 主专栏本命配色。',
  tags: ['bilibili', 'pink', 'up'],
  base: {
    background: '#ffffff',
    padding: '18px',
    fontFamily: SANS,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#2a2a2a',
  },
  tokens: { primary: '#fb7299', secondary: '#23ade5', muted: '#999', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#fb7299', marginTop: '28px', marginBottom: '12px', textAlign: 'center' },
    h2: { background: '#fb7299', color: '#fff', padding: '7px 16px', borderRadius: '999px', fontWeight: 700, marginTop: '24px', marginBottom: '12px', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#fb7299', borderLeft: '4px solid #23ade5', paddingLeft: '10px', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#2a2a2a' } },
  divider: { type: 'emoji', color: '#fb7299', margin: '20px 0', content: '📺 📺 📺' },
  quote: { background: '#fff0f5', borderLeft: '4px solid #fb7299', padding: '14px 16px', color: '#7a4a5a' },
  card: { background: '#fff7fb', border: '1px solid #ffd6e6', borderRadius: '12px', padding: '18px', boxShadow: '0 6px 16px rgba(251,114,153,.15)' },
  image: { borderRadius: '12px', border: 'none', maxWidth: '100%', captionColor: '#999', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#fb7299', bullet: '▶' },
  code: { background: '#f5f8fa', color: '#fb7299', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
};

// 科技蓝：深蓝 + 青绿霓虹，数码/硬核
export const biliTechBlue: Theme = {
  id: 'bili-tech-blue',
  name: '科技蓝',
  platform: 'bilibili',
  description: '深蓝底 + 青绿霓虹，数码/编程/硬核科普风。',
  tags: ['tech', 'blue', 'dark'],
  base: {
    background: '#0b1020',
    padding: '18px',
    fontFamily: SANS,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#e8edf5',
  },
  tokens: { primary: '#23ade5', secondary: '#00e0c6', muted: '#8a93a6', radius: '10px', space: '16px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#23ade5', marginTop: '28px', marginBottom: '12px', letterSpacing: '1px' },
    h2: { background: 'linear-gradient(90deg,#23ade5,#00e0c6)', color: '#0b1020', padding: '7px 16px', borderRadius: '8px', fontWeight: 800, marginTop: '24px', marginBottom: '12px', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#00e0c6', borderLeft: '4px solid #00e0c6', paddingLeft: '10px', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#e8edf5' } },
  divider: { type: 'gradient', color: '#23ade5', margin: '20px 0' },
  quote: { background: '#121a2e', borderLeft: '4px solid #23ade5', padding: '14px 16px', color: '#a9b6cc' },
  card: { background: '#121a2e', border: '1px solid rgba(35,173,229,.4)', borderRadius: '10px', padding: '18px', boxShadow: '0 0 18px rgba(35,173,229,.12)' },
  image: { borderRadius: '10px', border: '1px solid rgba(255,255,255,.08)', maxWidth: '100%', captionColor: '#8a93a6', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#00e0c6', bullet: '◆' },
  code: { background: '#121a2e', color: '#23ade5', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
};

// 科技动效：粉蓝渐变 + 编号标题，硬核科普
export const biliCyber: Theme = {
  id: 'bili-cyber',
  name: '科技动效',
  platform: 'bilibili',
  description: '粉蓝渐变标题 + 编号小标题，硬核科普/数码测评风。',
  tags: ['tech', 'cyber', 'gradient', 'number'],
  base: { background: '#f6f9ff', padding: '18px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.8', color: '#1b2733' },
  tokens: { primary: '#fb7299', secondary: '#00aeec', muted: '#8a98a8', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, marginTop: '28px', marginBottom: '12px', variant: 'gradient', gradientFrom: '#fb7299', gradientTo: '#00aeec' },
    h2: { fontSize: '20px', fontWeight: 800, color: '#fff', marginTop: '24px', marginBottom: '12px', variant: 'block', blockBg: 'linear-gradient(90deg,#fb7299,#ff9bbf)', blockColor: '#fff', blockPadding: '7px 16px', blockRadius: '10px' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#1b2733', marginTop: '20px', marginBottom: '8px', variant: 'number', accentColor: '#00aeec' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#1b2733' } },
  divider: { type: 'gradient', color: '#00aeec', margin: '20px 0' },
  quote: { background: '#eaf6ff', borderLeft: '4px solid #00aeec', padding: '14px 16px', color: '#3a5a6a' },
  card: { background: '#ffffff', border: '1px solid #d6ecf7', borderRadius: '12px', padding: '18px', boxShadow: '0 8px 22px rgba(0,174,236,.12)' },
  image: { borderRadius: '12px', border: '1px solid #d6ecf7', maxWidth: '100%', captionColor: '#8a98a8', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#fb7299', bullet: '▶' },
  code: { background: '#eaf6ff', color: '#00aeec', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(251,114,153,.2)', color: '#fb7299', radius: '3px' },
};

export const bilibiliThemes: Theme[] = [biliPink, biliTechBlue, biliCyber];
