"use client";

import { cn } from "@/lib/utils";
import { NavItem, type NavItemData } from "./nav-item";

interface SidebarProps {
  items: NavItemData[];
  activeId: string;
  onNavigate?: (id: string) => void;
  collapsed?: boolean;
}

/**
 * Sidebar — "Printed Manifest" style navigation.
 * Inter medium labels, sentence case, left accent ribbon on active (::before, 3px, 20% inset).
 * Collapsible to 56px icon-only mode (controlled by Shell).
 */
export function Sidebar({
  items,
  activeId,
  onNavigate,
  collapsed = false,
}: SidebarProps) {
  return (
    <nav
      className={cn("flex flex-col gap-1 py-2", collapsed ? "px-1" : "px-2")}
      style={{ background: "linear-gradient(160deg, var(--surface-warm-1) 0%, transparent 50%)" }}
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          active={activeId === item.id}
          collapsed={collapsed}
          variant="sidebar"
          onClick={onNavigate ? () => onNavigate(item.id) : undefined}
        />
      ))}
    </nav>
  );
}
