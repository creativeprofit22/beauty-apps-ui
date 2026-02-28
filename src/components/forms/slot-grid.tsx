"use client";

import { cn } from "@/lib/utils";

type SlotStatus = "available" | "unavailable" | "selected";

interface TimeSlot {
  id: string;
  time: string;
  status: SlotStatus;
}

interface SlotGridProps {
  slots: TimeSlot[];
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * SlotGrid — auto-fill grid of time slots.
 * Available/unavailable/selected states, active:scale(0.96) press.
 */
export function SlotGrid({ slots, onSelect, className }: SlotGridProps) {
  return (
    <div
      className={cn("grid gap-2", className)}
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
      }}
      role="listbox"
      aria-label="Available time slots"
    >
      {slots.map((slot) => {
        const isAvailable = slot.status === "available";
        const isSelected = slot.status === "selected";
        const isUnavailable = slot.status === "unavailable";

        return (
          <button
            key={slot.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            aria-disabled={isUnavailable}
            disabled={isUnavailable}
            onClick={() => isAvailable && onSelect?.(slot.id)}
            className={cn(
              "rounded-md px-2 py-2.5 text-sm font-medium",
              "transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isAvailable &&
                "bg-surface-interactive text-text-primary hover:bg-surface-interactive-hover active:scale-[0.96] cursor-pointer",
              isSelected &&
                "bg-primary text-text-on-accent shadow-sm active:scale-[0.96] cursor-pointer",
              isUnavailable &&
                "bg-surface-sunken text-text-tertiary opacity-40 cursor-not-allowed line-through",
            )}
            style={{
              transitionDuration: "var(--duration-fast)",
              transitionTimingFunction: "var(--ease-standard)",
            }}
          >
            {slot.time}
          </button>
        );
      })}
    </div>
  );
}
