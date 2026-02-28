/**
 * Barber Skin — Non-CSS configuration
 * Confetti colors, scratch foil gradient, card watermark SVG
 */

export const skinConfig = {
  name: "barber" as const,
  label: "Barbershop",

  /** Confetti celebration colors (leather, steel, forest) */
  confettiColors: [
    "#6B4226", // leather brown
    "#8B9DAF", // steel blue
    "#3D6B4F", // forest green
    "#C4A882", // tan
    "#5A7D6F", // muted sage
  ],

  /** Scratch card foil gradient stops */
  scratchFoilGradient: [
    "oklch(0.45 0.08 55)", // leather brown
    "oklch(0.55 0.02 250)", // steel
    "oklch(0.40 0.06 55)", // dark brown
    "oklch(0.50 0.04 55)", // medium brown
  ],

  /** Card watermark SVG (barber pole / scissors motif) */
  cardWatermarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.08"><path d="M35 20 L35 80" stroke-width="1"/><path d="M45 20 L45 80" stroke-width="1"/><path d="M35 30 L45 30 M35 45 L45 45 M35 60 L45 60 M35 75 L45 75"/><circle cx="40" cy="16" r="4"/><circle cx="40" cy="84" r="4"/><path d="M60 35 L75 50 M60 50 L75 35" stroke-width="1.5"/><circle cx="60" cy="35" r="6"/><circle cx="60" cy="50" r="6"/></svg>`,

} as const;
