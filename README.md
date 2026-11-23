# Tonal

**Google Store–inspired editorial UI components & blocks — shipped as a `shadcn`-compatible registry.**

Tonal distills the calm, airy Google editorial aesthetic down to a tiny, zero-bloat system:
- **Google Sans** (`500` medium headlines, tight `-0.03em` tracking)
- **~12 CSS custom properties** for flat tonal surfaces (`#FFFFFF`, `#F8F9FA`, `#F4F2EE`, `#F0F4F9`), inks, and `24px` bento corners
- **Two-variable mode switch** between **GM3 Pills** (`9999px` / `#1967D2`) and **Store Commerce** (`6px` / `#202124`)
- **Zero Material Web dependencies** — pure React, TypeScript, and Tailwind CSS v4

## Local Development

```bash
npm install
npm run registry:build
npm run dev
```

Open `http://localhost:3456` to browse the Registry Showcase and all 4 live demo websites (`/demos/hardware`, `/demos/ai`, `/demos/workspace`, `/demos/dashboard`).

## Installing Components via `shadcn` CLI

```bash
npx shadcn@latest add https://your-tonal-url/r/editorial-hero.json
```

All compiled registry manifests live in `public/r/` and are generated from `registry.json` via `npm run registry:build`.
