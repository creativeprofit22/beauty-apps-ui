"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Select — styled trigger with dropdown.
 * On mobile screens (< md), opens a Tray-style bottom sheet.
 * On desktop, opens a positioned dropdown.
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  error = false,
  disabled = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.value === value);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    close();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between",
          "rounded-md bg-surface-sunken px-3 py-2",
          "text-left shadow-inset",
          "transition-shadow duration-normal",
          error
            ? "shadow-[inset_0_2px_4px_var(--error-muted),0_0_0_2px_var(--error)]"
            : open
              ? "shadow-[inset_0_2px_4px_var(--surface-sunken),0_0_0_2px_var(--primary)]"
              : "",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span
          className={cn(
            selectedOption ? "text-text-primary" : "text-text-tertiary",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* Desktop dropdown */}
      <div
        role="listbox"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "absolute z-[var(--z-dropdown)] left-0 right-0 mt-1",
          "rounded-lg bg-surface-overlay shadow-lg",
          "overflow-hidden",
          "transition-[opacity,transform] duration-normal",
          "origin-top",
          open
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-95 pointer-events-none",
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={option.value === value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "w-full px-3 py-2 text-left text-sm",
              "transition-colors duration-fast",
              "hover:bg-surface-interactive-hover",
              option.value === value
                ? "text-primary font-medium bg-surface-interactive"
                : "text-text-primary",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Mobile tray backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          style={{ zIndex: "var(--z-overlay)" as string }}
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Mobile tray */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 md:hidden",
          "rounded-t-2xl bg-surface-raised shadow-xl",
          "transition-transform",
          open ? "translate-y-0" : "translate-y-full",
        )}
        style={{
          zIndex: "var(--z-modal)" as string,
          maxHeight: "60dvh",
          transitionDuration: "var(--duration-slow)",
          transitionTimingFunction: "var(--ease-spring)",
        }}
        role="listbox"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        <div className="px-4 pb-6 overflow-y-auto overscroll-contain">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full px-3 py-3 text-left rounded-lg",
                "transition-colors duration-fast",
                "hover:bg-surface-interactive-hover",
                "active:scale-[0.98]",
                option.value === value
                  ? "text-primary font-medium bg-surface-interactive"
                  : "text-text-primary",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        "text-text-tertiary shrink-0 ml-2",
        "transition-transform duration-normal",
        open && "rotate-180",
      )}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
