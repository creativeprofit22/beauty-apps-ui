"use client";

import { useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EnvelopeRevealProps {
  /** Content revealed inside the envelope */
  children: ReactNode;
  /** Envelope body color */
  envelopeColor?: string;
  /** Envelope flap / liner color */
  flapColor?: string;
  /** Called when envelope is fully opened */
  onComplete?: () => void;
  className?: string;
}

type Phase = "sealed" | "opening" | "open";

/**
 * EnvelopeReveal — Sealed envelope with 3D flap animation.
 * Tap/Enter/Space → flap lifts via rotateX(-180deg), then inner card slides up.
 * prefers-reduced-motion → instant reveal. Reset button restores state.
 */
export function EnvelopeReveal({
  children,
  envelopeColor = "var(--primary)",
  flapColor = "var(--secondary)",
  onComplete,
  className,
}: EnvelopeRevealProps) {
  const [phase, setPhase] = useState<Phase>("sealed");

  const open = useCallback(() => {
    if (phase !== "sealed") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setPhase("open");
      onComplete?.();
      return;
    }

    setPhase("opening");
    // After flap opens (400ms), transition to open for card slide-up
    setTimeout(() => {
      setPhase("open");
      onComplete?.();
    }, 700);
  }, [phase, onComplete]);

  const reset = useCallback(() => {
    setPhase("sealed");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    },
    [open],
  );

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Envelope container */}
      <div
        role="button"
        tabIndex={phase === "sealed" ? 0 : -1}
        aria-label="Sealed envelope. Tap to open."
        onClick={open}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-[280px] h-[180px] cursor-pointer select-none",
          "rounded-lg overflow-hidden shadow-md",
          phase !== "sealed" && "pointer-events-none",
        )}
        style={{ perspective: "800px" }}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{ backgroundColor: envelopeColor }}
        />

        {/* Inner V-fold lines (decorative) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 280 180"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 0 L140 90 L280 0"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-text-tertiary"
            opacity="0.15"
          />
        </svg>

        {/* Card content — slides up from inside */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 top-[50px] z-10",
            "rounded-md bg-surface-raised shadow-sm",
            "flex items-center justify-center p-4 overflow-hidden",
          )}
          style={{
            transform:
              phase === "open"
                ? "translateY(0)"
                : "translateY(100%)",
            opacity: phase === "open" ? 1 : 0,
            transition:
              phase === "open"
                ? "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease"
                : "none",
          }}
        >
          {children}
        </div>

        {/* Flap — triangular, hinged at top */}
        <div
          className="absolute top-0 left-0 w-full z-20"
          style={{
            height: "50%",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            transform:
              phase === "sealed"
                ? "rotateX(0deg)"
                : "rotateX(-180deg)",
            transition:
              phase !== "sealed"
                ? "transform 400ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
          }}
        >
          {/* Flap front face */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backgroundColor: flapColor,
            }}
          />
          {/* Flap back face (visible when flipped) */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backgroundColor: envelopeColor,
              filter: "brightness(0.9)",
            }}
          />
        </div>

        {/* Seal dot (decorative, only when sealed) */}
        {phase === "sealed" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 z-30 rounded-full"
            style={{
              top: "42%",
              width: 20,
              height: 20,
              backgroundColor: flapColor,
              filter: "brightness(0.85)",
              boxShadow: "0 1px 3px oklch(0 0 0 / 0.15)",
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Reset button */}
      {phase === "open" && (
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
