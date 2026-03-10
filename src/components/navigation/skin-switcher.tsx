"use client";

import { cn } from "@/lib/utils";
import { useSkin } from "@/hooks/useSkin";
import { SKIN_NAMES, skinRegistry } from "@/lib/skin-registry";

/**
 * SkinSwitcher — runtime skin selector.
 * Renders a compact row of buttons, one per skin.
 */
export function SkinSwitcher() {
  const { skin, setSkin } = useSkin();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-xs text-text-tertiary">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        Skin
      </label>
      <div className="grid grid-cols-2 gap-1 rounded-md border border-border overflow-hidden">
        {SKIN_NAMES.map((name) => (
          <button
            key={name}
            onClick={() => setSkin(name)}
            className={cn(
              "px-2 py-2 text-xs font-semibold transition-colors min-h-[44px]",
              skin === name
                ? "bg-primary text-on-primary"
                : "bg-surface-interactive text-text-secondary hover:text-text-primary",
            )}
            style={{ transitionDuration: "var(--duration-normal)" }}
            aria-pressed={skin === name}
          >
            {skinRegistry[name].label}
          </button>
        ))}
      </div>
    </div>
  );
}
