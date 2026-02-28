"use client";

import { cn } from "@/lib/utils";
import { NavItem, type NavItemData } from "./nav-item";

interface BottomNavProps {
  items: NavItemData[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
}

/**
 * BottomNav — mobile bottom navigation with sliding pill indicator.
 * Pill position driven by --active-index CSS var, spring easing.
 * Safe area inset for notched devices. Grid layout.
 */
export function BottomNav({
  items,
  activeId,
  onNavigate,
  className,
}: BottomNavProps) {
  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 lg:hidden",
        "bg-surface-raised border-t border-border",
        className,
      )}
      style={{
        zIndex: "var(--z-sticky)",
        height: "calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Mobile navigation"
    >
      <div
        className="relative grid h-[var(--bottom-nav-height)]"
        style={{
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          "--tab-count": items.length,
          "--active-index": activeIndex >= 0 ? activeIndex : 0,
        } as React.CSSProperties}
      >
        {/* Sliding pill indicator */}
        {activeIndex >= 0 && (
          <span
            className="absolute top-1.5 h-[3px] rounded-full bg-primary"
            style={{
              width: `calc(100% / ${items.length} - 24px)`,
              left: "12px",
              transform: `translateX(calc((100% + 24px) * var(--active-index)))`,
              transition: "transform var(--duration-slow) cubic-bezier(0.4, 1.2, 0.4, 1)",
            }}
            aria-hidden="true"
          />
        )}

        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            variant="bottom"
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
