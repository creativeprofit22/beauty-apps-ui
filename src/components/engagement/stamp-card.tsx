import { cn } from "@/lib/utils";

interface StampCardProps {
  /** Total number of stamps (default 10 for 5×2 grid) */
  total?: number;
  /** Number of stamps earned */
  earned: number;
  className?: string;
}

/**
 * StampCard — 5×2 grid of circular stamps.
 * Earned = filled accent with SVG check icon.
 * Next = dashed border + pulse animation.
 * Future = dashed border, dim.
 */
export function StampCard({
  total = 10,
  earned,
  className,
}: StampCardProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-5 gap-3 rounded-xl bg-surface-raised p-4 shadow-card",
        className,
      )}
      role="img"
      aria-label={`Stamp card: ${earned} of ${total} stamps earned`}
    >
      {Array.from({ length: total }, (_, i) => {
        const isEarned = i < earned;
        const isNext = i === earned;

        return (
          <div
            key={i}
            className={cn(
              "flex items-center justify-center rounded-full",
              "size-10 min-h-[44px] min-w-[44px]",
              "transition-all duration-normal ease-standard",
              isEarned && "bg-accent text-text-on-accent shadow-sm",
              isNext &&
                "border-2 border-dashed border-accent",
              !isEarned &&
                !isNext &&
                "border-2 border-dashed border-border-muted",
            )}
            style={
              isNext
                ? { animation: "stamp-pulse 2s ease-in-out infinite" }
                : undefined
            }
          >
            {isEarned && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4.5 10.5L8.5 14.5L15.5 6.5" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
