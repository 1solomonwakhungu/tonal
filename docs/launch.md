# Tonal Launch Copy & Release Notes

All claims, counts, install commands, and bundle numbers below are verified against `registry.json`, `public/r/*.json`, `tests/registry.test.mjs`, and `npm run build` (Next.js 15.5.29, React 19, Tailwind CSS v4).

- Live site: `https://tonal.harlo.dev`
- Registry index: `https://tonal.harlo.dev/r/registry.json`
- Repository: `https://github.com/1solomonwakhungu/tonal`
- License: MIT

---

## 1. Show HN

**Title**

Show HN: Tonal - Flat editorial UI blocks and tokens as a shadcn registry

**Body**

Hi HN,

I built Tonal (https://tonal.harlo.dev), a small MIT-licensed shadcn-compatible component registry for flat, editorial interfaces built on React, TypeScript, and Tailwind CSS v4.

Most component libraries lean on dark glass cards, layered shadows, and large primitive wrappers. I wanted the opposite aesthetic for marketing pages, hardware storefronts, and calmer dashboards: flat tonal surface steps (`#FFFFFF`, `#F8F9FA`, `#F4F2EE`, `#F0F4F9`, `#E8F0FE`, `#E6F4EA`), hairline borders, `24px` bento corners, and open-source Google Sans (`SIL OFL-1.1`) without installing a heavy runtime framework.

What is in the registry right now (13 items, 1,739 lines of source total):

- 1 CSS token sheet (`tonal-tokens`, 3.0 kB, 34 `:root` CSS custom properties with light/dark themes via `data-tonal-theme="dark"` or `.dark` for `next-themes`, plus a two-mode switch between Soft Pill `9999px` buttons and Commerce `6px` ink buttons via `data-tonal-mode`).
- 5 primitives: `tonal-button`, `surface-tile`, `tonal-chip`, `chevron-link`, `tonal-accordion`.
- 7 blocks: `editorial-hero` (interactive finish swatches that tint the surrounding surface), `tonal-app-shell`, `kpi-grid`, `tonal-table` (search + status filter chips), `capability-tabs` (roving tabindex + arrow/Home/End keyboard nav), `pricing-grid`, and `specs-table`.

You can pull any item straight into a Tailwind v4 project with the shadcn CLI:

```
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

A couple of packaging details I tripped over and fixed while building the registry:

1. Custom registries need full HTTPS URLs in `registryDependencies` (`https://tonal.harlo.dev/r/tonal-button.json`), otherwise `shadcn add` looks them up on `ui.shadcn.com` and 404s.
2. Installing a `button.tsx` or `accordion.tsx` into `components/ui/` overwrites a project's existing shadcn primitives and breaks relative imports from blocks. Every Tonal file declares an explicit `target` under `components/tonal/` (and `components/tonal/blocks/`), and a `node --test` suite simulates installing each item plus its transitive dependencies to check that every relative import and npm dependency resolves cleanly.

Tonal items themselves add only `clsx`, `tailwind-merge`, and `lucide-react` as runtime dependencies. The site also has 4 full demo routes (hardware storefront, AI product page, workspace landing page, and analytics console) where you can toggle Soft Pill / Commerce and Light / Dark live.

Source: https://github.com/1solomonwakhungu/tonal

Happy to answer questions about the token setup, Tailwind v4 quirks, or building custom shadcn registries.

---

## 2. Reddit Posts

### r/nextjs

**Title**

I built Tonal: 13 flat editorial UI primitives and blocks distributed as a custom shadcn registry (Next.js 15 + Tailwind v4)

**Body**

I put together an MIT-licensed shadcn registry called **Tonal** for calmer, flat editorial interfaces (hardware storefronts, workspace landing pages, and lightweight dashboards) using flat surface steps instead of drop shadows.

- Live showcase + 4 full demo pages: https://tonal.harlo.dev
- GitHub: https://github.com/1solomonwakhungu/tonal
- Registry index: https://tonal.harlo.dev/r/registry.json

**What is included (13 items, 1,739 lines total):**
- `tonal-tokens` (`styles/tonal-tokens.css`, 3.0 kB, 34 CSS variables covering light mode, dark mode via `[data-tonal-theme="dark"]` and `.dark` for `next-themes`, and a `data-tonal-mode="commerce"` button preset switch)
- 5 primitives: `tonal-button`, `surface-tile`, `tonal-chip`, `chevron-link`, `tonal-accordion`
- 7 blocks: `editorial-hero`, `tonal-app-shell`, `kpi-grid`, `tonal-table`, `capability-tabs`, `pricing-grid`, `specs-table`

**Install example:**

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

**Technical notes for anyone building a custom shadcn registry in Next.js:**
- All files target `components/tonal/` and `styles/tonal-tokens.css` so installing `tonal-button` or `tonal-accordion` never overwrites your existing `components/ui/` components.
- `scripts/build-registry.mjs` compiles `registry.json` and `registry/tonal/*` into `public/r/*.json`, enforces full `https://` URLs on `registryDependencies`, and removes stale outputs.
- `tests/registry.test.mjs` (built-in `node --test`, 6 integrity tests, zero test deps) validates schema parity, checks for localhost URL leaks, and simulates each item's installed target tree to catch broken relative imports.
- All 12 routes in the Next.js 15 app statically prerender (`103 kB` shared First Load JS; `/` is `12.5 kB` route JS).

Feedback on the components, dark mode contrast, or registry packaging is very welcome.

---

### r/reactjs

**Title**

Tonal: 13 lightweight React + Tailwind v4 tonal UI blocks and primitives you install via the shadcn CLI

**Body**

If you want flat, high-whitespace React components without pulling in a big component library, I built **Tonal**: 13 MIT-licensed, copy-owned primitives, page blocks, and CSS tokens distributed as a custom shadcn registry.

Live preview (with Desktop / Tablet / Mobile preview toggles, live code tabs, and 4 full demo sites): https://tonal.harlo.dev  
Repo: https://github.com/1solomonwakhungu/tonal

A few constraints I stuck to while writing the components:
- Tonal items themselves add only `clsx`, `tailwind-merge`, and `lucide-react`. No Radix wrappers or runtime styling engines.
- Depth comes from flat tonal surface steps (`--t-bg`, `--t-surface`, `--t-surface-warm`, `--t-surface-cool`, `--t-surface-sky`, `--t-surface-mint`) and hairline borders.
- One attribute (`data-tonal-mode="commerce"`) swaps buttons from `9999px` blue pills to `6px` dark ink buttons across the entire subtree. Dark mode works with either `data-tonal-theme="dark"` or a standard `.dark` class.
- Every block (`editorial-hero`, `tonal-app-shell`, `kpi-grid`, `tonal-table`, `capability-tabs`, `pricing-grid`, `specs-table`) installs into `components/tonal/blocks/` so it stays out of the way of existing `components/ui/` files.

Try installing one:

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/tonal-table.json
```

Would love feedback on accessibility edge cases or which blocks would actually be useful in real apps.

---

### r/webdev

**Title**

I built a flat tonal design system and 13 installable UI blocks powered by 34 CSS variables and Tailwind v4

**Body**

I got tired of re-creating the same calm, editorial layout patterns (porcelain/cool tonal cards, `24px` bento grids, hairline comparison tables, and pill nav shells) from scratch on new projects, so I packaged them into an MIT-licensed registry called **Tonal**.

Live site + 4 full demo sites (hardware store, AI studio, workspace SaaS, analytics console): https://tonal.harlo.dev  
Source: https://github.com/1solomonwakhungu/tonal

Instead of shipping an npm package you have to override, every component is served as a `shadcn`-compatible JSON manifest under `/r/*.json`. Running:

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/pricing-grid.json
```

copies the TypeScript/TSX source and `styles/tonal-tokens.css` directly into your project.

The whole catalog is 13 files (1,739 lines / 54.4 kB total), relies on CSS custom properties for light mode, dark mode (`data-tonal-theme="dark"` or `.dark`), and Soft Pill vs. Commerce button geometry, and adds only `clsx`, `tailwind-merge`, and `lucide-react`.

Curious what people think of the flat tonal surfaces in both light and dark mode (there is a toggle in the header on every demo page).

---

## 3. X / Twitter Launch Thread

**Tweet 1**
I built Tonal: 13 MIT-licensed editorial UI primitives, blocks, and CSS tokens shipped as a shadcn-compatible registry.

Flat tonal surfaces, 24px bento cards, hairline dividers, Google Sans, and zero framework bloat.

Live showcase + 4 demos: https://tonal.harlo.dev

**Tweet 2**
Install any block directly into a React + Tailwind v4 project with one command:

`npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json`

Everything lands under `components/tonal/` so it never overwrites your existing `components/ui/` files.

**Tweet 3**
13 items (1,739 lines total):

Tokens: tonal-tokens (34 CSS vars, 3.0 kB)
Primitives: tonal-button, surface-tile, tonal-chip, chevron-link, tonal-accordion
Blocks: editorial-hero, tonal-app-shell, kpi-grid, tonal-table, capability-tabs, pricing-grid, specs-table

**Tweet 4**
Two switches control the whole look:

- data-tonal-mode="commerce" swaps Soft Pill (9999px blue) buttons to Commerce (6px ink)
- data-tonal-theme="dark" or .dark flips every surface, ink, and accent token to dark tonal steps

Try both live across the 4 demo apps.

**Tweet 5**
Tonal items add only `clsx`, `tailwind-merge`, and `lucide-react` on top of React, TypeScript, and Tailwind CSS v4.

Every registry JSON file and relative import is verified in CI with `node --test`.

Code + manifests: https://github.com/1solomonwakhungu/tonal

---

## 4. GitHub Release Notes (`v0.1.0`)

### Tonal v0.1.0

First public release of Tonal, an MIT-licensed editorial tonal UI system distributed as a `shadcn`-compatible registry.

#### Highlights

- **13 installable registry items** (`https://tonal.harlo.dev/r/registry.json`, 1,739 lines / 54.4 kB source):
  - **Tokens (1):** `tonal-tokens` (`styles/tonal-tokens.css`, 34 `:root` CSS custom properties, 3.0 kB, light/dark themes via `data-tonal-theme="dark"` or `.dark`, and Soft Pill / Commerce button modes)
  - **Primitives (5):** `tonal-button`, `surface-tile`, `tonal-chip`, `chevron-link`, `tonal-accordion`
  - **Blocks (7):** `editorial-hero`, `tonal-app-shell`, `kpi-grid`, `tonal-table`, `capability-tabs`, `pricing-grid`, `specs-table`
- **Safe consumer installs:** Every item targets `components/tonal/` (or `styles/tonal-tokens.css`) and declares full `https://tonal.harlo.dev/r/*.json` `registryDependencies`, avoiding collisions with existing `components/ui/` primitives and broken relative imports.
- **4 full demo sites** at `https://tonal.harlo.dev`:
  - Lumen Store (`/demos/hardware`)
  - Aura Studio (`/demos/ai`)
  - Canvas Workspace (`/demos/workspace`)
  - Pulse Console (`/demos/dashboard`)
- **Automated registry integrity tests & CI:** `npm test` runs 6 `node --test` integrity checks verifying shadcn schema compliance, disk parity with `public/r/*.json`, zero `localhost` leaks, cycle-free dependency resolution, npm dependency declarations, and simulated consumer import resolution. GitHub Actions CI runs registry build, diff check, TypeScript typecheck, integrity tests, and production `next build` on every PR and push to `main`.

#### Quick Install

```bash
npx shadcn@latest add https://tonal.harlo.dev/r/editorial-hero.json
```

#### Verification

- `npm run registry:build`: 13 items compiled into `public/r/`
- `npm run typecheck`: 0 errors
- `npm test`: 6/6 passing
- `npm run build`: 12/12 static routes built (`103 kB` shared First Load JS)
