import { cn } from "@/lib/utils";

interface SparkBarProps {
  /** Percentage 0–100 */
  percent: number;
  className?: string;
}

/**
 * SparkBar — inline 4px bar for trend columns.
 * Driven by --bar-pct CSS variable.
 */
export function SparkBar({ percent, className }: SparkBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={cn(
        "inline-flex items-center h-1 w-16 rounded-full bg-surface-sunken overflow-hidden",
        className,
      )}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ ["--bar-pct" as string]: `${clamped}%` }}
    >
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: "var(--bar-pct)" }}
      />
    </div>
  );
}
