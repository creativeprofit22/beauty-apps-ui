import type { StringMap } from "@/lib/i18n";

export const mobileStrings = {
  // Page header
  title: { en: "Mobile", es: "Móvil" } satisfies StringMap,
  subtitle: {
    en: "Bottom navigation with sliding pill, responsive viewport mockups, and touch interaction demos — the mobile-first experience.",
    es: "Navegación inferior con indicador deslizante, maquetas de viewport responsivo y demos de interacción táctil — la experiencia mobile-first.",
  } satisfies StringMap,

  // ── Nav item labels ──
  navHome: { en: "Home", es: "Inicio" } satisfies StringMap,
  navBook: { en: "Book", es: "Reservar" } satisfies StringMap,
  navRewards: { en: "Rewards", es: "Recompensas" } satisfies StringMap,
  navOffers: { en: "Offers", es: "Ofertas" } satisfies StringMap,
  navProfile: { en: "Profile", es: "Perfil" } satisfies StringMap,

  // ── Bottom Navigation section ──
  sectionBottomNav: { en: "Bottom Navigation", es: "Navegación inferior" } satisfies StringMap,
  bottomNavDesc: {
    en: "Sliding pill indicator driven by CSS custom property. Spring easing with safe area inset support for notched devices. Tap items to see the pill slide.",
    es: "Indicador de pastilla deslizante impulsado por propiedad CSS personalizada. Animación de resorte con soporte de área segura para dispositivos con muesca. Toca los elementos para ver la pastilla deslizarse.",
  } satisfies StringMap,
  welcomeBack: { en: "Welcome back, Emma", es: "Bienvenida de nuevo, Emma" } satisfies StringMap,
  upcomingAppointments: { en: "You have 2 upcoming appointments", es: "Tienes 2 citas próximas" } satisfies StringMap,
  hotStoneMassage: { en: "Hot Stone Massage", es: "Masaje con piedras calientes" } satisfies StringMap,
  todayTime: { en: "Today, 2:00 PM", es: "Hoy, 2:00 PM" } satisfies StringMap,
  confirmed: { en: "Confirmed", es: "Confirmado" } satisfies StringMap,
  classicFacial: { en: "Classic Facial", es: "Facial clásico" } satisfies StringMap,
  tomorrowTime: { en: "Tomorrow, 10:30 AM", es: "Mañana, 10:30 AM" } satisfies StringMap,
  pending: { en: "Pending", es: "Pendiente" } satisfies StringMap,
  activeLabel: { en: "Active:", es: "Activo:" } satisfies StringMap,
  phoneFrameHint: {
    en: "Interactive phone frame mockup. Tap the navigation items to see the sliding pill indicator in action.",
    es: "Maqueta interactiva de teléfono. Toca los elementos de navegación para ver el indicador deslizante en acción.",
  } satisfies StringMap,

  // ── Touch Interactions section ──
  sectionTouchInteractions: { en: "Touch Interactions", es: "Interacciones táctiles" } satisfies StringMap,
  pressRelease: { en: "Press & release", es: "Presionar y soltar" } satisfies StringMap,
  pressReleaseDesc: {
    en: 'Buttons use box-shadow height for the \u201cstamped press\u201d effect — active state translates down 2px and removes the shadow. Try pressing and holding.',
    es: 'Los botones usan la altura de box-shadow para el efecto de \u201cpresión estampada\u201d — el estado activo se desplaza 2px hacia abajo y elimina la sombra. Intenta presionar y mantener.',
  } satisfies StringMap,
  bookNow: { en: "Book Now", es: "Reservar ahora" } satisfies StringMap,
  primary: { en: "Primary", es: "Primario" } satisfies StringMap,
  secondary: { en: "Secondary", es: "Secundario" } satisfies StringMap,
  pressed: { en: "Pressed", es: "Presionado" } satisfies StringMap,
  released: { en: "Released", es: "Soltado" } satisfies StringMap,

  ghostTraceFill: { en: "Ghost trace fill", es: "Relleno fantasma" } satisfies StringMap,
  ghostTraceFillDesc: {
    en: "Ghost buttons fill with a background sweep on hover — the background-position transitions from right (transparent) to left (filled).",
    es: "Los botones fantasma se llenan con un barrido de fondo al pasar el cursor — la posición del fondo transiciona de derecha (transparente) a izquierda (lleno).",
  } satisfies StringMap,
  hoverMe: { en: "Hover me", es: "Pasa el cursor" } satisfies StringMap,
  viewDetails: { en: "View details", es: "Ver detalles" } satisfies StringMap,
  learnMore: { en: "Learn more", es: "Saber más" } satisfies StringMap,

  scaleFeedback: { en: "Scale feedback", es: "Retroalimentación de escala" } satisfies StringMap,
  scaleFeedbackDesc: {
    en: "Interactive elements scale down slightly on press for tactile feedback. Cards scale up on hover to invite interaction.",
    es: "Los elementos interactivos se reducen ligeramente al presionar para retroalimentación táctil. Las tarjetas se agrandan al pasar el cursor para invitar a la interacción.",
  } satisfies StringMap,
  tapMe: { en: "Tap me", es: "Tócame" } satisfies StringMap,
  holdMe: { en: "Hold me", es: "Mantenme" } satisfies StringMap,
  pressMe: { en: "Press me", es: "Presiónme" } satisfies StringMap,

  // ── Responsive Viewport section ──
  sectionResponsiveViewport: { en: "Responsive Viewport", es: "Viewport responsivo" } satisfies StringMap,
  responsiveViewportDesc: {
    en: "Side-by-side comparison of mobile and desktop layout behavior. Navigation shifts from bottom bar to sidebar. Content reflows from single-column to grid.",
    es: "Comparación lado a lado del comportamiento de diseño móvil y escritorio. La navegación cambia de barra inferior a barra lateral. El contenido se redistribuye de una columna a cuadrícula.",
  } satisfies StringMap,
  mobile375: { en: "Mobile (375px)", es: "Móvil (375px)" } satisfies StringMap,
  desktop1280: { en: "Desktop (1280px)", es: "Escritorio (1280px)" } satisfies StringMap,
} as const;
