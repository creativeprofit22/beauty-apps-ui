import type { StringMap } from "@/lib/i18n";

export const adminStrings = {
  // Page header
  title: { en: "Admin", es: "Administración" } satisfies StringMap,
  subtitle: {
    en: "Dashboard stat cards, sidebar navigation, data tables, and toast notifications \u2014 the back-office experience.",
    es: "Tarjetas de estadísticas, navegación lateral, tablas de datos y notificaciones \u2014 la experiencia administrativa.",
  } satisfies StringMap,

  // Section titles
  sectionDashboardStats: { en: "Dashboard Stats", es: "Estadísticas del panel" } satisfies StringMap,
  sectionSidebarNav: { en: "Sidebar Navigation", es: "Navegación lateral" } satisfies StringMap,
  sectionSearchFilter: { en: "Search & Filter", es: "Búsqueda y filtro" } satisfies StringMap,
  sectionAppointmentsLedger: { en: "Appointments Ledger", es: "Registro de citas" } satisfies StringMap,
  sectionToastNotifications: { en: "Toast Notifications", es: "Notificaciones emergentes" } satisfies StringMap,
  sectionDialog: { en: "Dialog", es: "Diálogo" } satisfies StringMap,
  sectionConfirmationDialog: { en: "Confirmation Dialog", es: "Diálogo de confirmación" } satisfies StringMap,
  sectionMonthCalendar: { en: "Month Calendar", es: "Calendario mensual" } satisfies StringMap,
  sectionCharts: { en: "Charts", es: "Gráficos" } satisfies StringMap,
  sectionEmptyState: { en: "Empty State", es: "Estado vacío" } satisfies StringMap,
  sectionStatusIndicator: { en: "Status Indicator", es: "Indicador de estado" } satisfies StringMap,
  sectionIntegrationCards: { en: "Integration Cards", es: "Tarjetas de integración" } satisfies StringMap,
  sectionSettingsPanel: { en: "Settings Panel", es: "Panel de configuración" } satisfies StringMap,
  sectionActivityFeed: { en: "Activity Feed", es: "Actividad reciente" } satisfies StringMap,
  sectionAuditLog: { en: "Audit Log", es: "Registro de auditoría" } satisfies StringMap,

  // Sidebar nav labels
  navDashboard: { en: "Dashboard", es: "Panel" } satisfies StringMap,
  navAppointments: { en: "Appointments", es: "Citas" } satisfies StringMap,
  navClients: { en: "Clients", es: "Clientes" } satisfies StringMap,
  navServices: { en: "Services", es: "Servicios" } satisfies StringMap,
  navRewards: { en: "Rewards", es: "Recompensas" } satisfies StringMap,
  navSettings: { en: "Settings", es: "Configuración" } satisfies StringMap,

  // Stat card labels
  statTodaysBookings: { en: "Today's Bookings", es: "Reservas de hoy" } satisfies StringMap,
  statRevenue: { en: "Revenue", es: "Ingresos" } satisfies StringMap,
  statNewClients: { en: "New Clients", es: "Nuevos clientes" } satisfies StringMap,
  statLoyaltyPoints: { en: "Loyalty Points Earned", es: "Puntos de lealtad ganados" } satisfies StringMap,

  // Sidebar toggle
  expanded: { en: "Expanded", es: "Expandido" } satisfies StringMap,
  collapsed: { en: "Collapsed", es: "Colapsado" } satisfies StringMap,
  activePrefix: { en: "Active: ", es: "Activo: " } satisfies StringMap,
  sidebarHint: {
    en: "Click sidebar items to navigate. Toggle collapsed mode for icon-only view.",
    es: "Haz clic en los elementos laterales para navegar. Activa el modo colapsado para ver solo iconos.",
  } satisfies StringMap,

  // Search & Filter
  searchFilterDesc: {
    en: "Search bar with debounced callback and clear button. Filter pills in single-select and multi-select modes.",
    es: "Barra de búsqueda con callback diferido y botón de limpiar. Pastillas de filtro en modos de selección única y múltiple.",
  } satisfies StringMap,
  searchPlaceholder: { en: "Search appointments\u2026", es: "Buscar citas\u2026" } satisfies StringMap,
  singleSelect: { en: "Single-select", es: "Selección única" } satisfies StringMap,
  multiSelect: { en: "Multi-select", es: "Selección múltiple" } satisfies StringMap,

  // Filter pill options (services)
  filterMassage: { en: "Massage", es: "Masaje" } satisfies StringMap,
  filterFacial: { en: "Facial", es: "Facial" } satisfies StringMap,
  filterManicure: { en: "Manicure", es: "Manicura" } satisfies StringMap,
  filterPedicure: { en: "Pedicure", es: "Pedicura" } satisfies StringMap,
  filterAromatherapy: { en: "Aromatherapy", es: "Aromaterapia" } satisfies StringMap,

  // Table column headers
  colClient: { en: "Client", es: "Cliente" } satisfies StringMap,
  colService: { en: "Service", es: "Servicio" } satisfies StringMap,
  colTime: { en: "Time", es: "Hora" } satisfies StringMap,
  colStatus: { en: "Status", es: "Estado" } satisfies StringMap,
  colRevenue: { en: "Revenue", es: "Ingresos" } satisfies StringMap,
  colTrend: { en: "Trend", es: "Tendencia" } satisfies StringMap,

  // Toast button labels
  btnSuccessToast: { en: "Success Toast", es: "Aviso exitoso" } satisfies StringMap,
  btnWarningToast: { en: "Warning Toast", es: "Aviso de advertencia" } satisfies StringMap,
  btnErrorToast: { en: "Error Toast", es: "Aviso de error" } satisfies StringMap,
  btnInfoToast: { en: "Info Toast", es: "Aviso informativo" } satisfies StringMap,

  // Toast titles
  toastBookingConfirmed: { en: "Booking confirmed", es: "Reserva confirmada" } satisfies StringMap,
  toastScheduleConflict: { en: "Schedule conflict", es: "Conflicto de horario" } satisfies StringMap,
  toastPaymentFailed: { en: "Payment failed", es: "Pago fallido" } satisfies StringMap,
  toastNewClientSignedUp: { en: "New client signed up", es: "Nuevo cliente registrado" } satisfies StringMap,

  // Toast details
  toastBookingDetail: {
    en: "Hot Stone Massage with Emma \u2014 Today at 9:00 AM",
    es: "Masaje con piedras calientes con Emma \u2014 Hoy a las 9:00 AM",
  } satisfies StringMap,
  toastScheduleDetail: {
    en: "Two bookings overlap at 2:00 PM \u2014 please review",
    es: "Dos reservas se superponen a las 2:00 PM \u2014 por favor revisa",
  } satisfies StringMap,
  toastPaymentDetail: {
    en: "Card ending in 4242 was declined \u2014 try another method",
    es: "Tarjeta terminada en 4242 fue rechazada \u2014 intenta otro método",
  } satisfies StringMap,
  toastNewClientDetail: {
    en: "Isabella L. created an account and booked Aromatherapy",
    es: "Isabella L. creó una cuenta y reservó Aromaterapia",
  } satisfies StringMap,

  // Dialog section
  dialogDesc: {
    en: "Centered modal with backdrop blur, title/description/footer slots, escape-to-close, and focus trap.",
    es: "Modal centrado con desenfoque de fondo, slots de título/descripción/pie, escape para cerrar y trampa de foco.",
  } satisfies StringMap,
  btnOpenDialog: { en: "Open Dialog", es: "Abrir diálogo" } satisfies StringMap,
  dialogEditServiceTitle: { en: "Edit Service", es: "Editar servicio" } satisfies StringMap,
  dialogEditServiceDesc: {
    en: "Update the details for this service offering.",
    es: "Actualiza los detalles de esta oferta de servicio.",
  } satisfies StringMap,
  saveChanges: { en: "Save Changes", es: "Guardar cambios" } satisfies StringMap,
  labelServiceName: { en: "Service Name", es: "Nombre del servicio" } satisfies StringMap,
  labelDuration: { en: "Duration", es: "Duración" } satisfies StringMap,
  mockHotStoneMassage: { en: "Hot Stone Massage", es: "Masaje con piedras calientes" } satisfies StringMap,
  mockDuration60: { en: "60 minutes", es: "60 minutos" } satisfies StringMap,

  // Confirmation Dialog section
  confirmDialogDesc: {
    en: "Wraps Dialog with confirm/cancel buttons. Destructive variant shows red confirm button with loading state.",
    es: "Envuelve el diálogo con botones confirmar/cancelar. La variante destructiva muestra botón rojo con estado de carga.",
  } satisfies StringMap,
  btnStandardConfirm: { en: "Standard Confirm", es: "Confirmación estándar" } satisfies StringMap,
  btnDestructiveConfirm: { en: "Destructive Confirm", es: "Confirmación destructiva" } satisfies StringMap,
  confirmRescheduleTitle: { en: "Reschedule Appointment", es: "Reprogramar cita" } satisfies StringMap,
  confirmRescheduleMsg: {
    en: "This will move Emma W.\u2019s Hot Stone Massage from 9:00 AM to 2:00 PM. The client will be notified via email.",
    es: "Esto moverá el Masaje con piedras calientes de Emma W. de 9:00 AM a 2:00 PM. La cliente será notificada por email.",
  } satisfies StringMap,
  confirmRescheduleLabel: { en: "Reschedule", es: "Reprogramar" } satisfies StringMap,
  confirmCancelTitle: { en: "Cancel Appointment", es: "Cancelar cita" } satisfies StringMap,
  confirmCancelMsg: {
    en: "This will permanently cancel Ava M.\u2019s Luxury Pedicure and issue a refund of $65. This action cannot be undone.",
    es: "Esto cancelará permanentemente la Pedicura de lujo de Ava M. y emitirá un reembolso de $65. Esta acción no se puede deshacer.",
  } satisfies StringMap,
  confirmCancelLabel: { en: "Cancel Appointment", es: "Cancelar cita" } satisfies StringMap,

  // Charts section
  chartsDesc: {
    en: "Line, bar, and donut chart demos have moved to a dedicated page for better performance.",
    es: "Las demos de gráficos de línea, barra y dona se movieron a una página dedicada para mejor rendimiento.",
  } satisfies StringMap,
  viewChartsShowcase: { en: "View Charts showcase", es: "Ver galería de gráficos" } satisfies StringMap,

  // Empty State
  emptyNoAppointmentsHeading: { en: "No appointments yet", es: "Sin citas aún" } satisfies StringMap,
  emptyNoAppointmentsDesc: {
    en: "When clients book services, their appointments will appear here.",
    es: "Cuando los clientes reserven servicios, sus citas aparecerán aquí.",
  } satisfies StringMap,
  emptyCreateAppointment: { en: "Create Appointment", es: "Crear cita" } satisfies StringMap,
  emptyNoReviewsHeading: { en: "No reviews found", es: "Sin reseñas encontradas" } satisfies StringMap,
  emptyNoReviewsDesc: {
    en: "Client reviews and ratings will be displayed in this section.",
    es: "Las reseñas y calificaciones de clientes se mostrarán en esta sección.",
  } satisfies StringMap,

  // Status Indicator
  statusIndicatorDesc: {
    en: "Inline status dots with semantic colors. The \u201clive\u201d state includes a pulse animation.",
    es: "Puntos de estado en línea con colores semánticos. El estado \u201cen vivo\u201d incluye una animación de pulso.",
  } satisfies StringMap,

  // Integration card names
  integrationStripe: { en: "Stripe", es: "Stripe" } satisfies StringMap,
  integrationGoogleCalendar: { en: "Google Calendar", es: "Google Calendar" } satisfies StringMap,
  integrationTwilioSms: { en: "Twilio SMS", es: "Twilio SMS" } satisfies StringMap,

  // Settings Panel
  settingsBusinessProfile: { en: "Business Profile", es: "Perfil del negocio" } satisfies StringMap,
  settingsBusinessProfileDesc: {
    en: "Your business name, logo, and contact details visible to clients.",
    es: "El nombre de tu negocio, logo y datos de contacto visibles para los clientes.",
  } satisfies StringMap,
  settingsBookingPrefs: { en: "Booking Preferences", es: "Preferencias de reserva" } satisfies StringMap,
  settingsBookingPrefsDesc: {
    en: "Configure default booking durations, buffer times, and cancellation policies.",
    es: "Configura duraciones de reserva predeterminadas, tiempos de margen y políticas de cancelación.",
  } satisfies StringMap,
  settingsNotifications: { en: "Notifications", es: "Notificaciones" } satisfies StringMap,
  settingsNotificationsDesc: {
    en: "Choose which events trigger email or SMS notifications to your team.",
    es: "Elige qué eventos activan notificaciones por email o SMS a tu equipo.",
  } satisfies StringMap,
  badge30MinBuffer: { en: "30 min buffer", es: "Margen de 30 min" } satisfies StringMap,
  badge24hCancellation: { en: "24h cancellation", es: "Cancelación 24h" } satisfies StringMap,
  badgeAutoConfirm: { en: "Auto-confirm", es: "Auto-confirmar" } satisfies StringMap,
  notifNewBooking: { en: "New booking \u2014 Email + SMS", es: "Nueva reserva \u2014 Email + SMS" } satisfies StringMap,
  notifCancellation: { en: "Cancellation \u2014 Email only", es: "Cancelación \u2014 Solo email" } satisfies StringMap,
  notifReviewReceived: { en: "Review received \u2014 Push notification", es: "Reseña recibida \u2014 Notificación push" } satisfies StringMap,

  // Activity Feed
  actSarahBooked: { en: "Sarah booked Hot Stone Massage", es: "Sarah reservó Masaje con piedras calientes" } satisfies StringMap,
  actEmmaCancelled: { en: "Emma cancelled Gel Manicure appointment", es: "Emma canceló la cita de Manicura de gel" } satisfies StringMap,
  actMayaRedeemed: { en: "Maya redeemed 500 loyalty points", es: "Maya canjeó 500 puntos de lealtad" } satisfies StringMap,
  actOliviaReview: { en: "Olivia left a 5-star review for Swedish Massage", es: "Olivia dejó una reseña de 5 estrellas para Masaje sueco" } satisfies StringMap,
  actAvaUpgraded: { en: "Ava upgraded to Gold tier", es: "Ava ascendió al nivel Oro" } satisfies StringMap,
  actIsabellaRescheduled: { en: "Isabella rescheduled Aromatherapy to Friday", es: "Isabella reprogramó Aromaterapia al viernes" } satisfies StringMap,
  actSofiaCompleted: { en: "Sofia completed Classic Facial checkout", es: "Sofía completó el pago de Facial clásico" } satisfies StringMap,

  // Activity feed timestamps
  time2MinAgo: { en: "2 min ago", es: "hace 2 min" } satisfies StringMap,
  time18MinAgo: { en: "18 min ago", es: "hace 18 min" } satisfies StringMap,
  time45MinAgo: { en: "45 min ago", es: "hace 45 min" } satisfies StringMap,
  time1HrAgo: { en: "1 hr ago", es: "hace 1 hr" } satisfies StringMap,
  time2HrAgo: { en: "2 hr ago", es: "hace 2 hr" } satisfies StringMap,
  time3HrAgo: { en: "3 hr ago", es: "hace 3 hr" } satisfies StringMap,
  time4HrAgo: { en: "4 hr ago", es: "hace 4 hr" } satisfies StringMap,

  // Activity feed detail labels
  detailBooking: { en: "Booking", es: "Reserva" } satisfies StringMap,
  detailCancellation: { en: "Cancellation", es: "Cancelación" } satisfies StringMap,
  detailRewards: { en: "Rewards", es: "Recompensas" } satisfies StringMap,
  detailTierUp: { en: "Tier Up", es: "Ascenso" } satisfies StringMap,
  detailPayment: { en: "Payment", es: "Pago" } satisfies StringMap,

  // Audit Log
  auditCreated: { en: "Created", es: "Creó" } satisfies StringMap,
  auditUpdated: { en: "Updated", es: "Actualizó" } satisfies StringMap,
  auditDeleted: { en: "Deleted", es: "Eliminó" } satisfies StringMap,
  auditApproved: { en: "Approved", es: "Aprobó" } satisfies StringMap,
  auditInvited: { en: "Invited", es: "Invitó" } satisfies StringMap,
  auditToggled: { en: "Toggled", es: "Cambió" } satisfies StringMap,
  auditEntityHotStone: { en: "service Hot Stone Massage", es: "servicio Masaje con piedras calientes" } satisfies StringMap,
  auditEntityGelPricing: { en: "pricing for Gel Manicure", es: "precios de Manicura de gel" } satisfies StringMap,
  auditEntityExpiredPromo: { en: "expired promo SUMMER25", es: "promoción expirada SUMMER25" } satisfies StringMap,
  auditEntityRefund: { en: "refund #RF-1042 ($65.00)", es: "reembolso #RF-1042 ($65.00)" } satisfies StringMap,
  auditEntityStaffInvite: { en: "staff member elena@spa.com", es: "miembro del equipo elena@spa.com" } satisfies StringMap,
  auditEntitySmsToggle: { en: "SMS notifications ON", es: "notificaciones SMS ACTIVADAS" } satisfies StringMap,
  auditTimeToday912: { en: "Today 9:12 AM", es: "Hoy 9:12 AM" } satisfies StringMap,
  auditTimeToday908: { en: "Today 9:08 AM", es: "Hoy 9:08 AM" } satisfies StringMap,
  auditTimeToday855: { en: "Today 8:55 AM", es: "Hoy 8:55 AM" } satisfies StringMap,
  auditTimeYesterday430: { en: "Yesterday 4:30 PM", es: "Ayer 4:30 PM" } satisfies StringMap,
  auditTimeYesterday215: { en: "Yesterday 2:15 PM", es: "Ayer 2:15 PM" } satisfies StringMap,
  auditTimeYesterday1100: { en: "Yesterday 11:00 AM", es: "Ayer 11:00 AM" } satisfies StringMap,

  // Calendar appointment labels
  calHotStoneEmma: { en: "Hot Stone \u2014 Emma W.", es: "Piedras calientes \u2014 Emma W." } satisfies StringMap,
  calFacialSofia: { en: "Facial \u2014 Sofia R.", es: "Facial \u2014 Sofía R." } satisfies StringMap,
  calGelManicureMaya: { en: "Gel Manicure \u2014 Maya J.", es: "Manicura de gel \u2014 Maya J." } satisfies StringMap,
  calSwedishOlivia: { en: "Swedish \u2014 Olivia T.", es: "Sueco \u2014 Olivia T." } satisfies StringMap,
  calPedicureAva: { en: "Pedicure \u2014 Ava M.", es: "Pedicura \u2014 Ava M." } satisfies StringMap,
  calAromatherapyIsabella: { en: "Aromatherapy \u2014 Isabella L.", es: "Aromaterapia \u2014 Isabella L." } satisfies StringMap,
  calDeepTissueEmma: { en: "Deep Tissue \u2014 Emma W.", es: "Tejido profundo \u2014 Emma W." } satisfies StringMap,
  calClassicFacialSofia: { en: "Classic Facial \u2014 Sofia R.", es: "Facial clásico \u2014 Sofía R." } satisfies StringMap,
  calLashLiftMaya: { en: "Lash Lift \u2014 Maya J.", es: "Lifting de pestañas \u2014 Maya J." } satisfies StringMap,
  calHotStoneOlivia: { en: "Hot Stone \u2014 Olivia T.", es: "Piedras calientes \u2014 Olivia T." } satisfies StringMap,
  calGelManicureAva: { en: "Gel Manicure \u2014 Ava M.", es: "Manicura de gel \u2014 Ava M." } satisfies StringMap,
  calSwedishEmma: { en: "Swedish \u2014 Emma W.", es: "Sueco \u2014 Emma W." } satisfies StringMap,
  calPedicureMaya: { en: "Pedicure \u2014 Maya J.", es: "Pedicura \u2014 Maya J." } satisfies StringMap,
  calDeepTissueAva: { en: "Deep Tissue \u2014 Ava M.", es: "Tejido profundo \u2014 Ava M." } satisfies StringMap,
  calLashLiftEmma: { en: "Lash Lift \u2014 Emma W.", es: "Lifting de pestañas \u2014 Emma W." } satisfies StringMap,
  calSwedishSofia: { en: "Swedish \u2014 Sofia R.", es: "Sueco \u2014 Sofía R." } satisfies StringMap,
  calGelManicureMayaB: { en: "Gel Manicure \u2014 Maya J.", es: "Manicura de gel \u2014 Maya J." } satisfies StringMap,
  calAromatherapyOlivia: { en: "Aromatherapy \u2014 Olivia T.", es: "Aromaterapia \u2014 Olivia T." } satisfies StringMap,

  // Toast section description
  toastDesc: {
    en: "Trigger toast notifications to preview their appearance and auto-dismiss behavior.",
    es: "Activa las notificaciones emergentes para previsualizar su apariencia y comportamiento de auto-cierre.",
  } satisfies StringMap,
} as const;
