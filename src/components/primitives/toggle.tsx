"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ToggleSize = "sm" | "md" | "lg";

interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
}

const trackSizes: Record<ToggleSize, string> = {
  sm: "w-8 h-[18px]",
  md: "w-11 h-6",
  lg: "w-14 h-8",
};

const thumbSizes: Record<ToggleSize, { size: string; translate: string }> = {
  sm: { size: "h-3.5 w-3.5", translate: "translate-x-3.5" },
  md: { size: "h-5 w-5", translate: "translate-x-5" },
  lg: { size: "h-6 w-6", translate: "translate-x-6" },
};

export function Toggle({
  checked = false,
  onChange,
  size = "md",
  className,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        checked ? "bg-primary" : "bg-surface-warm-3",
        trackSizes[size],
        className,
      )}
      style={{ transitionDuration: "var(--duration-normal)" }}
      onClick={() => onChange?.(!checked)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block rounded-full bg-white shadow-sm",
          "transform transition-transform",
          thumbSizes[size].size,
          checked ? thumbSizes[size].translate : "translate-x-0",
        )}
        style={{ transitionDuration: "var(--duration-normal)" }}
      />
    </button>
  );
}
