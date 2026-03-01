/**
 * Tattoo Skin — Non-CSS configuration
 * Confetti colors, scratch foil gradient, card watermark SVG
 */

export const skinConfig = {
  name: "tattoo" as const,
  label: "Tattoo Studio",

  /** Confetti celebration colors (crimson, silver, black) */
  confettiColors: [
    "#B33A3A", // crimson
    "#A0A0A0", // silver
    "#2A2A2A", // near-black
    "#D45050", // bright red
    "#787878", // mid grey
  ],

  /** Scratch card foil gradient stops */
  scratchFoilGradient: [
    "oklch(0.30 0.005 0)", // dark silver
    "oklch(0.55 0.22 27)", // crimson
    "oklch(0.20 0.005 0)", // near-black
    "oklch(0.45 0.15 27)", // dark red
  ],

  /** Card watermark SVG (skull / crossed needles motif) */
  cardWatermarkSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.08"><circle cx="50" cy="40" r="18"/><path d="M38 48 C38 58 42 62 50 65 C58 62 62 58 62 48"/><circle cx="43" cy="37" r="3"/><circle cx="57" cy="37" r="3"/><path d="M46 45 L50 47 L54 45"/><path d="M25 70 L75 30" stroke-width="1"/><path d="M75 70 L25 30" stroke-width="1"/><path d="M50 65 L50 82"/><path d="M42 78 L50 82 L58 78"/></svg>`,

  /** Botanical accent rendering */
  enableBotanicalAccents: false,

  /** Celebration style */
  celebrationStyle: "confetti" as const,

  /** Envelope reveal colors */
  envelopeColors: {
    body: "#2A2A2A", // near-black
    flap: "#B33A3A", // crimson
  },

  /** Gift box colors */
  giftBoxColors: {
    box: "#2A2A2A", // near-black
    ribbon: "#A0A0A0", // silver
  },

  /** Wax seal color */
  waxSealColor: "#2A2A2A", // dark

  /** Slot machine symbols */
  slotSymbols: ["🔥", "💀", "🐍", "⚡", "🖤"],

  /** Bubble pop colors (silver/smoke) */
  bubbleColors: [
    "oklch(0.55 0.005 0 / 0.3)",
    "oklch(0.35 0.22 27 / 0.25)",
    "oklch(0.45 0.005 0 / 0.3)",
    "oklch(0.65 0.005 0 / 0.3)",
  ],

} as const;
