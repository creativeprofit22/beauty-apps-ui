import type { StringMap } from "@/lib/i18n";

export const chatStrings = {
  // Page header
  title: { en: "Chat", es: "Chat" } satisfies StringMap,
  subtitle: {
    en: "Full-height chat interface demo with message bubbles, typing indicator, and compose bar.",
    es: "Demo de interfaz de chat a altura completa con burbujas de mensaje, indicador de escritura y barra de composición.",
  } satisfies StringMap,

  // Section
  sectionChatInterface: { en: "Chat Interface", es: "Interfaz de chat" } satisfies StringMap,
  chatDesc: {
    en: "Scrollable message list with user and assistant bubbles. Compose bar with send button. Three-dot typing indicator bounces while the assistant is \u201cthinking.\u201d Messages auto-scroll to bottom on new entries.",
    es: "Lista de mensajes desplazable con burbujas de usuario y asistente. Barra de composición con botón de enviar. El indicador de tres puntos rebota mientras el asistente está \u201cpensando.\u201d Los mensajes se desplazan automáticamente al final con nuevas entradas.",
  } satisfies StringMap,
} as const;
