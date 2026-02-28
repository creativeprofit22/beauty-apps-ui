"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "cta";
type ButtonRadius = "standard" | "pill";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  radius?: ButtonRadius;
  size?: ButtonSize;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2.5",
};

const radiusClasses: Record<ButtonRadius, string> = {
  standard: "rounded-md",
  pill: "rounded-full",
};

/**
 * Button — "Stamped Press" style.
 * box-shadow height + active:translateY(0) press, 80ms ease.
 * CTA variant with foil sheen ::after.
 * Ghost variant with trace fill via background-position.
 */
export function Button({
  variant = "primary",
  radius = "standard",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base
        "relative inline-flex items-center justify-center font-medium",
        "select-none transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses[size],
        radiusClasses[radius],
        // Variant styles
        variant === "primary" &&
          "bg-primary text-text-on-accent shadow-[0_2px_0_0_var(--primary-hover)] hover:bg-primary-hover active:translate-y-[2px] active:shadow-none",
        variant === "secondary" &&
          "bg-secondary text-text-on-accent shadow-[0_2px_0_0_var(--secondary-hover)] hover:bg-secondary-hover active:translate-y-[2px] active:shadow-none",
        variant === "ghost" &&
          "bg-transparent text-text-primary bg-[length:200%_100%] bg-[position:100%_0] hover:bg-[position:0_0] active:scale-[0.97]",
        variant === "cta" &&
          "bg-primary text-text-on-accent shadow-[0_2px_0_0_var(--primary-hover)] hover:bg-primary-hover active:translate-y-[2px] active:shadow-none overflow-hidden",
        className,
      )}
      style={{
        transitionDuration: "var(--duration-fast)",
        ...(variant === "ghost"
          ? {
              backgroundImage:
                "linear-gradient(to right, var(--surface-interactive-hover) 50%, transparent 50%)",
              transitionDuration: "var(--duration-normal)",
            }
          : undefined),
      }}
      {...props}
    >
      {children}
      {variant === "cta" && (
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "sheen 3s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
