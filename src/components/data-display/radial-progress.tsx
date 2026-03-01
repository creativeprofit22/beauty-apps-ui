"use client";

import { cn } from "@/lib/utils";

interface RadialProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

/**
 * RadialProgress — SVG circle progress indicator.
 * Animated stroke-dashoffset from 0 to value. Uses --accent for progress stroke,
 * --border-muted for track. Label centered inside.
 */
export function RadialProgress({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  className,
}: RadialProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${clamped}% progress`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-muted)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 600ms var(--ease-standard)",
          }}
        />
      </svg>
      {label && (
        <span className="absolute text-sm font-medium text-text-primary text-center leading-tight px-2">
          {label}
        </span>
      )}
    </div>
  );
}
