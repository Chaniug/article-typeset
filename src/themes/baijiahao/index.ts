import type { Theme } from '../types';

const SANS = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei','Segoe UI',sans-serif";
const SERIF = "'Noto Serif SC','Songti SC','STSong',serif";
const MONO = "'SFMono-Regular',Consolas,'Liberation Mono',monospace";

// 资讯蓝：衬线 + 新闻蓝，严肃资讯
export const baijiaNews: Theme = {
  id: 'baijia-news',
  name: '资讯蓝',
  platform: 'baijiahao',
  description: '新闻蓝 + 衬线标题，严肃资讯/热点解读风。',
  tags: ['news', 'blue', 'serious'],
  base: {
    background: '#ffffff',
    padding: '18px',
    fontFamily: SERIF,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#222222',
  },
  tokens: { primary: '#1a5fb4', secondary: '#d4391e', muted: '#999', radius: '6px', space: '16px' },
  heading: {
    h1: { fontSize: '28px', fontWeight: 800, color: '#111111', marginTop: '28px', marginBottom: '12px', borderBottom: '3px solid #1a5fb4', paddingBottom: '10px' },
    h2: { fontSize: '21px', fontWeight: 700, color: '#1a5fb4', marginTop: '24px', marginBottom: '12px', borderLeft: '5px solid #1a5fb4', paddingLeft: '12px' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#111111', marginTop: '20px', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '4px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#222222' } },
  divider: { type: 'line', color: '#1a5fb4', margin: '20px 0' },
  quote: { background: '#eef3fb', borderLeft: '4px solid #1a5fb4', padding: '14px 16px', color: '#3a4a5a' },
  card: { background: '#f7f9fc', border: '1px solid #d6e0ee', borderRadius: '6px', padding: '18px', boxShadow: 'none' },
  image: { borderRadius: '4px', border: '1px solid #eee', maxWidth: '100%', captionColor: '#999', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#1a5fb4', bullet: '▪' },
  code: { background: '#eef3fb', color: '#1a5fb4', fontFamily: MONO, padding: '2px 6px', borderRadius: '4px' },
};

// 清新绿：草绿 + 叶片分隔，生活/健康
export const baijiaFresh: Theme = {
  id: 'baijia-fresh',
  name: '清新绿',
  platform: 'baijiahao',
  description: '草绿 + 叶片分隔，生活/健康/育儿清新风。',
  tags: ['fresh', 'green', 'life'],
  base: {
    background: '#fbfdfb',
    padding: '18px',
    fontFamily: SANS,
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#2f3a32',
  },
  tokens: { primary: '#2e9e5b', secondary: '#8bc34a', muted: '#9aa89c', radius: '12px', space: '16px' },
  heading: {
    h1: { fontSize: '26px', fontWeight: 800, color: '#2e9e5b', marginTop: '28px', marginBottom: '12px', textAlign: 'center' },
    h2: { background: '#2e9e5b', color: '#fff', padding: '7px 16px', borderRadius: '999px', fontWeight: 700, marginTop: '24px', marginBottom: '12px', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 700, color: '#2e9e5b', borderLeft: '4px solid #8bc34a', paddingLeft: '10px', marginTop: '20px', marginBottom: '8px' },
  },
  paragraph: { base: { margin: '0 0 16px', lineHeight: '1.8', color: '#2f3a32' } },
  divider: { type: 'emoji', color: '#2e9e5b', margin: '20px 0', content: '🌿 🌿 🌿' },
  quote: { background: '#eef7f0', borderLeft: '4px solid #2e9e5b', padding: '14px 16px', color: '#4a5a4e' },
  card: { background: '#eef7f0', border: '1px solid #cfe9d8', borderRadius: '12px', padding: '18px', boxShadow: '0 6px 16px rgba(46,158,91,.12)' },
  image: { borderRadius: '12px', border: 'none', maxWidth: '100%', captionColor: '#9aa89c', captionFontSize: '13px', captionAlign: 'center' },
  list: { markerColor: '#2e9e5b', bullet: '🌱' },
  code: { background: '#eef7f0', color: '#2e9e5b', fontFamily: MONO, padding: '2px 6px', borderRadius: '6px' },
};

export const baijiahaoThemes: Theme[] = [baijiaNews, baijiaFresh];
