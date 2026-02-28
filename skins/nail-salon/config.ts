/**
 * Nail Salon Skin — Non-CSS configuration
 * Confetti colors, scratch foil gradient, card watermark SVG
 */

export const skinConfig = {
  name: "nail-salon" as const,
  label: "Nail Salon",

  /** Typography pairing */
  fonts: {
    display: "Cormorant Garamond",
    body: "Plus Jakarta Sans",
  },

  /** Confetti celebration colors (lacquer/ballet/chrome) */
  confettiColors: [
    "#C03030", // lacquer red
    "#E8B0B8", // ballet pink
    "#F5F0E8", // cream
    "#D44848", // bright lacquer
    "#D8A0A8", // warm ballet
  ],

  /** Scratch card foil gradient stops */
  scratchFoilGradient: [
    "oklch(0.50 0.19 20)", // lacquer red
    "oklch(0.84 0.06 358)", // ballet pink
    "oklch(0.60 0.08 20)", // deep red
    "oklch(0.90 0.02 20)", // chrome highlight
  ],

  /** Card watermark SVG (nail polish / flower motif) */
  cardWatermarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.08"><path d="M50 25 C55 15 65 15 65 25 C65 35 55 40 50 50 C45 40 35 35 35 25 C35 15 45 15 50 25Z"/><path d="M50 50 C55 40 68 42 65 50 C62 58 55 55 50 60 C45 55 38 58 35 50 C32 42 45 40 50 50Z"/><path d="M50 60 L50 85" stroke-width="1"/><path d="M42 75 L50 68 L58 75"/></svg>`,

  /** Botanical accent rendering */
  enableBotanicalAccents: true,

  /** Celebration style */
  celebrationStyle: "petals" as const,

  /** Petal colors (lacquer palette) */
  petalColors: [
    "#C03030", // lacquer red
    "#E8B0B8", // ballet pink
    "#F5F0E8", // cream
    "#D44848", // bright lacquer
    "#D8A0A8", // warm ballet
  ],

} as const;
