import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeTier = "bronze" | "silver" | "gold" | "black";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  tier?: BadgeTier;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-interactive text-text-secondary",
  success: "bg-success-muted text-success",
  warning: "bg-warning-muted text-warning",
  error: "bg-error-muted text-error",
  info: "bg-info-muted text-info",
};

const tierClasses: Record<BadgeTier, string> = {
  bronze: "bg-tier-bronze-muted text-tier-bronze",
  silver: "bg-tier-silver-muted text-text-secondary",
  gold: "bg-tier-gold-muted text-tier-black",
  black: "bg-tier-black-muted text-tier-black",
};

/**
 * Badge — pill shape, semantic color variants and tier variants.
 */
export function Badge({
  children,
  variant = "default",
  tier,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "text-xs font-medium leading-snug",
        "whitespace-nowrap select-none",
        tier ? tierClasses[tier] : variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
