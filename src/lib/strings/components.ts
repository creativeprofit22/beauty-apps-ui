import type { StringMap } from "@/lib/i18n";

export const componentsStrings = {
  // Page header
  title: { en: "Components", es: "Componentes" } satisfies StringMap,
  subtitle: {
    en: "Interactive demos of every primitive — cards, buttons, badges, inputs, and selects in all their variant glory.",
    es: "Demostraciones interactivas de cada primitivo — tarjetas, botones, insignias, campos y selectores en todas sus variantes.",
  } satisfies StringMap,

  // Section titles
  sectionCard: { en: "Card", es: "Tarjeta" } satisfies StringMap,
  sectionButton: { en: "Button", es: "Botón" } satisfies StringMap,
  sectionBadge: { en: "Badge", es: "Insignia" } satisfies StringMap,
  sectionInput: { en: "Input", es: "Campo" } satisfies StringMap,
  sectionSelect: { en: "Select", es: "Selector" } satisfies StringMap,
  sectionToggle: { en: "Toggle", es: "Interruptor" } satisfies StringMap,
  sectionCheckbox: { en: "Checkbox", es: "Casilla" } satisfies StringMap,
  sectionAvatar: { en: "Avatar", es: "Avatar" } satisfies StringMap,
  sectionTabBar: { en: "Tab Bar", es: "Barra de pestañas" } satisfies StringMap,
  sectionDropdownMenu: { en: "Dropdown Menu", es: "Menú desplegable" } satisfies StringMap,
  sectionSkeleton: { en: "Skeleton", es: "Esqueleto" } satisfies StringMap,

  // Shared sub-labels
  variants: { en: "Variants", es: "Variantes" } satisfies StringMap,
  sizes: { en: "Sizes", es: "Tamaños" } satisfies StringMap,
  radius: { en: "Radius", es: "Radio" } satisfies StringMap,
  states: { en: "States", es: "Estados" } satisfies StringMap,

  // Card demos
  cardDefault: { en: "Default", es: "Predeterminado" } satisfies StringMap,
  cardLiftedPaper: { en: "Lifted Paper", es: "Papel elevado" } satisfies StringMap,
  cardLiftedPaperDesc: {
    en: "Three-layer shadow stack — contact, cast, and ambient. No border, no backdrop-filter. Pure shadow depth.",
    es: "Pila de tres capas de sombra — contacto, proyección y ambiente. Sin borde, sin backdrop-filter. Profundidad pura de sombra.",
  } satisfies StringMap,
  cardHoverVariant: { en: "Hover variant", es: "Variante hover" } satisfies StringMap,
  cardHoverMe: { en: "Hover me", es: "Pasa el ratón" } satisfies StringMap,
  cardHoverDesc: {
    en: "Scales to 1.02\u00D7 with elevated shadow on hover. Smooth transition on both transform and box-shadow.",
    es: "Escala a 1.02\u00D7 con sombra elevada al pasar. Transición suave en transform y box-shadow.",
  } satisfies StringMap,

  // Button demos
  primary: { en: "Primary", es: "Primario" } satisfies StringMap,
  secondary: { en: "Secondary", es: "Secundario" } satisfies StringMap,
  ghost: { en: "Ghost", es: "Fantasma" } satisfies StringMap,
  callToAction: { en: "Call to Action", es: "Llamada a la acción" } satisfies StringMap,
  small: { en: "Small", es: "Pequeño" } satisfies StringMap,
  medium: { en: "Medium", es: "Mediano" } satisfies StringMap,
  large: { en: "Large", es: "Grande" } satisfies StringMap,
  standard: { en: "Standard", es: "Estándar" } satisfies StringMap,
  pill: { en: "Pill", es: "Pastilla" } satisfies StringMap,
  ctaPill: { en: "CTA Pill", es: "CTA Pastilla" } satisfies StringMap,
  disabled: { en: "Disabled", es: "Deshabilitado" } satisfies StringMap,

  // Badge demos
  semanticVariants: { en: "Semantic variants", es: "Variantes semánticas" } satisfies StringMap,
  badgeDefault: { en: "Default", es: "Predeterminado" } satisfies StringMap,
  rescheduled: { en: "Rescheduled", es: "Reprogramado" } satisfies StringMap,
  tierVariants: { en: "Tier variants", es: "Variantes de nivel" } satisfies StringMap,
  tierBlack: { en: "Black", es: "Negro" } satisfies StringMap,

  // Input demos
  defaultInput: { en: "Default input", es: "Campo predeterminado" } satisfies StringMap,
  enterYourName: { en: "Enter your name...", es: "Ingresa tu nombre..." } satisfies StringMap,
  valuePrefix: { en: "Value: ", es: "Valor: " } satisfies StringMap,
  errorState: { en: "Error state", es: "Estado de error" } satisfies StringMap,
  invalidEmail: { en: "Invalid email...", es: "Email inválido..." } satisfies StringMap,
  notAnEmail: { en: "not-an-email", es: "no-es-email" } satisfies StringMap,
  pleaseEnterValidEmail: {
    en: "Please enter a valid email address",
    es: "Por favor ingresa un email válido",
  } satisfies StringMap,
  cannotEdit: { en: "Cannot edit...", es: "No se puede editar..." } satisfies StringMap,
  withValue: { en: "With value", es: "Con valor" } satisfies StringMap,

  // Select demos
  serviceType: { en: "Service type", es: "Tipo de servicio" } satisfies StringMap,
  chooseAService: { en: "Choose a service...", es: "Elige un servicio..." } satisfies StringMap,
  selectedPrefix: { en: "Selected: ", es: "Seleccionado: " } satisfies StringMap,
  notAvailable: { en: "Not available", es: "No disponible" } satisfies StringMap,
  requiredField: { en: "Required field", es: "Campo obligatorio" } satisfies StringMap,
  pleaseSelectService: {
    en: "Please select a service",
    es: "Por favor selecciona un servicio",
  } satisfies StringMap,
  preSelected: { en: "Pre-selected", es: "Pre-seleccionado" } satisfies StringMap,

  // Select options
  classicFacial: { en: "Classic Facial", es: "Facial clásico" } satisfies StringMap,
  swedishMassage: { en: "Swedish Massage", es: "Masaje sueco" } satisfies StringMap,
  gelManicure: { en: "Gel Manicure", es: "Manicura de gel" } satisfies StringMap,
  luxuryPedicure: { en: "Luxury Pedicure", es: "Pedicura de lujo" } satisfies StringMap,
  detoxBodyWrap: { en: "Detox Body Wrap", es: "Envoltura corporal detox" } satisfies StringMap,

  // Toggle demos
  disabledOff: { en: "Disabled off", es: "Deshabilitado apagado" } satisfies StringMap,
  disabledOn: { en: "Disabled on", es: "Deshabilitado encendido" } satisfies StringMap,

  // Checkbox demos
  interactive: { en: "Interactive", es: "Interactivo" } satisfies StringMap,
  acceptTerms: { en: "Accept terms and conditions", es: "Aceptar términos y condiciones" } satisfies StringMap,
  subscribeNewsletter: { en: "Subscribe to newsletter", es: "Suscribirse al boletín" } satisfies StringMap,
  indeterminate: { en: "Indeterminate", es: "Indeterminado" } satisfies StringMap,
  disabledUnchecked: { en: "Disabled unchecked", es: "Deshabilitado sin marcar" } satisfies StringMap,
  disabledChecked: { en: "Disabled checked", es: "Deshabilitado marcado" } satisfies StringMap,

  // Avatar demos
  sizesWithInitials: { en: "Sizes with initials", es: "Tamaños con iniciales" } satisfies StringMap,
  tierRings: { en: "Tier rings", es: "Anillos de nivel" } satisfies StringMap,
  fallbackDemo: { en: "Fallback demo", es: "Demo de respaldo" } satisfies StringMap,

  // Tab Bar demos
  withBadgeCounts: { en: "With badge counts", es: "Con contadores" } satisfies StringMap,
  simpleTabs: { en: "Simple tabs", es: "Pestañas simples" } satisfies StringMap,
  tabUpcoming: { en: "Upcoming", es: "Próximas" } satisfies StringMap,
  tabPast: { en: "Past", es: "Pasadas" } satisfies StringMap,
  tabCancelled: { en: "Cancelled", es: "Canceladas" } satisfies StringMap,
  tabWaitlist: { en: "Waitlist", es: "Lista de espera" } satisfies StringMap,
  tabPackages: { en: "Packages", es: "Paquetes" } satisfies StringMap,
  tabDetails: { en: "Details", es: "Detalles" } satisfies StringMap,
  tabHistory: { en: "History", es: "Historial" } satisfies StringMap,
  tabNotes: { en: "Notes", es: "Notas" } satisfies StringMap,

  // Dropdown Menu demos
  withIconsAndDestructive: {
    en: "With icons and destructive item",
    es: "Con iconos y elemento destructivo",
  } satisfies StringMap,
  actions: { en: "Actions", es: "Acciones" } satisfies StringMap,
  simpleTextMenu: { en: "Simple text menu", es: "Menú de texto simple" } satisfies StringMap,
  options: { en: "Options", es: "Opciones" } satisfies StringMap,
  editAppointment: { en: "Edit appointment", es: "Editar cita" } satisfies StringMap,
  duplicate: { en: "Duplicate", es: "Duplicar" } satisfies StringMap,
  deleteLabel: { en: "Delete", es: "Eliminar" } satisfies StringMap,
  viewProfile: { en: "View profile", es: "Ver perfil" } satisfies StringMap,
  settings: { en: "Settings", es: "Configuración" } satisfies StringMap,
  logOut: { en: "Log out", es: "Cerrar sesión" } satisfies StringMap,

  // Skeleton demos
  textLines: { en: "Text lines", es: "Líneas de texto" } satisfies StringMap,
  circleAvatar: { en: "Circle (avatar)", es: "Círculo (avatar)" } satisfies StringMap,
  skeletonCard: { en: "Card", es: "Tarjeta" } satisfies StringMap,
  composedProfileCard: { en: "Composed (profile card)", es: "Compuesto (tarjeta de perfil)" } satisfies StringMap,
  skeletonDesc: {
    en: "Warm breathing skeleton with shimmer gradient overlay. Variants: text (line), circle (avatar), card (block).",
    es: "Esqueleto con efecto de respiración y brillo degradado. Variantes: texto (línea), círculo (avatar), tarjeta (bloque).",
  } satisfies StringMap,
  skeletonUses: { en: "Uses ", es: "Usa " } satisfies StringMap,
  skeletonKeyframes: { en: " keyframes.", es: " keyframes." } satisfies StringMap,
} as const;
