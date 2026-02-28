import { cn } from "@/lib/utils";

interface OfferCardProps {
  /** The big offer value, e.g. "20% OFF" or "$15" */
  offerValue: string;
  title: string;
  description?: string;
  /** Expiry percentage remaining 0–100 (100 = full time left) */
  expiryPercent?: number;
  expiryLabel?: string;
  className?: string;
}

/**
 * OfferCard — "Tear-Off Coupon" style.
 * Radial-gradient perforation cutouts, big offer value,
 * dashed separator, expiry bar (depleting, amber at 20%, pulse at 5%).
 */
export function OfferCard({
  offerValue,
  title,
  description,
  expiryPercent,
  expiryLabel,
  className,
}: OfferCardProps) {
  const isLow = expiryPercent !== undefined && expiryPercent <= 20;
  const isCritical = expiryPercent !== undefined && expiryPercent <= 5;

  return (
    <div
      className={cn(
        "relative rounded-xl bg-surface-raised shadow-card overflow-hidden",
        className,
      )}
    >
      {/* Top section: offer value */}
      <div className="px-5 pt-5 pb-4 text-center">
        <span className="font-display text-3xl font-bold tracking-tight text-primary">
          {offerValue}
        </span>
      </div>

      {/* Perforation cutouts + dashed separator */}
      <div className="relative flex items-center">
        {/* Left cutout */}
        <div
          className="absolute -left-2.5 w-5 h-5 rounded-full bg-surface-base"
          style={{
            boxShadow: "inset -2px 0 4px rgba(0,0,0,0.06)",
          }}
          aria-hidden="true"
        />
        {/* Dashed line */}
        <div className="flex-1 mx-5 border-t-2 border-dashed border-border" />
        {/* Right cutout */}
        <div
          className="absolute -right-2.5 w-5 h-5 rounded-full bg-surface-base"
          style={{
            boxShadow: "inset 2px 0 4px rgba(0,0,0,0.06)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom section: details + expiry */}
      <div className="px-5 pt-4 pb-5">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {description && (
          <p className="mt-1 text-xs text-text-secondary">{description}</p>
        )}

        {expiryPercent !== undefined && (
          <div className="mt-3">
            <div className="h-1.5 w-full rounded-full bg-surface-sunken overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-slow",
                  isCritical
                    ? "bg-error"
                    : isLow
                      ? "bg-warning"
                      : "bg-accent",
                )}
                style={{
                  width: `${Math.min(100, Math.max(0, expiryPercent))}%`,
                  animation: isCritical
                    ? "expiry-pulse 1.5s ease-in-out infinite"
                    : undefined,
                }}
              />
            </div>
            {expiryLabel && (
              <span
                className={cn(
                  "mt-1 block text-2xs",
                  isCritical
                    ? "text-error font-medium"
                    : isLow
                      ? "text-warning"
                      : "text-text-tertiary",
                )}
              >
                {expiryLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
