"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DonutChartSegment {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutChartSegment[];
  /** Center label text (e.g. total, percentage) */
  centerLabel?: string;
  /** Center sub-label text */
  centerSub?: string;
  /** Diameter */
  size?: number;
  /** Ring thickness */
  strokeWidth?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  "var(--primary)",
  "var(--secondary)",
  "var(--accent)",
  "var(--success)",
  "var(--warning)",
  "var(--info)",
  "var(--mauve)",
  "var(--terra)",
];

export function DonutChart({
  data,
  centerLabel,
  centerSub,
  size = 180,
  strokeWidth = 24,
  className,
}: DonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Build segments with cumulative offsets
  let accumulated = 0;
  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const dashLength = fraction * circumference;
    const gap = circumference - dashLength;
    const offset = -accumulated * circumference + circumference * 0.25; // start at 12 o'clock
    accumulated += fraction;
    return {
      ...d,
      dashArray: `${dashLength} ${gap}`,
      offset,
      color: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
    };
  });

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Donut chart"
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--border-muted)"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={mounted ? seg.dashArray : `0 ${circumference}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              style={{
                transition: `stroke-dasharray 800ms var(--ease-standard) ${i * 120}ms`,
              }}
            />
          ))}
        </svg>

        {/* Center label */}
        {(centerLabel || centerSub) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerLabel && (
              <span
                className="font-data text-xl font-semibold text-text-primary tabular-nums leading-none"
                style={{ opacity: mounted ? 1 : 0, transition: "opacity 600ms var(--ease-standard) 400ms" }}
              >
                {centerLabel}
              </span>
            )}
            {centerSub && (
              <span
                className="text-xs text-text-tertiary mt-0.5"
                style={{ opacity: mounted ? 1 : 0, transition: "opacity 600ms var(--ease-standard) 500ms" }}
              >
                {centerSub}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
              aria-hidden="true"
            />
            <span>{seg.label}</span>
            <span className="font-data tabular-nums text-text-tertiary">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
