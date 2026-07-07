import { Theme } from '../types';
import { minimalLight } from './minimal-light';
import { elegantDark } from './elegant-dark';
import { newsCard } from './news-card';
import { gradientSunset, neonDark, insPink, inkEditorial, guochao } from './striking';
import { premiumWechatThemes } from './premium';
import { categoryWechatThemes } from './categories';
import { advancedWechatThemes } from './advanced';
import { techWechatThemes } from './tech';

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
  ...categoryWechatThemes,
  ...advancedWechatThemes,
  ...techWechatThemes,
];
