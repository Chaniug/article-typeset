import { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// —— 科技感 · 暗夜霓虹 —— 近黑底 + 青绿霓虹描边标题 + 四角框，赛博极客风
export const techCyber: Theme = {
  id: 'wechat-tech-cyber',
  name: '科技·暗夜霓虹',
  platform: 'wechat',
  description: '近黑底、青绿霓虹描边大标题、四角框要点，赛博极客风；适合 AI、开发、硬核科技内容。',
  tags: ['premium', 'tech', 'cyber'],
  base: { background: '#0a0e14', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#d7e6e6' },
  tokens: { primary: '#39ff14', secondary: '#00e5ff', muted: '#5f7a7a', radius: '10px', space: '20px' },
  heading: {
    h1: { fontSize: '30px', fontWeight: 800, color: 'rgba(120,255,180,.25)', marginTop: '38px', marginBottom: '16px', variant: 'stroke', accentColor: '#39ff14', strokeWidth: '1.4px' },
    h2: { fontSize: '21px', fontWeight: 700, color: '#d7e6e6', marginTop: '28px', marginBottom: '12px', variant: 'display', decorText: '01', decorSize: '58px', decorColor: 'rgba(0,229,255,.14)', textAlign: 'left' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#00e5ff', marginTop: '22px', marginBottom: '8px', variant: 'bar', accentColor: '#00e5ff', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#d7e6e6' } },
  divider: { type: 'gradient', color: '#39ff14', margin: '24px 0' },
  quote: { background: '#0f1620', borderLeft: '4px solid #00e5ff', padding: '16px 18px', color: '#a9c6c6' },
  card: { background: '#0f1620', border: '1px solid rgba(0,229,255,.4)', borderRadius: '10px', padding: '18px', boxShadow: '0 0 24px rgba(0,229,255,.12)' },
  image: { borderRadius: '10px', border: '1px solid rgba(0,229,255,.25)', maxWidth: '100%', captionColor: '#5f7a7a', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#39ff14', bullet: '▸' },
  code: { background: '#0f1620', color: '#9effa0', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(57,255,20,.22)', color: '#eaffe6', radius: '2px' },
};

// —— 科技感 · 极客蓝 —— 深蓝底 + 层叠标题 + HUD 风四角框，工程师审美
export const techHud: Theme = {
  id: 'wechat-tech-hud',
  name: '科技·极客蓝',
  platform: 'wechat',
  description: '深蓝底、层叠大标题压住小标题、HUD 风四角框，干净克制的工程师审美；适合产品、架构、技术分享。',
  tags: ['premium', 'tech', 'hud'],
  base: { background: '#0b1020', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#dbe4f3' },
  tokens: { primary: '#2f81f7', secondary: '#56d4dd', muted: '#6b7a99', radius: '10px', space: '20px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, color: '#dbe4f3', marginTop: '40px', marginBottom: '16px', variant: 'layered', decorText: 'CHAPTER', decorSize: '56px', decorColor: 'rgba(47,129,247,.16)', decorAlign: 'left', decorTop: '-0.3em' },
    h2: { fontSize: '21px', fontWeight: 700, color: '#dbe4f3', marginTop: '28px', marginBottom: '12px', variant: 'bar', accentColor: '#2f81f7', paddingLeft: '12px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#56d4dd', marginTop: '22px', marginBottom: '8px', variant: 'serif', fontFamily: "Georgia,'PingFang SC',serif", accentColor: '#56d4dd', letterSpacing: '1px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#dbe4f3' } },
  divider: { type: 'gradient', color: '#2f81f7', margin: '24px 0' },
  quote: { background: '#121a2e', borderLeft: '4px solid #2f81f7', padding: '16px 18px', color: '#aebcdb' },
  card: { background: '#121a2e', border: '1px solid rgba(47,129,247,.4)', borderRadius: '10px', padding: '18px', boxShadow: '0 0 22px rgba(47,129,247,.14)' },
  image: { borderRadius: '10px', border: '1px solid rgba(47,129,247,.3)', maxWidth: '100%', captionColor: '#6b7a99', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#2f81f7', bullet: '▪' },
  code: { background: '#121a2e', color: '#7fb2ff', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(47,129,247,.26)', color: '#eaf1ff', radius: '2px' },
};

// —— 科技感 · 数据流 —— 深紫底 + 青紫渐变描边 + 超大锚点，未来数据感
export const techData: Theme = {
  id: 'wechat-tech-data',
  name: '科技·数据流',
  platform: 'wechat',
  description: '深紫底、青紫渐变描边标题、超大锚点压阵，未来数据流感；适合数据报告、增长、前沿趋势。',
  tags: ['premium', 'tech', 'data'],
  base: { background: '#0d0b1f', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#e3def7' },
  tokens: { primary: '#8b5cf6', secondary: '#22d3ee', muted: '#7d76a6', radius: '12px', space: '20px' },
  heading: {
    h1: { fontSize: '30px', fontWeight: 800, color: 'rgba(180,160,255,.22)', marginTop: '38px', marginBottom: '16px', variant: 'stroke', accentColor: '#22d3ee', strokeWidth: '1.4px' },
    h2: { fontSize: '22px', fontWeight: 700, marginTop: '28px', marginBottom: '12px', variant: 'gradient', gradientFrom: '#8b5cf6', gradientTo: '#22d3ee', textShadow: '0 0 16px rgba(34,211,238,.3)' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#22d3ee', marginTop: '22px', marginBottom: '8px', variant: 'display', decorText: '02', decorSize: '46px', decorColor: 'rgba(139,92,246,.18)', textAlign: 'left' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#e3def7' } },
  divider: { type: 'gradient', color: '#8b5cf6', margin: '24px 0' },
  quote: { background: '#161333', borderLeft: '4px solid #22d3ee', padding: '16px 18px', color: '#bdb2e6' },
  card: { background: '#161333', border: '1px solid rgba(139,92,246,.4)', borderRadius: '12px', padding: '18px', boxShadow: '0 0 24px rgba(139,92,246,.16)' },
  image: { borderRadius: '12px', border: '1px solid rgba(34,211,238,.3)', maxWidth: '100%', captionColor: '#7d76a6', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#22d3ee', bullet: '◆' },
  code: { background: '#161333', color: '#c4b5fd', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(34,211,238,.24)', color: '#eaffff', radius: '2px' },
};

export const techWechatThemes: Theme[] = [techCyber, techHud, techData];
