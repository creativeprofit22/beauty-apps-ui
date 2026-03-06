"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────── */

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuSeparator {
  type: "separator";
}

export type DropdownMenuEntry = DropdownMenuItem | DropdownMenuSeparator;

function isSeparator(entry: DropdownMenuEntry): entry is DropdownMenuSeparator {
  return "type" in entry && entry.type === "separator";
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuEntry[];
  className?: string;
}

/* ── Component ─────────────────────────────────── */

/**
 * DropdownMenu — trigger button + floating menu panel.
 * Items support icons, labels, and destructive variant.
 * Keyboard navigation: arrow up/down, Enter to select, Escape to close.
 * Portal-rendered for proper stacking.
 */
export function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectableItems = items
    .map((entry, i) => (isSeparator(entry) ? null : { entry, index: i }))
    .filter(Boolean) as { entry: DropdownMenuItem; index: number }[];

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: Math.max(rect.width, 180),
    });
  }, []);

  const openMenu = useCallback(() => {
    updatePosition();
    setOpen(true);
    setFocusIndex(-1);
  }, [updatePosition]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setFocusIndex(-1);
  }, []);

  const selectItem = useCallback(
    (entry: DropdownMenuItem) => {
      if (entry.disabled) return;
      entry.onSelect?.();
      closeMenu();
    },
    [closeMenu],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      )
        return;
      closeMenu();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, closeMenu]);

  // Close on Escape (document-level for portal)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        triggerRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeMenu]);

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return;
    const handler = () => updatePosition();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open, updatePosition]);

  const handleTriggerKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        openMenu();
        // Focus first item after opening
        requestAnimationFrame(() => setFocusIndex(0));
      }
    }
  };

  const handleMenuKeyDown = (e: ReactKeyboardEvent) => {
    const currentSelectableIdx = selectableItems.findIndex(
      (s) => s.index === focusIndex,
    );

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (selectableItems.length === 0) break;
        const nextIdx =
          currentSelectableIdx < selectableItems.length - 1
            ? currentSelectableIdx + 1
            : 0;
        setFocusIndex(selectableItems[nextIdx]!.index);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (selectableItems.length === 0) break;
        const prevIdx =
          currentSelectableIdx > 0
            ? currentSelectableIdx - 1
            : selectableItems.length - 1;
        setFocusIndex(selectableItems[prevIdx]!.index);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        const focused = items[focusIndex];
        if (focused && !isSeparator(focused)) {
          selectItem(focused);
        }
        break;
      }
      case "Tab": {
        closeMenu();
        break;
      }
    }
  };

  // Focus the active item when focusIndex changes
  useEffect(() => {
    if (!open || focusIndex < 0) return;
    const el = menuRef.current?.querySelector(
      `[data-index="${focusIndex}"]`,
    ) as HTMLElement | null;
    el?.focus();
  }, [open, focusIndex]);

  const menuPanel = open && mounted ? (
    createPortal(
      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        onKeyDown={handleMenuKeyDown}
        className={cn(
          "fixed z-[var(--z-dropdown,50)] rounded-lg",
          "bg-surface-overlay shadow-lg border border-border",
          "py-1 overflow-hidden",
          "animate-in fade-in slide-in-from-top-1",
        )}
        style={{
          top: position.top,
          left: position.left,
          minWidth: position.width,
        }}
      >
        {items.map((entry, i) => {
          if (isSeparator(entry)) {
            return (
              <div
                key={`sep-${i}`}
                className="my-1 h-px bg-border"
                role="separator"
              />
            );
          }

          return (
            <button
              key={entry.id}
              type="button"
              role="menuitem"
              data-index={i}
              tabIndex={focusIndex === i ? 0 : -1}
              disabled={entry.disabled}
              onClick={() => selectItem(entry)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left",
                "transition-colors outline-none",
                "focus-visible:bg-surface-interactive-hover",
                "hover:bg-surface-interactive-hover",
                entry.destructive
                  ? "text-error hover:bg-error-muted focus-visible:bg-error-muted"
                  : "text-text-primary",
                entry.disabled && "opacity-40 pointer-events-none",
              )}
              style={{ transitionDuration: "var(--duration-fast)" }}
            >
              {entry.icon && (
                <span className="w-4 h-4 flex-shrink-0">{entry.icon}</span>
              )}
              {entry.label}
            </button>
          );
        })}
      </div>,
      document.body,
    )
  ) : null;

  return (
    <div ref={triggerRef} className={cn("inline-block", className)}>
      <div
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
      </div>
      {menuPanel}
    </div>
  );
}
