import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

/**
 * Card — "Lifted Paper" variant.
 * Three-layer shadow stack (contact + cast + ambient), no border, no backdrop-filter.
 * Token-driven surface/shadow. Optional hover with scale(1.02).
 */
export function Card({ children, hover = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-raised shadow-card",
        hover &&
          "transition-[transform,box-shadow] duration-normal ease-standard hover:scale-[1.02] hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
