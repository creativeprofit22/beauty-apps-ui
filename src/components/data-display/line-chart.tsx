"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LineChartPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartPoint[];
  /** Y-axis label */
  yLabel?: string;
  /** Height in px */
  height?: number;
  /** Stroke color — CSS custom property or color */
  color?: string;
  className?: string;
}

const PADDING = { top: 20, right: 20, bottom: 32, left: 48 };

export function LineChart({
  data,
  yLabel,
  height = 240,
  color = "var(--primary)",
  className,
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPolylineElement>(null);
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;

  // Compute nice Y ticks (4 lines)
  const gridLines = 4;
  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) =>
    Math.round(minVal + (range * i) / gridLines),
  );

  const width = 500;
  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;

  const xStep = data.length > 1 ? chartW / (data.length - 1) : 0;

  const points = data.map((d, i) => ({
    x: PADDING.left + i * xStep,
    y: PADDING.top + chartH - ((d.value - minVal) / range) * chartH,
    ...d,
  }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Estimate total path length for stroke-dashoffset animation
  let totalLength = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i]!.x - points[i - 1]!.x;
    const dy = points[i]!.y - points[i - 1]!.y;
    totalLength += Math.sqrt(dx * dx + dy * dy);
  }

  return (
    <div className={cn("relative select-none", className)}>
      {yLabel && (
        <span className="absolute -left-1 top-0 text-2xs font-medium uppercase tracking-widest text-text-tertiary -rotate-90 origin-left translate-y-16">
          {yLabel}
        </span>
      )}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height: "auto" }}
        role="img"
        aria-label="Line chart"
      >
        {/* Horizontal grid lines */}
        {yTicks.map((tick, i) => {
          const y =
            PADDING.top + chartH - ((tick - minVal) / range) * chartH;
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

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            className="fill-text-tertiary"
            style={{ fontSize: "11px", fontFamily: "var(--font-family-data)" }}
          >
            {p.label}
          </text>
        ))}

        {/* Polyline */}
        <polyline
          ref={pathRef}
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={mounted ? 0 : totalLength}
          style={{
            transition: `stroke-dashoffset 1200ms var(--ease-standard)`,
          }}
        />

        {/* Data dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--surface-raised)"
            stroke={color}
            strokeWidth="2"
            className="cursor-pointer"
            style={{
              opacity: mounted ? 1 : 0,
              transition: `opacity 400ms var(--ease-standard) ${600 + i * 80}ms`,
            }}
            onMouseEnter={() =>
              setTooltip({ x: p.x, y: p.y, label: p.label, value: p.value })
            }
            onMouseLeave={() => setTooltip(null)}
          />
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltip.x - 36}
              y={tooltip.y - 36}
              width="72"
              height="28"
              rx="6"
              fill="var(--surface-overlay)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 22}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-primary"
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-family-data)",
                fontWeight: 600,
              }}
            >
              {tooltip.label}: {tooltip.value}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
