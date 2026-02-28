"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onStoreChange: () => void): () => void {
  // Listen for storage events from other tabs
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onStoreChange();
  };
  // Listen for system preference changes
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", onStoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    mql.removeEventListener("change", onStoreChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    // Trigger re-render via storage event dispatch
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY, newValue: next }),
    );
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getSnapshot();
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme } as const;
}
