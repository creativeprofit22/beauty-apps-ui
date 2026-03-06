"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeId?: string;
  onTabChange?: (id: string) => void;
  className?: string;
}

/**
 * TabBar — horizontal tab list with sliding accent underline indicator.
 * Badge count support per tab. Overflow scrolls horizontally with scroll-snap on mobile.
 */
export function TabBar({ tabs, activeId, onTabChange, className }: TabBarProps) {
  const [currentId, setCurrentId] = useState(activeId ?? tabs[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const active = activeId ?? currentId;

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current.get(active);
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({
      left: btnRect.left - containerRect.left + container.scrollLeft,
      width: btnRect.width,
    });
  }, [active]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(updateIndicator);
    ro.observe(container);
    return () => ro.disconnect();
  }, [updateIndicator]);

  const handleTabClick = (id: string) => {
    if (activeId === undefined) setCurrentId(id);
    onTabChange?.(id);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 snap-start",
              "text-sm font-medium whitespace-nowrap flex-shrink-0",
              "transition-colors",
              active === tab.id
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
            )}
            style={{
              transitionDuration: "var(--duration-normal)",
              minHeight: "var(--touch-target-min, 44px)",
            }}
          >
            {tab.icon && <span className="w-4 h-4 flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5",
                  "rounded-full text-xs font-semibold",
                  active === tab.id
                    ? "bg-primary text-text-on-accent"
                    : "bg-surface-interactive text-text-secondary",
                )}
                style={{ transitionDuration: "var(--duration-normal)" }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Sliding accent underline */}
      <div
        className="absolute bottom-0 h-[2px] bg-accent rounded-full"
        style={{
          left: indicator.left,
          width: indicator.width,
          transition: `left var(--duration-normal) var(--ease-standard), width var(--duration-normal) var(--ease-standard)`,
        }}
        aria-hidden="true"
      />

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" aria-hidden="true" />
    </div>
  );
}
