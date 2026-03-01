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
 * Token-driven surface/shadow. Optional hover with translateY(-2px) + shadow bump.
 * Press state: scale(0.98) with spring timing. Premium variant adds noise overlay.
 */
export function Card({ children, hover = false, premium = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-raised [box-shadow:var(--elevation-card-highlight),var(--elevation-card)] ring-1 ring-border/50 contain-content",
        premium && "surface-textured",
        hover &&
          "transition-[transform,box-shadow] duration-normal ease-standard hover:-translate-y-0.5 hover:[box-shadow:var(--elevation-card-highlight),var(--elevation-lg)] active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </div>
  );
}
