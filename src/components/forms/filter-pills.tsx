"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterPillsProps {
  options: string[];
  defaultValue?: string[];
  mode?: "single" | "multi";
  includeAll?: boolean;
  onChange?: (selected: string[]) => void;
  className?: string;
}

export function FilterPills({
  options,
  defaultValue,
  mode = "single",
  includeAll = true,
  onChange,
  className,
}: FilterPillsProps) {
  const allOptions = includeAll ? ["All", ...options] : options;
  const [selected, setSelected] = useState<string[]>(
    () => {
      if (defaultValue) return defaultValue;
      if (includeAll) return ["All"];
      const first = options[0];
      return first !== undefined ? [first] : [];
    },
  );

  const handleClick = (option: string) => {
    let next: string[];

    if (mode === "single") {
      next = [option];
    } else {
      if (option === "All") {
        next = ["All"];
      } else {
        const without = selected.filter((s) => s !== "All");
        if (without.includes(option)) {
          const removed = without.filter((s) => s !== option);
          next = removed.length === 0 ? (includeAll ? ["All"] : [option]) : removed;
        } else {
          next = [...without, option];
        }
      }
    }

    setSelected(next);
    onChange?.(next);
  };

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1",
        className,
      )}
    >
      {allOptions.map((option) => {
        const isActive =
          selected.includes(option) ||
          (option === "All" && selected.includes("All"));

        return (
          <button
            key={option}
            type="button"
            onClick={() => handleClick(option)}
            className={cn(
              "shrink-0 snap-start rounded-full px-3.5 py-1.5",
              "text-xs font-medium leading-snug",
              "whitespace-nowrap select-none",
              "transition-all",
              "min-h-[32px]",
              isActive
                ? "bg-accent text-text-on-accent shadow-xs"
                : "bg-surface-interactive text-text-secondary hover:bg-surface-interactive-hover",
            )}
            style={{ transitionDuration: "var(--duration-fast)" }}
            aria-pressed={isActive}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
