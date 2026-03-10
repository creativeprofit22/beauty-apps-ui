"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/navigation/sidebar";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { useTheme } from "@/hooks/useTheme";
import { SkinSwitcher } from "@/components/navigation/skin-switcher";
import { LocaleProvider, useLocale, type Locale } from "@/lib/i18n";
import { layoutStrings as s } from "@/lib/strings/layout";
import { glossary } from "@/lib/i18n";
import type { NavItemData } from "@/components/navigation/nav-item";

type Season = "" | "valentine" | "spring" | "holiday";

/** Icon definitions keyed by nav id — extracted so the inner component can build navItems with localized labels. */
const navIcons: Record<string, React.ReactNode> = {
  tokens: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  typography: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 15V5h4.5a2.5 2.5 0 010 5H4m0 0h5a2.5 2.5 0 010 5H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 5v10m-2-10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  backgrounds: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 13l4-4 3 3 2.5-2.5L17.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="13" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  components: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 10l7-4M10 10v8M10 10L3 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  forms: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="9" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  admin: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "client-portal": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 2l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  charts: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 17V9M7 17V5M11 17V11M15 17V3M19 17V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 4h12a2 2 0 012 2v7a2 2 0 01-2 2H7l-4 3V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 9h6M7 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  engagement: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  mobile: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 15.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/** Nav item definitions with string-map keys for label lookup */
const navDefs: { id: string; labelKey: keyof typeof s.nav; href: string }[] = [
  { id: "tokens", labelKey: "tokens", href: "/" },
  { id: "typography", labelKey: "typography", href: "/typography" },
  { id: "backgrounds", labelKey: "backgrounds", href: "/backgrounds" },
  { id: "components", labelKey: "components", href: "/components" },
  { id: "forms", labelKey: "forms", href: "/forms" },
  { id: "admin", labelKey: "admin", href: "/admin" },
  { id: "client-portal", labelKey: "clientPortal", href: "/client-portal" },
  { id: "charts", labelKey: "charts", href: "/charts" },
  { id: "chat", labelKey: "chat", href: "/chat" },
  { id: "engagement", labelKey: "engagement", href: "/engagement" },
  { id: "mobile", labelKey: "mobile", href: "/mobile" },
];

/**
 * Showcase layout — wires Shell + Sidebar + BottomNav.
 * Dark mode toggle only renders on /admin — luxury beauty clients see light mode only.
 */
export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <ShowcaseLayoutInner>{children}</ShowcaseLayoutInner>
    </LocaleProvider>
  );
}

function ShowcaseLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin";
  const { theme, toggleTheme } = useTheme({ allowDarkMode: isAdminRoute });
  const { locale, setLocale, t } = useLocale();

  const navItems: NavItemData[] = useMemo(
    () =>
      navDefs.map((def) => ({
        id: def.id,
        label: t(s.nav[def.labelKey]),
        href: def.href,
        icon: navIcons[def.id],
      })),
    [locale, t],
  );

  const activeId =
    navItems.find((item) => item.href === pathname)?.id ?? "tokens";

  const [season, setSeason] = useState<Season>("");

  useEffect(() => {
    const root = document.documentElement;
    if (season) {
      root.setAttribute("data-season", season);
    } else {
      root.removeAttribute("data-season");
    }
    return () => {
      root.removeAttribute("data-season");
    };
  }, [season]);

  return (
    <Shell
      sidebar={(collapsed) => (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <span className="font-display text-lg font-bold text-gradient text-gradient-primary">
              {t(s.brand)}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Sidebar
              items={navItems}
              activeId={activeId}
              collapsed={collapsed}
            />
          </div>

          {/* Skin switcher */}
          <div className="px-4 py-2 border-t border-border">
            <SkinSwitcher />
          </div>

          {/* Seasonal accent toggle */}
          <div className="px-4 py-2 border-t border-border">
            <label className="flex items-center gap-2 text-xs text-text-tertiary">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.76 2.76l1.41 1.41M9.83 9.83l1.41 1.41M11.24 2.76l-1.41 1.41M4.17 9.83l-1.41 1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {t(s.seasonLabel)}
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as Season)}
              className="mt-1 w-full rounded-md bg-surface-interactive text-sm text-text-primary px-2 py-1.5 border border-border focus:outline-none focus:ring-2"
              style={{ boxShadow: season ? "var(--glow-accent)" : "none" }}
            >
              <option value="">{t(s.seasonNone)}</option>
              <option value="valentine">{t(s.seasonValentine)}</option>
              <option value="spring">{t(s.seasonSpring)}</option>
              <option value="holiday">{t(s.seasonHoliday)}</option>
            </select>
          </div>

          {/* Language toggle */}
          <div className="px-4 py-2 border-t border-border">
            <label className="flex items-center gap-2 text-xs text-text-tertiary mb-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1.5 7h11M7 1.5c-1.5 1.5-2 3.3-2 5.5s.5 4 2 5.5M7 1.5c1.5 1.5 2 3.3 2 5.5s-.5 4-2 5.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {t(s.language)}
            </label>
            <div className="flex rounded-md border border-border overflow-hidden">
              {(["en", "es"] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`flex-1 px-3 py-1.5 text-xs font-semibold transition-colors ${
                    locale === loc
                      ? "bg-primary text-on-primary"
                      : "bg-surface-interactive text-text-secondary hover:text-text-primary"
                  }`}
                  style={{ transitionDuration: "var(--duration-normal)" }}
                  aria-pressed={locale === loc}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Douro Digital agency promo */}
          <div className="px-4 py-4 border-t border-border">
            <a
              href="https://wearedouro.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl px-4 py-4 bg-surface-sunken hover:bg-surface-interactive transition-colors"
              style={{ transitionDuration: "var(--duration-normal)" }}
            >
              <p className="font-display text-sm font-bold text-text-primary group-hover:text-primary transition-colors" style={{ transitionDuration: "var(--duration-normal)" }}>
                {t(s.builtBy)}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                {t(s.douroTagline)}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all" style={{ transitionDuration: "var(--duration-normal)" }}>
                {t(glossary.actions.learnMore)}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          {/* Theme toggle — admin only (luxury beauty = light mode for client-facing pages) */}
          {isAdminRoute && (
            <div className="p-4 border-t border-border">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-surface-interactive transition-colors"
                style={{ transitionDuration: "var(--duration-normal)" }}
                aria-label={theme === "dark" ? t(s.switchToLight) : t(s.switchToDark)}
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.05 3.05L4.11 4.11M11.89 11.89L12.95 12.95M12.95 3.05L11.89 4.11M4.11 11.89L3.05 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 9.27A6.5 6.5 0 116.73 2 5 5 0 0014 9.27z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {theme === "dark" ? t(s.lightMode) : t(s.darkMode)}
              </button>
            </div>
          )}
        </div>
      )}
    >
      <div
        id="main-content"
        className="mx-auto py-8 pb-24 lg:pb-8"
        style={{
          maxWidth: "var(--page-max-width, 1200px)",
          paddingLeft: "var(--page-padding, 24px)",
          paddingRight: "var(--page-padding, 24px)",
        }}
      >
        {children}
      </div>

      {/* Mobile bottom nav — hidden on lg+ where sidebar shows */}
      <BottomNav
        items={navItems}
        activeId={activeId}
      />

      {/* Mobile theme toggle — admin only, floating above bottom nav, hidden on lg+ */}
      {isAdminRoute && (
        <button
          onClick={toggleTheme}
          className="fixed right-4 lg:hidden z-50 flex items-center justify-center w-10 h-10 rounded-full bg-surface-raised border border-border shadow-md text-text-secondary hover:text-text-primary transition-colors"
          style={{
            bottom: "calc(var(--bottom-nav-height, 56px) + env(safe-area-inset-bottom, 0px) + 12px)",
            transitionDuration: "var(--duration-normal)",
          }}
          aria-label={theme === "dark" ? t(s.switchToLight) : t(s.switchToDark)}
        >
          {theme === "dark" ? (
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.05 3.05L4.11 4.11M11.89 11.89L12.95 12.95M12.95 3.05L11.89 4.11M4.11 11.89L3.05 12.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M14 9.27A6.5 6.5 0 116.73 2 5 5 0 0014 9.27z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}
    </Shell>
  );
}
