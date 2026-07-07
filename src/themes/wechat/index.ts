import { Theme } from '../types';
import { minimalLight } from './minimal-light';
import { elegantDark } from './elegant-dark';
import { newsCard } from './news-card';
import { gradientSunset, neonDark, insPink, inkEditorial, guochao } from './striking';
import { premiumWechatThemes } from './premium';

export const wechatThemes: Theme[] = [
  minimalLight,
  elegantDark,
  newsCard,
  gradientSunset,
  neonDark,
  insPink,
  inkEditorial,
  guochao,
  ...premiumWechatThemes,
];
