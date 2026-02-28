import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  /** Progress 0–100 for the horizon bar */
  progress?: number;
  /** Optional icon to the left of the value */
  icon?: ReactNode;
  className?: string;
}

/**
 * StatCard — "Instrument Gauge" style.
 * Large tabular-nums value, small uppercase label,
 * progress horizon bar with glowing tip,
 * optional text-shadow glow in dark mode.
 */
export function StatCard({
  value,
  label,
  progress,
  icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-raised shadow-card",
        "p-5 flex flex-col gap-2",
        className,
      )}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary select-none">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-primary shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span
          className={cn(
            "font-data text-metric-lg font-semibold tracking-tight text-text-primary leading-none",
            "tabular-nums",
          )}
          style={{
            textShadow: "var(--glow-primary, none)",
          }}
        >
          {value}
        </span>
      </div>

      {progress !== undefined && (
        <div className="mt-1">
          <div className="h-1 w-full rounded-full bg-surface-sunken overflow-hidden">
            <div
              className="h-full rounded-full bg-primary relative"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            >
              {/* Glowing tip */}
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                style={{
                  boxShadow: "var(--glow-primary)",
                  animation: "led-pulse 2s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
