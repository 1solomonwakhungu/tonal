# Tonal

Editorial tonal UI primitives, page blocks, and CSS tokens distributed as a `shadcn`-compatible registry.

Live showcase: [tonal.harlo.dev](https://tonal.harlo.dev)  
Theme Studio: [tonal.harlo.dev/studio](https://tonal.harlo.dev/studio)  
Registry index: [`https://tonal.harlo.dev/r/registry.json`](https://tonal.harlo.dev/r/registry.json)

Tonal uses flat tonal surfaces (`#FFFFFF`, `#F8F9FA`, `#F4F2EE`, `#F0F4F9`, `#E8F0FE`, `#E6F4EA`), semantic status tokens (`--t-success`, `--t-warning`, `--t-danger`), Tailwind CSS v4 `@theme inline` utility mappings, open-source Google Sans (`SIL OFL-1.1`), `24px` bento cards, and hairline dividers instead of heavy drop shadows or runtime UI libraries. Tonal items themselves add only `clsx`, `tailwind-merge`, and `lucide-react` as runtime dependencies.

## Quick Start

0. Initialize shadcn in your React + Tailwind CSS v4 project (if you have not already):

```bash
npx shadcn@latest init
```

1. Install any primitive or block directly via the `shadcn` CLI (installing a block pulls its token and primitive dependencies automatically):

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

2. Import the generated token stylesheet in your global CSS file (for example `src/app/globals.css`):

```css
@import "tailwindcss";
@import "../styles/tonal-tokens.css";
```

3. Load Google Sans (or keep your own fallback font stack by overriding `--t-font`):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@17..18,400;17..18,500;17..18,700&display=swap"
  rel="stylesheet"
/>
```

### Switching Modes and Themes

Tonal supports two styling switches that work globally on `<html>` or locally on any wrapper element:

- `data-tonal-mode="commerce"` switches buttons from Soft Pill (`9999px` radius, `#1967D2` primary fill) to Commerce (`6px` radius, `#202124` ink fill) by swapping four CSS variables.
- `data-tonal-theme="dark"` or `.dark` (compatible with `next-themes` class mode out of the box) switches all surface, ink, hairline, semantic status, and accent tokens to dark tonal steps (`#131314` canvas, `#1E1F20` neutral surface, `#1B2230` cool workspace surface, `#8AB4F8` accent).

```tsx
<div data-tonal-mode="commerce" data-tonal-theme="dark">
  <EditorialHero />
</div>
```

## Registry Catalog (19 Items)

Every component installs under `components/tonal/` (and tokens under `styles/tonal-tokens.css`) so it never collides with existing `components/ui/` files from shadcn/ui. All internal `registryDependencies` resolve to full `https://tonal.harlo.dev/r/*.json` URLs.

### Tokens (1)

| Name | Type | Target | Description |
| --- | --- | --- | --- |
| `tonal-tokens` | `registry:item` | `styles/tonal-tokens.css` | Core tonal surfaces, light/dark (`.dark` + `data-tonal-theme`), semantic status tokens, Tailwind v4 `@theme inline` bridge, and `prefers-reduced-motion` rules. |

### Primitives (10)

| Name | Target | Deps | Description |
| --- | --- | --- | --- |
| `tonal-button` | `components/tonal/button.tsx` | `clsx`, `tailwind-merge` | Primary, dark, outline, tonal, and ghost buttons adapting to Soft Pill or Commerce mode. |
| `surface-tile` | `components/tonal/surface-tile.tsx` | `clsx`, `tailwind-merge` | Flat `24px` container with 7 surface tones (`white`, `neutral`, `warm`, `cool`, `sky`, `mint`, `sand`). |
| `tonal-chip` | `components/tonal/chip.tsx` | `clsx`, `tailwind-merge` | Tinted pill badge for status labels (`blue`, `neutral`, `mint`, `warm`, `warning`, `danger`), deltas, and eyebrows. |
| `chevron-link` | `components/tonal/chevron-link.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | Inline editorial text link with subtle animated chevron. |
| `tonal-accordion` | `components/tonal/accordion.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | Hairline-divided FAQ accordion with ARIA regions, `inert` collapsed panels, and decelerating grid-row transition. |
| `tonal-dialog` | `components/tonal/dialog.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | Accessible modal and slide-over drawer (`variant="modal" \| "drawer"`) with ESC/backdrop dismiss, focus trap, scroll lock, and focus restoration. |
| `tonal-input` | `components/tonal/input.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | Labeled `TonalInput` (default & pill search), `TonalSelect`, and `TonalTextarea` with semantic error alerts and focus rings. |
| `tonal-segmented-control` | `components/tonal/segmented-control.tsx` | `clsx`, `tailwind-merge` | Accessible radiogroup pill switcher with roving Arrow/Home/End keyboard navigation and optional icons/badges. |
| `tonal-toast` | `components/tonal/toast.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | Floating notifications (`TonalToastProvider` + `useTonalToast`) with semantic tones and `aria-live="polite"`. |
| `tonal-command` | `components/tonal/command.tsx` | `clsx`, `tailwind-merge`, `lucide-react` | Keyboard-first `⌘K` command menu with grouped results, combobox ARIA wiring, instant filtering, and Arrow/Enter/Escape nav. |

### Blocks (8)

| Name | Target | Registry Deps | Description |
| --- | --- | --- | --- |
| `editorial-hero` | `components/tonal/blocks/editorial-hero.tsx` | `tonal-tokens`, `tonal-button`, `chevron-link` | Split storefront hero with interactive finish swatches that tint the surrounding tonal surface. |
| `tonal-app-shell` | `components/tonal/blocks/tonal-app-shell.tsx` | `tonal-tokens`, `chevron-link` | Cool tonal outer workspace shell with pill nav rail, `TonalQuotaCard`, and elevated sheet. |
| `kpi-grid` | `components/tonal/blocks/kpi-grid.tsx` | `tonal-tokens`, `tonal-chip` | 2-, 3-, or 4-column analytics KPI tiles with tabular numerals and delta chips. |
| `tonal-area-chart` | `components/tonal/blocks/tonal-area-chart.tsx` | `tonal-tokens` | Zero-dependency responsive SVG throughput & trend chart with hover and keyboard-focusable points. |
| `tonal-table` | `components/tonal/blocks/tonal-table.tsx` | `tonal-tokens`, `tonal-chip` | Searchable pill input, status filter chips, keyboard-accessible rows, and resettable empty state. |
| `capability-tabs` | `components/tonal/blocks/capability-tabs.tsx` | `tonal-tokens`, `surface-tile`, `tonal-chip` | Accessible tab switcher with arrow/Home/End keyboard nav for AI prompts and grounded responses on a cool tonal stage. |
| `pricing-grid` | `components/tonal/blocks/pricing-grid.tsx` | `tonal-tokens`, `surface-tile`, `tonal-button`, `tonal-chip` | Multi-tier pricing grid pairing canvas cards with a highlighted cool tonal tier. |
| `specs-table` | `components/tonal/blocks/specs-table.tsx` | `tonal-tokens` | Horizontally scrollable side-by-side hardware specification comparison table. |

## Live App & Demo Sites

The Next.js app at [tonal.harlo.dev](https://tonal.harlo.dev) includes the interactive registry showcase (with true-viewport iframe previews, Shiki syntax highlighting, dependency pills, and `⌘K` command search), a live Theme Studio, per-component docs, and four full-page demo websites:

| Route | View | Focus |
| --- | --- | --- |
| `/` | Registry Showcase | All 19 items with live preview, true-viewport iframe toggles, Shiki-highlighted source, and CLI commands |
| `/studio` | Live Theme Studio | Curated presets, custom accent picker, surface warmth, card radius slider, WCAG contrast checks & `tokens.css` export |
| `/components/[slug]` | Component Docs | Deep-linkable docs for all 19 items with `npx`/`pnpm`/`bun` install tabs, Props API, and dependency links |
| `/demos/hardware` | Lumen Store | Hardware storefront with `EditorialHero`, `SpecsTable`, and `TonalAccordion` |
| `/demos/ai` | Aura Studio | AI product page powered by `CapabilityTabs` and `PricingGrid` |
| `/demos/workspace` | Canvas Workspace | Productivity SaaS page with interactive app-tab stage and customer quote bento |
| `/demos/dashboard` | Pulse Console | Analytics console with `TonalAppShell`, `KpiGrid`, throughput chart, and `TonalTable` |

## Architecture

```text
registry.json                      Source manifest defining all 19 items, targets, and dependencies
registry/tonal/                    Canonical source files for tokens, 10 primitives, and 8 blocks
scripts/build-registry.mjs         Validates manifest and compiles inline JSON files into public/r/
scripts/verify-shadcn-install.mjs  Real end-to-end shadcn CLI install smoke test against a temp project
public/r/                          Compiled shadcn registry index and per-item JSON manifests
tests/
  registry.test.mjs                Node test suite verifying schema, disk parity, deps, and consumer targets
  registry-integrity.test.ts       Vitest token contract, dark parity, and WCAG AA contrast suite
  theme-studio.test.ts             Vitest Theme Studio contrast, CSS generation, and URL serialization suite
  components.test.tsx              Vitest + React Testing Library interaction & a11y suite
src/
  app/                             Next.js App Router pages, /studio, /components/[slug], /preview/[slug], 4 demos, OG, sitemap
  components/                      Showcase shell (⌘K + zero-FOUC theme), CodePreviewCard, ThemeStudioClient, RegistryPreview
  lib/                             registry-source.ts (Shiki), registry-catalog.ts, theme-studio.ts
```

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
npm run registry:build                  # Compile registry.json + registry/tonal/* into public/r/*.json
npm run typecheck                       # Run tsc --noEmit
npm test                                # Run node --test tests/*.test.mjs && vitest run
npm run check                           # Run registry:build, typecheck, and test in sequence
npm run build                           # Rebuild registry and run next build
node scripts/verify-shadcn-install.mjs  # Verify real `shadcn add` install in an isolated temp project
```

## Measured Stats

Measured from a clean production build (`npm run build` on Next.js 15.5.29, React 19, Tailwind CSS v4):

- **Registry items**: 19 total (1 token sheet, 10 primitives, 8 blocks), 2,996 lines / 94.7 kB unminified source across all files.
- **Design tokens**: 41 `:root` CSS custom properties in `registry/tonal/tokens.css` (210 lines / 5.7 kB), including light/dark parity (`[data-tonal-theme="dark"]` and `.dark`), WCAG AA semantic status tokens, Tailwind v4 `@theme inline` mappings, and Soft Pill / Commerce mode overrides.
- **Automated tests**: 27 passing tests (6 Node registry integrity tests + 21 Vitest contrast, Theme Studio, and component interaction tests).
- **Next.js static output**: 51/51 prerendered static routes, `103 kB` shared First Load JS (`/` `3.42 kB` route JS, `/studio` `4.38 kB`, `/components/[slug]` `1.26 kB`).
- **Registry dependencies**: Tonal items themselves add only `clsx`, `tailwind-merge`, and `lucide-react`.

## License & Credits

Licensed under the [MIT License](./LICENSE).

Typography defaults to Google Sans (`SIL OFL-1.1`). Component registry format follows the [shadcn/ui registry specification](https://ui.shadcn.com/docs/registry).
