"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BookingStep {
  id: string;
  label: string;
  summary?: string;
}

interface BookingTrayProps {
  open: boolean;
  onClose: () => void;
  steps: BookingStep[];
  activeStep: number;
  onStepClick?: (index: number) => void;
  children: ReactNode;
  className?: string;
}

/**
 * BookingTray — multi-step bottom tray.
 * Previous selections compress into step chips.
 * Spring easing open, accent top border.
 */
export function BookingTray({
  open,
  onClose,
  steps,
  activeStep,
  onStepClick,
  children,
  className,
}: BookingTrayProps) {
  const trayRef = useRef<HTMLDivElement>(null);
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

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Focus trap: inert siblings, auto-focus first element, restore focus on close
  useEffect(() => {
    if (!open) return;

    // Remember the element that triggered the tray
    triggerRef.current = document.activeElement;

    // Set inert on sibling content
    const main = document.querySelector("main");
    const aside = document.querySelector("aside");
    main?.setAttribute("inert", "");
    aside?.setAttribute("inert", "");

    // Auto-focus first focusable element inside the tray
    requestAnimationFrame(() => {
      const first = trayRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      first?.focus();
    });

    return () => {
      main?.removeAttribute("inert");
      aside?.removeAttribute("inert");
      // Restore focus to the trigger element
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
          "fixed inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        style={{
          zIndex: "var(--z-overlay)",
          transitionDuration: "var(--duration-normal)",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Tray panel */}
      <div
        ref={trayRef}
        role="dialog"
        aria-modal={open}
        aria-label="Booking"
        className={cn(
          "fixed inset-x-0 bottom-0",
          "bg-surface-raised rounded-t-2xl shadow-xl",
          "overflow-y-auto overscroll-contain",
          "transition-transform",
          "border-t-2 border-t-primary",
          open ? "translate-y-0" : "translate-y-full",
          className,
        )}
        style={{
          zIndex: "var(--z-modal)",
          maxHeight: "90dvh",
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-spring)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="w-8 h-1 rounded-full bg-border"
          />
        </div>

        {/* Progress line */}
        <div className="px-6 pb-4">
          <div className="h-[3px] rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-hover"
              style={{
                width: `${steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0}%`,
                transition: "width 400ms ease-out",
              }}
            />
          </div>
        </div>

        {/* Step content — slides in from right on step change */}
        <div
          key={activeStep}
          className="px-6 pb-6"
          ref={(el) => {
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateX(16px)";
            requestAnimationFrame(() => {
              el.style.transition =
                "opacity 320ms var(--ease-bloom), transform 320ms var(--ease-bloom)";
              el.style.opacity = "1";
              el.style.transform = "translateX(0)";
            });
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

