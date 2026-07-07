import { create } from 'zustand';
import type { PMNode } from '../export/serializer';

interface AppState {
  platform: 'wechat' | 'xiaohongshu' | 'bilibili' | 'baijiahao';
  themeId: string;
  doc: PMNode | null;
  setPlatform: (p: AppState['platform']) => void;
  setTheme: (id: string) => void;
  setDoc: (doc: PMNode | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  platform: 'wechat',
  themeId: 'wechat-minimal-light',
  doc: null,
  setPlatform: (platform) => set({ platform }),
  setTheme: (themeId) => set({ themeId }),
  setDoc: (doc) => set({ doc }),
}));
