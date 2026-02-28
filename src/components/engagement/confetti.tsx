"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ConfettiProps {
  /** Whether confetti is currently active */
  active: boolean;
  /** Number of confetti pieces */
  count?: number;
  /** Color palette for confetti pieces */
  colors?: string[];
  /** Called when all confetti animations complete */
  onComplete?: () => void;
  className?: string;
}

const SPEED_VARIANTS = ["confetti-slow", "confetti-medium", "confetti-fast"] as const;

const SHAPES = ["square", "rectangle", "circle"] as const;

/**
 * Confetti — CSS confetti via DOM elements (3 speed variants).
 * Configurable count/colors. animationend self-cleanup.
 */
export function Confetti({
  active,
  count = 40,
  colors = ["#D4A843", "#C97B7B", "#7BA37B", "#E8D5A3", "#D4A0A0"],
  onComplete,
  className,
}: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  const colorsRef = useRef(colors);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  const cleanup = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    completedRef.current = 0;
  }, []);

  useEffect(() => {
    if (!active) {
      cleanup();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    cleanup();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      onCompleteRef.current?.();
      return;
    }

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      const speed = SPEED_VARIANTS[i % SPEED_VARIANTS.length] ?? "confetti-slow";
      const shape = SHAPES[i % SHAPES.length] ?? "square";
      const color = colorsRef.current[i % colorsRef.current.length] ?? "#D4A843";

      piece.style.position = "absolute";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `-5%`;
      piece.style.backgroundColor = color;
      piece.style.animationName = speed;
      piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      piece.style.animationTimingFunction = "ease-in";
      piece.style.animationFillMode = "forwards";
      piece.style.animationDelay = `${Math.random() * 0.5}s`;

      if (shape === "square") {
        piece.style.width = "8px";
        piece.style.height = "8px";
      } else if (shape === "rectangle") {
        piece.style.width = "4px";
        piece.style.height = "12px";
      } else {
        piece.style.width = "8px";
        piece.style.height = "8px";
        piece.style.borderRadius = "50%";
      }

      piece.addEventListener(
        "animationend",
        () => {
          piece.remove();
          completedRef.current++;
          if (completedRef.current >= count) {
            onCompleteRef.current?.();
          }
        },
        { once: true },
      );

      container.appendChild(piece);
    }
  }, [active, count, cleanup]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    />
  );
}
