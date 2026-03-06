"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/primitives/avatar";
import { Badge } from "@/components/primitives/badge";

interface ActivityItem {
  id: string;
  initials: string;
  action: string;
  timestamp: string;
  detail?: { label: string; variant?: "default" | "success" | "warning" | "error" | "info" };
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline connector line */}
      <div
        className="absolute left-4 top-4 bottom-4 w-px bg-border"
        aria-hidden="true"
      />

      <ul className="relative space-y-0" role="list">
        {items.map((item, i) => (
          <li
            key={item.id}
            className="stagger-child relative flex gap-3 py-3 first:pt-0 last:pb-0"
            style={{ paddingLeft: 0 }}
          >
            {/* Avatar sits on top of the timeline line */}
            <div className="relative z-10 shrink-0">
              <Avatar size="sm" initials={item.initials} />
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-text-primary leading-snug">
                {item.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-tertiary font-data tabular-nums">
                  {item.timestamp}
                </span>
                {item.detail && (
                  <Badge variant={item.detail.variant ?? "default"}>
                    {item.detail.label}
                  </Badge>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
