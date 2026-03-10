# Beauty Apps UI

Free, open-source UI component kit built specifically for beauty apps — spas, barbershops, nail salons, tattoo studios. Grab it, skin it, ship it.

Built with Next.js 16, React 19, Tailwind CSS v4, and GSAP animations. Bilingual out of the box (English / Spanish).

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

---

## What's Inside

**60 components** across 7 categories, all theme-aware and built for beauty & wellness apps:

| Category | Components |
|----------|-----------|
| **Primitives** | Button, Card, Badge, Input, Select, Avatar, Checkbox, Toggle, Dropdown Menu |
| **Data Display** | Loyalty Card, Offer Card, Stat Card, Table, Spark Bar, Bar Chart, Line Chart, Donut Chart, Calendar, Chat Interface, Activity Feed, Appointment Card, Plan Card, Profile Summary, Radial Progress, Tier Progress, Integration Card, Audit Row |
| **Engagement** | Scratch Card, Stamp Card, Confetti, Tier Upgrade, Points Float, Envelope Reveal, Gift Box, Wax Seal, Peel-Back, Slot Machine, Bubble Pop |
| **Forms** | Booking Tray, Field, Filter Pills, Search Bar, Service Gallery, Slot Grid, Time Drum |
| **Layout** | Shell, Page Header, Showcase Section, Settings Panel |
| **Navigation** | Sidebar, Bottom Nav, Nav Item, Skin Switcher, Tab Bar |
| **Feedback** | Dialog, Confirmation Dialog, Toast, Skeleton, Status Indicator, Empty State |

---

## Skins

Four complete skins baked in. Switch between them live from the sidebar — no rebuild needed.

| Skin | Vibe | Fonts | Radii |
|------|------|-------|-------|
| **Day Spa** | Warm gold, dusty rose, sage. Soft and glassy. | DM Serif Display + DM Sans | Soft (10–28px) |
| **Barbershop** | Leather brown, steel, forest green. Sharp and matte. | Oswald + IBM Plex Sans | Tight (2–12px) |
| **Nail Salon** | Lacquer red, ballet pink, cream. Elegant and polished. | Cormorant Garamond + Plus Jakarta Sans | Medium (4–16px) |
| **Tattoo Studio** | Jet black, crimson, silver. Dark and bold. | Bebas Neue + Oswald | Sharp (2–8px) |

Each skin overrides the full design token set — colours, typography, shadows, borders, glows, page backgrounds, and dark mode. Components never hardcode any of it.

---

## Showcase Pages

The moodboard includes 10 fully built showcase pages:

- **Tokens** — Colour palette, spacing, elevation, and all design tokens
- **Typography** — Font specimens, scales, and pairings per skin
- **Backgrounds** — Page backgrounds, gradients, and noise textures
- **Components** — All primitives and data display components
- **Forms** — Booking tray, service gallery, time pickers, slot grids
- **Admin** — Dashboard with charts, tables, settings, integrations
- **Client Portal** — Loyalty cards, stamp cards, offers, appointments, profiles
- **Charts** — Bar, line, donut charts with skin-aware colours
- **Chat** — Chat interface with message bubbles
- **Engagement** — Scratch cards, confetti, gift boxes, slot machines, bubble pop
- **Mobile** — Mobile-first layouts and bottom navigation

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Git

### Install

```bash
git clone https://github.com/creativeprofit22/beauty-apps-ui.git
cd beauty-apps-ui
bun install
```

### Run

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) and use the skin switcher in the sidebar to browse all four skins.

### Build

```bash
bun run build
bun run start
```

### Typecheck

```bash
bun run typecheck
```

---

## Skin System

### How It Works

Every design decision runs through CSS custom properties. Components use tokens like `var(--primary)`, `var(--radii-md)`, `var(--elevation-card)` — they never know which skin is active.

Skins are defined in `skins/{skin-name}/`:
- **`skin.css`** — Full set of CSS custom property overrides (light + dark mode)
- **`config.ts`** — Non-CSS config: confetti colours, watermark SVGs, slot machine symbols, celebration styles

### Runtime Switching

The skin switcher in the sidebar flips the `data-skin` attribute on the root element. All four skin CSS files are loaded at once, scoped by `[data-skin="spa"]`, `[data-skin="barber"]`, etc. — only the active one applies. Your selection persists in localStorage.

### Building Your Own Skin

1. Copy an existing skin folder (e.g. `skins/spa/`)
2. Rename it and update the CSS custom properties in `skin.css`
3. Update `config.ts` with your brand's non-CSS config
4. Add it to `src/lib/skin-registry.ts`
5. Import the CSS in `src/app/layout.tsx`

---

## i18n

English and Spanish are supported out of the box. Toggle between them from the sidebar.

String maps live in `src/lib/strings/` — one file per page. Add a new locale by extending the `StringMap` type in `src/lib/i18n.ts` and adding translations to each string file.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   └── (showcase)/         # 10 showcase pages
├── components/             # 60 components, grouped by role
│   ├── primitives/         # Button, Card, Badge, Input, etc.
│   ├── data-display/       # Charts, tables, loyalty cards, etc.
│   ├── engagement/         # Scratch cards, confetti, gift boxes, etc.
│   ├── forms/              # Booking tray, slot grid, time drum, etc.
│   ├── layout/             # Shell, page header, showcase section
│   ├── navigation/         # Sidebar, bottom nav, skin switcher
│   └── feedback/           # Dialogs, toasts, skeletons
├── hooks/                  # useTheme, useSkin, useScratch
├── lib/                    # Utilities, i18n, skin registry, string maps
└── styles/                 # Global CSS, tokens, effects, fonts
skins/
├── _base/                  # Shared structural tokens
├── spa/                    # Day Spa skin
├── barber/                 # Barbershop skin
├── nail-salon/             # Nail Salon skin
└── tattoo/                 # Tattoo Studio skin
design/                     # Design docs (brand, specs, tokens, typography)
```

---

## Design Principles

- **CSS custom properties everywhere** — components never hardcode colours, fonts, or radii
- **Shadow = depth signal** — no backdrop-filter, shadow-sculpted cards only
- **One animation per interaction** — three curves: standard, spring, tray
- **44px minimum touch targets** — mobile-first, always
- **`prefers-reduced-motion` respected** — on all animations

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.1 (App Router, Turbopack) |
| UI | React 19 |
| Styling | Tailwind CSS 4.2 (`@theme inline` + oklch tokens) |
| Animations | GSAP 3.14 + @gsap/react |
| Language | TypeScript 5.9 (strict mode) |
| Runtime | Bun |

---

## Built By

[Douro Digital](https://wearedouro.agency) — Revenue systems that pick up the phone, book the call, and make you money while you sleep.

---

## Licence

MIT — do whatever you want with it.
