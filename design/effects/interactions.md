# Interactions & Effects Specification

## Three Easing Curves

Every transition in the system uses one of three curves. No other easing values are permitted.

### Standard — `cubic-bezier(0.4, 0, 0.2, 1)`
- **Token:** `var(--ease-standard)`
- **Feel:** Smooth deceleration, material-design inspired
- **Use for:** Color transitions, opacity fades, layout shifts, background changes
- **Character:** Professional, invisible — the user shouldn't notice the animation

### Spring — `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Token:** `var(--ease-spring)`
- **Feel:** Overshoots then settles (the 1.56 exceeds 1.0, creating bounce)
- **Use for:** Element entrances, modal/tray opens, badge appearances, celebration moments
- **Character:** Playful, physical — like a real object with momentum

### Tray — `cubic-bezier(0.32, 0.72, 0, 1)`
- **Token:** `var(--ease-tray)`
- **Feel:** Quick start, gradual settle — like a drawer sliding open
- **Use for:** Bottom sheets, sliding panels, nav pill movement, tray open/close
- **Character:** Purposeful, direct — gets the content visible fast

---

## Duration Scale

| Token                | Value   | Use case                              |
|----------------------|---------|---------------------------------------|
| `--duration-fast`    | 80ms    | Button press, active state, micro     |
| `--duration-normal`  | 200ms   | Hover transitions, color changes      |
| `--duration-slow`    | 360ms   | Tray open/close, nav pill slide       |
| `--duration-slower`  | 600ms   | Page entrances, scroll-triggered      |
| `--duration-slowest` | 1200ms  | Tier upgrade wash, celebration effects|

Rule of thumb: interactive feedback (press, hover) uses fast/normal. Structural motion (trays, panels) uses slow. Decorative/celebration uses slower/slowest.

---

## Animation Inventory

### Foil Sheen (`sheen`)
- **Duration:** 3s, infinite loop
- **Use:** CTA button `::after` overlay
- **Mechanic:** `background-position` sweep across a transparent→white→transparent gradient at 105deg

### Skeleton Shimmer (`shimmer`)
- **Duration:** 1.5s, infinite loop
- **Use:** Loading placeholder shimmer
- **Mechanic:** `background-position` sweep with accent-tinted gradient, staggered via `--section-index`

### Confetti (`confetti-slow`, `confetti-medium`, `confetti-fast`)
- **Duration:** Varies by speed (slow ~4s, medium ~2.5s, fast ~1.5s)
- **Use:** Celebration moments (reward reveal, tier upgrade)
- **Mechanic:** `translate3d` + `rotateX/Y`, three speed tiers for natural variation, `animationend` self-cleanup

### Bounce In (`bounce-in`)
- **Duration:** 600ms
- **Use:** Modal/overlay entrances, badge pop-in
- **Mechanic:** `scale(0.3)→scale(1.08)→scale(0.95)→scale(1)` with opacity

### Float Up (`float-up`)
- **Duration:** 1200ms
- **Use:** "+N pts" floating counter
- **Mechanic:** `translateY(0)→translateY(-24px)` with opacity fade, element removes itself after

### Stamp Pulse (`stamp-pulse`)
- **Duration:** 2s, infinite loop
- **Use:** Stamp card "next stamp" slot
- **Mechanic:** Gentle `scale(1)↔scale(1.1)` with opacity breathing

### LED Pulse (`led-pulse`)
- **Duration:** 2s, infinite loop
- **Use:** Stat card progress bar glowing tip
- **Mechanic:** `opacity(0.6)↔opacity(1)` breathing

### Fade In Up (`fade-in-up`)
- **Duration:** 600ms (via GSAP ScrollTrigger)
- **Use:** Scroll-triggered section entrances
- **Mechanic:** `translateY(20px)→translateY(0)` with opacity

### Ink Bleed (`ink-bleed`)
- **Duration:** 1200ms
- **Use:** Tier upgrade full-screen wash
- **Mechanic:** Radial gradient `scale(0)→scale(3)` with opacity arc (0→0.8→0), fills screen with tier color

### Dot Wave (`dot-wave`)
- **Duration:** 1.4s, infinite loop
- **Use:** Loading indicator (3 dots)
- **Mechanic:** `translateY(0)→translateY(-6px)→translateY(0)`, staggered across dots

### Expiry Pulse (`expiry-pulse`)
- **Duration:** 1s, infinite loop
- **Use:** Offer card when remaining time < 5%
- **Mechanic:** `opacity(1)↔opacity(0.4)` urgency pulse

---

## Shadow as Depth

Shadows are the primary depth signal. No `backdrop-filter` (too expensive on mobile).

### Three-Layer Shadow Stack
Every non-trivial shadow uses three layers:
1. **Contact shadow** — tight, dark, hugs the element (simulates contact with surface)
2. **Cast shadow** — medium spread, creates the illusion of height
3. **Ambient shadow** — wide, soft, provides environmental depth

Example (`--elevation-card`):
```
0 1px 3px  oklch(... / 0.05),   /* contact */
0 6px 16px oklch(... / 0.06),   /* cast */
0 0px 1px  oklch(... / 0.03)    /* ambient */
```

### Elevation Hierarchy

| Token            | Height  | Component             |
|------------------|---------|-----------------------|
| `--elevation-xs` | Flush   | Subtle borders        |
| `--elevation-sm` | Low     | Buttons resting       |
| `--elevation-md` | Medium  | Cards default         |
| `--elevation-lg` | High    | Cards hover, dropdowns|
| `--elevation-xl` | Highest | Modals, overlays      |
| `--elevation-inset` | Below | Input wells          |
| `--elevation-card`  | Card  | Tuned for card use   |

### Dark Mode Shadows
Dark mode uses `oklch(0 0 0 / ...)` with higher opacity values (0.15–0.30 vs 0.04–0.08) and no warm hue, because dark surfaces absorb color from shadows.

---

## Touch Targets

- **Minimum size:** 44x44px, enforced via `@media (pointer: coarse)` on `button`, `a`, `input`, `select`, `textarea`
- This applies only on touch devices (phones, tablets). Desktop mice can handle smaller targets.
- Components should design for 44px from the start, not rely on the media query to save them.

---

## One Animation Per Interaction

When a user taps/clicks an element, exactly **one** animation fires:
- Button press → `translateY` press depth. Not also a glow + scale + ripple.
- Scratch card reveal → canvas fade. Not also confetti + float + bounce.
- Stamp earned → stamp scale-in. Not also the card shaking + glowing.

Celebrations (confetti, tier upgrade) are exceptions — they're standalone moments, not layered onto another interaction.

---

## Reduced Motion Policy

When `prefers-reduced-motion: reduce` is active:
- All `animation-duration` → `0.01ms` (effectively instant)
- All `animation-iteration-count` → `1` (no loops)
- All `transition-duration` → `0.01ms`
- `scroll-behavior` → `auto`

This is enforced globally in `effects.css` via `*`, `*::before`, `*::after` selectors with `!important`. Individual components do not need to handle this.

GSAP animations must also check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip or instantly complete when true.

---

## Focus Ring

All focusable elements receive a consistent focus ring via `:focus-visible`:
```
0 0 0 2px var(--surface-base),   /* gap ring (matches bg) */
0 0 0 4px var(--primary)          /* visible ring */
```

The two-ring approach creates a visible gap between the element and the focus indicator, ensuring visibility on any background.
