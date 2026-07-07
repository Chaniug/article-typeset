import { Theme } from './types';
import { minimalLight, elegantDark, newsCard } from './wechat';

const themes: Theme[] = [minimalLight, elegantDark, newsCard];

export function getThemes(platform?: string): Theme[] {
  if (!platform) return themes;
  return themes.filter((t) => t.platform === platform || t.platform === 'common');
}

export function getTheme(id: string): Theme | undefined {
  return themes.find((t) => t.id === id);
}

export function getThemeSafe(id: string): Theme {
  return getTheme(id) ?? themes[0];
}

export const defaultThemeId = themes[0].id;
