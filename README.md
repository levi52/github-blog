<div align="center">

# 📝 Levi5's Blog

**个人博客与在线工具集合，基于 Next.js 构建，部署在 GitHub Pages。**

[English](README.en.md) · 中文

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8.svg)

</div>

---

## ✨ 特性

### 📖 博客
- 📝 **文章管理**：Markdown 格式，支持 frontmatter 元数据
- 🏷️ **分类与标签**：灵活的内容组织方式
- 🔍 **全文搜索**：检索标题、摘要、分类、标签与**正文**，命中片段高亮并给出上下文摘录
- 🌙 **暗色模式**：跟随系统或手动切换
- 🎨 **古风配色**：6 种中国传统色调可切换（朱砂、胭脂、青花、靛青、檀花、紫窑）
- 🖥️ **界面风格**：可在古风羊皮纸与 Neo-brutalist 之间切换，与明暗模式、主题配色自由组合
- 📑 **目录导航**：自动生成文章大纲
- 📊 **阅读进度**：顶部进度条显示阅读位置
- 🔤 **字体调整**：三档字号可选
- 🖼️ **图片预览**：点击放大灯箱效果
- 🔗 **分享功能**：一键复制链接
- ©️ **版权声明**：自动生成

### 🛠️ 在线工具
| 工具 | 说明 |
|------|------|
| Base64 编解码 | Base64 编码与解码 |
| URL 编解码 | URL 编码与解码 |
| Unicode 转换 | Unicode 与文本互转 |
| JSON 格式化 | JSON 格式化与压缩 |
| XML 格式化 | XML 格式化与压缩 |
| 时间戳转换 | 时间戳与日期互转 |
| 时区转换 | 不同时区时间转换 |
| 字数统计 | 文本字数与统计信息 |
| 文本对比 | 文本差异对比 |
| 正则测试 | 正则表达式测试 |
| XMind 转 Markdown | 思维导图转换为 Markdown |
| 头像生成器 | GitHub 风格像素头像生成 |

## 🚀 快速开始

### 环境要求

- Node.js ≥ 22.18（Next.js 16 要求 ≥ 20.9；`scripts/generate-posts.js` 直接 `require` 了 TypeScript 文件，依赖 Node 内置类型剥离，该能力自 22.18.0 起默认开启）

### 安装

```bash
git clone https://github.com/levi52/github-blog.git
cd github-blog
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 构建部署

```bash
npm run build
```

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages（见 `.github/workflows/deploy.yml`）。

## 📁 项目结构

```
├── content/posts/           # 博客文章（Markdown）
├── public/                  # 静态资源
├── scripts/                 # 构建脚本
│   ├── generate-posts.js    # 文章数据生成（含全文搜索用正文）
│   ├── fetch-github.js      # 抓取 GitHub 用户与仓库数据
│   └── fetch-trending.js    # 抓取 GitHub 每周 Trending
├── src/
│   ├── app/                 # 页面路由
│   │   ├── page.tsx         # 首页
│   │   ├── blog/            # 博客页面
│   │   ├── tools/           # 工具页面
│   │   ├── trending/        # GitHub Trending 页面
│   │   └── about/           # 关于页面
│   ├── components/          # React 组件
│   │   ├── Header.tsx       # 导航栏
│   │   ├── Footer.tsx       # 页脚
│   │   ├── PostCard.tsx     # 文章卡片
│   │   ├── SearchBox.tsx    # 搜索框
│   │   ├── ThemeToggle.tsx  # 主题切换
│   │   ├── ColorPicker.tsx  # 配色切换
│   │   ├── StylePicker.tsx  # 界面风格切换
│   │   └── tools/           # 工具组件
│   └── lib/                 # 工具函数
│       ├── posts.ts         # 构建期读取 Markdown
│       ├── posts-client.ts  # 客户端读取生成的 JSON
│       ├── search.ts        # 全文搜索与结果排序
│       ├── useTheme.ts      # 明暗 / 配色 / 风格状态
│       └── post-types.ts    # 共享类型定义
└── next-sitemap.config.js   # Sitemap 配置
```

> `src/lib/posts-data.json` 与 `out/` 下的 `sitemap*.xml`、`robots.txt` 均为构建产物，不入版本库；
> 新增文章后运行 `npm run build`（或 `node scripts/generate-posts.js`）即可重新生成。

## 🛠️ 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run lint         # 代码检查
```

部署由 GitHub Actions 在推送 `main` 分支时自动完成。

## 📄 License

[MIT](LICENSE) © Levi5
