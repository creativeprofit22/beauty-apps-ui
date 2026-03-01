"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GiftBoxProps {
  /** Content revealed inside the box */
  children: ReactNode;
  /** Box body color */
  boxColor?: string;
  /** Ribbon color */
  ribbonColor?: string;
  /** Called when gift is fully revealed */
  onComplete?: () => void;
  /** Auto-reset delay in ms (0 = no auto-reset) */
  autoResetDelay?: number;
  className?: string;
}

type Phase = "wrapped" | "untying" | "lifting" | "revealed";

/**
 * GiftBox — Box with ribbon cross.
 * Tap ribbon → ribbon unties via SVG stroke-dashoffset (600ms).
 * After ribbon → lid lifts (400ms spring). Reward floats up.
 * Self-cleans after 3s. Skin-configurable ribbon/box colors.
 */
export function GiftBox({
  children,
  boxColor = "var(--primary)",
  ribbonColor = "var(--accent)",
  onComplete,
  autoResetDelay = 0,
  className,
}: GiftBoxProps) {
  const [phase, setPhase] = useState<Phase>("wrapped");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const open = useCallback(() => {
    if (phase !== "wrapped") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setPhase("revealed");
      onComplete?.();
      return;
    }

    setPhase("untying");

    const t1 = setTimeout(() => setPhase("lifting"), 600);
    const t2 = setTimeout(() => {
      setPhase("revealed");
      onComplete?.();
    }, 1000);

    timersRef.current = [t1, t2];

    if (autoResetDelay > 0) {
      const t3 = setTimeout(() => setPhase("wrapped"), 1000 + autoResetDelay);
      timersRef.current.push(t3);
    }
  }, [phase, onComplete, autoResetDelay]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("wrapped");
  }, [clearTimers]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    },
    [open],
  );

  // Ribbon SVG dash length
  const ribbonDash = 400;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        role="button"
        tabIndex={phase === "wrapped" ? 0 : -1}
        aria-label="Gift box. Tap to unwrap."
        onClick={open}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative w-[200px] h-[200px] cursor-pointer select-none",
          phase !== "wrapped" && "pointer-events-none",
        )}
      >
        {/* Box body */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-lg shadow-md"
          style={{
            height: "65%",
            backgroundColor: boxColor,
          }}
        />

        {/* Box lid */}
        <div
          className="absolute top-[10%] left-[-4%] right-[-4%] rounded-t-md shadow-sm z-10"
          style={{
            height: "30%",
            backgroundColor: boxColor,
            filter: "brightness(1.08)",
            transformOrigin: "bottom center",
            transform:
              phase === "lifting" || phase === "revealed"
                ? "translateY(-30px) rotateX(-20deg)"
                : "translateY(0) rotateX(0deg)",
            transition:
              phase === "lifting" || phase === "revealed"
                ? "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "none",
            opacity: phase === "revealed" ? 0.6 : 1,
          }}
        />

        {/* Ribbon cross (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full z-20"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
          style={{
            opacity:
              phase === "untying" || phase === "lifting" || phase === "revealed"
                ? 0
                : 1,
            transition: "opacity 600ms ease-out",
          }}
        >
          {/* Vertical ribbon */}
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="200"
            stroke={ribbonColor}
            strokeWidth="14"
            strokeDasharray={ribbonDash}
            strokeDashoffset={
              phase === "untying" ? ribbonDash : 0
            }
            style={{
              transition:
                phase === "untying"
                  ? "stroke-dashoffset 600ms ease-out"
                  : "none",
            }}
          />
          {/* Horizontal ribbon */}
          <line
            x1="0"
            y1="80"
            x2="200"
            y2="80"
            stroke={ribbonColor}
            strokeWidth="14"
            strokeDasharray={ribbonDash}
            strokeDashoffset={
              phase === "untying" ? ribbonDash : 0
            }
            style={{
              transition:
                phase === "untying"
                  ? "stroke-dashoffset 600ms ease-out 100ms"
                  : "none",
            }}
          />
          {/* Bow */}
          <ellipse
            cx="100"
            cy="68"
            rx="18"
            ry="12"
            fill={ribbonColor}
            style={{ filter: "brightness(1.1)" }}
          />
          <ellipse
            cx="80"
            cy="72"
            rx="14"
            ry="8"
            fill={ribbonColor}
            transform="rotate(-20, 80, 72)"
          />
          <ellipse
            cx="120"
            cy="72"
            rx="14"
            ry="8"
            fill={ribbonColor}
            transform="rotate(20, 120, 72)"
          />
        </svg>

        {/* Revealed content — floats up */}
        <div
          className={cn(
            "absolute inset-x-4 bottom-[15%] top-[25%] z-30",
            "flex items-center justify-center",
          )}
          style={{
            transform:
              phase === "revealed" ? "translateY(-20px)" : "translateY(20px)",
            opacity: phase === "revealed" ? 1 : 0,
            transition:
              phase === "revealed"
                ? "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease"
                : "none",
          }}
        >
          {children}
        </div>
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
