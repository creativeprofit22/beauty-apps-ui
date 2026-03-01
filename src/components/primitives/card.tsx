import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  premium?: boolean;
  className?: string;
}

/**
 * Card — "Lifted Paper" variant.
 * Three-layer shadow stack (contact + cast + ambient), no border, no backdrop-filter.
 * Token-driven surface/shadow. Optional hover with scale(1.02).
 * Premium variant adds surface-textured noise overlay.
 */
export function Card({ children, hover = false, premium = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-raised [box-shadow:var(--elevation-card-highlight),var(--elevation-card)] ring-1 ring-border/50",
        premium && "surface-textured",
        hover &&
          "transition-[transform,box-shadow] duration-normal ease-standard hover:scale-[1.02] hover:[box-shadow:var(--elevation-card-highlight),var(--elevation-lg)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
