import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circle" | "card";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: "rounded-md",
  circle: "rounded-full",
  card: "rounded-xl",
};

const variantDefaults: Record<SkeletonVariant, { width: string; height: string }> = {
  text: { width: "100%", height: "1em" },
  circle: { width: "48px", height: "48px" },
  card: { width: "100%", height: "160px" },
};

/**
 * Skeleton — warm breathing loader placeholder.
 * Uses the `spa-skeleton` keyframe (defined in effects.css) with a shimmer gradient overlay.
 * Variants: text (single line), circle (avatar), card (rounded rect).
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  className,
}: SkeletonProps) {
  const defaults = variantDefaults[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-warm-2",
        variantClasses[variant],
        className,
      )}
      style={{
        width: width ?? defaults.width,
        height: height ?? defaults.height,
        animation: "spa-skeleton 2s ease-in-out infinite",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--surface-warm-1) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}
