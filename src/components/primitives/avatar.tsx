"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";
type AvatarTier = "bronze" | "silver" | "gold" | "black";

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  size?: AvatarSize;
  initials?: string;
  tier?: AvatarTier;
  disabled?: boolean;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

const tierRingClasses: Record<AvatarTier, string> = {
  bronze: "ring-2 ring-tier-bronze",
  silver: "ring-2 ring-tier-silver",
  gold: "ring-2 ring-tier-gold",
  black: "ring-2 ring-tier-black",
};

export function Avatar({
  size = "md",
  src,
  alt = "",
  initials,
  tier,
  disabled,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full",
        "bg-surface-warm-3 font-medium text-text-secondary",
        "overflow-hidden select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        sizeClasses[size],
        tier && tierRingClasses[tier],
        disabled && "opacity-50",
        className,
      )}
      role="img"
      aria-label={alt || initials || "Avatar"}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
          {...props}
        />
      ) : (
        <span aria-hidden="true">
          {initials?.slice(0, 2).toUpperCase() ?? "?"}
        </span>
      )}
    </span>
  );
}
