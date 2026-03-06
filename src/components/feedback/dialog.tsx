"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Dialog — centered modal overlay.
 * Backdrop blur + oklch dark overlay, scale-in entrance with bloom easing.
 * Escape key and backdrop click to close. Focus trap via inert siblings.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  footer,
  children,
  className,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Focus trap via inert + auto-focus + restore
  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement;

    const main = document.querySelector("main");
    const aside = document.querySelector("aside");
    main?.setAttribute("inert", "");
    aside?.setAttribute("inert", "");

    requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      first?.focus();
    });

    return () => {
      main?.removeAttribute("inert");
      aside?.removeAttribute("inert");
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        style={{
          zIndex: "var(--z-overlay)",
          backgroundColor: "oklch(0.15 0 0 / 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transitionDuration: "var(--duration-normal)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Center wrapper */}
      <div
        className={cn(
          "fixed inset-0 flex items-center justify-center p-4",
          !open && "pointer-events-none",
        )}
        style={{ zIndex: "var(--z-modal)" }}
      >
        {/* Panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal={open}
          aria-label={title}
          className={cn(
            "w-full max-w-md",
            "bg-surface-raised rounded-xl",
            "[box-shadow:var(--elevation-card-highlight),var(--elevation-lg)]",
            "ring-1 ring-border/50",
            "transition-all",
            open
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none",
            className,
          )}
          style={{
            transitionDuration: "var(--duration-slow)",
            transitionTimingFunction: "var(--ease-bloom)",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-sm text-text-secondary">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 ml-4 p-1.5 -mr-1.5 -mt-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-interactive-hover transition-colors"
              style={{ transitionDuration: "var(--duration-fast)" }}
              aria-label="Close dialog"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
          </div>

          {/* Body */}
          {children && <div className="p-6">{children}</div>}

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 pb-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
