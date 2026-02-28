/**
 * Nail Salon Skin — Non-CSS configuration
 * Confetti colors, scratch foil gradient, card watermark SVG
 */

export const skinConfig = {
  name: "nail-salon" as const,
  label: "Nail Salon",

  /** Confetti celebration colors (pink, lavender, cream) */
  confettiColors: [
    "#E89CB5", // pastel pink
    "#B8A9D4", // lavender
    "#F5E6D0", // cream
    "#F2C4D0", // light pink
    "#D4B8E8", // light purple
  ],

  /** Scratch card foil gradient stops */
  scratchFoilGradient: [
    "oklch(0.82 0.11 350)", // pink
    "oklch(0.76 0.09 300)", // lavender
    "oklch(0.85 0.08 350)", // light pink
    "oklch(0.80 0.06 300)", // soft lavender
  ],

  /** Card watermark SVG (nail polish / flower motif) */
  cardWatermarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.08"><path d="M50 25 C55 15 65 15 65 25 C65 35 55 40 50 50 C45 40 35 35 35 25 C35 15 45 15 50 25Z"/><path d="M50 50 C55 40 68 42 65 50 C62 58 55 55 50 60 C45 55 38 58 35 50 C32 42 45 40 50 50Z"/><path d="M50 60 L50 85" stroke-width="1"/><path d="M42 75 L50 68 L58 75"/></svg>`,

} as const;
