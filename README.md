# 文章排版工具 · Article Typeset

开源、纯前端的文章排版工具。把杂乱的草稿一键变成精美排版，直接复制到**微信公众号**、**小红书**、**哔哩哔哩**、**百家号**等平台。

> 已支持四大平台：**微信公众号**、**小红书**、**哔哩哔哩**、**百家号**。内置 14 套「一键套用」模板，覆盖极简、暗黑、国潮、多巴胺、ins 甜美等多种视觉风格。

## ✨ 特性

- 🎨 **14 套视觉模板，一键套用**：晚霞渐变、霓虹暗黑、ins 甜美、墨韵 Editorial、国潮、糖果色、多巴胺、极简有力、B 站粉、科技蓝、资讯蓝、清新绿……强视觉冲击、吸睛可读。
- 📱 **四平台排版**：微信公众号 / 小红书 / 哔哩哔哩 / 百家号，各平台独立模板库与宽度约束，切换即见对应风格。
- ✂️ **四种导入方式**：直接粘贴 / Markdown / Word(.docx) / 文章链接。
- 🧱 **富文本编辑**：标题、列表、引用、卡片、引用框、图片框、分隔线等块级组件。
- 📋 **一键复制**：导出**全内联样式**的 HTML，粘贴进各平台编辑器即完美还原（微信会剥离 `<style>`/`class`，本工具从序列化阶段就内联，零兼容问题）。
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

## 🌐 部署

本项目已通过 **GitHub Pages** 自动部署（push 到 `main` 即触发构建发布）。默认地址 `https://<user>.github.io/article-typeset/`，可在仓库 Settings → Pages 绑定你自己的域名。

如需改用 **Cloudflare Pages** 或自定义域名，详见 [docs/deployment.md](docs/deployment.md)。

```bash
npm run build   # 产物输出到 dist/
```

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
