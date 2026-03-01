"use client";

import { type ReactNode, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useScratch } from "@/hooks/useScratch";

interface ScratchCardProps {
  /** Content revealed under the scratch foil */
  children: ReactNode;
  /** Canvas width in px */
  width?: number;
  /** Canvas height in px */
  height?: number;
  /** Brush radius for scratching */
  brushRadius?: number;
  /** Foil gradient stops (from skinConfig.scratchFoilGradient) */
  foilGradient: readonly string[];
  /** Called when scratch threshold is reached */
  onComplete?: () => void;
  className?: string;
}

/**
 * ScratchCard — Canvas overlay with foil gradient.
 * Uses destination-out compositing on pointermove.
 * Auto-completes at 35% with CSS opacity fade. touch-action: none prevents scroll interference.
 */
export function ScratchCard({
  children,
  width = 280,
  height = 160,
  brushRadius = 20,
  foilGradient,
  onComplete,
  className,
}: ScratchCardProps) {
  const { canvasRef, isComplete, forceReveal } = useScratch({
    width,
    height,
    brushRadius,
    foilGradient,
    onComplete,
  });

  const handleReveal = useCallback(() => {
    forceReveal();
  }, [forceReveal]);

  return (
    <div
      className={cn("relative inline-block overflow-hidden rounded-xl", className)}
      style={{ width, height }}
    >
      {/* Revealed content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>

      {/* Scratch canvas overlay */}
      <canvas
        ref={canvasRef}
        aria-label="Scratch card. Scratch to reveal or press button to reveal instantly."
        className={cn(
          "absolute inset-0 cursor-crosshair",
          "transition-opacity duration-slower ease-standard",
          isComplete && "pointer-events-none opacity-0",
        )}
        style={{
          width,
          height,
          touchAction: "none",
        }}
      />

      {/* WCAG 2.5.7 dragging alternative — tap/click to reveal */}
      {!isComplete && (
        <button
          type="button"
          onClick={handleReveal}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 text-2xs font-medium rounded-full bg-surface-base/80 text-text-secondary hover:bg-surface-base transition-colors duration-fast"
        >
          Tap to reveal
        </button>
      )}
    </div>
  );
}
