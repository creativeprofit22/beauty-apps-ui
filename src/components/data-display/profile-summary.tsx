"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/primitives/card";
import { Avatar } from "@/components/primitives/avatar";
import { Badge } from "@/components/primitives/badge";

type ProfileTier = "bronze" | "silver" | "gold" | "black";

interface ProfileStat {
  label: string;
  value: string;
}

interface ProfileSummaryProps {
  name: string;
  avatarSrc?: string;
  initials?: string;
  tier: ProfileTier;
  stats: ProfileStat[];
  onEdit?: () => void;
  className?: string;
}

/**
 * ProfileSummary — Compact profile card.
 * Avatar on left, name + tier badge, stats row, edit icon button top-right.
 */
export function ProfileSummary({
  name,
  avatarSrc,
  initials,
  tier,
  stats,
  onEdit,
  className,
}: ProfileSummaryProps) {
  return (
    <Card className={cn("relative p-5", className)}>
      {/* Edit button */}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="absolute top-4 right-4 p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-interactive-hover transition-colors"
          style={{ transitionDuration: "var(--duration-fast)" }}
          aria-label="Edit profile"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar
          size="lg"
          src={avatarSrc}
          initials={initials}
          tier={tier}
          alt={name}
        />

        {/* Name + tier */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-primary truncate">
            {name}
          </h3>
          <Badge tier={tier} className="mt-1">
            {tier.charAt(0).toUpperCase() + tier.slice(1)} Member
          </Badge>
        </div>
      </div>

      {/* Stats row */}
      {stats.length > 0 && (
        <div className="mt-4 flex divide-x divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 px-3 first:pl-0 last:pr-0 text-center">
              <span className="block font-data text-sm font-semibold text-text-primary tabular-nums">
                {stat.value}
              </span>
              <span className="block text-xs text-text-tertiary mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
