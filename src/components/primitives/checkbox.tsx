"use client";

import { type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  indeterminate?: boolean;
}

export function Checkbox({
  className,
  label,
  checked,
  indeterminate,
  disabled,
  ...props
}: CheckboxProps) {
  const isChecked = checked && !indeterminate;
  const isIndeterminate = indeterminate;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span className="relative inline-flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          aria-checked={indeterminate ? "mixed" : checked}
          {...props}
        />
        <span
          className={cn(
            "h-5 w-5 rounded-md border-2 transition-colors",
            "flex items-center justify-center",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2",
            isChecked || isIndeterminate
              ? "border-primary bg-primary"
              : "border-border bg-surface-warm-2",
          )}
          style={{ transitionDuration: "var(--duration-normal)" }}
        >
          {isChecked && (
            <svg
              className="h-3 w-3 text-text-on-accent"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                style={{
                  strokeDasharray: 12,
                  strokeDashoffset: 0,
                  animation: "check-draw var(--duration-normal) var(--ease-spring) forwards",
                }}
              />
            </svg>
          )}
          {isIndeterminate && (
            <svg
              className="h-3 w-3 text-text-on-accent"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2.5 6H9.5" />
            </svg>
          )}
        </span>
      </span>
      {label && (
        <span className="text-sm text-text-primary">{label}</span>
      )}
    </label>
  );
}
