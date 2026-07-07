/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 纯静态产物。base 用相对路径 "./"，使其同时兼容：
//   - GitHub Pages 默认子路径：https://<user>.github.io/<repo>/
//   - 后续绑定的自定义域名（根路径）
// 部署目标：GitHub Pages（输出目录 dist，构建命令 npm run build）。
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
});
