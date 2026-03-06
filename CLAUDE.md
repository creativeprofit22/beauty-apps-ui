# Spa UI Moodboard

Multi-skin UI component showcase for beauty businesses (spa, barber, nail salon, tattoo). Built with Next.js 16, Tailwind CSS v4, GSAP animations, and Bun runtime.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   └── (showcase)/         # Route group: admin, backgrounds, client-portal,
│                           #   components, engagement, forms, mobile, typography
├── components/             # Grouped by role, one per file
│   ├── primitives/         # button, card, badge, input, select
│   ├── engagement/         # scratch-card, stamp-card, confetti, tier-upgrade
│   ├── layout/             # shell, page-header, tray, showcase-section
│   ├── navigation/         # bottom-nav, sidebar, nav-item
│   ├── data-display/       # loyalty-card, offer-card, stat-card, table, spark-bar
│   └── forms/              # booking-tray, field, service-gallery, slot-grid, time-drum
├── hooks/                  # useTheme, useScratch
├── lib/                    # utils.ts (cn helper)
└── styles/                 # globals.css → tokens → base → effects → fonts
skins/                      # Build-time swappable CSS tokens
├── _base/                  # Shared structure
├── spa/                    # Spa theme (config.ts + skin.css)
├── barber/                 # Barber theme
├── nail-salon/             # Nail salon theme
└── tattoo/                 # Tattoo theme
design/                     # Soul docs (brand, specs, interactions, tokens, typography)
```

## Stack

- Next.js 16.1, React 19, TypeScript 5.9
- Tailwind CSS 4.2 (`@theme inline` + oklch tokens)
- GSAP 3.14 + @gsap/react
- Bun runtime, Turbopack dev

## Architecture

- **Skins:** `SKIN=spa|barber|nail-salon|tattoo` env var swaps CSS tokens at build time via webpack alias
- **Path aliases:** `@/*` → `src/*`, `@/skin` → `skins/{SKIN}/`
- **CSS cascade:** `globals.css` → `tokens.css` → `base.css` → `effects.css` → `fonts.css`
- **Fonts:** DM Serif Display (display), DM Sans (body), Fira Code (data) — skins override via CSS custom properties

**Phase:** UI Refinement "Alive, Not SaaS" — Chunk 1/6

## Design Principles

- CSS custom properties at every decision point — components never hardcode colors/fonts/radii
- Shadow = depth signal, not decoration. No backdrop-filter (use shadow-sculpted cards)
- One animation per interaction. Three curves: standard `(0.4,0,0.2,1)`, spring `(0.34,1.56,0.64,1)`, tray `(0.32,0.72,0,1)`
- 44px minimum touch targets
- `prefers-reduced-motion` respected on all animations

## Commands

```bash
SKIN=spa bun run dev        # Dev server (Turbopack)
SKIN=barber bun run build   # Production build
bun run typecheck           # TypeScript check (tsc --noEmit)
```

## Code Quality

After editing ANY file, run:

```bash
bun run typecheck
```

Fix ALL errors before continuing. No ESLint configured — rely on TypeScript strict mode.

## Organization Rules

- Components → `src/components/{role}/`, one component per file
- Hooks → `src/hooks/`, prefixed with `use`
- Utilities → `src/lib/`
- Pages → `src/app/`, follow App Router conventions
- Design tokens → `src/styles/tokens.css` or `skins/{skin}/`
- Single responsibility per file, clear descriptive names
