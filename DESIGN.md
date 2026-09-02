---
version: alpha
name: Levi5-Blog-design-analysis
description: A warm-canvas editorial blog interface blending traditional Chinese aesthetics with modern minimalism. The system anchors on a tinted parchment canvas with serif display headlines, vermillion accent colors, and paper-grain texture overlay. Brand voltage comes from the Chinese traditional color naming system (朱砂、青花、靛青) — deliberately warm and culturally rich where most blogs use generic color schemes. Type voice runs a serif display ("Instrument Serif" / "Noto Serif SC") for h1/h2 and a humanist sans for body. The signature paper-grain SVG filter creates a subtle rice-paper texture across the entire viewport.

colors:
  primary: "#b22222"
  primary-active: "#8b0000"
  primary-disabled: "#d4cfc7"
  ink: "#2d2a26"
  body: "#5c5650"
  body-strong: "#2d2a26"
  muted: "#8a8480"
  muted-soft: "#a09890"
  hairline: "#d4cfc7"
  hairline-soft: "#ebe5d9"
  canvas: "#f5f0e8"
  surface-soft: "#ebe5d9"
  surface-card: "#fffdf9"
  surface-hover: "#f5f0e8"
  surface-dark: "#1a1816"
  surface-dark-elevated: "#242220"
  surface-dark-soft: "#2e2c28"
  on-primary: "#ffffff"
  on-dark: "#e8e4dc"
  on-dark-soft: "#a09890"
  accent-zhuhong: "#c41d1d"
  accent-qinghua: "#2e8b57"
  accent-dianqing: "#4a6fa5"
  accent-tanhua: "#cd853f"
  accent-ziyao: "#7b68ee"
  success: "#2e8b57"
  warning: "#cd853f"
  error: "#c64545"

typography:
  display-xl:
    fontFamily: "Instrument Serif, Noto Serif SC, serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.025em
  display-lg:
    fontFamily: "Instrument Serif, Noto Serif SC, serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.025em
  display-md:
    fontFamily: "Instrument Serif, Noto Serif SC, serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.02em
  display-sm:
    fontFamily: "Instrument Serif, Noto Serif SC, serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.02em
  title-lg:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-md:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  title-sm:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0
  body-lg:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.1em
  code:
    fontFamily: "Geist Mono, ui-monospace, Menlo, Monaco, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0
  button:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 20px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    filter: "brightness(1.1)"
    boxShadow: "0 8px 24px rgba(45,42,38,0.12)"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 20px
    height: 40px
  button-secondary-hover:
    border: "1px solid {colors.primary}"
    backgroundColor: "rgba(178,34,34,0.05)"
    boxShadow: "0 4px 16px rgba(178,34,34,0.1)"
  button-icon:
    width: 36px
    height: 36px
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
  button-icon-hover:
    border: "1px solid {colors.hairline-soft}"
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.ink}"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  text-link-hover:
    textColor: "{colors.primary-active}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
    borderBottom: "1px solid transparent"
  top-nav-scrolled:
    backgroundColor: "rgba(245,240,232,0.95)"
    backdropFilter: "blur(8px)"
    borderBottom: "1px solid {colors.hairline}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: "80px 0 64px"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 16px
    border: "1px solid {colors.hairline}"
  feature-card-hover:
    border: "1px solid {colors.hairline-soft}"
    boxShadow: "0 8px 24px rgba(45,42,38,0.12)"
    transform: "translateY(-2px)"
  post-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 16px
    border: "1px solid {colors.hairline}"
  post-card-hover:
    border: "1px solid {colors.hairline-soft}"
    boxShadow: "0 8px 24px rgba(45,42,38,0.12)"
  tool-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.lg}"
    padding: 20px
    border: "1px solid {colors.hairline}"
  tool-card-hover:
    border: "1px solid {colors.hairline-soft}"
    boxShadow: "0 8px 24px rgba(45,42,38,0.12)"
  tool-card-icon:
    width: 40px
    height: 40px
    rounded: "{rounded.md}"
    backgroundColor: "rgba(178,34,34,0.1)"
    textColor: "{colors.primary}"
  tool-card-icon-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: 40px
    border: "1px solid {colors.hairline}"
  text-input-focused:
    border: "1px solid {colors.primary}"
    boxShadow: "0 0 0 2px rgba(178,34,34,0.1)"
  text-input-hover:
    border: "1px solid {colors.hairline-soft}"
  tag:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  tag-hover:
    backgroundColor: "rgba(178,34,34,0.1)"
    textColor: "{colors.ink}"
  category:
    backgroundColor: "rgba(178,34,34,0.1)"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  category-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    boxShadow: "0 4px 16px rgba(178,34,34,0.15)"
  badge-pinned:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  code-block:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: "48px 20px 16px"
  code-lang-label:
    position: "absolute"
    top: 0
    left: 0
    typography: "{typography.caption-uppercase}"
    textColor: "{colors.muted}"
    backgroundColor: "{colors.hairline}"
    rounded: "0 0 {rounded.md} 0"
    padding: "6px 12px"
  code-copy-btn:
    position: "absolute"
    top: 8px
    right: 8px
    width: 32px
    height: 32px
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.muted}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.sm}"
  code-copy-btn-hover:
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    backgroundColor: "rgba(178,34,34,0.1)"
  toc-sidebar:
    width: 224px
    position: "sticky"
    top: 96px
    typography: "{typography.body-sm}"
    textColor: "{colors.muted}"
  toc-item:
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  toc-item-active:
    textColor: "{colors.primary}"
    fontWeight: 500
  toc-item-hover:
    textColor: "{colors.ink}"
  dropdown-menu:
    backgroundColor: "{colors.surface-card}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    boxShadow: "0 8px 24px rgba(45,42,38,0.12)"
    padding: 8px
  dropdown-item:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  dropdown-item-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.ink}"
  toast:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    boxShadow: "0 8px 24px rgba(45,42,38,0.15)"
    padding: "12px 16px"
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
    borderTop: "1px solid {colors.hairline}"
    padding: "32px 0"
  theme-toggle:
    width: 36px
    height: 36px
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
  theme-toggle-hover:
    border: "1px solid {colors.hairline-soft}"
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.ink}"
  color-picker-swatch:
    width: 32px
    height: 32px
    rounded: "{rounded.full}"
    border: "2px solid {colors.surface-card}"
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
  color-picker-swatch-hover:
    transform: "scale(1.1)"
  color-picker-option:
    padding: 12px
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  color-picker-option-active:
    border: "1px solid {colors.primary}"
    backgroundColor: "rgba(178,34,34,0.1)"
  reading-progress:
    height: 2px
    backgroundColor: "{colors.primary}"
    position: "fixed"
    top: 0
    left: 0
    zIndex: 100
---

## Overview

Levi5's Blog is a warm, culturally-rich personal blog interface that blends **traditional Chinese aesthetics** with **modern minimalism**. The base atmosphere is a **tinted parchment canvas** (`{colors.canvas}` — #f5f0e8) — distinctly warm, deliberately not the cool gray-white that most modern blogs use. Headlines run a **serif display** ("Instrument Serif" / "Noto Serif SC") at weight 600-700, paired with **Geist** humanist sans for body. The combination feels like a literary publication with Chinese cultural undertones.

Brand voltage comes from the **parchment + vermillion pairing** — vermillion (`{colors.primary}` — #b22222) is the signature accent, used on primary CTAs, category badges, and interactive highlights. The vermillion is warm, culturally significant in Chinese tradition — a deliberate counter-positioning against generic blue/gray tech aesthetics.

The system has three surface modes:
1. **Parchment canvas** (`{colors.canvas}`) — default body floor, simulating rice paper
2. **Light cream cards** (`{colors.surface-card}`) — content card backgrounds
3. **Dark warm surfaces** (`{colors.surface-dark}`) — dark mode variant

**Key Characteristics:**
- Warm parchment canvas (`{colors.canvas}` — #f5f0e8) with warm-ink text (`{colors.ink}` — #2d2a26). The brand's defining color choice.
- Vermillion primary accent (`{colors.primary}` — #b22222). Used on CTAs, category badges, and interactive highlights.
- Paper-grain texture overlay via SVG `feTurbulence` filter at 6% opacity — simulates rice paper.
- 6 switchable Chinese traditional color themes: 朱砂、胭脂、青花、靛青、檀花、紫窑.
- Serif display headlines (Instrument Serif / Noto Serif SC) paired with humanist sans body (Geist).
- Border radius is hierarchical: `{rounded.md}` (8px) for buttons + inputs, `{rounded.lg}` (12px) for cards, `{rounded.xl}` (16px) for feature cards, `{rounded.pill}` for tags/badges.

## Colors

### Brand & Accent
- **Primary / Vermillion** (`{colors.primary}` — #b22222): The signature vermillion red. Used on primary CTAs, category badges, and interactive highlights. Culturally significant in Chinese tradition.
- **Primary Active** (`{colors.primary-active}` — #8b0000): The press / hover-darker variant.
- **Primary Disabled** (`{colors.primary-disabled}` — #d4cfc7): A desaturated hairline-tinted disabled state.
- **Accent Zhuhong** (`{colors.accent-zhuhong}` — #c41d1d): Alternative vermillion theme (胭脂).
- **Accent Qinghua** (`{colors.accent-qinghua}` — #2e8b57): Green theme (青花) inspired by blue-and-white porcelain.
- **Accent Dianqing** (`{colors.accent-dianqing}` — #4a6fa5): Blue theme (靛青) inspired by traditional indigo dye.
- **Accent Tanhua** (`{colors.accent-tanhua}` — #cd853f): Warm brown theme (檀花) inspired by sandalwood.
- **Accent Ziyao** (`{colors.accent-ziyao}` — #7b68ee): Purple theme (紫窑) inspired by purple clay.

### Surface
- **Canvas** (`{colors.canvas}` — #f5f0e8): The default page floor. Tinted parchment — warm, deliberately not pure white.
- **Surface Soft** (`{colors.surface-soft}` — #ebe5d9): Section dividers, very-soft band backgrounds.
- **Surface Card** (`{colors.surface-card}` — #fffdf9): Content cards, slightly brighter than canvas.
- **Surface Hover** (`{colors.surface-hover}` — #f5f0e8): Hover state background.
- **Surface Dark** (`{colors.surface-dark}` — #1a1816): Dark mode primary background.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #242220): Elevated cards in dark mode.
- **Surface Dark Soft** (`{colors.surface-dark-soft}` — #2e2c28): Slightly lighter dark, for nested elements.
- **Hairline** (`{colors.hairline}` — #d4cfc7): The 1px border tone on light surfaces.
- **Hairline Soft** (`{colors.hairline-soft}` — #ebe5d9): Barely-visible divider.

### Text
- **Ink** (`{colors.ink}` — #2d2a26): All headlines and primary text. Warm dark, off-pure-black.
- **Body Strong** (`{colors.body-strong}` — #2d2a26): Emphasized paragraphs.
- **Body** (`{colors.body}` — #5c5650): Default running-text color.
- **Muted** (`{colors.muted}` — #8a8480): Sub-headings, breadcrumbs, secondary text.
- **Muted Soft** (`{colors.muted-soft}` — #a09890): Captions, fine-print, copyright lines.
- **On Primary** (`{colors.on-primary}` — #ffffff): Text on vermillion buttons.
- **On Dark** (`{colors.on-dark}` — #e8e4dc): Light text used on dark surfaces.
- **On Dark Soft** (`{colors.on-dark-soft}` — #a09d96): Secondary labels in dark mode.

### Semantic
- **Success** (`{colors.success}` — #2e8b57): Green status, positive actions.
- **Warning** (`{colors.warning}` — #cd853f): Warning callouts.
- **Error** (`{colors.error}` — #c64545): Validation errors.

## Typography

### Font Family
The system runs **Instrument Serif** (or **Noto Serif SC** for Chinese characters) as the serif display face for headlines, and **Geist** as the humanist sans for body, navigation, and UI labels. **Geist Mono** handles code blocks. The fallback stack walks `Noto Serif SC, serif` for display and `system-ui, -apple-system, sans-serif` for body.

The display/body split is editorial:
- Instrument Serif / Noto Serif SC (weight 600-700) → h1, h2, hero display
- Geist sans (weight 400-500) → body, navigation, buttons, captions, labels
- Geist Mono → all code blocks

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 36px | 700 | 1.2 | -0.025em | Homepage h1, article titles — Serif |
| `{typography.display-lg}` | 30px | 600 | 1.3 | -0.025em | Section heads — Serif |
| `{typography.display-md}` | 24px | 600 | 1.35 | -0.02em | Sub-section heads — Serif |
| `{typography.display-sm}` | 20px | 600 | 1.4 | -0.02em | Category titles — Serif |
| `{typography.title-lg}` | 18px | 600 | 1.4 | 0 | Tool section titles — Sans |
| `{typography.title-md}` | 16px | 600 | 1.5 | 0 | Feature card titles — Sans |
| `{typography.title-sm}` | 14px | 600 | 1.5 | 0 | List labels, small titles — Sans |
| `{typography.body-lg}` | 18px | 400 | 1.6 | 0 | Lead paragraphs — Sans |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default running-text — Sans |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Footer body, fine-print — Sans |
| `{typography.caption}` | 12px | 500 | 1.4 | 0 | Badge labels, captions — Sans |
| `{typography.caption-uppercase}` | 12px | 500 | 1.4 | 0.1em | Category tags, section labels — Sans |
| `{typography.code}` | 14px | 400 | 1.7 | 0 | Code blocks — Mono |
| `{typography.button}` | 14px | 500 | 1.0 | 0 | Standard button labels — Sans |
| `{typography.nav-link}` | 14px | 400 | 1.4 | 0 | Top-nav menu items — Sans |

### Principles
Display sizes use weight 600-700 (semibold-bold), with negative letter-spacing (-0.02em to -0.025em) for tight, elegant headlines. The serif character is what gives the blog its literary, considered voice; switching to a sans-serif display would lose the cultural warmth.

Body type stays at weight 400 for paragraphs, weight 500-600 for labels and emphasized phrases. The sans body (Geist) is humanist — never geometric.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) — modern-blog rhythm.
- **Card internal padding:** `{spacing.md}` (16px) for post cards; `{spacing.lg}` (24px) for tool cards.
- **Page container:** `max-w-5xl` (1024px) centered with `px-6` (24px) horizontal padding.

### Grid & Container
- **Max content width:** 1024px (`max-w-5xl`) centered.
- **Post list:** Single column or 2-up grid at desktop (`grid gap-4 md:grid-cols-2`).
- **Tool list:** 2-up at tablet, 3-up at desktop (`grid gap-4 md:grid-cols-2 lg:grid-cols-3`).
- **Article detail:** Single column with optional sidebar TOC at xl breakpoint.

### Whitespace Philosophy
The parchment canvas + serif display + generous internal padding create an editorial pacing — the blog reads like a long-form magazine column rather than a typical tech blog. Whitespace between sections stays uniform at 96px; whitespace inside cards is moderate (16px), letting type breathe without wasting space.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, hero bands |
| Soft hairline | 1px `{colors.hairline}` border | Inputs, cards, containers |
| Card | `{colors.surface-card}` background | Feature cards, content cards |
| Subtle shadow | `0 2px 8px rgba(45,42,38,0.08)` | Default card elevation |
| Hover shadow | `0 8px 24px rgba(45,42,38,0.12)` | Card hover states |
| Accent shadow | `0 4px 16px rgba(178,34,34,0.15)` | Primary button hover |

The elevation philosophy is **color-block first, shadow rare**. Most depth comes from the parchment-vs-card surface contrast. Shadows are minimal and purposeful — only appearing on hover states.

### Decorative Depth
- Paper-grain texture overlay via SVG `feTurbulence` filter at 6% opacity (`mix-blend-mode: multiply`).
- Dark mode increases texture opacity to 8% with `mix-blend-mode: overlay`.
- View Transition API for theme switching with circular clip-path animation.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Badge accents |
| `{rounded.sm}` | 6px | Code copy button |
| `{rounded.md}` | 8px | Buttons, inputs, category tabs |
| `{rounded.lg}` | 12px | Post cards, tool cards, code blocks |
| `{rounded.xl}` | 16px | Feature cards, article detail card |
| `{rounded.pill}` | 9999px | Tags, badges, primary buttons |
| `{rounded.full}` | 9999px | Color picker swatches |

### Photography & Illustrations
- Minimal photography; focus on typography and color.
- Code blocks use syntax highlighting with muted tones on parchment backgrounds.
- Color picker swatches display circular color previews with shadow depth.

## Components

### Top Navigation

**`top-nav`** — Parchment nav bar pinned to the top. 72px tall, `{colors.canvas}` background. Carries the "Levi5." wordmark at left (with vermillion period accent), horizontal menu (首页, 文章, 工具, Trending, 关于) center, right-side cluster with theme toggle and color picker. Menu items in `{typography.nav-link}`.

**`top-nav-scrolled`** — Scrolled state with backdrop blur and subtle border. Background becomes semi-transparent with `{colors.canvas}` at 95% opacity.

### Buttons

**`button-primary`** — The signature inverted CTA. Background `{colors.ink}` (#2d2a26), text `{colors.canvas}` (parchment), type `{typography.button}`, padding 10px × 20px, height 40px, rounded `{rounded.pill}`. Hover brightens to 110% with elevated shadow.

**`button-secondary`** — Parchment button with hairline outline. Background transparent, text `{colors.ink}`, 1px hairline border, same dimensions as primary. Hover adds vermillion border and subtle shadow.

**`button-icon`** — 36px square icon button. Background transparent, text `{colors.body}`, 1px hairline border, rounded `{rounded.md}`. Used for theme toggle, color picker trigger.

**`text-link`** — Inline body links in `{colors.primary}` (vermillion). Hover darkens to `{colors.primary-active}`.

### Cards & Containers

**`hero-band`** — Parchment-canvas hero with welcome message. Vertical padding 80px top, 64px bottom. Carries display-xl headline with typewriter animation, subtitle, and CTA buttons.

**`post-card`** — Blog post preview card. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 16px, 1px hairline border. Contains cover image (optional), date, title, summary, and tags. Hover elevates with shadow.

**`feature-card`** — Used for tool categories. Background `{colors.surface-card}`, rounded `{rounded.xl}`, padding 16px, 1px hairline border. Contains icon container, title, and description. Hover elevates with shadow.

**`tool-card`** — Individual tool preview. Background `{colors.surface-card}`, rounded `{rounded.lg}`, padding 20px, 1px hairline border. Contains 40px icon container, title, and description. Icon inverts to vermillion background on card hover.

**`article-card`** — Full article display. Background `{colors.surface-card}`, rounded `{rounded.xl}`, padding 32px (desktop) / 24px (mobile). Contains header with date/share/font-size controls, title, categories/tags, prose content, and copyright notice.

### Inputs & Forms

**`text-input`** — Standard text input. Background `{colors.surface-card}`, text `{colors.ink}`, type `{typography.body-sm}`, rounded `{rounded.md}`, padding 10px × 14px, height 40px. 1px hairline border.

**`text-input-focused`** — Focus state. Border shifts to `{colors.primary}` with 2px vermillion ring at 10% opacity.

### Tags & Badges

**`tag`** — Small pill label for tags. Background `{colors.surface-soft}`, text `{colors.muted}`, type `{typography.caption}`, rounded `{rounded.pill}`, padding 2px × 8px. Hover adds vermillion tint.

**`category`** — Category badge. Background vermillion at 10% opacity, text `{colors.primary}`, type `{typography.caption}`, rounded `{rounded.md}`, padding 4px × 10px. Hover fills with vermillion and white text.

**`badge-pinned`** — Pinned post indicator. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.caption}`, rounded `{rounded.md}`.

### Code Blocks

**`code-block`** — Code display container. Background `{colors.surface-soft}`, rounded `{rounded.lg}`, 1px hairline border, padding 48px top (for language label) × 20px sides × 16px bottom. Contains language label, copy button, and syntax-highlighted code.

### Table of Contents

**`toc-sidebar`** — Desktop sidebar TOC. Width 224px, sticky at top 96px. Displays h2/h3 headings with active state highlighting in vermillion.

**`toc-mobile-trigger`** — Mobile TOC trigger button. Fixed position bottom-right, 40px circular, parchment background with hairline border.

### Dropdown Menu

**`dropdown-menu`** — Navigation dropdown. Background `{colors.surface-card}`, 1px hairline border, rounded `{rounded.lg}`, elevated shadow. Contains clickable items with hover states.

### Toast Notifications

**`toast`** — Success/error notification. Background `{colors.surface-card}`, rounded `{rounded.lg}`, elevated shadow, padding 12px × 16px. Slides in from top with scale animation.

### Theme & Color Controls

**`theme-toggle`** — Dark/light mode toggle. 36px square, transparent background, hairline border, rounded `{rounded.md}`. Displays sun/moon icon with View Transition animation.

**`color-picker-option`** — Color theme selector. Padding 12px, rounded `{rounded.md}`, 1px hairline border. Contains 32px circular color swatch and label. Active state adds vermillion border.

### Footer

**`footer`** — Simple parchment footer. Background `{colors.canvas}`, text `{colors.muted}`, typography `{typography.body-sm}`, 1px hairline top border, padding 32px vertical. Contains copyright and GitHub link.

## Do's and Don'ts

### Do
- Anchor every page on the parchment canvas. Pure white reads as "any other blog"; the warm tint is the brand differentiator.
- Use Instrument Serif / Noto Serif SC for every display headline. Pair with Geist sans body. Negative letter-spacing on display sizes is essential.
- Reserve `{colors.primary}` (vermillion) for primary CTAs and category badges. Don't overuse it.
- Use the paper-grain texture overlay to maintain the cultural aesthetic. Keep it subtle (6% opacity).
- Support all 6 Chinese traditional color themes. Respect user preference stored in localStorage.
- Apply `{spacing.section}` (96px) between major sections.
- Maintain typography hierarchy: serif for display, sans for body. Never swap them.

### Don't
- Don't use cool grays or pure white for canvas. Parchment is the brand.
- Don't use sans-serif for display headlines. The serif character is the brand voice.
- Don't use cool blue or saturated cyan as a brand accent. The vermillion is the brand voltage.
- Don't put vermillion everywhere. Use it sparingly on interactive elements, generously only on category badges.
- Don't ignore the paper-grain texture. It's a subtle but essential brand element.
- Don't break the responsive grid. Respect breakpoints and touch targets.
- Don't hardcode colors. Always use CSS variables (`{colors.*}`) for theming.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Single column layout; hero h1 reduces to 30px; TOC becomes floating button; paper-grain opacity reduces to 4% |
| Tablet | 768–1024px | Post grid 2-up; tool grid 2-up; TOC hidden on article pages |
| Desktop | 1025–1280px | Full layout; post grid 2-up; tool grid 3-up; TOC sidebar visible on article pages |
| Wide | > 1280px | Same as desktop with more breathing room; max content width caps at 1024px |

### Touch Targets
- `{components.button-primary}` at minimum 40 × 40px.
- `{components.button-icon}` at exactly 36 × 36px.
- `{components.text-input}` height is 40px.
- Tool cards entire area is tappable.

### Collapsing Strategy
- Top nav stays horizontal on all breakpoints (no hamburger menu).
- Post grids reduce columns rather than scaling cards down.
- Tool grids reduce columns: 3 → 2 → 1.
- Article detail collapses to single column; TOC becomes floating button.
- Code blocks allow horizontal scroll rather than wrapping.

### Animation Behavior
- Stagger children animation for card lists (0.05s delay increment).
- Slide-in-up animation for page sections (0.5s ease-out).
- View Transition API for dark/light mode toggle (circular clip-path, 500ms).
- Typewriter effect for homepage greeting (150ms per character).
- Reduced motion: All animations disabled via `prefers-reduced-motion: reduce`.

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{components.post-card}`, `{components.tool-card}`).
2. Variants of an existing component (`-hover`, `-active`, `-focused`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere — never inline hex.
4. Display headlines stay Instrument Serif / Noto Serif SC with negative tracking. Body stays Geist 400. The split is unbreakable.
5. Parchment + vermillion + dark warm is the trinity. Don't introduce a fourth surface tone.
6. When in doubt about emphasis: bigger serif display before bolder weight.
7. Always respect the 6 Chinese traditional color themes — they are core to the brand identity.

## Known Gaps

- Instrument Serif and Noto Serif SC are loaded via Google Fonts; fallback to system serif if unavailable.
- Paper-grain SVG filter may have performance impact on low-end devices — could be optimized with CSS background-image alternative.
- Color picker colors are hardcoded in component; could be extracted to shared config.
- Stagger animation only supports up to 8 children; need dynamic delay calculation for longer lists.
- Mobile TOC button position (`bottom-24`) may conflict with device gesture areas on some phones.
- View Transition API support varies across browsers; graceful degradation implemented but animation consistency varies.
- Dark mode View Transition uses z-index 999 which may conflict with paper-grain texture (z-index 9999).
- No explicit WCAG contrast ratio documentation — some muted text colors may not meet AA standards.
