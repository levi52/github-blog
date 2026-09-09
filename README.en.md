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
- 🔍 **Full-text Search**: Searches titles, summaries, categories, tags and post **bodies**, with highlighted matches and a context excerpt
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
| Avatar Generator | GitHub-style pixel identicon generator |

## 🚀 Quick Start

### Requirements

- Node.js ≥ 20.9 (required by Next.js 16)

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
```

Pushing to the `main` branch triggers GitHub Actions to build and deploy to GitHub Pages automatically (see `.github/workflows/deploy.yml`).

## 📁 Project Structure

```
├── content/posts/           # Blog posts (Markdown)
├── public/                  # Static assets
├── scripts/                 # Build scripts
│   ├── generate-posts.js    # Post data generation (incl. search body text)
│   ├── fetch-github.js      # Fetch GitHub profile and repos
│   └── fetch-trending.js    # Fetch weekly GitHub Trending
├── src/
│   ├── app/                 # Page routes
│   │   ├── page.tsx         # Home
│   │   ├── blog/            # Blog pages
│   │   ├── tools/           # Tools pages
│   │   ├── trending/        # GitHub Trending page
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
│       ├── posts.ts         # Build-time Markdown reader
│       ├── posts-client.ts  # Client-side generated JSON reader
│       ├── search.ts        # Full-text search and ranking
│       └── post-types.ts    # Shared type definitions
└── next-sitemap.config.js   # Sitemap config
```

> `src/lib/posts-data.json` plus `sitemap*.xml` / `robots.txt` under `out/` are build
> artifacts and are not tracked; run `npm run build` (or `node scripts/generate-posts.js`)
> after adding a post to regenerate them.

## 🛠️ Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Lint code
```

Deployment is handled automatically by GitHub Actions on push to `main`.

## 📄 License

[MIT](LICENSE) © Levi5
