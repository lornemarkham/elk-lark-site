import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Preferences } from '@/types/preferences';
import {
  DEFAULT_GUIDANCE_LEVEL,
  GUIDANCE_LEVEL_MAX,
  GUIDANCE_LEVEL_MIN,
} from '@/types/preferences';

import { KEY_PREFERENCES } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';

export async function getPreferences(): Promise<Preferences | null> {
  const raw = await AsyncStorage.getItem(KEY_PREFERENCES);
  return parseStorageJson<Preferences>(raw);
}

export async function savePreferences(preferences: Preferences): Promise<void> {
  await AsyncStorage.setItem(KEY_PREFERENCES, JSON.stringify(preferences));
}

export function clampGuidanceLevel(n: number): number {
  if (Number.isNaN(n)) return DEFAULT_GUIDANCE_LEVEL;
  return Math.max(
    GUIDANCE_LEVEL_MIN,
    Math.min(GUIDANCE_LEVEL_MAX, Math.round(n)),
  );
}

/** Merge stored prefs with defaults (e.g. guidance level). */
export function mergePreferences(stored: Preferences | null): Preferences {
  const base = { ...(stored ?? {}) };
  base.guidanceLevel = clampGuidanceLevel(
    stored?.guidanceLevel ?? DEFAULT_GUIDANCE_LEVEL,
  );
  return base;
}

export async function clearPreferences(): Promise<void> {
  await AsyncStorage.removeItem(KEY_PREFERENCES);
}
