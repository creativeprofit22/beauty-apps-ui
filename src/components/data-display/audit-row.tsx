import { cn } from "@/lib/utils";
import { Avatar } from "@/components/primitives/avatar";

interface AuditRowProps {
  initials: string;
  verb: string;
  entity: string;
  timestamp: string;
  ip: string;
  className?: string;
}

export function AuditRow({
  initials,
  verb,
  entity,
  timestamp,
  ip,
  className,
}: AuditRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        "border-b border-border-muted last:border-b-0",
        "transition-colors duration-fast hover:bg-surface-interactive",
        className,
      )}
    >
      <Avatar size="sm" initials={initials} />

      <p className="flex-1 min-w-0 text-sm text-text-primary truncate">
        <span className="font-semibold">{verb}</span>{" "}
        <span className="text-text-secondary">{entity}</span>
      </p>

      <span className="shrink-0 text-xs font-data tabular-nums text-text-secondary whitespace-nowrap">
        {timestamp}
      </span>

      <span className="shrink-0 text-xs font-data tabular-nums text-text-tertiary whitespace-nowrap hidden sm:inline">
        {ip}
      </span>
    </div>
  );
}
