# Brand Philosophy

## Core Identity

The spa-ai-platform UI communicates **warm luxury** — not clinical SaaS, not sterile dashboards. Every surface, shadow, and animation should feel like stepping into a well-designed spa: calm, confident, and subtly indulgent.

## Guiding Principles

### Warm luxury, not clinical
Spa software typically defaults to hospital-white interfaces with cold blues. We reject that. Surfaces carry a warm undertone (hue 85 in oklch), shadows use warm neutrals instead of pure black, and color choices lean organic — gold, rose, sage — rather than corporate blue/grey.

### Fun, not frivolous
Engagement features (scratch cards, confetti, stamp cards) exist because gamification drives retention. But they're executed with restraint: one animation per interaction, spring easing that feels physical rather than cartoonish, and celebrations that resolve quickly rather than lingering.

### Premium, not pretentious
The loyalty card has an embossed foil sheen. The buttons have a satisfying press depth. The stat cards glow subtly. These touches signal quality without requiring users to notice them consciously. Premium is felt, not announced.

### Dark mode is for everyone
Dark mode isn't "developer mode." Spa receptionists work long shifts under bright lights. Clients browse on phones in dim rooms. Dark mode uses warm dark surfaces (hue 60) with boosted accent brightness and subtle glows — it should feel like candlelight, not a code editor.

### Skin-agnostic architecture
Every design decision must work across skins. A barber shop (leather brown, steel, sharp radii) and a nail salon (pastel pink, lavender, round radii) use the same component structures. The system achieves variety through tokens, not through per-skin component forks.

## Design Constraints

- **No backdrop-filter** — expensive on mobile GPUs. Depth comes from shadow stacking instead.
- **One animation per interaction** — a button press animates the press. It doesn't also shimmer, glow, and bounce.
- **Shadow = depth signal** — shadows communicate spatial hierarchy (raised, overlay, sunken), not decoration.
- **44px minimum touch targets** — enforced via `@media (pointer: coarse)`. No exceptions.
- **CSS custom properties at every decision point** — components never hardcode colors, fonts, radii, or shadows. Everything flows through tokens so skins can override.
- **`prefers-reduced-motion` respected** — all animations and transitions collapse to near-instant when the user has requested reduced motion.

## Voice & Tone in UI Copy

- Use active, personal language: "Your calendar is clear. Ready to book?" not "No appointments found."
- Celebrate without over-explaining: "+50 pts" not "You have earned 50 loyalty points for this action."
- De-techify navigation: "My Visits" not "Appointment History," "Rewards" not "Loyalty Dashboard."
