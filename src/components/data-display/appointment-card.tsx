import { cn } from "@/lib/utils";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface AppointmentCardProps {
  serviceName: string;
  staffName: string;
  dateTime: string;
  status: AppointmentStatus;
  onReschedule?: () => void;
  onCancel?: () => void;
  className?: string;
}

const statusBadge: Record<AppointmentStatus, { variant: "info" | "success" | "error"; label: string }> = {
  upcoming: { variant: "info", label: "Upcoming" },
  completed: { variant: "success", label: "Completed" },
  cancelled: { variant: "error", label: "Cancelled" },
};

/**
 * AppointmentCard — card showing service, staff, date/time, status badge,
 * and contextual action buttons.
 */
export function AppointmentCard({
  serviceName,
  staffName,
  dateTime,
  status,
  onReschedule,
  onCancel,
  className,
}: AppointmentCardProps) {
  const { variant, label } = statusBadge[status];

  return (
    <div
      className={cn(
        "rounded-xl bg-surface-raised shadow-card ring-1 ring-border/50 p-5",
        status === "cancelled" && "opacity-60",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "font-display text-base font-semibold text-text-primary truncate",
              status === "cancelled" && "line-through",
            )}
          >
            {serviceName}
          </h3>
          <p className="text-sm text-text-secondary mt-0.5">{staffName}</p>
          <p className="text-xs font-data tabular-nums text-text-tertiary mt-1">{dateTime}</p>
        </div>

        <Badge variant={variant}>
          {status === "completed" && (
            <svg
              className="w-3 h-3 mr-1"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 6.5L5 9l4.5-6" />
            </svg>
          )}
          {label}
        </Badge>
      </div>

      {status === "upcoming" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="ghost" onClick={onReschedule}>
            Reschedule
          </Button>
          <Button size="sm" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
