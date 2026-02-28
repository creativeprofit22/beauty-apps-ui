"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export interface NavItemData {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

interface NavItemProps {
  item: NavItemData;
  active: boolean;
  collapsed?: boolean;
  variant: "sidebar" | "bottom";
  onClick?: () => void;
}

/**
 * NavItem — shared navigation item used by both Sidebar and BottomNav.
 * Sidebar variant: Inter medium, sentence case, left accent ribbon on active.
 * Bottom variant: icon + small label, stacked vertically.
 * Renders as <Link> when href is provided, <button> otherwise.
 */
export function NavItem({
  item,
  active,
  collapsed = false,
  variant,
  onClick,
}: NavItemProps) {
  if (variant === "sidebar") {
    const classes = cn(
      "relative flex items-center gap-3 w-full",
      "px-4 py-2.5 text-sm font-medium",
      "transition-colors",
      active
        ? "text-text-primary bg-surface-interactive"
        : "text-text-secondary hover:text-text-primary hover:bg-surface-interactive-hover",
      collapsed && "justify-center px-0",
    );
    const style = { transitionDuration: "var(--duration-normal)" };
    const content = (
      <>
        {active && (
          <span
            className="absolute left-0 w-[3px] bg-primary rounded-r-full"
            style={{ top: "20%", bottom: "20%" }}
            aria-hidden="true"
          />
        )}
        <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
        {!collapsed && <span className="truncate">{item.label}</span>}
      </>
    );

    if (item.href) {
      return (
        <Link
          href={item.href}
          className={classes}
          style={style}
          aria-current={active ? "page" : undefined}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        onClick={onClick}
        className={classes}
        style={style}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </button>
    );
  }

  // Bottom nav variant
  const classes = cn(
    "flex flex-col items-center justify-center gap-1",
    "text-[0.625rem] font-medium leading-tight",
    "transition-colors",
    active ? "text-primary" : "text-text-tertiary",
  );
  const style = {
    transitionDuration: "var(--duration-normal)",
    minHeight: "var(--touch-target-min)",
  };
  const content = (
    <>
      <span className="w-5 h-5">{item.icon}</span>
      <span>{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={classes}
        style={style}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={classes}
      style={style}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </button>
  );
}
