import type { StringMap } from "@/lib/i18n";

export const clientPortalStrings = {
  // Page header
  title: { en: "Client Portal", es: "Portal del cliente" } satisfies StringMap,
  subtitle: {
    en: "Loyalty cards, tier progress, reward offers, and booking flow \u2014 the member-facing experience.",
    es: "Tarjetas de lealtad, progreso de nivel, ofertas de recompensas y flujo de reservas \u2014 la experiencia del miembro.",
  } satisfies StringMap,

  // Section titles
  sectionLoyaltyCard: { en: "Loyalty Card", es: "Tarjeta de lealtad" } satisfies StringMap,
  sectionStampCard: { en: "Stamp Card", es: "Tarjeta de sellos" } satisfies StringMap,
  sectionRewardOffers: { en: "Reward Offers", es: "Ofertas de recompensa" } satisfies StringMap,
  sectionQuickBooking: { en: "Quick Booking", es: "Reserva rápida" } satisfies StringMap,
  sectionChatInterface: { en: "Chat Interface", es: "Interfaz de chat" } satisfies StringMap,
  sectionTierProgress: { en: "Tier Progress", es: "Progreso de nivel" } satisfies StringMap,
  sectionAppointmentCards: { en: "Appointment Cards", es: "Tarjetas de cita" } satisfies StringMap,
  sectionMembershipPlans: { en: "Membership Plans", es: "Planes de membresía" } satisfies StringMap,
  sectionProfileSummary: { en: "Profile Summary", es: "Resumen de perfil" } satisfies StringMap,

  // Loyalty card details
  cardDetails: { en: "Card details", es: "Detalles de tarjeta" } satisfies StringMap,
  tier: { en: "Tier", es: "Nivel" } satisfies StringMap,
  pointsBalance: { en: "Points balance", es: "Saldo de puntos" } satisfies StringMap,
  nextTier: { en: "Next tier", es: "Próximo nivel" } satisfies StringMap,
  maxTier: { en: "Max tier", es: "Nivel máximo" } satisfies StringMap,
  ptsAway: { en: "760 pts away", es: "760 pts restantes" } satisfies StringMap,
  radialMax: { en: "Max", es: "Máx" } satisfies StringMap,
  radial3More: { en: "3 more", es: "3 más" } satisfies StringMap,
  maxTierMsg: {
    en: "You've reached the highest tier. Enjoy all benefits!",
    es: "¡Has alcanzado el nivel más alto. Disfruta todos los beneficios!",
  } satisfies StringMap,
  nextTierMsg: {
    en: "3 more visits to reach the next tier level.",
    es: "3 visitas más para alcanzar el próximo nivel.",
  } satisfies StringMap,
  loyaltyCardDesc: {
    en: "Embossed membership card with foil sheen, watermark pattern, and tier-specific gradients. Hover to see the subtle tilt interaction.",
    es: "Tarjeta de membresía grabada con brillo metálico, patrón de marca de agua y degradados según nivel. Pasa el cursor para ver la interacción de inclinación.",
  } satisfies StringMap,

  // Stamp card
  stampProgress: { en: "Progress:", es: "Progreso:" } satisfies StringMap,
  stampOf: { en: "of", es: "de" } satisfies StringMap,
  addStamp: { en: "Add Stamp", es: "Agregar sello" } satisfies StringMap,
  removeStamp: { en: "Remove Stamp", es: "Quitar sello" } satisfies StringMap,
  reset: { en: "Reset", es: "Reiniciar" } satisfies StringMap,
  stampCardDesc: {
    en: "5\u00d72 grid of circular stamps. Earned stamps show accent fill with check icon. The next stamp pulses with a dashed border animation.",
    es: "Cuadrícula de 5\u00d72 sellos circulares. Los sellos ganados muestran relleno de acento con icono de verificación. El próximo sello pulsa con una animación de borde discontinuo.",
  } satisfies StringMap,

  // Offer cards
  offerBirthdayTitle: { en: "Birthday Special", es: "Especial de cumpleaños" } satisfies StringMap,
  offerBirthdayDesc: {
    en: "Valid on any full-price treatment during your birthday month.",
    es: "Válido en cualquier tratamiento a precio completo durante tu mes de cumpleaños.",
  } satisfies StringMap,
  offerBirthdayExpiry: { en: "18 days remaining", es: "18 días restantes" } satisfies StringMap,
  offerReferralTitle: { en: "Referral Reward", es: "Recompensa por referido" } satisfies StringMap,
  offerReferralDesc: {
    en: "Credit applied when a friend completes their first visit.",
    es: "Crédito aplicado cuando un amigo completa su primera visita.",
  } satisfies StringMap,
  offerReferralExpiry: { en: "3 days remaining", es: "3 días restantes" } satisfies StringMap,
  offerLoyaltyTitle: { en: "Loyalty Facial", es: "Facial de lealtad" } satisfies StringMap,
  offerLoyaltyDesc: {
    en: "Complimentary classic facial \u2014 earned with 10 stamps.",
    es: "Facial clásico de cortesía \u2014 ganado con 10 sellos.",
  } satisfies StringMap,
  offerLoyaltyExpiry: { en: "Expires today", es: "Expira hoy" } satisfies StringMap,
  offerCardsDesc: {
    en: "Tear-off coupon style with perforation cutouts. Expiry bar shifts from accent to amber at 20% and pulses red below 5%.",
    es: "Estilo de cupón desprendible con perforaciones. La barra de expiración cambia de acento a ámbar al 20% y pulsa en rojo por debajo del 5%.",
  } satisfies StringMap,

  // Quick booking
  bookingDesc: {
    en: "Multi-step booking tray with compressed step chips. Previous selections summarize into the chip labels.",
    es: "Bandeja de reserva en múltiples pasos con chips comprimidos. Las selecciones anteriores se resumen en las etiquetas de los chips.",
  } satisfies StringMap,
  bookAnAppointment: { en: "Book an Appointment", es: "Reservar una cita" } satisfies StringMap,

  // Booking steps
  stepChooseService: { en: "Choose service", es: "Elegir servicio" } satisfies StringMap,
  stepSelectTime: { en: "Select time", es: "Seleccionar hora" } satisfies StringMap,
  stepConfirm: { en: "Confirm", es: "Confirmar" } satisfies StringMap,
  chooseAService: { en: "Choose a service", es: "Elige un servicio" } satisfies StringMap,
  selectATime: { en: "Select a time", es: "Selecciona una hora" } satisfies StringMap,
  confirmBooking: { en: "Confirm booking", es: "Confirmar reserva" } satisfies StringMap,
  confirmBookingBtn: { en: "Confirm Booking", es: "Confirmar reserva" } satisfies StringMap,

  // Booking services
  svcHotStoneMassage: { en: "Hot Stone Massage", es: "Masaje con piedras calientes" } satisfies StringMap,
  svcClassicFacial: { en: "Classic Facial", es: "Facial clásico" } satisfies StringMap,
  svcGelManicure: { en: "Gel Manicure", es: "Manicura de gel" } satisfies StringMap,
  svcLuxuryPedicure: { en: "Luxury Pedicure", es: "Pedicura de lujo" } satisfies StringMap,

  // Booking confirm details
  service: { en: "Service", es: "Servicio" } satisfies StringMap,
  time: { en: "Time", es: "Hora" } satisfies StringMap,
  total: { en: "Total", es: "Total" } satisfies StringMap,

  // Chat interface
  chatDesc: {
    en: "Full-height chat interface demo has moved to a dedicated page.",
    es: "La demo de interfaz de chat a altura completa se movió a una página dedicada.",
  } satisfies StringMap,
  viewChatShowcase: { en: "View Chat showcase", es: "Ver galería de chat" } satisfies StringMap,

  // Tier progress
  tierProgressDesc: {
    en: "Horizontal progress bar between two tier badges. Fill uses a gradient from the current tier color to the next tier color. Points label centered below. Max tier shows full bar with single color.",
    es: "Barra de progreso horizontal entre dos insignias de nivel. El relleno usa un degradado del color del nivel actual al siguiente. Etiqueta de puntos centrada debajo. El nivel máximo muestra barra completa con un solo color.",
  } satisfies StringMap,

  // Appointment cards
  apptHotStoneMassage: { en: "Hot Stone Massage", es: "Masaje con piedras calientes" } satisfies StringMap,
  apptClassicFacial: { en: "Classic Facial", es: "Facial clásico" } satisfies StringMap,
  apptGelManicure: { en: "Gel Manicure", es: "Manicura de gel" } satisfies StringMap,
  apptWithSarah: { en: "with Sarah Mitchell", es: "con Sarah Mitchell" } satisfies StringMap,
  apptWithJames: { en: "with James Chen", es: "con James Chen" } satisfies StringMap,
  apptWithPriya: { en: "with Priya Sharma", es: "con Priya Sharma" } satisfies StringMap,
  apptCardsDesc: {
    en: "Appointment cards with service name, staff, date/time, and status badge. Upcoming cards show action buttons. Completed shows a checkmark. Cancelled is muted with strikethrough.",
    es: "Tarjetas de cita con nombre de servicio, personal, fecha/hora e insignia de estado. Las citas próximas muestran botones de acción. Las completadas muestran una marca de verificación. Las canceladas se atenúan con tachado.",
  } satisfies StringMap,

  // Membership plans
  planEssential: { en: "Essential", es: "Esencial" } satisfies StringMap,
  planPremium: { en: "Premium", es: "Premium" } satisfies StringMap,
  planBlack: { en: "Black", es: "Black" } satisfies StringMap,
  planInterval: { en: "mo", es: "mes" } satisfies StringMap,
  feat1Treatment: { en: "1 treatment per month", es: "1 tratamiento al mes" } satisfies StringMap,
  feat3Treatments: { en: "3 treatments per month", es: "3 tratamientos al mes" } satisfies StringMap,
  featUnlimited: { en: "Unlimited treatments", es: "Tratamientos ilimitados" } satisfies StringMap,
  feat10Discount: { en: "10% product discount", es: "10% de descuento en productos" } satisfies StringMap,
  feat20Discount: { en: "20% product discount", es: "20% de descuento en productos" } satisfies StringMap,
  feat30Discount: { en: "30% product discount", es: "30% de descuento en productos" } satisfies StringMap,
  featOnlineBooking: { en: "Online booking", es: "Reserva en línea" } satisfies StringMap,
  featPriorityScheduling: { en: "Priority scheduling", es: "Programación prioritaria" } satisfies StringMap,
  featGuestPasses: { en: "Guest passes", es: "Pases de invitado" } satisfies StringMap,
  feat2GuestPasses: { en: "2 guest passes per month", es: "2 pases de invitado al mes" } satisfies StringMap,
  planCardsDesc: {
    en: "Three-column plan comparison. Popular variant highlights with accent ring and \u201cMost Popular\u201d badge. Feature checklist with green checkmarks for included items.",
    es: "Comparación de planes en tres columnas. La variante popular se destaca con anillo de acento e insignia \u201cMás popular\u201d. Lista de características con marcas verdes para los incluidos.",
  } satisfies StringMap,

  // Profile summary
  statVisits: { en: "Visits", es: "Visitas" } satisfies StringMap,
  statTotalSpend: { en: "Total Spend", es: "Gasto total" } satisfies StringMap,
  statMemberSince: { en: "Member Since", es: "Miembro desde" } satisfies StringMap,
  profileDesc: {
    en: "Compact profile card with avatar, name, tier badge, key stats row, and edit icon button. Avatar displays tier-colored ring. Stats use tabular-nums for alignment.",
    es: "Tarjeta de perfil compacta con avatar, nombre, insignia de nivel, fila de estadísticas clave y botón de edición. El avatar muestra un anillo del color del nivel. Las estadísticas usan números tabulares para alineación.",
  } satisfies StringMap,

  // Duration labels
  dur90Min: { en: "90 min", es: "90 min" } satisfies StringMap,
  dur60Min: { en: "60 min", es: "60 min" } satisfies StringMap,
  dur45Min: { en: "45 min", es: "45 min" } satisfies StringMap,
} as const;
