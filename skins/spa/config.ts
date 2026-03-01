/**
 * Spa Skin — Non-CSS configuration
 * Confetti colors, scratch foil gradient, card watermark SVG
 */

export const skinConfig = {
  name: "spa" as const,
  label: "Day Spa",

  /** Typography pairing */
  fonts: {
    display: "DM Serif Display",
    body: "DM Sans",
  },

  /** Confetti celebration colors (champagne/dusty-rose/sage) */
  confettiColors: [
    "#D4BFA0", // champagne nude
    "#C98A8A", // dusty rose
    "#8AAA8A", // warm sage
    "#E8D8C4", // pale champagne
    "#D4A8A8", // soft rose
  ],

  /** Scratch card foil gradient stops */
  scratchFoilGradient: [
    "oklch(0.86 0.05 72)", // champagne
    "oklch(0.70 0.08 18)", // dusty rose
    "oklch(0.62 0.06 148)", // warm sage
    "oklch(0.88 0.04 72)", // pale champagne
  ],

  /** Card watermark SVG (lotus/spa motif) */
  cardWatermarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.08"><path d="M50 20 C50 20 30 40 30 60 C30 75 40 85 50 85 C60 85 70 75 70 60 C70 40 50 20 50 20Z"/><path d="M50 30 C50 30 20 45 15 65 C12 78 25 88 50 80"/><path d="M50 30 C50 30 80 45 85 65 C88 78 75 88 50 80"/></svg>`,

  /** Botanical accent rendering */
  enableBotanicalAccents: true,

  /** Celebration style */
  celebrationStyle: "petals" as const,

  /** Petal colors (champagne/dusty-rose/sage) */
  petalColors: [
    "#D4BFA0", // champagne nude
    "#C98A8A", // dusty rose
    "#8AAA8A", // warm sage
    "#E8D8C4", // pale champagne
    "#D4A8A8", // soft rose
  ],

  /** Envelope reveal colors */
  envelopeColors: {
    body: "#E8D8C4", // pale champagne
    flap: "#C98A8A", // dusty rose
  },

  /** Gift box colors */
  giftBoxColors: {
    box: "#E8D8C4", // pale champagne
    ribbon: "#8AAA8A", // warm sage
  },

  /** Wax seal color */
  waxSealColor: "#C98A8A", // dusty rose

  /** Slot machine symbols */
  slotSymbols: ["🌸", "💆", "🧖", "✨", "🌿"],

  /** Bubble pop colors (iridescent/champagne) */
  bubbleColors: [
    "oklch(0.86 0.05 72 / 0.35)",
    "oklch(0.70 0.08 18 / 0.3)",
    "oklch(0.78 0.06 148 / 0.3)",
    "oklch(0.88 0.04 72 / 0.35)",
  ],

} as const;
