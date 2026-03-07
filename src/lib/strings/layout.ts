import type { StringMap } from "@/lib/i18n";

export const layoutStrings = {
  // Sidebar brand
  brand: { en: "Beauty Apps UI", es: "Beauty Apps UI" } satisfies StringMap,

  // Nav items
  nav: {
    tokens: { en: "Tokens", es: "Tokens" } satisfies StringMap,
    typography: { en: "Typography", es: "Tipografía" } satisfies StringMap,
    backgrounds: { en: "Backgrounds", es: "Fondos" } satisfies StringMap,
    components: { en: "Components", es: "Componentes" } satisfies StringMap,
    forms: { en: "Forms", es: "Formularios" } satisfies StringMap,
    admin: { en: "Admin", es: "Admin" } satisfies StringMap,
    clientPortal: { en: "Client Portal", es: "Portal del cliente" } satisfies StringMap,
    charts: { en: "Charts", es: "Gráficos" } satisfies StringMap,
    chat: { en: "Chat", es: "Chat" } satisfies StringMap,
    engagement: { en: "Engagement", es: "Interacción" } satisfies StringMap,
    mobile: { en: "Mobile", es: "Móvil" } satisfies StringMap,
  },

  // Season selector
  seasonLabel: { en: "Season", es: "Temporada" } satisfies StringMap,
  seasonNone: { en: "None", es: "Ninguna" } satisfies StringMap,
  seasonValentine: { en: "Valentine", es: "San Valentín" } satisfies StringMap,
  seasonSpring: { en: "Spring", es: "Primavera" } satisfies StringMap,
  seasonHoliday: { en: "Holiday", es: "Festivo" } satisfies StringMap,

  // Theme toggle
  lightMode: { en: "Light mode", es: "Modo claro" } satisfies StringMap,
  darkMode: { en: "Dark mode", es: "Modo oscuro" } satisfies StringMap,
  switchToLight: { en: "Switch to light mode", es: "Cambiar a modo claro" } satisfies StringMap,
  switchToDark: { en: "Switch to dark mode", es: "Cambiar a modo oscuro" } satisfies StringMap,

  // Douro promo
  builtBy: { en: "Built by Douro Digital", es: "Creado por Douro Digital" } satisfies StringMap,
  douroTagline: {
    en: "Revenue systems that pick up the phone, book the call, and make you money while you sleep.",
    es: "Sistemas de ingresos que contestan el teléfono, reservan la cita y generan dinero mientras duermes.",
  } satisfies StringMap,

  // Language toggle
  language: { en: "Language", es: "Idioma" } satisfies StringMap,
} as const;
