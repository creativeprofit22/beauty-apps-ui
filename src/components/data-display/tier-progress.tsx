import { cn } from "@/lib/utils";
import { Badge } from "@/components/primitives/badge";

type Tier = "bronze" | "silver" | "gold" | "black";

interface TierProgressProps {
  currentTier: Tier;
  nextTier: Tier;
  currentPoints: number;
  targetPoints: number;
  className?: string;
}

const tierOrder: Tier[] = ["bronze", "silver", "gold", "black"];

/**
 * TierProgress — horizontal progress bar between two tier badges.
 * Fill uses a gradient from current tier color to next tier color.
 * Points label shown centered below the bar.
 */
export function TierProgress({
  currentTier,
  nextTier,
  currentPoints,
  targetPoints,
  className,
}: TierProgressProps) {
  const percent = Math.min(100, Math.max(0, (currentPoints / targetPoints) * 100));
  const isMaxTier = tierOrder.indexOf(currentTier) >= tierOrder.indexOf(nextTier);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-3">
        <Badge tier={currentTier} className="shrink-0">
          {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
        </Badge>

        <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-slow"
            style={{
              width: `${isMaxTier ? 100 : percent}%`,
              background: isMaxTier
                ? `var(--tier-${currentTier})`
                : `linear-gradient(90deg, var(--tier-${currentTier}), var(--tier-${nextTier}))`,
            }}
          />
        </div>

        <Badge tier={nextTier} className="shrink-0">
          {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
        </Badge>
      </div>

      <p className="text-center text-xs font-data tabular-nums text-text-secondary">
        {isMaxTier
          ? "Max tier reached"
          : `${currentPoints.toLocaleString()} / ${targetPoints.toLocaleString()} pts`}
      </p>
    </div>
  );
}
