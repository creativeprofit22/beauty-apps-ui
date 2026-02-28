"use client";

import { usePathname } from "next/navigation";
import { Shell } from "@/components/layout/shell";
import { Sidebar } from "@/components/navigation/sidebar";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { useTheme } from "@/hooks/useTheme";
import type { NavItemData } from "@/components/navigation/nav-item";

const navItems: NavItemData[] = [
  {
    id: "tokens",
    label: "Tokens",
    href: "/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "typography",
    label: "Typography",
    href: "/typography",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 15V5h4.5a2.5 2.5 0 010 5H4m0 0h5a2.5 2.5 0 010 5H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 5v10m-2-10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "backgrounds",
    label: "Backgrounds",
    href: "/backgrounds",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2.5 13l4-4 3 3 2.5-2.5L17.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "components",
    label: "Components",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 10l7-4M10 10v8M10 10L3 6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "forms",
    label: "Forms",
    href: "/forms",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="9" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="14" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "admin",
    label: "Admin",
    href: "/admin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "client-portal",
    label: "Client Portal",
    href: "/client-portal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 2l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "engagement",
    label: "Engagement",
    href: "/engagement",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "Mobile",
    href: "/mobile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 15.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

/**
 * Showcase layout — wires Shell + Sidebar + BottomNav + theme toggle.
 */
export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const activeId =
    navItems.find((item) => item.href === pathname)?.id ?? "tokens";

  return (
    <Shell
      sidebar={(collapsed) => (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <span className="font-display text-lg font-bold text-gradient text-gradient-primary">
              Spa UI
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Sidebar
              items={navItems}
              activeId={activeId}
              collapsed={collapsed}
            />
          </div>

          {/* Theme toggle */}
          <div className="p-4 border-t border-border">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-surface-interactive transition-colors"
              style={{ transitionDuration: "var(--duration-normal)" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    >
      <div
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

      {/* Mobile theme toggle — floating above bottom nav, hidden on lg+ */}
      <button
        onClick={toggleTheme}
        className="fixed right-4 lg:hidden z-50 flex items-center justify-center w-10 h-10 rounded-full bg-surface-raised border border-border shadow-md text-text-secondary hover:text-text-primary transition-colors"
        style={{
          bottom: "calc(var(--bottom-nav-height, 56px) + env(safe-area-inset-bottom, 0px) + 12px)",
          transitionDuration: "var(--duration-normal)",
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
    </Shell>
  );
}
