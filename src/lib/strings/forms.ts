import type { StringMap } from "@/lib/i18n";

export const formsStrings = {
  // Page header
  title: { en: "Forms", es: "Formularios" } satisfies StringMap,
  subtitle: {
    en: "Field inputs, booking flows, time pickers, service carousels, and slot grids — everything for scheduling and data entry.",
    es: "Campos de entrada, flujos de reserva, selectores de hora, carruseles de servicios y cuadrículas de horarios — todo para programación e ingreso de datos.",
  } satisfies StringMap,

  // Section titles
  sectionField: { en: "Field", es: "Campo" } satisfies StringMap,
  sectionServiceGallery: { en: "Service Gallery", es: "Galería de servicios" } satisfies StringMap,
  sectionTimeDrum: { en: "Time Drum", es: "Selector de hora" } satisfies StringMap,
  sectionSlotGrid: { en: "Slot Grid", es: "Cuadrícula de horarios" } satisfies StringMap,
  sectionBookingTray: { en: "Booking Tray", es: "Bandeja de reserva" } satisfies StringMap,

  // Field labels
  fieldFullName: { en: "Full name", es: "Nombre completo" } satisfies StringMap,
  fieldEmail: { en: "Email", es: "Correo electrónico" } satisfies StringMap,
  fieldPhone: { en: "Phone", es: "Teléfono" } satisfies StringMap,
  fieldAmount: { en: "Amount", es: "Monto" } satisfies StringMap,
  fieldNotes: { en: "Notes", es: "Notas" } satisfies StringMap,
  fieldReferralCode: { en: "Referral code", es: "Código de referido" } satisfies StringMap,

  // Placeholders
  placeholderName: { en: "Jane Smith", es: "María García" } satisfies StringMap,
  placeholderEmail: { en: "jane@example.com", es: "maria@ejemplo.com" } satisfies StringMap,
  placeholderPhone: { en: "(555) 000-0000", es: "(555) 000-0000" } satisfies StringMap,
  placeholderAmount: { en: "0.00", es: "0.00" } satisfies StringMap,
  placeholderNotes: { en: "Any preferences or allergies...", es: "Preferencias o alergias..." } satisfies StringMap,
  placeholderReferral: { en: "FRIEND20", es: "AMIGO20" } satisfies StringMap,

  // Field descriptions / errors
  descFullName: { en: "As it appears on your ID", es: "Como aparece en tu identificación" } satisfies StringMap,
  errorEmailRegistered: { en: "This email is already registered", es: "Este correo ya está registrado" } satisfies StringMap,
  descNotes: { en: "Optional — helps your therapist prepare", es: "Opcional — ayuda a tu terapeuta a prepararse" } satisfies StringMap,
  descReferralLocked: { en: "Locked — already applied", es: "Bloqueado — ya aplicado" } satisfies StringMap,

  // Service gallery
  serviceGalleryDesc: {
    en: "Horizontal scroll-snap carousel. Swipe or click to select a service.",
    es: "Carrusel horizontal con ajuste de desplazamiento. Desliza o haz clic para seleccionar un servicio.",
  } satisfies StringMap,
  selected: { en: "Selected:", es: "Seleccionado:" } satisfies StringMap,

  // Service names
  svcHotStoneMassage: { en: "Hot Stone Massage", es: "Masaje con piedras calientes" } satisfies StringMap,
  svcClassicFacial: { en: "Classic Facial", es: "Facial clásico" } satisfies StringMap,
  svcGelManicure: { en: "Gel Manicure", es: "Manicura de gel" } satisfies StringMap,
  svcLuxuryPedicure: { en: "Luxury Pedicure", es: "Pedicura de lujo" } satisfies StringMap,
  svcAromatherapy: { en: "Aromatherapy", es: "Aromaterapia" } satisfies StringMap,
  svcDetoxBodyWrap: { en: "Detox Body Wrap", es: "Envoltura corporal detox" } satisfies StringMap,

  // Durations
  dur90Min: { en: "90 min", es: "90 min" } satisfies StringMap,
  dur75Min: { en: "75 min", es: "75 min" } satisfies StringMap,
  dur60Min: { en: "60 min", es: "60 min" } satisfies StringMap,
  dur45Min: { en: "45 min", es: "45 min" } satisfies StringMap,

  // Time drum
  timeDrumDesc: {
    en: "Scroll-snap wheel picker with a 3-item visible window. Scroll or click to change.",
    es: "Selector de rueda con ajuste de desplazamiento y ventana de 3 elementos. Desplaza o haz clic para cambiar.",
  } satisfies StringMap,
  selectedTime: { en: "Selected time", es: "Hora seleccionada" } satisfies StringMap,

  // Slot grid
  slotGridDesc: {
    en: "Auto-fill grid of time slots with available, unavailable, and selected states.",
    es: "Cuadrícula de horarios con estados disponible, no disponible y seleccionado.",
  } satisfies StringMap,

  // Booking tray
  bookingTrayDesc: {
    en: "Multi-step bottom tray with step chips. Previous selections compress into summaries.",
    es: "Bandeja inferior de múltiples pasos con chips de paso. Las selecciones anteriores se comprimen en resúmenes.",
  } satisfies StringMap,
  openBookingFlow: { en: "Open Booking Flow", es: "Abrir flujo de reserva" } satisfies StringMap,

  // Booking steps
  stepChooseService: { en: "Choose service", es: "Elegir servicio" } satisfies StringMap,
  stepPickDate: { en: "Pick a date", es: "Elegir una fecha" } satisfies StringMap,
  stepSelectTime: { en: "Select time", es: "Seleccionar hora" } satisfies StringMap,
  stepConfirm: { en: "Confirm", es: "Confirmar" } satisfies StringMap,

  // Booking step content
  chooseAService: { en: "Choose a service", es: "Elige un servicio" } satisfies StringMap,
  pickADate: { en: "Pick a date", es: "Elige una fecha" } satisfies StringMap,
  calendarPlaceholder: {
    en: "Calendar component would go here. For demo purposes:",
    es: "El componente de calendario iría aquí. Para fines de demostración:",
  } satisfies StringMap,
  selectFeb27: { en: "Select Feb 27", es: "Seleccionar 27 Feb" } satisfies StringMap,
  selectATime: { en: "Select a time", es: "Selecciona una hora" } satisfies StringMap,
  confirmBooking: { en: "Confirm booking", es: "Confirmar reserva" } satisfies StringMap,

  // Confirm details
  labelService: { en: "Service", es: "Servicio" } satisfies StringMap,
  labelDate: { en: "Date", es: "Fecha" } satisfies StringMap,
  labelTime: { en: "Time", es: "Hora" } satisfies StringMap,
  labelTotal: { en: "Total", es: "Total" } satisfies StringMap,
  dateFeb27: { en: "Feb 27, 2026", es: "27 Feb, 2026" } satisfies StringMap,
  confirmBookingBtn: { en: "Confirm Booking", es: "Confirmar reserva" } satisfies StringMap,
} as const;
