import type { StringMap } from "@/lib/i18n";

export const tokensStrings = {
  // Page header
  title: { en: "Design Tokens", es: "Tokens de diseño" } satisfies StringMap,
  subtitle: {
    en: "Color swatches, spacing, radii, shadows, and glows \u2014 the foundational values that drive every component.",
    es: "Muestras de color, espaciado, radios, sombras y brillos \u2014 los valores fundamentales que impulsan cada componente.",
  } satisfies StringMap,

  // Section titles
  surfaces: { en: "Surfaces", es: "Superficies" } satisfies StringMap,
  text: { en: "Text", es: "Texto" } satisfies StringMap,
  brandAccent: { en: "Brand & Accent", es: "Marca y acento" } satisfies StringMap,
  semantic: { en: "Semantic", es: "Semántico" } satisfies StringMap,
  tiers: { en: "Tiers", es: "Niveles" } satisfies StringMap,
  spacingScale: { en: "Spacing Scale", es: "Escala de espaciado" } satisfies StringMap,
  borderRadii: { en: "Border Radii", es: "Radios de borde" } satisfies StringMap,
  elevationShadows: { en: "Elevation / Shadows", es: "Elevación / Sombras" } satisfies StringMap,
  glows: { en: "Glows", es: "Brillos" } satisfies StringMap,
  seasonalTheming: { en: "Seasonal Theming", es: "Temas estacionales" } satisfies StringMap,

  // Light/Dark labels
  light: { en: "Light", es: "Claro" } satisfies StringMap,
  dark: { en: "Dark", es: "Oscuro" } satisfies StringMap,

  // Seasonal theming descriptions
  seasonalDesc: {
    en: "Lightweight accent layers activated via",
    es: "Capas de acento ligeras activadas mediante",
  } satisfies StringMap,
  seasonalDescSuffix: {
    en: "on the root element. Use the season dropdown in the sidebar to preview live. Below shows reference colors per season.",
    es: "en el elemento raíz. Usa el selector de temporada en la barra lateral para previsualizar en vivo. Abajo se muestran los colores de referencia por temporada.",
  } satisfies StringMap,
  seasonalFootnote: {
    en: "Seasonal layers override only accent and border-accent tokens \u2014 a lightweight accent shift, not a full skin swap.",
    es: "Las capas estacionales solo reemplazan los tokens de acento y borde-acento \u2014 un cambio de acento ligero, no un cambio completo de skin.",
  } satisfies StringMap,

  // Season labels
  seasonDefault: { en: "Default", es: "Predeterminado" } satisfies StringMap,
  seasonValentine: { en: "Valentine", es: "San Valentín" } satisfies StringMap,
  seasonSpring: { en: "Spring", es: "Primavera" } satisfies StringMap,
  seasonHoliday: { en: "Holiday", es: "Festivo" } satisfies StringMap,
} as const;
