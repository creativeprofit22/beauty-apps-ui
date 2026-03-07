import type { StringMap } from "@/lib/i18n";

export const typographyStrings = {
  // Page header
  title: { en: "Typography", es: "Tipografía" } satisfies StringMap,
  subtitle: {
    en: "Font specimens, type scale ladder, metric displays, gradient text, and tabular numerals.",
    es: "Muestras tipográficas, escala de tipos, métricas, texto degradado y numerales tabulares.",
  } satisfies StringMap,

  // ── Font Families ──
  sectionFontFamilies: { en: "Font Families", es: "Familias tipográficas" } satisfies StringMap,
  labelDisplay: { en: "Display", es: "Display" } satisfies StringMap,
  labelBody: { en: "Body", es: "Cuerpo" } satisfies StringMap,
  labelData: { en: "Data", es: "Datos" } satisfies StringMap,
  specimenPangram: {
    en: "The quick brown fox jumps over the lazy dog",
    es: "El veloz murciélago hindú comía feliz cardillo y kiwi",
  } satisfies StringMap,
  usedForDisplay: { en: "Used for headings, titles, display text", es: "Usado para encabezados, títulos, texto destacado" } satisfies StringMap,
  usedForBody: { en: "Used for body text, labels, descriptions", es: "Usado para texto de cuerpo, etiquetas, descripciones" } satisfies StringMap,
  usedForData: { en: "Used for metrics, data tables, codes", es: "Usado para métricas, tablas de datos, códigos" } satisfies StringMap,

  // ── Type Scale ──
  sectionTypeScale: {
    en: "Type Scale (Minor Third \u2014 1.200)",
    es: "Escala tipográfica (Tercera menor \u2014 1.200)",
  } satisfies StringMap,
  designTokens: { en: "Design Tokens", es: "Tokens de diseño" } satisfies StringMap,

  // ── Metric Display Scale ──
  sectionMetricScale: { en: "Metric Display Scale", es: "Escala de métricas" } satisfies StringMap,

  // ── Gradient Text ──
  sectionGradientText: { en: "Gradient Text", es: "Texto degradado" } satisfies StringMap,
  primaryGradient: { en: "Primary Gradient", es: "Degradado primario" } satisfies StringMap,
  beautifulTypography: { en: "Beautiful Typography", es: "Tipografía hermosa" } satisfies StringMap,
  warmGradient: { en: "Warm Gradient", es: "Degradado cálido" } satisfies StringMap,
  warmLuxuryFeel: { en: "Warm Luxury Feel", es: "Sensación de lujo cálido" } satisfies StringMap,

  // ── Tabular Numerals ──
  sectionTabularNumerals: { en: "Tabular Numerals", es: "Numerales tabulares" } satisfies StringMap,
  tabularDescription: {
    en: "Proportional vs Tabular \u2014 numbers align vertically with tabular-nums",
    es: "Proporcional vs Tabular \u2014 los números se alinean verticalmente con tabular-nums",
  } satisfies StringMap,
  proportionalDefault: { en: "Proportional (default)", es: "Proporcional (predeterminado)" } satisfies StringMap,
  tabularFontData: { en: "Tabular (font-data)", es: "Tabular (font-data)" } satisfies StringMap,
} as const;
