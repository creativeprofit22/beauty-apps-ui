/**
 * FloralAccent — Single-line botanical SVG accent
 * Stroke-only, currentColor, used at low opacity as wallpaper texture.
 */

interface FloralAccentProps {
  className?: string;
}

export function FloralAccent({ className }: FloralAccentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.75}
      aria-hidden="true"
      className={className}
      style={{ opacity: 0.2 }}
    >
      {/* Flowing stem */}
      <path d="M8 32 C20 28 32 12 52 16 C72 20 80 8 112 12" />
      {/* Organic dots */}
      <circle cx="36" cy="14" r="2" />
      <circle cx="68" cy="12" r="1.5" />
      {/* Small leaf curve */}
      <path d="M88 10 C92 4 98 6 94 12" />
    </svg>
  );
}
