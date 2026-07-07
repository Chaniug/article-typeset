# 文章排版工具 · Article Typeset

开源、纯前端的文章排版工具。把杂乱的草稿一键变成精美排版，直接复制到**微信公众号**、**小红书**、**哔哩哔哩**、**百家号**等平台。

> 当前 MVP 已实现：**微信公众号**全流程（编辑 → 导入 → 套主题 → 复制）。小红书 / B站 / 百家号为后续迭代，引擎已预留扩展点。

## ✨ 特性

- 🎨 **多套精美主题**：极简浅色、优雅暗色、卡片资讯等，覆盖不同行业与风格。
- ✂️ **四种导入方式**：直接粘贴 / Markdown / Word(.docx) / 文章链接。
- 🧱 **富文本编辑**：标题、列表、引用、卡片、引用框、图片框、分隔线等块级组件。
- 📋 **一键复制**：导出**全内联样式**的 HTML，粘贴进公众号编辑器即完美还原（微信会剥离 `<style>`/`class`，本工具从序列化阶段就内联，零兼容问题）。
- 🆓 **纯前端、可自托管**：无强制后端；链接导入为可选 Cloudflare Worker。
- 🤝 **主题即数据**：新增一套排版只需写一个 TS/JSON 主题文件，欢迎 PR。

## 🚀 快速开始

```bash
git clone https://github.com/your-username/article-typeset.git
cd article-typeset
npm install
npm run dev
```

打开终端提示的本地地址即可使用。

## 🌐 部署到 Cloudflare Pages

源仓库托管在 GitHub，静态站点部署到 Cloudflare Pages，并绑定你自己的 CF 域名。

1. 在 Cloudflare Pages 控制台「Create from Git」连接本仓库。
2. 构建设置：
   - **Build command**：`npm run build`
   - **Output directory**：`dist`
   - **Node 版本**：20（可在 Pages 设置或 `package.json` 的 `engines` 中指定）
3. 部署完成后，在「Custom domains」添加你的 CF 域名（如 `typeset.example.com`），自动签发 HTTPS 证书。
4. （可选）文章链接导入需要一个 CORS 代理，见 [`worker/README.md`](worker/README.md)。

更详细说明见 [docs/deployment.md](docs/deployment.md)。

## 🧩 贡献主题

排版样式以数据形式存放（`src/themes/<平台>/`）。新增一套主题只需复制模板、改颜色与字体，无需改动引擎逻辑。

参见 [docs/theming.md](docs/theming.md) 与 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 📁 项目结构

```
src/
  editor/        Tiptap 编辑器与自定义块节点
  import/        粘贴 / Markdown / docx / 链接 四种导入
  themes/        主题数据模型、编译器、各平台主题
  export/        序列化（全内联 HTML）、平台后处理、复制
  platforms/     平台约束
  components/    UI 组件（导入面板 / 主题选择 / 预览 / 平台切换）
  store/         zustand 状态
worker/          可选 Cloudflare Worker（链接导入代理）
docs/            部署 / 主题贡献 / 架构 文档
tests/           主题与导出管线测试
```

## 📜 许可证

[MIT](LICENSE)
