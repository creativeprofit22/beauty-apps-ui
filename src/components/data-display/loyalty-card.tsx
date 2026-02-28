import { cn } from "@/lib/utils";

type LoyaltyTier = "bronze" | "silver" | "gold" | "black";

interface LoyaltyCardProps {
  tier: LoyaltyTier;
  memberName: string;
  memberId: string;
  /** Watermark SVG data URI or inline SVG string */
  watermarkSvg?: string;
  className?: string;
}

const tierGradients: Record<LoyaltyTier, string> = {
  bronze:
    "linear-gradient(135deg, var(--tier-bronze), color-mix(in oklch, var(--tier-bronze) 80%, black), var(--tier-bronze))",
  silver:
    "linear-gradient(135deg, var(--tier-silver), color-mix(in oklch, var(--tier-silver) 80%, black), var(--tier-silver))",
  gold:
    "linear-gradient(135deg, var(--tier-gold), color-mix(in oklch, var(--tier-gold) 80%, black), var(--tier-gold))",
  black:
    "linear-gradient(135deg, var(--tier-black), color-mix(in oklch, var(--tier-black) 70%, black), var(--tier-black))",
};

const tierTextColor: Record<LoyaltyTier, string> = {
  bronze: "text-white",
  silver: "text-text-primary",
  gold: "text-text-primary",
  black: "text-white",
};

/**
 * LoyaltyCard — "Embossed Membership Card" style.
 * 1.586:1 aspect ratio (credit card), watermark SVG pattern + skin gradient background,
 * foil ::before sheen, embossed tier text via text-shadow, three-layer shadow.
 */
export function LoyaltyCard({
  tier,
  memberName,
  memberId,
  watermarkSvg,
  className,
}: LoyaltyCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-card select-none",
        tierTextColor[tier],
        className,
      )}
      style={{
        aspectRatio: "1.586 / 1",
        background: tierGradients[tier],
      }}
    >
      {/* Watermark pattern */}
      {watermarkSvg && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(watermarkSvg)}")`,
            backgroundSize: "40%",
            backgroundRepeat: "repeat",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
      )}

      {/* Foil sheen overlay */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "sheen 3s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        {/* Tier badge */}
        <div className="flex items-start justify-between">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              textShadow:
                tier === "black"
                  ? "0 1px 2px rgba(255,255,255,0.15)"
                  : "0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            {tier} member
          </span>
        </div>

        {/* Bottom section: name + ID */}
        <div className="flex flex-col gap-1">
          <span
            className="text-lg font-semibold tracking-wide truncate"
            style={{
              textShadow:
                tier === "black"
                  ? "0 1px 3px rgba(255,255,255,0.12), 0 -1px 0 rgba(0,0,0,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.1), 0 -1px 0 rgba(255,255,255,0.4)",
            }}
          >
            {memberName}
          </span>
          <span className="font-data text-xs tracking-wider tabular-nums opacity-80 truncate">
            {memberId}
          </span>
        </div>
      </div>
    </div>
  );
}
