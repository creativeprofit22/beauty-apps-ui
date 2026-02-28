# Component Specifications

Condensed record of which approach won for each component and why.

---

## Primitives

### Card — "Lifted Paper"
- **Approach:** Three-layer shadow stack (contact + cast + ambient), no border, no backdrop-filter
- **Why chosen:** Shadows are cheaper than backdrop-filter on mobile. The three-layer approach creates convincing physical depth. No border keeps the design clean.
- **Hover:** `scale(1.02)` with `--ease-standard`, shadow upgrades to `--elevation-lg`
- **Surface:** `var(--surface-raised)` background
- **Radii:** `var(--radii-lg)` (14px default in spa skin)

### Button — "Stamped Press"
- **Approach:** Box-shadow creates a visible "height" at rest. `active:translateY` presses it flush. 80ms ease for snappy tactile feel.
- **Why chosen:** The press mechanic gives physical feedback without requiring complex animation. Users feel the button depress.
- **Variants:**
  - **CTA:** Foil sheen `::after` overlay (3s infinite sweep). Primary background with `--text-on-accent`.
  - **Ghost:** Trace fill via `background-position` animation — background slides in from left on hover.
  - **Radius:** Pill (`rounded-full`) for action buttons, standard (`rounded-md`) for form submits.

### Badge — Pill shape
- **Approach:** Simple pill (`border-radius: 9999px`), semantic color backgrounds at muted opacity, text at full color.
- **Variants:** `success`, `warning`, `error`, `info` (semantic), `bronze`, `silver`, `gold`, `black` (tier).
- **Why chosen:** Badges need to be scannable. Color-coded pills are universally understood.

### Input — "Raised Panel"
- **Approach:** Inset well with inner shadow (`--elevation-inset`), soft focus glow ring via box-shadow, no outline.
- **Why chosen:** The inset shadow makes inputs feel physically recessed into the surface — opposite of a card. Focus glow matches the glow token system rather than browser default outline.
- **Surface:** `var(--surface-sunken)` background

### Select — Tray-based
- **Approach:** Styled trigger button. On mobile, opens a `Tray` (bottom sheet) instead of native dropdown. On desktop, standard dropdown.
- **Why chosen:** Native select styling is limited. The Tray pattern is familiar on mobile (iOS action sheets, Android bottom sheets) and provides more styling control.

---

## Data Display

### StatCard — "Instrument Gauge"
- **Approach:** Large `tabular-nums` value (Fira Code, metric scale), small uppercase label, progress horizon bar with glowing tip (`led-pulse` animation).
- **Why chosen:** The gauge metaphor makes numbers feel like live instruments. The glowing tip draws the eye to the progress endpoint.
- **Dark mode bonus:** Optional `text-shadow` glow on the metric value.

### LoyaltyCard — "Embossed Membership Card"
- **Approach:** 1.586:1 aspect ratio (credit card), watermark SVG pattern + skin gradient background, foil `::before` sheen, embossed tier text via `text-shadow`, three-layer shadow.
- **Why chosen:** Physical card metaphor creates immediate recognition. The embossed treatment feels premium. Watermark pattern is skin-specific (lotus for spa, pole for barber, etc.).

### Table — "Ledger"
- **Approach:** Ruled rows (bottom border), 2px header border, `tabular-nums` numeric columns, warm hover tint. Mobile: CSS `display` swap + `data-label` attributes for card-row hybrid.
- **Why chosen:** The ledger metaphor suits appointment/transaction data. The mobile card-row pattern preserves information density without horizontal scrolling.

### SparkBar — Inline trend
- **Approach:** 4px tall inline bar driven by `--bar-pct` CSS custom property.
- **Why chosen:** Minimal implementation, composable into table cells, no JS needed.

### OfferCard — "Tear-Off Coupon"
- **Approach:** Radial-gradient perforation cutouts along a dashed separator. Big offer value up top, details below the tear line. Expiry bar depletes over time — amber at 20% remaining, `expiry-pulse` at 5%.
- **Why chosen:** The coupon metaphor is instantly recognizable for offers/discounts. The expiry bar creates urgency without being aggressive.

---

## Engagement

### ScratchCard
- **Approach:** Canvas overlay with foil gradient. `destination-out` compositing on `pointermove`. `touch-action: none` to prevent scroll. Auto-complete at 35% revealed (throttled check every 200ms). CSS opacity fade on auto-complete.
- **Why chosen:** Canvas gives pixel-level control. The 35% threshold prevents frustration (users don't need to scratch every pixel). Throttled completion check avoids performance issues.
- **Hook:** `useScratch` encapsulates all canvas logic for reuse.

### Confetti
- **Approach:** CSS confetti via DOM elements with three speed tiers (slow/medium/fast). `animationend` self-cleanup. Canvas fallback for heavier celebrations.
- **Why chosen:** CSS confetti is lightweight for small celebrations (5-15 particles). Canvas handles larger counts without DOM thrashing.
- **Colors:** Skin-configurable via `skinConfig.confettiColors`.

### TierUpgrade
- **Approach:** Full-screen overlay with radial gradient ink-bleed wash (`scale(0)→scale(3)`, opacity arc `0→0.8→0`, 1200ms). Tier badge scales up with spring easing. Auto-dismiss.
- **Why chosen:** Tier upgrades are rare, high-value moments. The full-screen wash creates drama. The spring-eased badge pop makes the new tier feel earned.

### PointsFloat
- **Approach:** Floating "+N pts" element with `float-up` keyframe (`translateY -24px`, opacity fade, 1200ms). Self-removes after animation.
- **Why chosen:** Minimal, non-blocking feedback. Users see they earned points without interrupting their flow.

### StampCard
- **Approach:** 5x2 grid of circular stamps. Earned stamps show filled accent circle + SVG check. Next stamp has dashed border + `stamp-pulse` animation. Future stamps are subtle outlines.
- **Why chosen:** Grid layout is simple and scannable. The pulse on the next stamp creates anticipation. 10-stamp cards are the industry standard.

---

## Feedback

### Toast — "Appointment Slip"
- **Approach:** Left accent bar color-coded by type (success=green, error=red, warning=amber, info=blue). Spring entrance animation. Personal copy style.
- **Receipt variant:** Grid layout with icon, title, detail, action link — for booking confirmations.
- **Why chosen:** The colored accent bar is instantly scannable. The receipt variant handles complex confirmations without a separate modal.

### EmptyState
- **Approach:** Contextual `currentColor` SVG illustration, active copy with CTA button.
- **Why chosen:** `currentColor` SVGs adapt to any skin automatically. Active copy ("Ready to book?") drives engagement instead of dead-end messaging.

### Skeleton
- **Approach:** Accent-tinted shimmer sweep, configurable shapes (text line, circle, card, stat). Stagger support via `--section-index`.
- **Why chosen:** The accent tint makes skeletons feel part of the brand, not generic grey boxes. Staggering creates a natural loading cascade.

### Banner
- **Approach:** Full-width persistent top banner, `translateY(-100%)→translateY(0)` entrance, no auto-dismiss.
- **Why chosen:** Critical notifications (maintenance, account issues) must persist until acknowledged. The slide-down entrance is attention-getting without being jarring.

---

## Layout

### Shell
- **Approach:** Sidebar + main content area wrapper, responsive collapse.
- **Sidebar → bottom nav** on mobile via CSS breakpoint.

### ShowcaseSection
- **Approach:** GSAP ScrollTrigger wrapper. On viewport enter, staggers children: `{ opacity: 0, y: 20, skewX: -1.5 } → { opacity: 1, y: 0, skewX: 0 }`. `once: true`, proper cleanup.
- **Why chosen:** The slight skew creates a polished entrance without being distracting. GSAP handles the scroll observation and cleanup reliably.

### Tray
- **Approach:** Bottom sheet with spring easing, `overscroll-behavior: contain`, max-height 90dvh.
- **Why chosen:** Industry-standard mobile pattern. Spring easing makes the open feel physical. `overscroll-behavior: contain` prevents the background from scrolling when the tray content reaches its bounds.

---

## Navigation

### Sidebar — "Printed Manifest"
- **Approach:** Inter medium labels, sentence case, left accent ribbon on active (`::before`, 3px, 20% inset from top/bottom). Collapsible to 56px icon-only.
- **Why chosen:** The accent ribbon is subtle but clear. Sentence case feels warm (not shouty ALL CAPS). The collapse behavior preserves icons for quick navigation.

### BottomNav — Sliding pill
- **Approach:** Pill indicator positioned via `--active-index` CSS var, `transform: translateX(calc(100% * var(--active-index)))`, spring easing.
- **Why chosen:** The sliding pill creates visual continuity between taps. CSS var control means no JS animation library needed for the pill movement.
- **Safe area:** `padding-bottom: env(safe-area-inset-bottom)` for notched phones.
