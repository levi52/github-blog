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

4. **移动端汉堡菜单 z-index 层级冲突** (2026-09-05)
   - 问题：移动菜单 z-40 低于 Header z-50，导致菜单被遮挡
   - 修复：汉堡按钮改为 `relative z-10`，移动菜单改为 `z-[60]`，并添加 ESC 键和点击外部关闭功能
   - 文件：`src/components/Header.tsx:251,279`

5. **sitemap/robots 生成物污染工作树** (2026-09-09)
   - 问题：`next-sitemap` 默认输出到 `public/`，而该目录下的 `sitemap*.xml`、`robots.txt` 被 git 跟踪，每次本地 `npm run build` 都改写已跟踪文件；提交的 sitemap 还滞后于实际路由（缺 `/tools/avatar-generator/`）
   - 修复：`next-sitemap.config.js` 增加 `outDir: "./out"`，三个生成物取消跟踪并加入 `.gitignore`
   - 文件：`next-sitemap.config.js`、`.gitignore`

6. **搜索名不副实** (2026-09-09)
   - 问题：README 声称全文搜索，实际只匹配标题/摘要/标签/分类
   - 修复：`generate-posts.js` 用 `marked` 把正文转纯文本写入 `searchBody`；新增 `src/lib/search.ts` 按命中位置排序并生成上下文摘录；`BlogList`/`PostCard` 展示摘录并高亮
   - 附带：`series[].posts` 由完整文章副本改为 `{ slug, title, seriesOrder }` 索引，消除 `searchBody` 双份存储（数据文件 6081 → 4475 字节）
   - 文件：`scripts/generate-posts.js`、`src/lib/search.ts`、`src/lib/post-types.ts`、`src/lib/plain-text.ts`

7. **CI Node 版本与本机不一致** (2026-09-09)
   - 问题：workflow 锁 `node-version: "20"`，而本机是 Node 22；Node 18/20 不识别 TypeScript，导致 `generate-posts.js` 无法复用 `src/lib/plain-text.ts`，只能维护一份重复实现
   - 修复：`package.json` 声明 `engines.node: "^22.18.0"`，两个 workflow 改用 `node-version-file: "package.json"`；生成脚本直接 `require` 共享的 `.ts`（依赖 Node ≥22.18 的类型剥离）
   - 文件：`package.json`、`.github/workflows/*.yml`、`scripts/generate-posts.js`

8. **新增可切换的 Neo-brutalist 风格皮肤** (2026-09-09)
   - 设计：默认皮肤（羊皮纸 + 朱砂）不变；N 皮肤为**无彩色骨架**（墨黑/纸白/灰），强调色完全继承「主题配色」，不硬编码任何色相
   - 实现：`<html data-style="neobrutal">` 切换，令牌层覆盖为主，仅「直角」与「硬偏移阴影」需要结构规则
   - 坑：`html[data-accent="..."]` 的优先级低于 `html[data-style="neobrutal"]`，必须补 `[data-style][data-accent]` 组合选择器，否则 N 皮肤下切配色失效
   - 坑：强调色上的文字随明暗反转（浅色主题色配白字，深色提亮变体配墨字），用 `--on-accent` 表达而非逐组件硬编码
   - 坑：删除 `src/app/style-lab/` 后，`.next/types` 可能残留对已删路由的引用导致 `tsc` 报错，重新构建即可刷新
   - 文件：`src/app/globals.css`、`src/lib/useTheme.ts`、`src/components/StylePicker.tsx`、`src/app/about/page.tsx`、`src/app/layout.tsx`

### 待关注问题

1. **搜索索引未收录代码块**
   - 文件：`scripts/generate-posts.js`（`plainTextFromHtml` 剥离 `<pre>`）
   - 现状：索引只占原文约 11%（git-guide 那篇 83% 是代码块，全部未入索引）
   - 影响：读者搜索 `git rebase`、`open()` 这类代码标识符时搜不到
   - 可能方向：只把代码块里的标识符/命令名去重后加入索引

2. **N 皮肤的直角依赖 `!important` 全局覆盖**
   - 文件：`src/app/globals.css`
   - 现状：用 `html[data-style="neobrutal"] * { border-radius: 0 !important }` 统一压平圆角
   - 影响：未来引入的第三方组件会隐式继承直角，可能需要显式例外
