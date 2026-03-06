import { cn } from "@/lib/utils";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Badge } from "@/components/primitives/badge";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface PlanCardProps {
  name: string;
  price: string;
  interval: string;
  features: PlanFeature[];
  ctaLabel?: string;
  popular?: boolean;
  onSelect?: () => void;
  className?: string;
}

/**
 * PlanCard — Membership plan comparison card.
 * Vertical layout: plan name, price/interval, feature checklist, CTA button.
 * "Popular" variant adds accent border and "Most Popular" badge.
 */
export function PlanCard({
  name,
  price,
  interval,
  features,
  ctaLabel = "Get Started",
  popular = false,
  onSelect,
  className,
}: PlanCardProps) {
  return (
    <Card
      hover
      className={cn(
        "flex flex-col p-6",
        popular && "ring-2 ring-accent relative",
        className,
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="info">Most Popular</Badge>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-sm font-medium uppercase tracking-widest text-text-tertiary">
        {name}
      </h3>

      {/* Price */}
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-data text-metric-lg font-semibold tracking-tight text-text-primary tabular-nums">
          {price}
        </span>
        <span className="text-sm text-text-secondary">/{interval}</span>
      </div>

      {/* Feature list */}
      <ul className="mt-6 flex-1 space-y-3" role="list">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-2 text-sm">
            {feature.included ? (
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.55_0.18_145)]"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8.5L6.5 11.5L12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary opacity-40"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 8H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            <span
              className={cn(
                "text-text-secondary",
                !feature.included && "opacity-50",
              )}
            >
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={popular ? "cta" : "secondary"}
        className="mt-6 w-full"
        onClick={onSelect}
      >
        {ctaLabel}
      </Button>
    </Card>
  );
}
