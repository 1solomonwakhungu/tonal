# Tonal

Editorial tonal UI primitives, page blocks, and CSS tokens distributed as a `shadcn`-compatible registry.

Live showcase: [tonal.harlo.dev](https://tonal.harlo.dev)  
Registry index: [`https://tonal.harlo.dev/r/registry.json`](https://tonal.harlo.dev/r/registry.json)

Tonal uses flat tonal surfaces (`#FFFFFF`, `#F8F9FA`, `#F4F2EE`, `#F0F4F9`, `#E8F0FE`, `#E6F4EA`), open-source Google Sans (`SIL OFL-1.1`), `24px` bento cards, and hairline dividers instead of heavy drop shadows or runtime UI libraries. Every item installs straight into your repository via the `shadcn` CLI with only `clsx`, `tailwind-merge`, and `lucide-react` as runtime dependencies.

## Quick Start

Install any primitive or block directly into a React + Tailwind CSS v4 project:

```bash
# Install the design tokens first, or install any block to pull its dependencies automatically
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

Import the generated token stylesheet in your global CSS file (for example `src/app/globals.css`):

```css
@import "tailwindcss";
@import "../styles/tonal-tokens.css";
```

Load Google Sans (or keep your own fallback font stack by overriding `--t-font`):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@17..18,400;17..18,500;17..18,700&display=swap"
  rel="stylesheet"
/>
```

### Switching Modes and Themes

Tonal exposes two HTML attributes that work globally on `<html>` or locally on any wrapper element:

- `data-tonal-mode="commerce"` switches buttons from Soft Pill (`9999px` radius, `#1967D2` primary fill) to Commerce (`6px` radius, `#202124` ink fill) by swapping four CSS variables.
- `data-tonal-theme="dark"` switches all surface, ink, hairline, and accent tokens to dark tonal steps (`#131314` canvas, `#1E1F20` neutral surface, `#1B2230` cool workspace surface, `#8AB4F8` accent).

```tsx
<div data-tonal-mode="commerce" data-tonal-theme="dark">
  <EditorialHero />
</div>
```

## Registry Catalog (13 Items)

Every component installs under `components/tonal/` (and tokens under `styles/tonal-tokens.css`) so it never collides with existing `components/ui/` files from shadcn/ui. All internal `registryDependencies` resolve to full `https://tonal.harlo.dev/r/*.json` URLs.

### Tokens (1)

| Name | Type | Target | Size | Install |
| --- | --- | --- | --- | --- |
| `tonal-tokens` | `registry:style` | `styles/tonal-tokens.css` | 121 lines (2.8 kB) | `npx shadcn@latest add https://tonal.harlo.dev/r/tonal-tokens.json` |

### Primitives (5)

| Name | Target | Deps | Size | Description |
| --- | --- | --- | --- | --- |
| `tonal-button` | `components/tonal/button.tsx` | `clsx`, `tailwind-merge` | 53 lines (2.0 kB) | Primary, dark, outline, tonal, and ghost button variants adapting to Soft Pill or Commerce mode. |
| `surface-tile` | `components/tonal/surface-tile.tsx` | `clsx`, `tailwind-merge` | 61 lines (1.4 kB) | Flat `24px` container with 7 surface tones (`white`, `neutral`, `warm`, `cool`, `sky`, `mint`, `sand`). |
| `tonal-chip` | `components/tonal/chip.tsx` | `clsx`, `tailwind-merge` | 36 lines (1.0 kB) | Tinted pill badge for status labels, deltas, and section eyebrows. |
| `chevron-link` | `components/tonal/chevron-link.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | 37 lines (1.2 kB) | Inline editorial text link with subtle animated chevron. |
| `tonal-accordion` | `components/tonal/accordion.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | 86 lines (2.7 kB) | Hairline-divided FAQ accordion with ARIA regions and decelerating grid-row transition. |

### Blocks (7)

| Name | Target | Registry Deps | Size | Description |
| --- | --- | --- | --- | --- |
| `editorial-hero` | `components/tonal/blocks/editorial-hero.tsx` | `tonal-tokens`, `tonal-button`, `chevron-link` | 191 lines (6.8 kB) | Split storefront hero with interactive finish swatches that tint the surrounding tonal surface. |
| `tonal-app-shell` | `components/tonal/blocks/tonal-app-shell.tsx` | `tonal-tokens`, `chevron-link` | 220 lines (6.9 kB) | Cool tonal outer workspace shell with pill nav rail, `TonalQuotaCard`, and elevated sheet. |
| `kpi-grid` | `components/tonal/blocks/kpi-grid.tsx` | `tonal-tokens`, `tonal-chip` | 109 lines (2.8 kB) | 2-, 3-, or 4-column analytics KPI tiles with tabular numerals and delta chips. |
| `tonal-table` | `components/tonal/blocks/tonal-table.tsx` | `tonal-tokens`, `tonal-chip` | 310 lines (10.2 kB) | Searchable pill input, status filter chips, keyboard-accessible rows, and resettable empty state. |
| `capability-tabs` | `components/tonal/blocks/capability-tabs.tsx` | `tonal-tokens`, `surface-tile`, `tonal-chip` | 192 lines (6.5 kB) | Accessible tab switcher for AI prompts and grounded responses on a cool tonal stage. |
| `pricing-grid` | `components/tonal/blocks/pricing-grid.tsx` | `tonal-tokens`, `surface-tile`, `tonal-button`, `tonal-chip` | 156 lines (4.5 kB) | Multi-tier pricing grid pairing canvas cards with a highlighted cool tonal tier. |
| `specs-table` | `components/tonal/blocks/specs-table.tsx` | `tonal-tokens` | 130 lines (3.7 kB) | Horizontally scrollable side-by-side hardware specification comparison table. |

## Live Demo Sites

The Next.js app at [tonal.harlo.dev](https://tonal.harlo.dev) includes the interactive registry showcase (with Desktop/Tablet/Mobile viewport toggles, live source tabs, and Soft Pill / Commerce + Light / Dark switches) plus four full-page demo websites:

| Route | Demo | Focus |
| --- | --- | --- |
| `/` | Registry Showcase | All 13 items with live preview, viewport switcher, copyable source, and CLI commands |
| `/demos/hardware` | Lumen Store | Hardware storefront with finish hero, bento highlights, lineup grid, specs table, and FAQ |
| `/demos/ai` | Aura Studio | AI product page with capability prompt switcher, highlight tiles, and 2-tier pricing |
| `/demos/workspace` | Canvas Workspace | Productivity SaaS page with interactive app-tab stage and customer quote bento |
| `/demos/dashboard` | Pulse Console | Analytics console with tonal app shell, KPI tiles, interactive SVG chart, filterable table, and modal |

## Architecture

```text
registry.json                 Source manifest defining all 13 items, targets, and dependencies
registry/tonal/               Canonical source files for tokens, 5 primitives, and 7 blocks
scripts/build-registry.mjs    Validates manifest and compiles inline JSON files into public/r/
public/r/                     Compiled shadcn registry index and per-item JSON manifests
tests/registry.test.mjs       Node test suite verifying schema, disk parity, deps, and consumer imports
src/
  app/                        Next.js App Router pages, 4 live demos, OG image, sitemap, robots
  components/                 Showcase shell, CodePreviewCard, interactive gallery
  lib/registry-source.ts      Reads live source from registry/ at build time for Code tabs
```

Two details keep third-party installs reliable:

1. `scripts/build-registry.mjs` checks that `homepage` and every `registryDependencies` entry use production `https://` URLs with no `localhost` leaks, verifies every referenced file exists, and removes stale JSON files from `public/r/`.
2. Every item declares an explicit `target` under `components/tonal/` (and `components/tonal/blocks/` for blocks), matching the relative directory depth in `registry/tonal/`. `tests/registry.test.mjs` simulates installing each item plus its transitive `registryDependencies` to confirm every relative import and npm dependency resolves cleanly.

## Local Development

Requires Node.js 22+ and npm.

```bash
npm ci
npm run registry:build
npm run dev
```

Open `http://localhost:3456`.

### Verification Scripts

```bash
npm run registry:build   # Compile registry.json + registry/tonal/* into public/r/*.json
npm run typecheck        # Run tsc --noEmit
npm test                 # Run node --test tests/*.test.mjs (6 integrity test suites)
npm run check            # Run registry:build, typecheck, and test in sequence
npm run build            # Rebuild registry and run next build
```

## Measured Stats

Measured from a clean production build (`npm run build` on Next.js 15.5.29, React 19, Tailwind CSS v4):

- **Registry items**: 13 total (1 token sheet, 5 primitives, 7 blocks), 1,702 lines / 52.5 kB unminified source across all files.
- **Design tokens**: 34 `:root` CSS custom properties in `registry/tonal/tokens.css` (2.8 kB), including full dark mode and Commerce overrides.
- **Next.js static output**: 12/12 prerendered static routes, `103 kB` shared First Load JS.
  - `/` (Registry Showcase): `12.3 kB` route JS (`130 kB` First Load JS)
  - `/demos/ai`: `1.26 kB` (`115 kB` First Load JS)
  - `/demos/workspace`: `3.88 kB` (`114 kB` First Load JS)
  - `/demos/hardware`: `5.8 kB` (`116 kB` First Load JS)
  - `/demos/dashboard`: `7.34 kB` (`117 kB` First Load JS)
- **Registry dependencies**: `clsx`, `tailwind-merge`, and `lucide-react` only.

## Credits

Typography defaults to Google Sans (`SIL OFL-1.1`). Component registry format follows the [shadcn/ui registry specification](https://ui.shadcn.com/docs/registry).
