"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { StatusIndicator } from "@/components/feedback/status-indicator";

interface IntegrationCardProps {
  icon: ReactNode;
  name: string;
  connected?: boolean;
  apiKey?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  className?: string;
}

export function IntegrationCard({
  icon,
  name,
  connected = false,
  apiKey = "",
  onConnect,
  onDisconnect,
  className,
}: IntegrationCardProps) {
  const [revealed, setRevealed] = useState(false);
  const maskedKey = apiKey ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" + apiKey.slice(-4) : "";

  return (
    <div
      className={cn(
        "rounded-xl bg-surface-raised [box-shadow:var(--elevation-card-highlight),var(--elevation-card)] ring-1 ring-border/50",
        "p-5 flex flex-col gap-4",
        className,
      )}
    >
      {/* Header: icon + name + status */}
      <div className="flex items-center gap-3">
        <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-surface-interactive text-text-secondary" aria-hidden="true">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{name}</p>
          <StatusIndicator state={connected ? "connected" : "disconnected"} />
        </div>
      </div>

      {/* API Key field */}
      {apiKey && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-tertiary select-none">API Key</label>
          <div className="relative flex items-center">
            <div className="w-full rounded-md bg-surface-warm-2 px-3 py-2 border border-border text-sm text-text-secondary shadow-inset font-data tracking-wide truncate pr-9">
              {revealed ? apiKey : maskedKey}
            </div>
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="absolute right-2 flex items-center justify-center w-6 h-6 text-text-tertiary hover:text-text-primary transition-colors"
              aria-label={revealed ? "Hide API key" : "Reveal API key"}
            >
              {revealed ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M6.5 6.6a2 2 0 002.9 2.8M3.2 5.5C2.2 6.4 1.5 7.5 1.5 8c.7 2.2 3.4 4 6.5 4 .9 0 1.7-.1 2.5-.4M10.4 10.4C12.2 9.4 13.5 7.8 14.5 8c-.7-2.2-3.4-4-6.5-4-.6 0-1.1.1-1.6.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1.5 8c.7-2.2 3.4-4 6.5-4s5.8 1.8 6.5 4c-.7 2.2-3.4 4-6.5 4s-5.8-1.8-6.5-4z" stroke="currentColor" strokeWidth="1.25" />
                  <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Action */}
      <Button
        variant={connected ? "ghost" : "primary"}
        size="sm"
        onClick={connected ? onDisconnect : onConnect}
      >
        {connected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
}
