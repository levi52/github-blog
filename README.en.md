<div align="center">

# 📝 Levi5's Blog

**Personal blog and online tools collection, built with Next.js and deployed on GitHub Pages.**

English · [中文](README.md)

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8.svg)

</div>

---

## ✨ Features

### 📖 Blog
- 📝 **Post Management**: Markdown format with frontmatter metadata
- 🏷️ **Categories & Tags**: Flexible content organization
- 🔍 **Full-text Search**: Quick article lookup with highlighting
- 🌙 **Dark Mode**: System-follow or manual toggle
- 🎨 **Chinese Ancient Theme**: 6 traditional color schemes (Cinnabar, Rouge, Indigo, Cyan, Sandalwood, Purple Kiln)
- 📑 **Table of Contents**: Auto-generated article outline
- 📊 **Reading Progress**: Top progress bar shows reading position
- 🔤 **Font Size**: Three adjustable sizes
- 🖼️ **Image Lightbox**: Click to enlarge preview
- 🔗 **Share**: One-click link copy
- ©️ **Copyright**: Auto-generated

### 🛠️ Online Tools
| Tool | Description |
|------|-------------|
| Base64 Encode/Decode | Base64 encoding and decoding |
| URL Encode/Decode | URL encoding and decoding |
| Unicode Converter | Unicode and text conversion |
| JSON Formatter | JSON formatting and minification |
| XML Formatter | XML formatting and minification |
| Timestamp Converter | Timestamp and date conversion |
| Timezone Converter | Timezone time conversion |
| Word Counter | Text word count and statistics |
| Text Diff | Text difference comparison |
| Regex Tester | Regular expression testing |
| XMind to Markdown | Convert mind maps to Markdown |

## 🚀 Quick Start

### Requirements

- Node.js ≥ 18

### Installation

```bash
git clone https://github.com/levi52/github-blog.git
cd github-blog
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:3000

### Build & Deploy

```bash
npm run build
npm run deploy
```

## 📁 Project Structure

```
├── content/posts/           # Blog posts (Markdown)
├── public/                  # Static assets
├── scripts/                 # Build scripts
│   └── generate-posts.js    # Post data generation
├── src/
│   ├── app/                 # Page routes
│   │   ├── page.tsx         # Home
│   │   ├── blog/            # Blog pages
│   │   ├── tools/           # Tools pages
│   │   └── about/           # About page
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation
│   │   ├── Footer.tsx       # Footer
│   │   ├── PostCard.tsx     # Post card
│   │   ├── SearchBox.tsx    # Search box
│   │   ├── ThemeToggle.tsx  # Theme toggle
│   │   ├── ColorPicker.tsx  # Color picker
│   │   └── tools/           # Tool components
│   └── lib/                 # Utilities
│       └── posts.ts         # Post data processing
└── next-sitemap.config.js   # Sitemap config
```

## 🛠️ Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Lint code
npm run deploy       # Deploy to GitHub Pages
```

## 📄 License

[MIT](LICENSE) © Levi5
