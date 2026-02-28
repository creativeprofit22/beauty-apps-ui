# UI Refinement Spec — "Alive, Not SaaS"

> Consolidated from brainstorm + discussion. Every change here is filtered through:
> - Performance (mobile-first, CSS-first, GPU-compositable)
> - Restraint (one accent per viewport, seasoning not the dish)
> - Temperature (warm, not cold; room, not spreadsheet)
> - Rhythm (page-turning, not snapping; bloom, not instant)
> - The line between feminine and patronizing (professional craft, not costume)

---

## 1. Typography Overhaul

### What Changes

Current fonts (Inter body, Space Grotesk display) read as fintech/SaaS. The single biggest
visual shift is swapping to editorial beauty pairings.

### Per-Skin Font Stacks

**Spa:**
- Display: `DM Serif Display` — editorial luxury, high contrast, warm. NOT fashion-stiff like Playfair.
- Body: `DM Sans` — optical sister to DM Serif. Geometric but humanist. Clean at small sizes.
- Data: `Fira Code` (keep)

**Nail Salon:**
- Display: `Cormorant Garamond` (Medium/SemiBold) — Vogue-adjacent, hairline serifs, nail art mood board energy
- Body: `Plus Jakarta Sans` — contemporary, warm, professional adult (replaces Quicksand which reads juvenile)
- Data: `Fira Code` (keep)

**Barber:**
- Display: `Oswald` (keep — already correct)
- Body: `IBM Plex Sans` — precision, craft, tools (Inter is too generic here)
- Data: `Fira Code` (keep)

**Tattoo:**
- Display: `Bebas Neue` (keep — already correct)
- Body: `Inter` (keep — the clinical feel works for this skin)
- Data: `Fira Code` (keep)

### Typographic Adjustments (all skins)

```
Headlines:
  letter-spacing: -0.02em (tight = editorial/luxury)
  line-height: 1.05
  font-weight: 400 for serif display fonts (they look better at regular weight)

Section labels (new utility class):
  font-family: var(--font-family-body)
  font-size: 0.65rem
  letter-spacing: 0.14em (wide-tracked caps = magazine section headers)
  text-transform: uppercase
  font-weight: 500
  color: var(--text-secondary)

Body text:
  line-height: 1.65 (was ~1.5 — extra space reads warmer)
  font-size: 0.9375rem (15px — slightly smaller than default reads crisper)

Button labels:
  letter-spacing: 0.06em
  font-size: 0.8125rem (13px)
  text-transform: uppercase
  font-weight: 600
  (This is the Glossier/Aesop pattern — confident, spacious)
```

### Packages to Install
- `@fontsource-variable/dm-sans`
- `@fontsource/dm-serif-display`
- `@fontsource-variable/cormorant-garamond` (or `@fontsource/cormorant-garamond`)
- `@fontsource-variable/plus-jakarta-sans`
- `@fontsource-variable/ibm-plex-sans`

### Implementation Notes
- Each skin's `config.ts` already specifies `fonts.display` and `fonts.body` — update those
- Root `layout.tsx` imports fonts and applies them — update the import map
- `tokens.css` bridges `--font-family-display/body/data` to Tailwind — these stay the same
- Each skin's `skin.css` sets `--font-family-display` and `--font-family-body` — update values

---

## 2. Color Refinements

### Philosophy
Current spa palette (warm gold 0.76/0.12/85, rose 0.68/0.12/12, sage 0.65/0.08/155) is
directionally correct but too saturated for primaries. Beauty color language is about color
that envelops and recedes, not color that announces. Pull back chroma. Add nude/skin-adjacent
tones. Warm-tint every shadow.

### Spa Skin — Revised

```css
/* Primary — Champagne Nude (recedes, skin-like) */
--primary:          oklch(0.82 0.06 72);    /* was 0.76/0.12/85 — less chroma, warmer hue */
--primary-hover:    oklch(0.78 0.07 72);
--primary-active:   oklch(0.72 0.05 72);

/* Secondary — Dusty Rose (muted, grown-up) */
--secondary:        oklch(0.70 0.08 18);    /* was 0.68/0.12/12 — less saturated, warmer */
--secondary-hover:  oklch(0.66 0.09 18);

/* Accent — Sage (nudged warmer) */
--accent:           oklch(0.62 0.06 148);   /* was 0.65/0.08/155 — less green, more grey-sage */

/* NEW: Warm Mauve — third hue for beauty depth */
--mauve:            oklch(0.64 0.09 330);
--mauve-muted:      oklch(0.88 0.04 330);

/* NEW: Terracotta — warmth accent for seasonal/editorial moments */
--terra:            oklch(0.62 0.10 40);

/* NEW: Nude Surface Tints — surfaces feel like skin, not paper */
--surface-warm-1:   oklch(0.98 0.004 72);
--surface-warm-2:   oklch(0.96 0.007 72);
--surface-warm-3:   oklch(0.93 0.010 72);

/* NEW: Foil tokens — for premium/loyalty moments */
--foil-light:       oklch(0.91 0.05 82);
--foil-mid:         oklch(0.78 0.09 78);
--foil-deep:        oklch(0.62 0.11 74);

/* Surfaces — brightest is warm white, not pure white */
--surface-base:     oklch(0.985 0.004 72);  /* was hue 85 — shift to match primary hue */
--surface-raised:   oklch(0.995 0.003 72);
--surface-overlay:  oklch(1.0 0 0);         /* keep pure for modals */
--surface-sunken:   oklch(0.965 0.007 72);

/* Text — not pure black, warm ink */
--text-primary:     oklch(0.15 0.02 60);    /* reads as ink, not digital */
--text-secondary:   oklch(0.45 0.02 72);
--text-muted:       oklch(0.60 0.015 72);
```

### Nail Salon Skin — Revised

Current pastel pink + lavender reads "Easter." Nail artists are edgy — lacquer, chrome,
negative space, color blocking. Softness in layout, not palette.

```css
/* Primary — Lacquer Red (deep, rich, not hot) */
--primary:          oklch(0.50 0.19 20);
--primary-hover:    oklch(0.46 0.20 20);
--primary-muted:    oklch(0.62 0.12 20);

/* Secondary — Ballet Pink (keeps the soft note) */
--secondary:        oklch(0.84 0.06 358);

/* Accent — Negative Space Cream */
--accent:           oklch(0.97 0.008 85);

/* NEW: Chrome — metallic nail moment */
--chrome:           oklch(0.78 0.04 220);   /* cool silver */
--chrome-rose:      oklch(0.78 0.05 350);   /* rose gold chrome */

/* NEW: Ink — editorial typography moments */
--ink:              oklch(0.20 0.02 280);
```

### Barber + Tattoo — No Changes
Already tonally correct for their audience.

### Shadow System — Warm Tinting (ALL skins)

Every skin's shadows should be tinted to match its hue, not grey.

```css
/* Spa shadows — champagne-tinted */
--elevation-card:
  0 1px 2px oklch(0.50 0.08 72 / 0.06),
  0 3px 8px oklch(0.50 0.08 72 / 0.08),
  0 8px 24px oklch(0.50 0.08 72 / 0.05);

/* Nail salon shadows — rose-tinted */
--elevation-card:
  0 1px 2px oklch(0.40 0.10 350 / 0.06),
  0 3px 8px oklch(0.40 0.10 350 / 0.08),
  0 8px 24px oklch(0.40 0.10 350 / 0.04);
```

### Dark Mode — Candlelit Room, Not Code Editor

```css
/* Spa dark surfaces — amber warmth */
--surface-base:     oklch(0.10 0.012 55);
--surface-raised:   oklch(0.14 0.014 58);
--surface-overlay:  oklch(0.22 0.018 62);
--surface-sunken:   oklch(0.08 0.010 55);

/* Dark text — warm cream, not pure white */
--text-primary:     oklch(0.94 0.008 78);
--text-secondary:   oklch(0.70 0.010 72);
--text-muted:       oklch(0.50 0.008 72);

/* Brand colors glow brighter in dark */
--primary:          oklch(0.84 0.10 72);
--secondary:        oklch(0.76 0.10 18);

/* Dark elevation — glow-based, not shadow-based */
--elevation-card:
  inset 0 1px 0 oklch(0.40 0.02 72 / 0.4),
  0 0 0 1px oklch(0.30 0.015 72 / 0.4),
  0 4px 16px oklch(0.50 0.06 72 / 0.15);
```

---

## 3. Visual Texture & Depth

### Page Background — Radial Light Pooling (not flat)

Replace flat surface colors with soft radial gradients that feel like light in a room.

```css
/* Spa light — warm light pooling from top + rose wash bottom-left */
--page-bg:
  radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.90 0.015 72 / 0.4), transparent),
  radial-gradient(ellipse 60% 40% at 20% 100%, oklch(0.88 0.010 18 / 0.25), transparent),
  var(--surface-base);

/* Spa dark — warm glow from above, deeper at edges */
--page-bg-dark:
  radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.16 0.018 60 / 0.8), transparent),
  radial-gradient(ellipse 40% 30% at 20% 80%, oklch(0.12 0.015 350 / 0.4), transparent),
  var(--surface-base);
```

Applied to `body` or the main content area. Painted once by the compositor, zero perf cost.

### Card Top-Edge Highlight

Single inset line makes every card feel like a physical object catching light.

```css
--elevation-card with added:
  inset 0 1px 0 oklch(1 0 0 / 0.65)   /* first in the shadow stack */
```

### SVG Noise Texture (optional, per-skin)

Adds organic warmth to surfaces. Applied via `::after` pseudo-element.

```css
.surface-textured::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0.035;   /* barely visible — you feel it, don't see it */
  background-image: url("data:image/svg+xml,...feTurbulence...");
  background-size: 128px;
  mix-blend-mode: multiply;
}
```

Spa + Nail Salon: enabled (warmth/texture matters).
Barber + Tattoo: disabled (those skins prefer clean/hard surfaces).

### Soft Inner Glow (frosted glass feel without backdrop-filter)

```css
.surface-opal {
  background: oklch(0.97 0.005 72 / 0.92);
  box-shadow:
    inset 0 1px 0 oklch(1 0 0 / 0.7),
    inset 0 -1px 0 oklch(0.85 0.008 72 / 0.3),
    0 1px 3px oklch(0.5 0.06 72 / 0.08),
    0 4px 12px oklch(0.5 0.06 72 / 0.06);
}
```

---

## 4. Animations & Easing

### New Easing Curves

```css
/* Bloom — appearing elements: starts slow, ends decisively. Like a flower opening. */
--ease-bloom: cubic-bezier(0.0, 0.0, 0.2, 1.0);

/* Drift — ambient/passive: ultra-slow, perfectly even */
--ease-drift: cubic-bezier(0.45, 0.05, 0.55, 0.95);
```

Add to existing `--ease-standard`, `--ease-spring`, `--ease-tray` in effects.css.

### New Keyframe Animations

```css
/* gentle-arrive — viewport entrance for cards/sections */
@keyframes gentle-arrive {
  0%   { transform: translateY(12px); opacity: 0; filter: blur(1px); }
  100% { transform: translateY(0);    opacity: 1; filter: blur(0); }
}
/* Duration: 400ms, ease: bloom */
/* The 1px blur start removes the harsh "popping in" feel */
/* DO NOT use blur above 2px — expensive on mobile */

/* soft-breathe — replaces sheen scan on premium surfaces */
@keyframes soft-breathe {
  0%, 100% { opacity: 0.6; transform: scale(1.00); }
  50%      { opacity: 0.9; transform: scale(1.01); }
}
/* Duration: 3.5s, infinite, ease-in-out */

/* spa-skeleton — breathing pulse replacing horizontal shimmer */
@keyframes spa-skeleton {
  0%, 100% { background-color: var(--surface-warm-2, oklch(0.93 0.006 72)); }
  50%      { background-color: var(--surface-warm-1, oklch(0.96 0.003 72)); }
}
/* Duration: 1.8s, infinite, ease-in-out */
/* Rationale: shimmer scan says "loading data." Pulse says "resting." Calmer. */

/* petal-fall — success/celebration (CSS-only alternative to confetti) */
@keyframes petal-fall {
  0%   { transform: translateY(-20px) rotate(-15deg) scale(0.8); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateY(60px) rotate(25deg) scale(1); opacity: 0; }
}
/* Each petal: 6px x 10px, border-radius 50% 0 50% 0, skin palette color */
/* Spawn 4-6 max with staggered delays. NOT 50. */

/* ripple-warm — button press feedback */
@keyframes ripple-warm {
  0%   { transform: scale(0); opacity: 0.4; }
  100% { transform: scale(2.5); opacity: 0; }
}
/* ::after pseudo on button, 380ms duration */
/* Noticeably slower than standard ripple — warmth comes from pace */
```

### Skeleton Loading Change

Replace the horizontal shimmer scan (`@keyframes shimmer`) with `spa-skeleton` breathing pulse
for spa + nail-salon skins. Keep shimmer for barber + tattoo (those skins favor precision over
warmth).

### ShowcaseSection / ScrollTrigger Refinement

Current: `{ opacity: 0, y: 20, skewX: -1.5 }` → `{ opacity: 1, y: 0, skewX: 0 }`

Revised: Replace with `gentle-arrive` keyframe via CSS class toggle (reduces GSAP dependency
for simple entrances). Reserve GSAP ScrollTrigger for complex staggered sequences only.

For GSAP stagger sequences, add a slight blur start:
```js
gsap.from(targets, {
  opacity: 0,
  y: 12,       // was 20 — less dramatic
  skewX: 0,    // remove skew — too tech-demo
  filter: 'blur(1px)',
  duration: 0.4,
  stagger: 0.06,
  ease: 'power2.out',  // bloom equivalent
  clearProps: 'filter'  // clean up after animation
})
```

### Bottom Nav Tap Feedback

```css
.nav-item:active .nav-icon {
  transform: scale(1.15);
  transition: transform 120ms var(--ease-spring);
}
```

Spring back to scale(1) on release. This is what makes mobile feel native-premium vs web-app.

### Input Focus — Kill the Blue Ring

```css
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow:
    inset 0 2px 4px oklch(0.70 0.04 72 / 0.06),
    0 0 0 3px oklch(var(--primary-l) var(--primary-c) var(--primary-h) / 0.18);
}
```

Every browser-default blue that leaks through ruins the temperature.

### Performance Rules

- All ambient animations: `will-change: opacity` (not transform unless actually transforming)
- `gentle-arrive`: `will-change: transform, opacity` ONLY during animation, then remove
- No animation loops on elements below the fold — IntersectionObserver to pause
- `prefers-reduced-motion`: collapse all to 0.01ms (already in effects.css — keep)
- Forbidden: `backdrop-filter`, canvas particles, `width`/`height` transitions, anything in a JS loop below fold

---

## 5. Decorative Elements — Botanical Accents

### Philosophy
One single orchid on the reception desk, not floral wallpaper floor-to-ceiling.
One accent per viewport, maximum. Seasoning, not the dish.

### Where They Appear

1. **Empty states** — single-line botanical SVG, 15-20% opacity, primary color
2. **Section dividers** — thin flowing stem line replacing `<hr>` (optional, not on every page)
3. **Card watermarks** — existing skin watermark SVG system at 5-8% opacity on loyalty/premium cards
4. **Celebration moments** — petal-fall (4-6 petals, not 50) for tier upgrades only
5. **Onboarding** — one editorial line-art illustration per step

### Where They Don't Appear
- On every card, button, or screen
- As literal clip-art flowers
- As animated ambient decoration
- As the identity — the identity is the color/type/texture system

### Implementation
- Create `FloralAccent` SVG component: single-path, no fills, stroke-only, accepts currentColor
- Stroke-width: 0.75px, strokeLinecap: round
- Renders at opacity 0.15-0.25
- Only imported by components that need it (empty states, specific dividers)
- Gated by skin config: `skinConfig.enableBotanicalAccents: boolean` (true for spa/nail, false for barber/tattoo)

---

## 6. Component Refinements

### Buttons

Current stamped-press is too game-UI. Refine:

```css
/* Shadow compresses on press but doesn't vanish — mass stays */
.btn-primary {
  box-shadow:
    0 2px 0 oklch(0.52 0.07 72),
    0 4px 12px oklch(0.52 0.07 72 / 0.3);
}
.btn-primary:active {
  transform: translateY(1px);   /* was 2px — reduce */
  box-shadow:
    0 1px 0 oklch(0.52 0.07 72),
    0 2px 6px oklch(0.52 0.07 72 / 0.2);
}
```

Add button text treatment:
- Uppercase with `letter-spacing: 0.06em`
- `font-size: 0.8125rem` (13px)
- This is the Glossier/Aesop pattern

### Cards

Add top-edge highlight (see Section 3). Otherwise structurally sound.

### Inputs

Warm focus glow (see Section 4). Warm-tinted inset well. Background: `var(--surface-warm-2)` not pure white.

### Sidebar

Faint warm gradient background (barely visible). Active item: 3px left accent bar with inset (top/bottom 25%), no full background highlight. Section labels in wide-tracked caps.

### Bottom Nav

Always-visible labels (salon owner glancing in 2 seconds between clients). Active: primary color + font-weight 600. Inactive: warm grey `oklch(0.55 0.02 72)`. Spring scale tap feedback (Section 4).

### Stat Cards / Data Display

Chart colors pull from skin palette, NEVER library defaults.
Bar charts: rounded top caps (`borderRadius: [8,8,0,0]`).
Area charts: gradient fill (primary/0.3 at top → primary/0 at bottom).
Numbers: warm ink color `oklch(0.15 0.02 60)`, not pure black.
Stat numbers get optional warm glow aura in dark mode.

### Loyalty/Engagement Components

LoyaltyCard: editorial treatment — tier name in display serif italic, small botanical watermark corner at 15% opacity. Receipt/letterpress feel.
ScratchCard: add warm specular flash on reveal (ripple-warm variant, champagne gold, 400ms).
StampCard: slow stamp-pulse from 200ms to 280ms — real rubber stamp, not notification ping.
Confetti/PetalFall: petal variant for spa/nail skins, traditional confetti for barber/tattoo.

### Booking Tray

Progress indicator: thin line that fills left-to-right (not dots — too game-like). Primary color, 400ms ease-out transition.
Step transitions: content slides in from right at 320ms. Tray stays anchored.

---

## 7. Mobile-Specific

### Tap Highlight

```css
* { -webkit-tap-highlight-color: oklch(var(--primary-l) var(--primary-c) var(--primary-h) / 0.15); }
```

Warm, not default grey.

### Scroll Behavior

- `scroll-behavior: auto` (NOT `smooth` — smooth feels sluggish on mobile)
- `overscroll-behavior: contain` on every independently scrolling container
- Momentum scrolling natural (no intervention)

### Bottom Sheet Snap Points (for extended trays)

Three snap points:
1. Peek (25vh) — header + one item visible. For notifications peeking.
2. Half (50vh) — comfortable reading.
3. Full (92vh) — leaves status bar visible.

### Gestures (future consideration)

- Long-press on appointment card → quick action tray (reschedule, cancel, note, call)
- Swipe left → "Mark Complete" in warm green
- Swipe right → "Reschedule"
- Pull-down refresh → custom blooming indicator instead of spinner

---

## 8. "Alive" Principles — Cross-Cutting

These aren't features. They're how everything above combines.

### Temperature
Every surface warm-tinted. Every shadow skin-colored. Every focus ring warm.
No pure white backgrounds. No grey shadows. No blue focus rings.
`oklch(0.985 0.004 72)` reads white but reads WARM white.

### Rhythm
Nothing instant, nothing slow. Content arrives at 200-400ms with bloom easing.
Trays open with spring that settles. Page transitions feel like turning a page.
Duration scale: 80ms (press) → 200ms (hover) → 360ms (tray) → 600ms (entrance) → 1200ms (celebration).

### Moments of Recognition
Evening recap after last appointment. Revenue glow when ahead of pace.
Petal-fall on tier upgrade. These are the app noticing the owner's work.

### Silence as a Choice
Most screens are still. The breathing animation is on ONE loading skeleton.
The spring is on ONE tray opening. The glow is on ONE stat.
One animation per interaction. One accent per viewport.

---

## 9. Implementation Order

Priority by impact/effort ratio:

| # | Change | Effort | Impact |
|---|--------|--------|--------|
| 1 | Typography swap (fonts + tracking + line-height) | ~1hr | Transforms entire feel immediately |
| 2 | Color refinements (chroma pullback + nude tints + warm shadows) | ~2hr | Fundamental temperature shift |
| 3 | Input focus ring (kill blue → warm primary halo) | ~20min | Stops "tech product" leak |
| 4 | Card top-edge highlight | ~20min | Physical feel on every card |
| 5 | Page background gradients | ~1hr | Every screen feels alive |
| 6 | Button text treatment (uppercase + tracking) | ~30min | Professional beauty feel |
| 7 | Bottom nav spring tap | ~45min | Mobile feels native-premium |
| 8 | New easing curves + gentle-arrive keyframe | ~1hr | Rhythm shift |
| 9 | Skeleton → breathing pulse | ~30min | Loading feels spa, not tech |
| 10 | Dark mode warm overhaul | ~2hr | Candlelit, not code editor |
| 11 | Sidebar warm gradient + active item | ~45min | Navigation feels considered |
| 12 | SVG noise texture layer | ~1hr | Organic surface warmth |
| 13 | Botanical accent SVG components | ~2hr | Empty states + dividers |
| 14 | Booking tray progress line + step transitions | ~2hr | Core workflow refinement |
| 15 | Petal-fall celebration animation | ~1.5hr | Celebration moments |

Items 1-6 (~5hrs combined) produce a product that feels categorically different.
Items 7-12 (~6hrs) complete the "alive" feel.
Items 13-15 (~5.5hrs) add the finishing touches.

---

## 10. What NOT to Do

- No pink-washing (pink as the only design decision)
- No self-care infantilization ("You're doing amazing!" energy in microcopy)
- No excessive florals/butterflies/cherry blossoms on every screen
- No bubble fonts or maximum border-radius on everything
- No heavy gradients stacked on gradients
- No animations that perform rather than serve
- No `backdrop-filter` anywhere (GPU cost, already banned)
- No canvas-based particles (use CSS DOM confetti/petals)
- No layout-triggering animations (width/height transitions)
- No Undraw illustrations (startup template energy)
- No Lottie for empty states (too heavy for what it communicates)
