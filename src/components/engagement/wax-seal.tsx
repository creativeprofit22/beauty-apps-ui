"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WaxSealProps {
  /** Content revealed beneath the seal */
  children: ReactNode;
  /** Seal color */
  sealColor?: string;
  /** Seal size in px */
  size?: number;
  /** Called when seal is fully broken */
  onComplete?: () => void;
  className?: string;
}

type Phase = "sealed" | "cracking" | "split" | "revealed";

/**
 * WaxSeal — Circular seal with fracture animation.
 * Tap → fracture lines animate in via SVG stroke-dashoffset (staggered).
 * Seal splits into halves with translateX/rotate. Content reveals beneath.
 * prefers-reduced-motion → instant reveal.
 */
export function WaxSeal({
  children,
  sealColor = "var(--secondary)",
  size = 120,
  onComplete,
  className,
}: WaxSealProps) {
  const [phase, setPhase] = useState<Phase>("sealed");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const breakSeal = useCallback(() => {
    if (phase !== "sealed") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setPhase("revealed");
      onComplete?.();
      return;
    }

    setPhase("cracking");

    // Fracture lines take ~800ms (staggered), then split
    const t1 = setTimeout(() => setPhase("split"), 800);
    const t2 = setTimeout(() => {
      setPhase("revealed");
      onComplete?.();
    }, 1200);

    timersRef.current = [t1, t2];
  }, [phase, onComplete]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("sealed");
  }, [clearTimers]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        breakSeal();
      }
    },
    [breakSeal],
  );

  const half = size / 2;
  const crackLength = size * 1.2;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        role="button"
        tabIndex={phase === "sealed" ? 0 : -1}
        aria-label="Wax seal. Tap to break open."
        onClick={breakSeal}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative cursor-pointer select-none",
          phase !== "sealed" && "pointer-events-none",
        )}
        style={{ width: size, height: size }}
      >
        {/* Content beneath seal */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden"
          style={{
            opacity: phase === "revealed" ? 1 : 0,
            transform: phase === "revealed" ? "scale(1)" : "scale(0.8)",
            transition:
              phase === "revealed"
                ? "opacity 300ms ease, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "none",
          }}
        >
          {children}
        </div>

        {/* Left half of seal */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)`,
            transform:
              phase === "split"
                ? "translateX(-20px) rotate(-10deg)"
                : phase === "revealed"
                  ? "translateX(-40px) rotate(-15deg)"
                  : "none",
            opacity: phase === "revealed" ? 0 : 1,
            transition:
              phase === "split" || phase === "revealed"
                ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease 100ms"
                : "none",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: sealColor,
              boxShadow:
                "inset 0 2px 4px oklch(1 0 0 / 0.15), inset 0 -2px 4px oklch(0 0 0 / 0.15), 0 2px 8px oklch(0 0 0 / 0.2)",
            }}
          />
        </div>

        {/* Right half of seal */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(50% 0, 100% 0, 100% 100%, 50% 100%)`,
            transform:
              phase === "split"
                ? "translateX(20px) rotate(10deg)"
                : phase === "revealed"
                  ? "translateX(40px) rotate(15deg)"
                  : "none",
            opacity: phase === "revealed" ? 0 : 1,
            transition:
              phase === "split" || phase === "revealed"
                ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease 100ms"
                : "none",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: sealColor,
              boxShadow:
                "inset 0 2px 4px oklch(1 0 0 / 0.15), inset 0 -2px 4px oklch(0 0 0 / 0.15), 0 2px 8px oklch(0 0 0 / 0.2)",
            }}
          />
        </div>

        {/* Seal emblem (lotus/star motif, visible when not cracked) */}
        {(phase === "sealed" || phase === "cracking") && (
          <svg
            className="absolute inset-0 w-full h-full z-10"
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            aria-hidden="true"
          >
            {/* Emblem — simple star/lotus */}
            <circle
              cx={half}
              cy={half}
              r={half * 0.35}
              stroke="oklch(1 0 0 / 0.25)"
              strokeWidth="1"
            />
            <circle
              cx={half}
              cy={half}
              r={half * 0.6}
              stroke="oklch(1 0 0 / 0.15)"
              strokeWidth="0.5"
            />
            {/* Star points */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = half + Math.cos(rad) * half * 0.25;
              const y1 = half + Math.sin(rad) * half * 0.25;
              const x2 = half + Math.cos(rad) * half * 0.55;
              const y2 = half + Math.sin(rad) * half * 0.55;
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="oklch(1 0 0 / 0.2)"
                  strokeWidth="0.75"
                />
              );
            })}
          </svg>
        )}

        {/* Fracture lines (SVG, animated during cracking phase) */}
        {(phase === "cracking" || phase === "split") && (
          <svg
            className="absolute inset-0 w-full h-full z-20"
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            aria-hidden="true"
          >
            {/* Fracture line 1 — top-left to bottom-right through center */}
            <line
              x1={half * 0.3}
              y1={half * 0.4}
              x2={half * 1.7}
              y2={half * 1.6}
              stroke="oklch(0 0 0 / 0.4)"
              strokeWidth="1.5"
              strokeDasharray={crackLength}
              strokeDashoffset={phase === "cracking" ? 0 : 0}
              style={{
                animation:
                  phase === "cracking"
                    ? `seal-crack 300ms ease-out forwards`
                    : "none",
                ["--crack-length" as string]: crackLength,
              }}
            />
            {/* Fracture line 2 — top to bottom through center */}
            <line
              x1={half}
              y1={half * 0.2}
              x2={half}
              y2={half * 1.8}
              stroke="oklch(0 0 0 / 0.35)"
              strokeWidth="1"
              strokeDasharray={crackLength}
              strokeDashoffset={crackLength}
              style={{
                animation:
                  phase === "cracking"
                    ? `seal-crack 300ms ease-out 200ms forwards`
                    : "none",
                ["--crack-length" as string]: crackLength,
              }}
            />
            {/* Fracture line 3 — bottom-left to top-right */}
            <line
              x1={half * 0.4}
              y1={half * 1.5}
              x2={half * 1.6}
              y2={half * 0.5}
              stroke="oklch(0 0 0 / 0.3)"
              strokeWidth="1"
              strokeDasharray={crackLength}
              strokeDashoffset={crackLength}
              style={{
                animation:
                  phase === "cracking"
                    ? `seal-crack 300ms ease-out 400ms forwards`
                    : "none",
                ["--crack-length" as string]: crackLength,
              }}
            />
          </svg>
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
