"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Tier = "bronze" | "silver" | "gold" | "black";

interface TierUpgradeProps {
  /** Whether the overlay is visible */
  active: boolean;
  /** The new tier to display */
  tier: Tier;
  /** Called when animation completes and overlay should dismiss */
  onDismiss?: () => void;
  /** Auto-dismiss delay in ms (default 3000) */
  dismissDelay?: number;
}

const tierLabels: Record<Tier, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  black: "Black Diamond",
};

const tierGradients: Record<Tier, string> = {
  bronze:
    "radial-gradient(circle, oklch(0.60 0.10 55 / 0.8) 0%, oklch(0.60 0.10 55 / 0) 70%)",
  silver:
    "radial-gradient(circle, oklch(0.72 0.02 265 / 0.8) 0%, oklch(0.72 0.02 265 / 0) 70%)",
  gold: "radial-gradient(circle, oklch(0.76 0.12 85 / 0.8) 0%, oklch(0.76 0.12 85 / 0) 70%)",
  black:
    "radial-gradient(circle, oklch(0.25 0.01 60 / 0.9) 0%, oklch(0.25 0.01 60 / 0) 70%)",
};

const tierBadgeColors: Record<Tier, string> = {
  bronze: "text-tier-bronze",
  silver: "text-tier-silver",
  gold: "text-tier-gold",
  black: "text-tier-black",
};

/**
 * TierUpgrade — Full-screen overlay.
 * Radial gradient ink-bleed wash (scale 0→3, opacity arc, 1200ms),
 * tier badge scales up with spring easing, auto-dismiss.
 */
export function TierUpgrade({
  active,
  tier,
  onDismiss,
  dismissDelay = 3000,
}: TierUpgradeProps) {
  const [phase, setPhase] = useState<"idle" | "wash" | "badge" | "out">("idle");

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }

    setPhase("wash");

    const badgeTimer = setTimeout(() => setPhase("badge"), 600);
    const outTimer = setTimeout(() => setPhase("out"), dismissDelay - 400);
    const dismissTimer = setTimeout(() => {
      setPhase("idle");
      onDismiss?.();
    }, dismissDelay);

    return () => {
      clearTimeout(badgeTimer);
      clearTimeout(outTimer);
      clearTimeout(dismissTimer);
    };
  }, [active, dismissDelay, onDismiss]);

  if (phase === "idle") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-live="polite"
      role="status"
    >
      {/* Ink bleed wash */}
      <div
        className={cn(
          "absolute inset-0",
          phase === "out" && "transition-opacity duration-slow ease-standard opacity-0",
        )}
        style={{
          background: tierGradients[tier],
          animation:
            phase !== "out" ? "ink-bleed 1200ms ease-out forwards" : undefined,
        }}
      />

      {/* Tier badge */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-3",
          "transition-all duration-slower",
          phase === "badge"
            ? "scale-100 opacity-100"
            : phase === "out"
              ? "scale-110 opacity-0"
              : "scale-50 opacity-0",
        )}
        style={{
          transitionTimingFunction:
            phase === "badge"
              ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
              : undefined,
        }}
      >
        {/* Crown/star icon */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          className={tierBadgeColors[tier]}
          aria-hidden="true"
        >
          <path
            d="M32 4L39.5 22L58 24L44 38L48 57L32 48L16 57L20 38L6 24L24.5 22L32 4Z"
            fill="currentColor"
          />
        </svg>

        <span
          className={cn(
            "font-display text-3xl font-bold tracking-tight",
            tierBadgeColors[tier],
          )}
        >
          {tierLabels[tier]}
        </span>
        <span className="text-sm text-text-secondary">
          Tier Unlocked
        </span>
      </div>
    </div>
  );
}
