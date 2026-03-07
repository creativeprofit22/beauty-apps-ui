import type { StringMap } from "@/lib/i18n";

export const engagementStrings = {
  // Page header
  title: { en: "Engagement", es: "Interacción" } satisfies StringMap,
  subtitle: {
    en: "Interactive reward mechanics — scratch cards, confetti celebrations, tier upgrades, floating points, and stamp collection.",
    es: "Mecánicas de recompensa interactivas — tarjetas de raspar, celebraciones con confeti, ascensos de nivel, puntos flotantes y colección de sellos.",
  } satisfies StringMap,

  // ── Scratch Card ──
  sectionScratchCard: { en: "Scratch Card", es: "Tarjeta de raspar" } satisfies StringMap,
  scratchDesc: {
    en: "Scratch the foil overlay to reveal the reward beneath. Auto-completes at 35% coverage.",
    es: "Raspa la lámina para revelar la recompensa debajo. Se completa automáticamente al 35% de cobertura.",
  } satisfies StringMap,
  scratchDiscount: { en: "20% OFF", es: "20% DCTO" } satisfies StringMap,
  scratchNextTreatment: { en: "Your next treatment", es: "Tu próximo tratamiento" } satisfies StringMap,
  scratchRevealed: { en: "Reward revealed!", es: "¡Recompensa revelada!" } satisfies StringMap,
  scratchToReveal: { en: "Scratch to reveal...", es: "Raspa para revelar..." } satisfies StringMap,
  resetCard: { en: "Reset Card", es: "Reiniciar tarjeta" } satisfies StringMap,

  // ── Confetti ──
  sectionConfetti: { en: "Confetti", es: "Confeti" } satisfies StringMap,
  confettiDesc: {
    en: "CSS confetti via DOM elements with 3 speed variants (slow, medium, fast). Self-cleans via animationend events. Respects prefers-reduced-motion.",
    es: "Confeti CSS mediante elementos DOM con 3 variantes de velocidad (lento, medio, rápido). Se limpia automáticamente vía eventos animationend. Respeta prefers-reduced-motion.",
  } satisfies StringMap,
  launchConfetti: { en: "Launch Confetti", es: "Lanzar confeti" } satisfies StringMap,
  stop: { en: "Stop", es: "Detener" } satisfies StringMap,

  // ── Tier Upgrade ──
  sectionTierUpgrade: { en: "Tier Upgrade", es: "Ascenso de nivel" } satisfies StringMap,
  tierUpgradeDesc: {
    en: "Full-screen overlay with radial gradient ink-bleed wash, tier badge springs in, then auto-dismisses. Select a tier and trigger the animation.",
    es: "Superposición de pantalla completa con lavado de gradiente radial, la insignia de nivel aparece con resorte y luego se cierra automáticamente. Selecciona un nivel y activa la animación.",
  } satisfies StringMap,
  triggerUpgrade: { en: "Trigger Upgrade", es: "Activar ascenso" } satisfies StringMap,

  // ── Points Float ──
  sectionPointsFloat: { en: "Points Float", es: "Puntos flotantes" } satisfies StringMap,
  pointsFloatDesc: {
    en: 'Floating \u201c+N pts\u201d counter animates upward and fades out over 1200ms. Click the button to spawn new floats.',
    es: 'El contador flotante \u201c+N pts\u201d se anima hacia arriba y se desvanece en 1200ms. Haz clic en el botón para generar nuevos flotantes.',
  } satisfies StringMap,
  earnPoints: { en: "Earn Points", es: "Ganar puntos" } satisfies StringMap,
  pointsFloatHint: {
    en: "Each click spawns a new floating counter with a random point value.",
    es: "Cada clic genera un nuevo contador flotante con un valor de puntos aleatorio.",
  } satisfies StringMap,

  // ── Stamp Collection ──
  sectionStampCollection: { en: "Stamp Collection", es: "Colección de sellos" } satisfies StringMap,
  stampFillLabel: { en: "Fill animation", es: "Animación de llenado" } satisfies StringMap,
  stampOf: { en: "of", es: "de" } satisfies StringMap,
  collectStamp: { en: "Collect Stamp", es: "Recoger sello" } satisfies StringMap,
  reset: { en: "Reset", es: "Reiniciar" } satisfies StringMap,
  claimReward: { en: "Claim Reward", es: "Reclamar recompensa" } satisfies StringMap,
  stampHint: {
    en: "Each stamp earned triggers a floating points counter. Complete all 10 stamps to claim a reward with confetti celebration.",
    es: "Cada sello obtenido activa un contador de puntos flotante. Completa los 10 sellos para reclamar una recompensa con celebración de confeti.",
  } satisfies StringMap,

  // ── Envelope Reveal ──
  sectionEnvelopeReveal: { en: "Envelope Reveal", es: "Sobre sorpresa" } satisfies StringMap,
  envelopeDesc: {
    en: "Sealed envelope with 3D flap animation. Tap to open — flap lifts via CSS 3D rotateX, then inner card slides up with spring easing. Keyboard accessible (Enter/Space).",
    es: "Sobre sellado con animación de solapa 3D. Toca para abrir — la solapa se levanta vía CSS 3D rotateX, luego la tarjeta interior sube con resorte. Accesible por teclado (Enter/Espacio).",
  } satisfies StringMap,
  freeTreatment: { en: "Free Treatment", es: "Tratamiento gratis" } satisfies StringMap,
  exclusiveReward: { en: "Your exclusive reward", es: "Tu recompensa exclusiva" } satisfies StringMap,
  envelopeHint: { en: "Tap the envelope to reveal the reward inside.", es: "Toca el sobre para revelar la recompensa." } satisfies StringMap,
  resetEnvelope: { en: "Reset Envelope", es: "Reiniciar sobre" } satisfies StringMap,

  // ── Gift Box ──
  sectionGiftBox: { en: "Gift Box", es: "Caja de regalo" } satisfies StringMap,
  giftBoxDesc: {
    en: "Gift box with ribbon cross. Tap to unwrap — ribbon unties via SVG stroke-dashoffset, then lid lifts with spring easing. Reward content floats up from inside.",
    es: "Caja de regalo con lazo cruzado. Toca para abrir — el lazo se desata vía SVG stroke-dashoffset, luego la tapa se levanta con resorte. El contenido de la recompensa flota desde el interior.",
  } satisfies StringMap,
  giftDiscount: { en: "50% OFF", es: "50% DCTO" } satisfies StringMap,
  nextVisit: { en: "Next visit", es: "Próxima visita" } satisfies StringMap,
  giftBoxHint: { en: "Tap the gift box to unwrap your reward.", es: "Toca la caja de regalo para abrir tu recompensa." } satisfies StringMap,
  resetGift: { en: "Reset Gift", es: "Reiniciar regalo" } satisfies StringMap,

  // ── Wax Seal ──
  sectionWaxSeal: { en: "Wax Seal", es: "Sello de cera" } satisfies StringMap,
  waxSealDesc: {
    en: "Luxury wax seal with fracture animation. Tap to break — fracture lines animate in via SVG stroke-dashoffset (staggered), seal splits into halves. Premium feel.",
    es: "Sello de cera de lujo con animación de fractura. Toca para romper — las líneas de fractura se animan vía SVG stroke-dashoffset (escalonado), el sello se divide en mitades. Sensación premium.",
  } satisfies StringMap,
  waxSealHint: { en: "Tap the wax seal to break it open.", es: "Toca el sello de cera para romperlo." } satisfies StringMap,
  resetSeal: { en: "Reset Seal", es: "Reiniciar sello" } satisfies StringMap,

  // ── Peel-Back Corner ──
  sectionPeelBack: { en: "Peel-Back Corner", es: "Esquina despegable" } satisfies StringMap,
  peelBackDesc: {
    en: "Card with a peelable bottom-right corner. Drag or tap to peel — auto-completes at 40% peel. Pure CSS transforms, no canvas. Keyboard accessible (Enter/Space).",
    es: "Tarjeta con esquina inferior derecha despegable. Arrastra o toca para despegar — se completa automáticamente al 40%. Transformaciones CSS puras, sin canvas. Accesible por teclado (Enter/Espacio).",
  } satisfies StringMap,
  mysteryReward: { en: "Mystery Reward", es: "Recompensa misteriosa" } satisfies StringMap,
  peelDiscount: { en: "30% OFF", es: "30% DCTO" } satisfies StringMap,
  nextBooking: { en: "Your next booking", es: "Tu próxima reserva" } satisfies StringMap,
  peelHint: { en: "Peel the corner to reveal the reward underneath.", es: "Despega la esquina para revelar la recompensa." } satisfies StringMap,
  resetPeel: { en: "Reset Peel", es: "Reiniciar despegue" } satisfies StringMap,

  // ── Slot Machine ──
  sectionSlotMachine: { en: "Slot Machine", es: "Máquina tragamonedas" } satisfies StringMap,
  slotMachineDesc: {
    en: "3-reel slot machine with staggered stops. Match all 3 symbols for a jackpot with confetti celebration. Symbols are skin-configurable.",
    es: "Máquina tragamonedas de 3 carretes con paradas escalonadas. Alinea los 3 símbolos para un premio mayor con celebración de confeti. Los símbolos son configurables por tema.",
  } satisfies StringMap,

  // ── Bubble Pop ──
  sectionBubblePop: { en: "Bubble Pop", es: "Estalla burbujas" } satisfies StringMap,
  bubblePopDesc: {
    en: "Floating bubbles rise from the bottom. Tap to pop them and earn points. Skin-configurable bubble colors. Respects prefers-reduced-motion.",
    es: "Burbujas flotantes suben desde abajo. Toca para estallarlas y ganar puntos. Colores de burbujas configurables por tema. Respeta prefers-reduced-motion.",
  } satisfies StringMap,
  launchBubbles: { en: "Launch Bubbles", es: "Lanzar burbujas" } satisfies StringMap,
  scoreLabel: { en: "Score:", es: "Puntuación:" } satisfies StringMap,
  scorePts: { en: "pts", es: "pts" } satisfies StringMap,
} as const;
