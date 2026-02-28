"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Input — "Raised Panel" style.
 * Inset well with inner shadow, soft focus glow ring via box-shadow, no outline.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md bg-surface-sunken px-3 py-2",
          "text-text-primary placeholder:text-text-tertiary",
          "shadow-inset",
          "transition-shadow duration-normal",
          "focus:outline-none",
          error
            ? "focus:shadow-[inset_0_2px_4px_var(--error-muted),0_0_0_2px_var(--error)]"
            : "focus:shadow-[inset_0_2px_4px_var(--surface-sunken),0_0_0_2px_var(--primary)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
