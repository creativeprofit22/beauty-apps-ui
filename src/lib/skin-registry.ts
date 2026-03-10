/**
 * Skin Registry — runtime access to all skin configurations.
 * Imports each skin's config directly (bypasses the build-time @/skin alias).
 */

import { skinConfig as spaConfig } from "../../skins/spa/config";
import { skinConfig as barberConfig } from "../../skins/barber/config";
import { skinConfig as nailSalonConfig } from "../../skins/nail-salon/config";
import { skinConfig as tattooConfig } from "../../skins/tattoo/config";

export type SkinName = "spa" | "barber" | "nail-salon" | "tattoo";

export const SKIN_NAMES: readonly SkinName[] = [
  "spa",
  "barber",
  "nail-salon",
  "tattoo",
] as const;

export const skinRegistry = {
  spa: spaConfig,
  barber: barberConfig,
  "nail-salon": nailSalonConfig,
  tattoo: tattooConfig,
} as const;

export type SkinConfig = (typeof skinRegistry)[SkinName];
