import { cn } from "@/lib/utils";

type StatusState = "live" | "paused" | "draft" | "connected" | "disconnected";

interface StatusIndicatorProps {
  state: StatusState;
  className?: string;
}

const stateConfig: Record<StatusState, { label: string; dotClass: string; textClass: string }> = {
  live: {
    label: "Live",
    dotClass: "bg-[oklch(0.65_0.2_145)]",
    textClass: "text-[oklch(0.38_0.12_145)]",
  },
  paused: {
    label: "Paused",
    dotClass: "bg-[oklch(0.75_0.15_75)]",
    textClass: "text-[oklch(0.42_0.12_75)]",
  },
  draft: {
    label: "Draft",
    dotClass: "bg-text-tertiary",
    textClass: "text-text-tertiary",
  },
  connected: {
    label: "Connected",
    dotClass: "bg-[oklch(0.65_0.2_145)]",
    textClass: "text-[oklch(0.38_0.12_145)]",
  },
  disconnected: {
    label: "Disconnected",
    dotClass: "bg-text-tertiary",
    textClass: "text-text-tertiary",
  },
};

export function StatusIndicator({ state, className }: StatusIndicatorProps) {
  const config = stateConfig[state];
  const isLive = state === "live";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative flex h-2 w-2 shrink-0">
        {isLive && (
          <span
            className={cn(
              "absolute inset-0 rounded-full opacity-75",
              config.dotClass,
            )}
            style={{ animation: "led-pulse 2s ease-in-out infinite" }}
            aria-hidden="true"
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", config.dotClass)} />
      </span>
      <span className={cn("text-xs font-medium", config.textClass)}>
        {config.label}
      </span>
    </span>
  );
}
