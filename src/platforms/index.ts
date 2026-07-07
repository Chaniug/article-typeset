export * from './types';
import { wechat, xiaohongshu, bilibili, baijiahao, PlatformConstraint } from './types';

export const platforms: PlatformConstraint[] = [wechat, xiaohongshu, bilibili, baijiahao];

export function getPlatform(id: string): PlatformConstraint | undefined {
  return platforms.find((p) => p.id === id);
}
