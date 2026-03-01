"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BubblePopProps {
  /** Whether bubbles are actively spawning */
  active: boolean;
  /** Number of bubbles to spawn */
  count?: number;
  /** Bubble colors (skin-configurable) */
  colors?: readonly string[];
  /** Called when a bubble is popped */
  onPop?: (points: number) => void;
  /** Points per pop */
  pointsPerPop?: number;
  className?: string;
}

interface Bubble {
  id: number;
  x: number;
  color: string;
  size: number;
  driftX: number;
  driftEnd: number;
  duration: number;
  delay: number;
  popped: boolean;
}

const DEFAULT_COLORS = [
  "oklch(0.82 0.06 72 / 0.4)",
  "oklch(0.70 0.08 18 / 0.35)",
  "oklch(0.62 0.06 148 / 0.3)",
  "oklch(0.88 0.04 72 / 0.35)",
];

let nextBubbleId = 0;

/**
 * BubblePop — Floating soap/nail polish bubbles rise from bottom.
 * Each bubble has a radial gradient for soap sheen + CSS bubble-float animation.
 * Tap/click a bubble → pop with "+N pts" text spawning.
 * 8-12 bubbles, self-cleaning via animationend.
 * prefers-reduced-motion → bubbles appear static, tap still works.
 */
export function BubblePop({
  active,
  count = 10,
  colors = DEFAULT_COLORS,
  onPop,
  pointsPerPop = 5,
  className,
}: BubblePopProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; points: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Spawn bubbles when active
  useEffect(() => {
    if (!active) {
      setBubbles([]);
      setFloats([]);
      return;
    }

    const newBubbles: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: nextBubbleId++,
      x: 5 + Math.random() * 90,
      color: colors[i % colors.length]!,
      size: 32 + Math.random() * 28,
      driftX: -20 + Math.random() * 40,
      driftEnd: -30 + Math.random() * 60,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 2,
      popped: false,
    }));

    setBubbles(newBubbles);
  }, [active, count, colors]);

  const popBubble = useCallback(
    (id: number, e: React.PointerEvent) => {
      e.stopPropagation();

      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: true } : b)),
      );

      // Spawn floating points text
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const floatId = nextBubbleId++;
        setFloats((prev) => [...prev, { id: floatId, x, y, points: pointsPerPop }]);

        // Auto-remove float
        setTimeout(() => {
          setFloats((prev) => prev.filter((f) => f.id !== floatId));
        }, 1200);
      }

      onPop?.(pointsPerPop);
    },
    [onPop, pointsPerPop],
  );

  const handleBubbleAnimationEnd = useCallback((id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);

  if (!active && bubbles.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        className,
      )}
      style={{ height: 300 }}
      aria-hidden="true"
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          role="button"
          tabIndex={-1}
          className={cn(
            "absolute rounded-full cursor-pointer",
            bubble.popped && "pointer-events-none",
          )}
          style={{
            left: `${bubble.x}%`,
            bottom: 0,
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 35% 35%, oklch(1 0 0 / 0.5), ${bubble.color} 60%, oklch(0 0 0 / 0.05))`,
            boxShadow: `inset 0 -2px 6px oklch(0 0 0 / 0.06), 0 0 8px ${bubble.color}`,
            border: "1px solid oklch(1 0 0 / 0.2)",
            animation: bubble.popped
              ? "bubble-pop 300ms ease-out forwards"
              : prefersReducedRef.current
                ? "none"
                : `bubble-float ${bubble.duration}s ease-in-out ${bubble.delay}s forwards`,
            ["--drift-x" as string]: `${bubble.driftX}px`,
            ["--drift-end" as string]: `${bubble.driftEnd}px`,
            opacity: prefersReducedRef.current && !bubble.popped ? 0.8 : undefined,
            transform: prefersReducedRef.current && !bubble.popped
              ? `translateY(-${30 + Math.random() * 60}%) scale(1)`
              : undefined,
          }}
          onPointerDown={(e) => !bubble.popped && popBubble(bubble.id, e)}
          onAnimationEnd={() => handleBubbleAnimationEnd(bubble.id)}
        />
      ))}

      {/* Floating points text */}
      {floats.map((f) => (
        <span
          key={f.id}
          className="absolute font-display text-sm font-bold text-primary pointer-events-none"
          style={{
            left: f.x,
            top: f.y,
            animation: "float-up 1200ms ease-out forwards",
            transform: "translate(-50%, -50%)",
          }}
        >
          +{f.points} pts
        </span>
      ))}
    </div>
  );
}
