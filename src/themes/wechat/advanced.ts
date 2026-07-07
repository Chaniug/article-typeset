import { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const SERIF = "'Songti SC','STSong','SimSun','Source Han Serif SC','Noto Serif SC',serif";
const SERIF_EN = "Georgia,'Times New Roman',serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// —— 高级感 · 层叠墨痕 —— 白底 + 超大淡色衬线底纹叠压标题，西装质感，适合观点/商业长文
export const advLayered: Theme = {
  id: 'wechat-adv-layered',
  name: '高级·层叠墨痕',
  platform: 'wechat',
  description: '白底、超大半透明衬线底纹压住标题，制造层叠纵深的杂志感；克金细线点缀，适合观点文、商业长文。',
  tags: ['premium', 'business', 'layered'],
  base: { background: '#ffffff', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#1c1c1c' },
  tokens: { primary: '#1a1a1a', secondary: '#b08d57', muted: '#9a9a9a', radius: '0px', space: '20px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#1a1a1a', marginTop: '40px', marginBottom: '16px', variant: 'layered', decorText: '01', decorSize: '74px', decorColor: 'rgba(26,26,26,.06)', decorAlign: 'left', decorTop: '-0.34em', letterSpacing: '1px', textAlign: 'left' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginTop: '28px', marginBottom: '12px', variant: 'underline', accentColor: '#b08d57', paddingBottom: '8px', display: 'inline-block', letterSpacing: '1px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#1a1a1a', marginTop: '22px', marginBottom: '8px', variant: 'bar', accentColor: '#b08d57', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#1c1c1c' } },
  divider: { type: 'gradient', color: '#b08d57', margin: '24px 0' },
  quote: { background: '#f7f5f1', borderLeft: '4px solid #b08d57', padding: '16px 18px', color: '#3a352c' },
  card: { background: '#fff', border: '1px solid #ece8e0', borderRadius: '0px', padding: '18px', boxShadow: '0 10px 30px rgba(26,26,26,.06)' },
  image: { borderRadius: '0px', border: '1px solid #ece8e0', maxWidth: '100%', captionColor: '#9a9a9a', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#b08d57', bullet: '◆' },
  code: { background: '#f7f5f1', color: '#1a1a1a', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
  highlight: { background: 'rgba(176,141,87,.26)', color: '#1a1a1a', radius: '2px' },
};

// —— 高级感 · 杂志超大字 —— 米色底 + 超大装饰锚点 + 衬线小标题，强字号对比的编辑式排版
export const advDisplay: Theme = {
  id: 'wechat-adv-display',
  name: '高级·杂志超大字',
  platform: 'wechat',
  description: '米色底、超大衬线装饰锚点压住小标题，强烈字号对比的杂志大片感；适合专题、人物、深度报道。',
  tags: ['premium', 'news', 'display'],
  base: { background: '#fbf8f3', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#2b2620' },
  tokens: { primary: '#2b2620', secondary: '#c2603f', muted: '#a99e8e', radius: '0px', space: '20px' },
  heading: {
    h1: { fontSize: '24px', fontWeight: 800, color: '#2b2620', marginTop: '42px', marginBottom: '18px', variant: 'display', decorText: 'VOL.1', decorSize: '70px', decorColor: 'rgba(43,38,32,.10)', textAlign: 'left' },
    h2: { fontSize: '20px', fontWeight: 700, color: '#2b2620', marginTop: '30px', marginBottom: '12px', variant: 'serif', fontFamily: SERIF_EN, accentColor: '#c2603f', letterSpacing: '1px' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#c2603f', marginTop: '22px', marginBottom: '8px', variant: 'bar', accentColor: '#c2603f', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#2b2620' } },
  divider: { type: 'line', color: '#ddd3c4', margin: '24px 0' },
  quote: { background: '#f2ece2', borderLeft: '4px solid #c2603f', padding: '16px 18px', color: '#473d33' },
  card: { background: '#fff', border: '1px solid #e7ddcd', borderRadius: '0px', padding: '18px', boxShadow: '0 10px 30px rgba(43,38,32,.07)' },
  image: { borderRadius: '0px', border: '1px solid #e7ddcd', maxWidth: '100%', captionColor: '#a99e8e', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#c2603f', bullet: '▪' },
  code: { background: '#f2ece2', color: '#c2603f', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
  highlight: { background: 'rgba(194,96,63,.2)', color: '#2b2620', radius: '2px' },
};

// —— 高级感 · 思源宋体 —— 暖白底 + 全衬线标题细线，文艺编辑式排版
export const advSerif: Theme = {
  id: 'wechat-adv-serif',
  name: '高级·思源宋体',
  platform: 'wechat',
  description: '暖白底、全衬线标题配细线，文艺沉静的编辑式排版；适合文化、读书、生活方式类内容。',
  tags: ['premium', 'serif'],
  base: { background: '#fdfcf9', padding: '22px', fontFamily: SERIF, fontSize: '16px', lineHeight: '2.0', color: '#33302b' },
  tokens: { primary: '#7a2e2e', secondary: '#b5654a', muted: '#9b9388', radius: '0px', space: '20px' },
  heading: {
    h1: { fontSize: '27px', fontWeight: 800, color: '#33302b', marginTop: '38px', marginBottom: '16px', variant: 'serif', fontFamily: SERIF, accentColor: '#7a2e2e', letterSpacing: '2px' },
    h2: { fontSize: '21px', fontWeight: 700, color: '#33302b', marginTop: '30px', marginBottom: '12px', variant: 'serif', fontFamily: SERIF, accentColor: '#b5654a', letterSpacing: '1px' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#7a2e2e', marginTop: '22px', marginBottom: '8px', variant: 'serif', fontFamily: SERIF, accentColor: '#7a2e2e', letterSpacing: '1px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '2.0', color: '#33302b' } },
  divider: { type: 'dots', color: '#7a2e2e', margin: '24px 0' },
  quote: { background: '#f4efe7', borderLeft: '4px solid #7a2e2e', padding: '16px 18px', color: '#4a443c', fontStyle: 'italic' },
  card: { background: '#fff', border: '1px solid #ebe4d8', borderRadius: '0px', padding: '18px', boxShadow: '0 8px 26px rgba(122,46,46,.06)' },
  image: { borderRadius: '0px', border: '1px solid #ebe4d8', maxWidth: '100%', captionColor: '#9b9388', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#7a2e2e', bullet: '❖' },
  code: { background: '#f4efe7', color: '#7a2e2e', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
  highlight: { background: 'rgba(122,46,46,.16)', color: '#33302b', radius: '2px' },
};

// —— 高级感 · 国风竖排 —— 宣纸底 + 竖排标题 + 朱红印泥点缀，传统国风
export const advVertical: Theme = {
  id: 'wechat-adv-vertical',
  name: '高级·国风竖排',
  platform: 'wechat',
  description: '宣纸暖底、标题竖排从右起读、朱红细线点缀，传统国风的当代排版；适合文化、茶道、节气、品牌故事。',
  tags: ['premium', 'government', 'vertical'],
  base: { background: '#f6f2e9', padding: '22px', fontFamily: SERIF, fontSize: '16px', lineHeight: '2.0', color: '#3a2e22' },
  tokens: { primary: '#9e2b25', secondary: '#c8a96a', muted: '#a89684', radius: '0px', space: '20px' },
  heading: {
    h1: { fontSize: '30px', fontWeight: 800, color: '#9e2b25', marginTop: '34px', marginBottom: '20px', variant: 'vertical', textAlign: 'right', letterSpacing: '8px' },
    h2: { fontSize: '22px', fontWeight: 700, color: '#3a2e22', marginTop: '30px', marginBottom: '12px', variant: 'serif', fontFamily: SERIF, accentColor: '#9e2b25', textAlign: 'center', letterSpacing: '2px' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#9e2b25', marginTop: '22px', marginBottom: '8px', variant: 'bar', accentColor: '#c8a96a', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '2.0', color: '#3a2e22' } },
  divider: { type: 'line', color: '#d8c9ad', margin: '24px 0' },
  quote: { background: '#efe7d6', borderLeft: '4px solid #9e2b25', padding: '16px 18px', color: '#4f4232', fontStyle: 'italic' },
  card: { background: '#fff', border: '1px solid #e2d4ba', borderRadius: '0px', padding: '18px', boxShadow: '0 8px 26px rgba(158,43,37,.07)' },
  image: { borderRadius: '0px', border: '1px solid #e2d4ba', maxWidth: '100%', captionColor: '#a89684', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#9e2b25', bullet: '❖' },
  code: { background: '#efe7d6', color: '#9e2b25', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
  highlight: { background: 'rgba(158,43,37,.16)', color: '#3a2e22', radius: '2px' },
};

// —— 高级感 · 描边霓虹 —— 深底 + 描边镂空标题 + 渐变发光，夜场/潮流风
export const advStroke: Theme = {
  id: 'wechat-adv-stroke',
  name: '高级·描边霓虹',
  platform: 'wechat',
  description: '深底、描边镂空大标题搭配渐变发光副标，夜场潮流的视觉冲击；适合潮流、音乐、游戏、夜生活内容。',
  tags: ['premium', 'game', 'stroke'],
  base: { background: '#0e0e12', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#e9e9f0' },
  tokens: { primary: '#7cc', secondary: '#ff5ea8', muted: '#7a7a8a', radius: '0px', space: '20px' },
  heading: {
    h1: { fontSize: '30px', fontWeight: 800, color: 'rgba(170,224,255,.2)', marginTop: '38px', marginBottom: '16px', variant: 'stroke', accentColor: '#7cc', strokeWidth: '1.4px' },
    h2: { fontSize: '21px', fontWeight: 700, marginTop: '30px', marginBottom: '12px', variant: 'gradient', gradientFrom: '#7cc', gradientTo: '#ff5ea8', textShadow: '0 0 14px rgba(124,204,255,.35)' },
    h3: { fontSize: '16px', fontWeight: 700, color: '#ff5ea8', marginTop: '22px', marginBottom: '8px', variant: 'bar', accentColor: '#ff5ea8', paddingLeft: '10px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#e9e9f0' } },
  divider: { type: 'gradient', color: '#7cc', margin: '24px 0' },
  quote: { background: '#181820', borderLeft: '4px solid #ff5ea8', padding: '16px 18px', color: '#c2c2cf' },
  card: { background: '#181820', border: '1px solid rgba(124,204,255,.25)', borderRadius: '0px', padding: '18px', boxShadow: '0 0 26px rgba(124,204,255,.1)' },
  image: { borderRadius: '0px', border: '1px solid rgba(255,255,255,.08)', maxWidth: '100%', captionColor: '#7a7a8a', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#ff5ea8', bullet: '▸' },
  code: { background: '#181820', color: '#ff9ecb', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
  highlight: { background: 'rgba(255,94,168,.26)', color: '#ffe6f3', radius: '2px' },
};

// —— 高级感 · 综合示范 —— 同一篇文章里 h1层叠 / h2超大锚点 / h3衬线，集中展示多种手法
export const advMix: Theme = {
  id: 'wechat-adv-mix',
  name: '高级·综合示范',
  platform: 'wechat',
  description: '一套集中演示层叠、超大锚点、衬线三种手法的综合模板，紫粉调，适合想要一次看全效果的内容。',
  tags: ['premium'],
  base: { background: '#ffffff', padding: '22px', fontFamily: SANS, fontSize: '16px', lineHeight: '1.9', color: '#222228' },
  tokens: { primary: '#6d28d9', secondary: '#db2777', muted: '#9a9aa6', radius: '12px', space: '20px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#222228', marginTop: '40px', marginBottom: '16px', variant: 'layered', decorText: 'CHAPTER', decorSize: '56px', decorColor: 'rgba(109,40,217,.07)', decorAlign: 'left', decorTop: '-0.3em' },
    h2: { fontSize: '21px', fontWeight: 700, color: '#222228', marginTop: '30px', marginBottom: '14px', variant: 'display', decorText: '02', decorSize: '60px', decorColor: 'rgba(219,39,119,.10)', textAlign: 'left' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#6d28d9', marginTop: '22px', marginBottom: '8px', variant: 'serif', fontFamily: SERIF_EN, accentColor: '#6d28d9', letterSpacing: '1px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.9', color: '#222228' } },
  divider: { type: 'gradient', color: '#6d28d9', margin: '24px 0' },
  quote: { background: '#f6f3ff', borderLeft: '4px solid #6d28d9', padding: '16px 18px', color: '#3b3450' },
  card: { background: '#fff', border: '1px solid #ece8f7', borderRadius: '12px', padding: '18px', boxShadow: '0 10px 30px rgba(109,40,217,.08)' },
  image: { borderRadius: '12px', border: '1px solid #ece8f7', maxWidth: '100%', captionColor: '#9a9aa6', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#6d28d9', bullet: '◆' },
  code: { background: '#f6f3ff', color: '#6d28d9', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
  highlight: { background: 'rgba(109,40,217,.18)', color: '#222228', radius: '3px' },
};

export const advancedWechatThemes: Theme[] = [
  advLayered,
  advDisplay,
  advSerif,
  advVertical,
  advStroke,
  advMix,
];
