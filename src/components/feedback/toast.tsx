"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  /** Whether the toast is visible */
  open: boolean;
  /** Called when the toast should close */
  onClose: () => void;
  /** Semantic type — controls left accent bar color */
  type?: ToastType;
  /** Toast title */
  title: string;
  /** Optional detail text */
  detail?: string;
  /** Optional icon slot */
  icon?: ReactNode;
  /** Optional action link */
  action?: { label: string; onClick: () => void };
  /** Auto-dismiss duration in ms (0 to disable) */
  duration?: number;
  /** Use receipt variant with grid layout */
  receipt?: boolean;
  className?: string;
}

const accentColors: Record<ToastType, string> = {
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
  info: "bg-info",
};

/**
 * Toast — "Appointment Slip" style.
 * Left accent bar color-coded by type, spring entrance, personal copy style.
 * Receipt variant with grid layout (icon, title, detail, action link).
 */
export function Toast({
  open,
  onClose,
  type = "info",
  title,
  detail,
  icon,
  action,
  duration = 5000,
  receipt = false,
  className,
}: ToastProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Auto-dismiss
  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, handleClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 left-6 right-6 sm:left-auto max-w-sm",
        "bg-surface-raised rounded-xl shadow-lg overflow-hidden",
        "transition-all",
        open
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none",
        className,
      )}
      style={{
        zIndex: "var(--z-toast)",
        transitionDuration: "var(--duration-slow)",
        transitionTimingFunction: "var(--ease-spring)",
      }}
    >
      <div className="flex">
        {/* Left accent bar */}
        <div className={cn("w-1 shrink-0", accentColors[type])} />

        {/* Content */}
        <div
          className={cn(
            "flex-1 p-4",
            receipt && "grid gap-1",
            receipt && icon ? "grid-cols-[auto_1fr] gap-x-3" : undefined,
          )}
        >
          {receipt && icon && (
            <div className="row-span-2 flex items-start pt-0.5 text-text-secondary">
              {icon}
            </div>
          )}

          {!receipt && icon && (
            <div className="flex items-start gap-3">
              <div className="shrink-0 text-text-secondary pt-0.5">{icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary text-sm">{title}</p>
                {detail && (
                  <p className="mt-0.5 text-xs text-text-secondary">{detail}</p>
                )}
                {action && (
                  <button
                    onClick={action.onClick}
                    className="mt-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    {action.label}
                  </button>
                )}
              </div>
            </div>
          )}

          {!receipt && !icon && (
            <>
              <p className="font-medium text-text-primary text-sm">{title}</p>
              {detail && (
                <p className="mt-0.5 text-xs text-text-secondary">{detail}</p>
              )}
              {action && (
                <button
                  onClick={action.onClick}
                  className="mt-1.5 text-xs font-medium text-primary hover:underline"
                >
                  {action.label}
                </button>
              )}
            </>
          )}

          {receipt && (
            <>
              <p className="font-medium text-text-primary text-sm">{title}</p>
              {detail && (
                <p className="text-xs text-text-secondary col-start-2">
                  {detail}
                </p>
              )}
              {action && (
                <button
                  onClick={action.onClick}
                  className="mt-1 text-xs font-medium text-primary hover:underline col-start-2 justify-self-start"
                >
                  {action.label}
                </button>
              )}
            </>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="shrink-0 p-3 text-text-tertiary hover:text-text-primary transition-colors self-start"
          style={{ transitionDuration: "var(--duration-fast)" }}
          aria-label="Dismiss"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
