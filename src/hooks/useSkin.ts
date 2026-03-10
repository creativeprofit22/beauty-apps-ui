"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  skinRegistry,
  SKIN_NAMES,
  type SkinName,
} from "@/lib/skin-registry";

const STORAGE_KEY = "skin";
const DEFAULT_SKIN: SkinName = "spa";

function getServerSnapshot(): SkinName {
  return DEFAULT_SKIN;
}

function subscribe(onStoreChange: () => void): () => void {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}

function isValidSkin(value: string | null): value is SkinName {
  return SKIN_NAMES.includes(value as SkinName);
}

function getSnapshot(): SkinName {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isValidSkin(stored)) return stored;
  return DEFAULT_SKIN;
}

function applySkin(skin: SkinName) {
  document.documentElement.dataset.skin = skin;
}

export function useSkin() {
  const skin = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applySkin(skin);
  }, [skin]);

  const setSkin = useCallback((next: SkinName) => {
    localStorage.setItem(STORAGE_KEY, next);
    applySkin(next);
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY, newValue: next }),
    );
  }, []);

  const skinConfig = skinRegistry[skin];

  return { skin, setSkin, skinConfig } as const;
}
