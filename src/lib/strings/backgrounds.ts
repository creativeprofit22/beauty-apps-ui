import type { StringMap } from "@/lib/i18n";

export const backgroundsStrings = {
  // Page header
  title: { en: "Backgrounds", es: "Fondos" } satisfies StringMap,
  subtitle: {
    en: "Surface hierarchy, gradient treatments, noise textures, and ambient effects across light and dark modes.",
    es: "Jerarquía de superficies, tratamientos de degradado, texturas de ruido y efectos ambientales en modos claro y oscuro.",
  } satisfies StringMap,

  // ── Drifting Warm Gradient ──
  sectionDriftingGradient: { en: "Drifting Warm Gradient", es: "Degradado cálido flotante" } satisfies StringMap,
  ambientGradient: { en: "Ambient Gradient", es: "Degradado ambiental" } satisfies StringMap,

  // ── Noise Texture Overlay ──
  sectionNoiseTexture: { en: "Noise Texture Overlay", es: "Superposición de textura de ruido" } satisfies StringMap,
  noiseTexture: { en: "Noise Texture", es: "Textura de ruido" } satisfies StringMap,

  // ── Surface Hierarchy ──
  sectionSurfaceHierarchy: { en: "Surface Hierarchy", es: "Jerarquía de superficies" } satisfies StringMap,
  lightMode: { en: "Light Mode", es: "Modo claro" } satisfies StringMap,
  darkMode: { en: "Dark Mode", es: "Modo oscuro" } satisfies StringMap,

  // Surface names
  surfaceBase: { en: "Base", es: "Base" } satisfies StringMap,
  surfaceSunken: { en: "Sunken", es: "Hundido" } satisfies StringMap,
  surfaceRaised: { en: "Raised", es: "Elevado" } satisfies StringMap,
  surfaceOverlay: { en: "Overlay", es: "Superposición" } satisfies StringMap,
  surfaceInteractive: { en: "Interactive", es: "Interactivo" } satisfies StringMap,
  surfaceInteractiveHover: { en: "Interactive Hover", es: "Interactivo hover" } satisfies StringMap,

  // Surface descriptions
  descPageBackground: { en: "Page background", es: "Fondo de página" } satisfies StringMap,
  descInsetWells: { en: "Inset wells, inputs", es: "Pozos interiores, entradas" } satisfies StringMap,
  descCardsElevated: { en: "Cards, elevated content", es: "Tarjetas, contenido elevado" } satisfies StringMap,
  descModalsPopovers: { en: "Modals, popovers", es: "Modales, popovers" } satisfies StringMap,
  descButtonsControls: { en: "Buttons, controls", es: "Botones, controles" } satisfies StringMap,
  descHoverState: { en: "Hover state", es: "Estado hover" } satisfies StringMap,

  // ── Light vs Dark Side-by-Side ──
  sectionLightVsDark: { en: "Light vs Dark \u2014 Side by Side", es: "Claro vs Oscuro \u2014 Lado a lado" } satisfies StringMap,
  light: { en: "Light", es: "Claro" } satisfies StringMap,
  dark: { en: "Dark", es: "Oscuro" } satisfies StringMap,
  raisedCard: { en: "Raised Card", es: "Tarjeta elevada" } satisfies StringMap,
  raisedCardDesc: {
    en: "Content sits on an elevated surface with three-layer shadow.",
    es: "El contenido se ubica en una superficie elevada con sombra de tres capas.",
  } satisfies StringMap,
  primary: { en: "Primary", es: "Primario" } satisfies StringMap,
  secondary: { en: "Secondary", es: "Secundario" } satisfies StringMap,
  accent: { en: "Accent", es: "Acento" } satisfies StringMap,
  sunkenSurfaceDesc: {
    en: "Sunken surface for inset wells and input areas.",
    es: "Superficie hundida para pozos interiores y áreas de entrada.",
  } satisfies StringMap,
} as const;
