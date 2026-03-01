"use client";

import { useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PeelBackProps {
  /** Content revealed behind the peel */
  children: ReactNode;
  /** Front face content / label */
  frontContent?: ReactNode;
  /** Front face background color */
  frontColor?: string;
  /** Peel curl underside color (shadow side) */
  peelColor?: string;
  /** Called when peel auto-completes */
  onComplete?: () => void;
  className?: string;
}

type Phase = "idle" | "peeling" | "revealed";

/**
 * PeelBack — Bottom-right corner of a card shows a subtle curl.
 * Tap/drag expands the peel. At ~40% peel, auto-completes (full reveal).
 * Pure CSS transforms, no canvas. Keyboard: Enter/Space to auto-reveal.
 * prefers-reduced-motion → instant reveal.
 */
export function PeelBack({
  children,
  frontContent,
  frontColor = "var(--surface-raised)",
  peelColor = "var(--surface-warm-2)",
  onComplete,
  className,
}: PeelBackProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [peelPercent, setPeelPercent] = useState(5);

  const reveal = useCallback(() => {
    if (phase === "revealed") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setPhase("revealed");
      setPeelPercent(100);
      onComplete?.();
      return;
    }

    setPhase("revealed");
    setPeelPercent(100);
    onComplete?.();
  }, [phase, onComplete]);

  const handlePointerDown = useCallback(() => {
    if (phase === "revealed") return;
    setPhase("peeling");
  }, [phase]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (phase !== "peeling") return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = 1 - (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const peel = Math.min(Math.max((x + y) / 2, 0.05), 1) * 100;

      if (peel > 40) {
        reveal();
      } else {
        setPeelPercent(peel);
      }
    },
    [phase, reveal],
  );

  const handlePointerUp = useCallback(() => {
    if (phase === "peeling") {
      if (peelPercent > 25) {
        reveal();
      } else {
        setPhase("idle");
        setPeelPercent(5);
      }
    }
  }, [phase, peelPercent, reveal]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        reveal();
      }
    },
    [reveal],
  );

  const reset = useCallback(() => {
    setPhase("idle");
    setPeelPercent(5);
  }, []);

  // Calculate clip-path for the peeled corner triangle
  const p = peelPercent / 100;
  const peelX = 100 - p * 60; // from 100% → 40%
  const peelY = 100 - p * 60;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        role="button"
        tabIndex={phase !== "revealed" ? 0 : -1}
        aria-label="Card with peelable corner. Tap or drag corner to reveal."
        onClick={phase === "idle" ? reveal : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-[280px] h-[180px] cursor-pointer select-none",
          "rounded-lg overflow-hidden shadow-md",
          phase === "revealed" && "pointer-events-none",
        )}
        style={{ touchAction: "none" }}
      >
        {/* Revealed content beneath */}
        <div
          className="absolute inset-0 flex items-center justify-center p-4 bg-surface-raised rounded-lg"
          style={{
            opacity: phase === "revealed" ? 1 : 0.4 + p * 0.6,
          }}
        >
          {children}
        </div>

        {/* Front face (peels away) */}
        <div
          className="absolute inset-0 rounded-lg flex items-center justify-center p-4"
          style={{
            backgroundColor: frontColor,
            clipPath:
              phase === "revealed"
                ? "polygon(0 0, 0 0, 0 0)"
                : `polygon(0 0, 100% 0, 100% ${peelY}%, ${peelX}% 100%, 0 100%)`,
            transition:
              phase === "revealed"
                ? "clip-path 400ms cubic-bezier(0.4, 0, 0.2, 1)"
                : phase === "peeling"
                  ? "none"
                  : "clip-path 200ms ease",
          }}
        >
          {frontContent || (
            <span className="font-display text-lg text-text-secondary opacity-60">
              Peel to reveal
            </span>
          )}
        </div>

        {/* Peel curl triangle (the folded-back corner) */}
        {phase !== "revealed" && (
          <div
            className="absolute bottom-0 right-0"
            style={{
              width: `${p * 60}%`,
              height: `${p * 60}%`,
              background: `linear-gradient(135deg, ${peelColor} 0%, oklch(0 0 0 / 0.08) 100%)`,
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              transition:
                phase === "peeling" ? "none" : "all 200ms ease",
              boxShadow: "-2px -2px 8px oklch(0 0 0 / 0.12)",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Reset button */}
      {phase === "revealed" && (
        <button
          type="button"
          onClick={reset}
          className="text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-fast"
        >
          Reset
        </button>
      )}
    </div>
  );
}
