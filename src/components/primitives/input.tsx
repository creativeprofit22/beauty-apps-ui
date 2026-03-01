"use client";

import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  ref?: Ref<HTMLInputElement>;
}

/**
 * Input — "Raised Panel" style.
 * Inset well with inner shadow, soft focus glow ring via box-shadow, no outline.
 */
export function Input({ className, error = false, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md bg-surface-warm-2 px-3 py-2",
        "border border-border",
        "text-text-primary placeholder:text-text-tertiary",
        "shadow-inset",
        "transition-shadow duration-normal",
        "focus:outline-none",
        error
          ? "focus:shadow-[inset_0_2px_4px_var(--error-muted),0_0_0_3px_var(--error)]"
          : "focus:shadow-[inset_0_2px_4px_var(--surface-warm-2),0_0_0_3px_var(--accent)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}
