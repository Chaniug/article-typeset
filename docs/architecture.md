# 架构概览

详见仓库根目录的实施计划（plan 文件）与源码注释。下面给出核心数据流。

## 数据流

```
用户输入（粘贴/Markdown/docx/链接）
        │  import/* 解析为 HTML 并 sanitize
        ▼
Tiptap 编辑器（ProseMirror JSON，仅存结构，不含样式）
        │  editor.getJSON()
        ▼
export/serializer.ts  →  遍历 JSON，按主题编译为「全内联样式」HTML
        │
        ▼
export/platform/wechat.ts  →  <section> 包裹、去 class/id、图片 https
        │
        ▼
Preview（iframe 所见即所得） + clipboard（富文本复制）
```

## 关键设计

- **主题即数据**：`src/themes/types.ts` 定义 `Theme` 接口；`compiler.ts` 把主题编译为内联 `style`。引擎平台无关。
- **微信内联策略**：序列化阶段直接生成 `style="..."`，规避微信编辑器剥离 `<style>`/`class` 的问题。
- **无强制后端**：编辑、导入（docx 用 mammoth 浏览器内、链接用可选 Worker）、导出、复制全部在前端完成。
- **可扩展平台**：新增平台 = 加 `platforms/<name>.ts` 约束 + `themes/<name>/` 主题 +（可选）平台专属后处理，编辑器/导入/复制逻辑零改动复用。

## 目录

| 目录 | 职责 |
|------|------|
| `src/editor` | Tiptap 封装、Toolbar、自定义块节点（Card/QuoteBox/Divider/ImageFrame） |
| `src/import` | 粘贴 / Markdown / docx / 链接 四种导入 |
| `src/themes` | 主题模型、编译器、注册表、各平台主题 |
| `src/export` | 序列化、平台后处理、兜底内联、剪贴板 |
| `src/platforms` | 平台约束定义 |
| `src/components` | 导入面板 / 主题选择 / 预览 / 平台切换 |
| `src/store` | zustand 全局状态 |
| `worker` | 可选 Cloudflare Worker（链接导入 CORS 代理） |
| `tests` | 主题与导出管线测试 |
