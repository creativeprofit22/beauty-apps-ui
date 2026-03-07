import type { StringMap } from "@/lib/i18n";

export const chartsStrings = {
  // Page header
  title: { en: "Charts", es: "Gráficos" } satisfies StringMap,
  subtitle: {
    en: "Line, bar, and donut chart components with multiple datasets \u2014 revenue trends, service popularity, and tier distribution.",
    es: "Componentes de gráficos de líneas, barras y dona con múltiples conjuntos de datos \u2014 tendencias de ingresos, popularidad de servicios y distribución por nivel.",
  } satisfies StringMap,

  // ── Revenue Trend ──
  sectionRevenueTrend: { en: "Revenue Trend (Line Chart)", es: "Tendencia de ingresos (Gráfico de líneas)" } satisfies StringMap,
  monthlyRevenue: { en: "Monthly Revenue \u2014 2026", es: "Ingresos mensuales \u2014 2026" } satisfies StringMap,
  newClientSignups: { en: "New Client Sign-ups", es: "Nuevos registros de clientes" } satisfies StringMap,
  lineChartDesc: {
    en: "SVG-based line chart with animated path drawing, dot hover tooltips, and responsive width. Accepts any CSS color variable for theming.",
    es: "Gráfico de líneas basado en SVG con trazado animado, tooltips al pasar el cursor y ancho responsivo. Acepta cualquier variable de color CSS para temas.",
  } satisfies StringMap,

  // ── Services by Volume ──
  sectionServicesByVolume: { en: "Services by Volume (Bar Chart)", es: "Servicios por volumen (Gráfico de barras)" } satisfies StringMap,
  treatmentPopularity: { en: "Treatment Popularity", es: "Popularidad de tratamientos" } satisfies StringMap,
  revenueByService: { en: "Revenue by Service", es: "Ingresos por servicio" } satisfies StringMap,
  barChartDesc: {
    en: "SVG bar chart with animated height transitions, hover highlight, and value labels.",
    es: "Gráfico de barras SVG con transiciones de altura animadas, resaltado al pasar el cursor y etiquetas de valor.",
  } satisfies StringMap,

  // Bar chart data labels
  labelMassage: { en: "Massage", es: "Masaje" } satisfies StringMap,
  labelFacial: { en: "Facial", es: "Facial" } satisfies StringMap,
  labelMani: { en: "Mani", es: "Mani" } satisfies StringMap,
  labelPedi: { en: "Pedi", es: "Pedi" } satisfies StringMap,
  labelAroma: { en: "Aroma", es: "Aroma" } satisfies StringMap,
  labelLash: { en: "Lash", es: "Pestañas" } satisfies StringMap,

  // ── Tier Distribution ──
  sectionTierDistribution: {
    en: "Loyalty Tier Distribution (Donut Chart)",
    es: "Distribución por nivel de lealtad (Gráfico de dona)",
  } satisfies StringMap,
  membershipTiers: { en: "Membership Tiers", es: "Niveles de membresía" } satisfies StringMap,
  serviceCategorySplit: { en: "Service Category Split", es: "División por categoría de servicio" } satisfies StringMap,
  revenueSources: { en: "Revenue Sources", es: "Fuentes de ingresos" } satisfies StringMap,
  donutChartDesc: {
    en: "SVG donut chart with animated segment drawing, hover expansion, center label, and legend. Supports custom segment colors or falls back to theme palette.",
    es: "Gráfico de dona SVG con trazado animado de segmentos, expansión al pasar el cursor, etiqueta central y leyenda. Soporta colores de segmento personalizados o usa la paleta del tema.",
  } satisfies StringMap,

  // Donut chart labels
  labelBronze: { en: "Bronze", es: "Bronce" } satisfies StringMap,
  labelSilver: { en: "Silver", es: "Plata" } satisfies StringMap,
  labelGold: { en: "Gold", es: "Oro" } satisfies StringMap,
  labelBlack: { en: "Black", es: "Negro" } satisfies StringMap,
  members: { en: "members", es: "miembros" } satisfies StringMap,

  labelBody: { en: "Body", es: "Cuerpo" } satisfies StringMap,
  labelFace: { en: "Face", es: "Rostro" } satisfies StringMap,
  labelNails: { en: "Nails", es: "Uñas" } satisfies StringMap,
  labelLashBrow: { en: "Lash & Brow", es: "Pestañas y cejas" } satisfies StringMap,
  bookings: { en: "bookings", es: "reservas" } satisfies StringMap,

  labelTreatments: { en: "Treatments", es: "Tratamientos" } satisfies StringMap,
  labelProducts: { en: "Products", es: "Productos" } satisfies StringMap,
  labelMemberships: { en: "Memberships", es: "Membresías" } satisfies StringMap,
  total: { en: "total", es: "total" } satisfies StringMap,
} as const;
