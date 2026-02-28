"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label: string;
  description?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fieldClassName?: string;
}

/**
 * Field — "Raised Panel" input wrapper.
 * Label, description, error state, prefix/suffix slots.
 * Wraps the inset-well input style with contextual chrome.
 */
export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      label,
      description,
      error,
      prefix,
      suffix,
      className,
      fieldClassName,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const descriptionId = description ? `${fieldId}-desc` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const hasError = !!error;

    return (
      <div className={cn("flex flex-col gap-1.5", fieldClassName)}>
        {/* Label */}
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-text-primary select-none"
        >
          {label}
        </label>

        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className="text-xs text-text-tertiary -mt-0.5"
          >
            {description}
          </p>
        )}

        {/* Input wrapper with prefix/suffix */}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 flex items-center text-text-tertiary pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={hasError || undefined}
            aria-describedby={
              [descriptionId, errorId].filter(Boolean).join(" ") || undefined
            }
            className={cn(
              "w-full rounded-md bg-surface-sunken px-3 py-2",
              "text-text-primary placeholder:text-text-tertiary",
              "shadow-inset",
              "transition-shadow duration-normal",
              "focus:outline-none",
              hasError
                ? "focus:shadow-[inset_0_2px_4px_var(--error-muted),0_0_0_2px_var(--error)]"
                : "focus:shadow-[inset_0_2px_4px_var(--surface-sunken),0_0_0_2px_var(--primary)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              !!prefix && "pl-9",
              !!suffix && "pr-9",
              className,
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 flex items-center text-text-tertiary">
              {suffix}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";
