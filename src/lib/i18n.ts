"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  createElement,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Locale = "en" | "es";

export type StringMap<T = string> = Record<Locale, T>;

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <T>(map: StringMap<T>) => T;
}

// ---------------------------------------------------------------------------
// External-store helpers (mirrors useTheme pattern)
// ---------------------------------------------------------------------------

const STORAGE_KEY = "locale";

function getServerSnapshot(): Locale {
  return "en";
}

function subscribe(onStoreChange: () => void): () => void {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

function getSnapshot(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  return "en";
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LocaleContext = createContext<LocaleContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY, newValue: next }),
    );
  }, []);

  const t = useCallback(
    <T,>(map: StringMap<T>): T => map[locale],
    [locale],
  );

  return createElement(
    LocaleContext.Provider,
    { value: { locale, setLocale, t } },
    children,
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Shared glossary — common terms reused across pages
// ---------------------------------------------------------------------------

export const glossary = {
  // Service names
  services: {
    haircut: { en: "Haircut", es: "Corte de pelo" },
    coloring: { en: "Coloring", es: "Coloración" },
    styling: { en: "Styling", es: "Estilismo" },
    facial: { en: "Facial", es: "Facial" },
    massage: { en: "Massage", es: "Masaje" },
    manicure: { en: "Manicure", es: "Manicura" },
    pedicure: { en: "Pedicure", es: "Pedicura" },
    waxing: { en: "Waxing", es: "Depilación" },
    tattoo: { en: "Tattoo", es: "Tatuaje" },
    piercing: { en: "Piercing", es: "Piercing" },
    beardTrim: { en: "Beard Trim", es: "Recorte de barba" },
    shave: { en: "Shave", es: "Afeitado" },
    nailArt: { en: "Nail Art", es: "Arte de uñas" },
    gelNails: { en: "Gel Nails", es: "Uñas de gel" },
  },

  // Loyalty tier names
  tiers: {
    bronze: { en: "Bronze", es: "Bronce" },
    silver: { en: "Silver", es: "Plata" },
    gold: { en: "Gold", es: "Oro" },
    platinum: { en: "Platinum", es: "Platino" },
    diamond: { en: "Diamond", es: "Diamante" },
  },

  // Months
  months: {
    january: { en: "January", es: "Enero" },
    february: { en: "February", es: "Febrero" },
    march: { en: "March", es: "Marzo" },
    april: { en: "April", es: "Abril" },
    may: { en: "May", es: "Mayo" },
    june: { en: "June", es: "Junio" },
    july: { en: "July", es: "Julio" },
    august: { en: "August", es: "Agosto" },
    september: { en: "September", es: "Septiembre" },
    october: { en: "October", es: "Octubre" },
    november: { en: "November", es: "Noviembre" },
    december: { en: "December", es: "Diciembre" },
  },

  // Statuses
  statuses: {
    confirmed: { en: "Confirmed", es: "Confirmado" },
    pending: { en: "Pending", es: "Pendiente" },
    cancelled: { en: "Cancelled", es: "Cancelado" },
    completed: { en: "Completed", es: "Completado" },
    noShow: { en: "No Show", es: "No presentado" },
    inProgress: { en: "In Progress", es: "En progreso" },
  },

  // Common button labels & actions
  actions: {
    cancel: { en: "Cancel", es: "Cancelar" },
    confirm: { en: "Confirm", es: "Confirmar" },
    save: { en: "Save", es: "Guardar" },
    delete: { en: "Delete", es: "Eliminar" },
    edit: { en: "Edit", es: "Editar" },
    add: { en: "Add", es: "Agregar" },
    remove: { en: "Remove", es: "Quitar" },
    search: { en: "Search", es: "Buscar" },
    filter: { en: "Filter", es: "Filtrar" },
    submit: { en: "Submit", es: "Enviar" },
    back: { en: "Back", es: "Volver" },
    next: { en: "Next", es: "Siguiente" },
    close: { en: "Close", es: "Cerrar" },
    bookNow: { en: "Book Now", es: "Reservar ahora" },
    viewAll: { en: "View All", es: "Ver todo" },
    learnMore: { en: "Learn more", es: "Saber más" },
  },
} as const;
