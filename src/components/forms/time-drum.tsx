"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TimeDrumProps {
  items: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 3;

/**
 * TimeDrum — scroll-snap-type: y mandatory wheel picker.
 * 3-item visible window, center highlight bar.
 */
export function TimeDrum({
  items,
  value,
  onChange,
  className,
}: TimeDrumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Scroll to selected value on mount / value change
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !value) return;
    const index = items.indexOf(value);
    if (index === -1) return;

    isScrollingRef.current = true;
    container.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: "smooth",
    });

    // Clear scrolling flag after animation
    const timer = setTimeout(() => {
      isScrollingRef.current = false;
    }, 400);
    return () => clearTimeout(timer);
  }, [value, items]);

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    const item = items[clamped];

    if (item !== undefined && item !== value) {
      onChange?.(item);
    }
  }, [items, value, onChange]);

  // Debounced scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const selectedIndex = value ? items.indexOf(value) : -1;

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
    >
      {/* Center highlight bar */}
      <div
        className="absolute left-0 right-0 rounded-md bg-primary/20 pointer-events-none"
        style={{
          zIndex: 0,
          top: ITEM_HEIGHT,
          height: ITEM_HEIGHT,
        }}
        aria-hidden="true"
      />

      {/* Scrollable drum */}
      <div
        ref={containerRef}
        className="time-drum-scroll h-full overflow-y-auto overscroll-contain"
        style={{
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        role="listbox"
        aria-label="Time picker"
      >
        {/* Hide scrollbar */}
        <style>{`
          .time-drum-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Top padding (1 item height) */}
        <div style={{ height: ITEM_HEIGHT }} aria-hidden="true" />

        {items.map((item, index) => {
          const isSelected = index === selectedIndex;

          return (
            <div
              key={item}
              role="option"
              aria-selected={isSelected}
              onClick={() => onChange?.(item)}
              className={cn(
                "flex items-center justify-center cursor-pointer",
                "text-sm font-medium transition-[color,opacity] duration-normal",
                isSelected
                  ? "text-text-primary opacity-100"
                  : "text-text-tertiary opacity-60",
              )}
              style={{
                height: ITEM_HEIGHT,
                scrollSnapAlign: "start",
              }}
            >
              {item}
            </div>
          );
        })}

        {/* Bottom padding (1 item height) */}
        <div style={{ height: ITEM_HEIGHT }} aria-hidden="true" />
      </div>

      {/* Fade edges */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: ITEM_HEIGHT,
          background:
            "linear-gradient(to bottom, var(--surface-raised), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: ITEM_HEIGHT,
          background:
            "linear-gradient(to top, var(--surface-raised), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
