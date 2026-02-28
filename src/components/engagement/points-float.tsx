"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FloatEntry {
  id: number;
  points: number;
}

interface PointsFloatProps {
  /** Points value to display (change triggers a new float) */
  points: number;
  /** Trigger counter — increment to spawn a new float with the same points value */
  trigger: number;
  /** Prefix before the number */
  prefix?: string;
  /** Suffix after the number */
  suffix?: string;
  className?: string;
}

let nextId = 0;

/**
 * PointsFloat — Floating "+N pts" counter.
 * float-up keyframe (translateY -24px, opacity fade), 1200ms, removes self after animation.
 */
export function PointsFloat({
  points,
  trigger,
  prefix = "+",
  suffix = " pts",
  className,
}: PointsFloatProps) {
  const [floats, setFloats] = useState<FloatEntry[]>([]);

  useEffect(() => {
    if (trigger <= 0) return;
    const id = nextId++;
    setFloats((prev) => [...prev, { id, points }]);
  }, [trigger, points]);

  const handleAnimationEnd = useCallback((id: number) => {
    setFloats((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <div className={cn("relative inline-block", className)} aria-hidden="true">
      {floats.map((f) => (
        <span
          key={f.id}
          className="absolute left-1/2 bottom-full -translate-x-1/2 whitespace-nowrap font-display text-sm font-bold text-primary"
          style={{
            animation: "float-up 1200ms ease-out forwards",
          }}
          onAnimationEnd={() => handleAnimationEnd(f.id)}
        >
          {prefix}
          {f.points}
          {suffix}
        </span>
      ))}
    </div>
  );
}
