"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BarChartItem {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartItem[];
  /** Height in px */
  height?: number;
  className?: string;
}

const PADDING = { top: 24, right: 12, bottom: 32, left: 48 };

export function BarChart({
  data,
  height = 240,
  className,
}: BarChartProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value));
  const width = 500;
  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;

  const barGap = 8;
  const barWidth = Math.min(
    48,
    (chartW - barGap * (data.length - 1)) / data.length,
  );
  const totalBarsWidth =
    barWidth * data.length + barGap * (data.length - 1);
  const offsetX = PADDING.left + (chartW - totalBarsWidth) / 2;

  // Grid lines
  const gridLines = 4;
  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) =>
    Math.round((maxVal * i) / gridLines),
  );

  const defaultColors = [
    "var(--primary)",
    "var(--secondary)",
    "var(--accent)",
    "var(--success)",
    "var(--warning)",
    "var(--info)",
    "var(--mauve)",
    "var(--terra)",
  ];

  return (
    <div className={cn("relative select-none", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height: "auto" }}
        role="img"
        aria-label="Bar chart"
      >
        {/* Horizontal grid lines */}
        {yTicks.map((tick, i) => {
          const y = PADDING.top + chartH - (tick / maxVal) * chartH;
          return (
            <g key={i}>
              <line
                x1={PADDING.left}
                x2={PADDING.left + chartW}
                y1={y}
                y2={y}
                stroke="var(--border-muted)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={PADDING.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-text-tertiary"
                style={{ fontSize: "11px", fontFamily: "var(--font-family-data)" }}
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = maxVal > 0 ? (d.value / maxVal) * chartH : 0;
          const x = offsetX + i * (barWidth + barGap);
          const y = PADDING.top + chartH - barH;
          const fill = d.color ?? defaultColors[i % defaultColors.length];
          const isHovered = hoveredIdx === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              {/* Bar */}
              <rect
                x={x}
                y={mounted ? y : PADDING.top + chartH}
                width={barWidth}
                height={mounted ? barH : 0}
                rx={4}
                fill={fill}
                opacity={isHovered ? 1 : 0.85}
                style={{
                  transition: `y 800ms var(--ease-spring) ${i * 80}ms, height 800ms var(--ease-spring) ${i * 80}ms, opacity 200ms var(--ease-standard)`,
                }}
              />

              {/* Value label on top */}
              <text
                x={x + barWidth / 2}
                y={mounted ? y - 6 : PADDING.top + chartH - 6}
                textAnchor="middle"
                className="fill-text-primary"
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-family-data)",
                  fontWeight: 600,
                  opacity: mounted ? 1 : 0,
                  transition: `opacity 400ms var(--ease-standard) ${400 + i * 80}ms, y 800ms var(--ease-spring) ${i * 80}ms`,
                }}
              >
                {d.value}
              </text>

              {/* X label */}
              <text
                x={x + barWidth / 2}
                y={height - 8}
                textAnchor="middle"
                className="fill-text-tertiary"
                style={{ fontSize: "10px", fontFamily: "var(--font-family-data)" }}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
