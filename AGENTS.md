<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 代码审查记录

### 已修复问题

1. **Typewriter.tsx 内存泄漏** (2026-09-05)
   - 问题：`useEffect` 中 `setTimeout` 回调内部的 `return () => clearInterval(timer)` 不会生效，因为 `setTimeout` 忽略返回值
   - 修复：将 `timer` 变量提升到 `useEffect` 作用域，在清理函数中同时清理 `timeout` 和 `timer`
   - 文件：`src/components/Typewriter.tsx:16-34`

2. **首页 `"use client"` 不必要** (2026-09-05)
   - 问题：首页使用 `"use client"` 导致无法服务端渲染，增加不必要的客户端 JS bundle 体积
   - 修复：移除 `"use client"` 指令，首页改为服务端组件，客户端组件（如 Typewriter）仍可正常导入使用
   - 文件：`src/app/page.tsx:1`

3. **动画延迟类名硬编码** (2026-09-05)
   - 问题：依赖 CSS 中预定义的 `.delay-*` 类，修改显示数量需同步更新 CSS
   - 修复：使用内联 style 的 `animationDelay` 属性，不再依赖预定义 CSS 类
   - 文件：`src/app/page.tsx:50-54`

### 待关注问题

1. **静态 JSON 数据源**
   - 文件：`src/app/page.tsx:4`
   - 直接导入 `posts-data.json`，新增文章需手动重新生成
