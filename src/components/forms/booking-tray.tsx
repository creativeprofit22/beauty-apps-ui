"use client";

import { useEffect, type ReactNode } from "react";
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
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Step chips */}
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;
            const isFuture = index > activeStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isCompleted && onStepClick?.(index)}
                disabled={isFuture}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
                  "text-xs font-medium select-none",
                  "transition-all duration-normal",
                  isCompleted &&
                    "bg-primary-muted text-primary cursor-pointer hover:bg-primary/20",
                  isActive && "bg-surface-interactive text-text-primary",
                  isFuture &&
                    "bg-surface-sunken text-text-tertiary cursor-not-allowed opacity-60",
                )}
              >
                {/* Step number / check */}
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold",
                    isCompleted && "bg-primary text-text-on-accent",
                    isActive && "bg-text-primary text-text-inverse",
                    isFuture && "bg-border text-text-tertiary",
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon />
                  ) : (
                    index + 1
                  )}
                </span>

                {/* Label or summary */}
                <span>
                  {isCompleted && step.summary ? step.summary : step.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 5L4.5 7.5L8 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
