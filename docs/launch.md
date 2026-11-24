# Tonal Launch Copy & Release Notes

All claims, counts, install commands, and bundle numbers below are verified against `registry.json`, `public/r/*.json`, `npm test`, and `npm run build` (Next.js 15.5.29, React 19, Tailwind CSS v4).

- Live site: `https://tonal.harlo.dev`
- Theme Studio: `https://tonal.harlo.dev/studio`
- Registry index: `https://tonal.harlo.dev/r/registry.json`
- Repository: `https://github.com/1solomonwakhungu/tonal`
- License: MIT

---

## 1. Show HN

**Title**

Show HN: Tonal - Flat editorial UI blocks and tokens as a shadcn registry

**Body**

Hi HN,

I built Tonal (https://tonal.harlo.dev), an MIT-licensed shadcn-compatible component registry for flat, editorial interfaces built on React, TypeScript, and Tailwind CSS v4.

Most component libraries lean on dark glass cards, layered shadows, and large primitive wrappers. I wanted the opposite aesthetic for marketing pages, hardware storefronts, and calmer dashboards: flat tonal surface steps (`#FFFFFF`, `#F8F9FA`, `#F4F2EE`, `#F0F4F9`, `#E8F0FE`, `#E6F4EA`), hairline borders, `24px` bento corners, semantic status tokens, and open-source Google Sans (`SIL OFL-1.1`) without installing a heavy runtime framework.

What is in the registry right now (19 items, 2,996 lines of source total):

- 1 CSS token sheet (`tonal-tokens`, 5.7 kB, 41 `:root` CSS custom properties with light/dark themes via `data-tonal-theme="dark"` or `.dark` for `next-themes`, Tailwind v4 `@theme inline` mappings, WCAG AA semantic status pairs, and Soft Pill `9999px` vs. Commerce `6px` button modes).
- 10 primitives: `tonal-button`, `surface-tile`, `tonal-chip`, `chevron-link`, `tonal-accordion`, `tonal-dialog`, `tonal-input`, `tonal-segmented-control`, `tonal-toast`, `tonal-command`.
- 8 blocks: `editorial-hero`, `tonal-app-shell`, `kpi-grid`, `tonal-area-chart`, `tonal-table`, `capability-tabs`, `pricing-grid`, `specs-table`.

You can pull any item straight into a Tailwind v4 project with the shadcn CLI:

```
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

A couple of packaging details I tripped over and fixed while building the registry:

1. Custom registries need full HTTPS URLs in `registryDependencies` (`https://tonal.harlo.dev/r/tonal-button.json`), otherwise `shadcn add` looks them up on `ui.shadcn.com` and 404s.
2. Installing a `button.tsx` or `accordion.tsx` into `components/ui/` overwrites a project's existing shadcn primitives and breaks relative imports from blocks. Every Tonal file declares an explicit `target` under `components/tonal/` (and `components/tonal/blocks/`), and a test suite (6 Node registry integrity tests + 21 Vitest contrast, Theme Studio, and component tests) verifies schema parity, consumer target resolution, and accessibility behavior.

Tonal items themselves add only `clsx`, `tailwind-merge`, and `lucide-react` as runtime dependencies. The site includes a live Theme Studio (https://tonal.harlo.dev/studio) with WCAG contrast checks and `tokens.css` export, deep-linked docs for all 19 items, and 4 full demo routes.

Source: https://github.com/1solomonwakhungu/tonal

Happy to answer questions about the token setup, Tailwind v4 quirks, or building custom shadcn registries.

---

## 2. Reddit Posts

### r/nextjs

**Title**

I built Tonal: 19 flat editorial UI primitives and blocks distributed as a custom shadcn registry (Next.js 15 + Tailwind v4)

**Body**

I put together an MIT-licensed shadcn registry called **Tonal** for calmer, flat editorial interfaces (hardware storefronts, workspace landing pages, and lightweight dashboards) using flat surface steps instead of drop shadows.

- Live showcase + 4 full demo pages: https://tonal.harlo.dev
- Live Theme Studio: https://tonal.harlo.dev/studio
- GitHub: https://github.com/1solomonwakhungu/tonal
- Registry index: https://tonal.harlo.dev/r/registry.json

**What is included (19 items, 2,996 lines total):**
- `tonal-tokens` (`styles/tonal-tokens.css`, 5.7 kB, 41 `:root` CSS variables covering light/dark via `[data-tonal-theme="dark"]` and `.dark` for `next-themes`, WCAG AA semantic status tokens, Tailwind v4 `@theme inline` mappings, and `data-tonal-mode="commerce"`)
- 10 primitives: `tonal-button`, `surface-tile`, `tonal-chip`, `chevron-link`, `tonal-accordion`, `tonal-dialog`, `tonal-input`, `tonal-segmented-control`, `tonal-toast`, `tonal-command`
- 8 blocks: `editorial-hero`, `tonal-app-shell`, `kpi-grid`, `tonal-area-chart`, `tonal-table`, `capability-tabs`, `pricing-grid`, `specs-table`

**Install example:**

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

**Technical notes for anyone building a custom shadcn registry in Next.js:**
- All files target `components/tonal/` and `styles/tonal-tokens.css` so installing `tonal-button` or `tonal-accordion` never overwrites your existing `components/ui/` components.
- `scripts/build-registry.mjs` compiles `registry.json` and `registry/tonal/*` into `public/r/*.json`, enforces full `https://` URLs on `registryDependencies`, and removes stale outputs.
- `npm test` runs 27 automated tests (6 Node registry integrity tests + 21 Vitest contrast, Theme Studio, and RTL interaction tests).
- All 51 routes in the Next.js 15 app statically prerender (`103 kB` shared First Load JS; `/` is `3.42 kB` route JS, `/studio` is `4.38 kB`).

Feedback on the components, Theme Studio, or registry packaging is very welcome.

---

### r/reactjs

**Title**

Tonal: 19 lightweight React + Tailwind v4 tonal UI primitives and blocks you install via the shadcn CLI

**Body**

If you want flat, high-whitespace React components without pulling in a big component library, I built **Tonal**: 19 MIT-licensed, copy-owned primitives, page blocks, and CSS tokens distributed as a custom shadcn registry.

Live preview (true-viewport iframe toggles, Shiki code tabs, Theme Studio, and 4 full demo sites): https://tonal.harlo.dev  
Repo: https://github.com/1solomonwakhungu/tonal

A few constraints I stuck to while writing the components:
- Tonal items themselves add only `clsx`, `tailwind-merge`, and `lucide-react`. No Radix wrappers or runtime styling engines.
- Depth comes from flat tonal surface steps (`--t-bg`, `--t-surface`, `--t-surface-warm`, `--t-surface-cool`, `--t-surface-sky`, `--t-surface-mint`) and hairline borders.
- One attribute (`data-tonal-mode="commerce"`) swaps buttons from `9999px` blue pills to `6px` dark ink buttons across the entire subtree. Dark mode works with either `data-tonal-theme="dark"` or a standard `.dark` class.
- Every primitive and block (`tonal-dialog`, `tonal-command`, `tonal-table`, `tonal-area-chart`, `editorial-hero`, `capability-tabs`, `pricing-grid`, `specs-table`) installs under `components/tonal/` so it stays out of the way of existing `components/ui/` files.

Try installing one:

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/tonal-table.json
```

Would love feedback on accessibility edge cases or which blocks would actually be useful in real apps.

---

### r/webdev

**Title**

I built a flat tonal design system, live Theme Studio, and 19 installable UI blocks powered by Tailwind v4

**Body**

I got tired of re-creating the same calm, editorial layout patterns (porcelain/cool tonal cards, `24px` bento grids, hairline comparison tables, and pill nav shells) from scratch on new projects, so I packaged them into an MIT-licensed registry called **Tonal**.

Live site + Theme Studio + 4 full demo sites: https://tonal.harlo.dev  
Source: https://github.com/1solomonwakhungu/tonal

Instead of shipping an npm package you have to override, every component is served as a `shadcn`-compatible JSON manifest under `/r/*.json`. Running:

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/pricing-grid.json
```

copies the TypeScript/TSX source and `styles/tonal-tokens.css` directly into your project.

The catalog is 19 files (2,996 lines / 94.7 kB total), relies on 41 CSS custom properties for light mode, dark mode (`data-tonal-theme="dark"` or `.dark`), semantic status colors, and Soft Pill vs. Commerce button geometry, and adds only `clsx`, `tailwind-merge`, and `lucide-react`. You can also remix accent hues, warmth, and radii with live WCAG contrast checks at https://tonal.harlo.dev/studio.

Curious what people think of the flat tonal surfaces in both light and dark mode.

---

## 3. X / Twitter Launch Thread

**Tweet 1**
I built Tonal: 19 MIT-licensed editorial UI primitives, blocks, and CSS tokens shipped as a shadcn-compatible registry.

Flat tonal surfaces, 24px bento cards, hairline dividers, Google Sans, and a live Theme Studio.

Showcase + 4 demos: https://tonal.harlo.dev

**Tweet 2**
Install any block directly into a React + Tailwind v4 project with one command:

`npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json`

Everything lands under `components/tonal/` so it never overwrites your existing `components/ui/` files.

**Tweet 3**
19 items (2,996 lines):

Tokens: tonal-tokens (41 CSS vars, Tailwind v4 @theme)
10 primitives: button, surface-tile, chip, chevron-link, accordion, dialog, input, segmented-control, toast, command
8 blocks: hero, app-shell, kpi-grid, area-chart, table, tabs, pricing, specs

**Tweet 4**
Two switches control the look:

- data-tonal-mode="commerce" swaps Soft Pill (9999px blue) buttons to Commerce (6px ink)
- data-tonal-theme="dark" or .dark flips surfaces, status, and accents

Remix palettes + export tokens.css: https://tonal.harlo.dev/studio

**Tweet 5**
Tonal items add only `clsx`, `tailwind-merge`, and `lucide-react` on top of React, TypeScript, and Tailwind CSS v4.

27 automated tests (Node + Vitest) check registry integrity, WCAG AA contrast, and component a11y in CI.

Code: https://github.com/1solomonwakhungu/tonal

---

## 4. GitHub Release Notes (`v0.2.0`)

### Tonal v0.2.0

Public release of Tonal, an MIT-licensed editorial tonal UI system distributed as a `shadcn`-compatible registry.

#### Highlights

- **19 installable registry items** (`https://tonal.harlo.dev/r/registry.json`, 2,996 lines / 94.7 kB source):
  - **Tokens (1):** `tonal-tokens` (`styles/tonal-tokens.css`, 41 `:root` CSS custom properties, 5.7 kB, light/dark themes via `data-tonal-theme="dark"` or `.dark`, WCAG AA semantic status tokens, Tailwind v4 `@theme inline` mappings, reduced-motion rules, and Soft Pill / Commerce button modes)
  - **Primitives (10):** `tonal-button`, `surface-tile`, `tonal-chip`, `chevron-link`, `tonal-accordion`, `tonal-dialog`, `tonal-input`, `tonal-segmented-control`, `tonal-toast`, `tonal-command`
  - **Blocks (8):** `editorial-hero`, `tonal-app-shell`, `kpi-grid`, `tonal-area-chart`, `tonal-table`, `capability-tabs`, `pricing-grid`, `specs-table`
- **Live Theme Studio & Component Docs:** Interactive Theme Studio at `/studio` with presets, accent/warmth/radius controls, WCAG AA contrast verification, shareable URLs, and `tokens.css` export, plus deep-linked docs for all 19 items at `/components/[slug]`.
- **Safe consumer installs:** Every item targets `components/tonal/` (or `styles/tonal-tokens.css`) and declares full `https://tonal.harlo.dev/r/*.json` `registryDependencies`, avoiding collisions with existing `components/ui/` primitives and broken relative imports.
- **4 full demo sites** at `https://tonal.harlo.dev`:
  - Lumen Store (`/demos/hardware`)
  - Aura Studio (`/demos/ai`)
  - Canvas Workspace (`/demos/workspace`)
  - Pulse Console (`/demos/dashboard`)
- **Automated tests & CI:** `npm test` runs 27 tests (6 Node registry integrity checks + 21 Vitest contrast, Theme Studio, and React Testing Library interaction tests). GitHub Actions CI runs registry build, `public/r/` diff check, TypeScript typecheck, full test suite, and production `next build` on every PR and push to `main`.

#### Quick Install

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

#### Verification

- `npm run registry:build`: 19 items compiled into `public/r/`
- `npm run typecheck`: 0 errors
- `npm test`: 27/27 passing (6 Node + 21 Vitest)
- `npm run build`: 51/51 static routes built (`103 kB` shared First Load JS)
