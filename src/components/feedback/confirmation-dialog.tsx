"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dialog } from "./dialog";
import { Button } from "@/components/primitives/button";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

/**
 * ConfirmationDialog — wraps Dialog with confirm/cancel actions.
 * Destructive variant shows red confirm button. Loading state disables confirm.
 */
export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  icon,
  className,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      className={className}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md",
              "select-none transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:pointer-events-none",
              destructive
                ? "bg-error text-white shadow-[0_2px_0_0_oklch(0.45_0.15_25)] hover:brightness-110 focus-visible:ring-error active:translate-y-[1px] active:shadow-[0_1px_0_0_oklch(0.45_0.15_25)]"
                : "bg-primary text-text-primary shadow-[0_2px_0_0_var(--primary-hover)] hover:bg-primary-hover focus-visible:ring-accent active:translate-y-[1px] active:shadow-[0_1px_0_0_var(--primary-hover)]",
            )}
            style={{ transitionDuration: "var(--duration-fast)" }}
          >
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.25"
                />
                <path
                  d="M12 2a10 10 0 019.95 9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        {icon && (
          <div
            className={cn(
              "shrink-0 flex items-center justify-center w-10 h-10 rounded-full",
              destructive
                ? "bg-error/10 text-error"
                : "bg-warning/10 text-warning",
            )}
          >
            {icon}
          </div>
        )}
        <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
      </div>
    </Dialog>
  );
}
