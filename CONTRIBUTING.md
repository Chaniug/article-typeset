# 贡献指南

感谢参与！本文档帮助你快速搭建开发环境并为项目做贡献。

## 开发环境

```bash
npm install      # 安装依赖
npm run dev      # 启动本地开发服务器
npm run test     # 运行测试（vitest）
npm run typecheck# 类型检查
npm run lint     # ESLint
npm run format   # Prettier 格式化
```

代码风格：TypeScript + ESLint + Prettier，提交前请保证 `npm run test` 与 `npm run lint` 通过。

## 如何新增一套主题

主题即**数据**，无需改动引擎：

1. 在 `src/themes/wechat/`（或对应平台目录）新建文件，例如 `my-theme.ts`：
   ```ts
   import { Theme } from '../types';

   export const myTheme: Theme = {
     id: 'wechat-my-theme',
     name: '我的主题',
     platform: 'wechat',
     description: '一句话描述',
     base: {
       maxWidth: '677px',
       background: '#ffffff',
       padding: '16px',
       fontFamily: "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif",
       fontSize: '16px',
       lineHeight: '1.75',
       color: '#1f2329',
     },
     tokens: { primary: '#07c160', secondary: '#10aeff', muted: '#8a8f99', radius: '8px', space: '16px' },
     heading: {
       h1: { fontSize: '24px', fontWeight: 700, color: '#1f2329', borderLeft: '5px solid #07c160', paddingLeft: '12px' },
       h2: { fontSize: '20px', fontWeight: 700, color: '#1f2329', borderLeft: '4px solid #07c160', paddingLeft: '10px' },
       h3: { fontSize: '17px', fontWeight: 600, color: '#1f2329', borderLeft: '3px solid #07c160', paddingLeft: '8px' },
     },
     paragraph: { base: { margin: '0 0 16px', lineHeight: '1.75' } },
     divider: { type: 'line', color: '#e5e7eb' },
     quote: { background: '#f6f8fa', borderLeft: '4px solid #07c160', padding: '12px 16px' },
     card: { background: '#f6f8fa', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' },
     image: { borderRadius: '8px', maxWidth: '100%', captionColor: '#8a8f99', captionFontSize: '13px', captionAlign: 'center' },
     list: { markerColor: '#07c160', bullet: '•' },
     code: { background: '#f6f8fa', color: '#d6336c', fontFamily: "'SFMono-Regular',Consolas,monospace", padding: '2px 6px', borderRadius: '4px' },
   };
   ```
2. 在 `src/themes/wechat/index.ts` 导出：`export { myTheme } from './my-theme';`
3. 在浏览器中套用并自测：导出 HTML 应**零 class、零 `<style>`、全 inline**、根节点为 `<section>`。
4. 提交 PR。

> 字段完整说明见 [docs/theming.md](docs/theming.md)。

## 如何新增一个平台（如小红书 / B站）

引擎是平台无关的。新增平台只需：

1. `src/platforms/` 增加平台约束（参考 `wechat.ts`）。
2. `src/themes/<平台>/` 增加该平台主题。
3. `src/export/platform/<平台>.ts` 增加后处理（微信需要内联+section 包裹，其他平台可更宽松）。

编辑器、导入、复制逻辑无需改动即可复用。
