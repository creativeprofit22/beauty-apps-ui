"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search\u2026",
  debounce = 300,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fireSearch = useCallback(
    (v: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onSearch?.(v), debounce);
    },
    [onSearch, debounce],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    fireSearch(v);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      {/* Search icon */}
      <span className="absolute left-3 flex items-center text-text-tertiary pointer-events-none">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M11 11l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md bg-surface-sunken px-3 py-2 pl-9",
          "border border-border",
          "text-text-primary placeholder:text-text-tertiary",
          "shadow-inset",
          "transition-shadow duration-normal",
          "focus:outline-none focus:border-primary",
          "focus:shadow-[inset_0_2px_4px_var(--surface-warm-2),0_0_0_3px_var(--primary-muted)]",
          value && "pr-9",
        )}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 flex items-center justify-center w-5 h-5 rounded-full bg-surface-interactive hover:bg-surface-interactive-hover text-text-tertiary hover:text-text-primary transition-colors"
          aria-label="Clear search"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
