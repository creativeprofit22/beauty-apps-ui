"use client";

/**
 * PetalFall — CSS-only petal celebration
 * Alternative to confetti for spa + nail skins.
 * Uses petal-fall keyframe from effects.css with staggered delays.
 * Self-cleans on animationend. Null render on prefers-reduced-motion.
 */

import { useCallback, useEffect, useRef, useState } from "react";

interface PetalFallProps {
  colors: readonly string[];
  /** Number of petals (4-6) */
  count?: number;
}

const PETAL_DELAYS = [0, 0.15, 0.35, 0.5, 0.7, 0.9];

export function PetalFall({ colors, count = 5 }: PetalFallProps) {
  const [visible, setVisible] = useState(true);
  const finishedRef = useRef(0);
  const petalCount = Math.min(Math.max(count, 4), 6);

  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    finishedRef.current += 1;
    if (finishedRef.current >= petalCount) {
      setVisible(false);
    }
  }, [petalCount]);

  if (reducedMotion || !visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: petalCount }, (_, i) => (
        <div
          key={i}
          onAnimationEnd={handleAnimationEnd}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${15 + i * (70 / petalCount)}%`,
            width: "6px",
            height: "10px",
            borderRadius: "50% 0 50% 0",
            backgroundColor: colors[i % colors.length],
            animation: `petal-fall 1.6s ${PETAL_DELAYS[i]}s var(--ease-bloom) forwards`,
          }}
        />
      ))}
    </div>
  );
}
