/**
 * Spa Skin — Non-CSS configuration
 * Confetti colors, scratch foil gradient, card watermark SVG
 */

export const skinConfig = {
  name: "spa" as const,
  label: "Day Spa",

  /** Confetti celebration colors (oklch-friendly hex fallbacks) */
  confettiColors: [
    "#D4A843", // warm gold
    "#C97B7B", // rose
    "#7BA37B", // sage
    "#E8D5A3", // light gold
    "#D4A0A0", // light rose
  ],

  /** Scratch card foil gradient stops */
  scratchFoilGradient: [
    "oklch(0.82 0.10 85)", // gold
    "oklch(0.76 0.12 85)", // deep gold
    "oklch(0.80 0.08 60)", // warm
    "oklch(0.85 0.06 85)", // pale gold
  ],

  /** Card watermark SVG (lotus/spa motif) */
  cardWatermarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.08"><path d="M50 20 C50 20 30 40 30 60 C30 75 40 85 50 85 C60 85 70 75 70 60 C70 40 50 20 50 20Z"/><path d="M50 30 C50 30 20 45 15 65 C12 78 25 88 50 80"/><path d="M50 30 C50 30 80 45 85 65 C88 78 75 88 50 80"/></svg>`,

} as const;
