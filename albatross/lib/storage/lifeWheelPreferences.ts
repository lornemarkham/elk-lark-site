import AsyncStorage from '@react-native-async-storage/async-storage';

import { KEY_LIFE_WHEEL_PREFS } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';
import type { LifeWheelUserPreferences } from '@/types/wheel';
import {
  createDefaultLifeWheelPreferences,
  WHEEL_MAX_CATEGORIES,
  WHEEL_MIN_CATEGORIES,
} from '@/lib/wheel/lifeWheelCategories';
import { isForbiddenStoredLabel } from '@/lib/wheel/wheelAreaLabel';

function isValidPrefs(x: unknown): x is LifeWheelUserPreferences {
  if (!x || typeof x !== 'object') return false;
  const o = x as LifeWheelUserPreferences;
  if (!Array.isArray(o.categories)) return false;
  if (
    o.categories.length < WHEEL_MIN_CATEGORIES ||
    o.categories.length > WHEEL_MAX_CATEGORIES
  ) {
    return false;
  }
  for (const c of o.categories) {
    if (!c || typeof c.id !== 'string' || typeof c.label !== 'string') {
      return false;
    }
    if (!c.id.trim() || !c.label.trim()) return false;
  }
  if (!o.scoresById || typeof o.scoresById !== 'object') return false;
  return true;
}

function normalizePrefs(p: LifeWheelUserPreferences): LifeWheelUserPreferences {
  const categories = p.categories
    .slice(0, WHEEL_MAX_CATEGORIES)
    .map((c) => {
      let label = c.label.trim();
      if (!label || isForbiddenStoredLabel(label)) {
        label = 'Life area';
      }
      return {
        id: c.id.trim(),
        label,
      };
    });
  const scoresById = { ...p.scoresById };
  for (const c of categories) {
    if (scoresById[c.id] === undefined) {
      scoresById[c.id] = 6;
    }
  }
  for (const k of Object.keys(scoresById)) {
    if (!categories.some((c) => c.id === k)) {
      delete scoresById[k];
    }
  }
  if (categories.length < WHEEL_MIN_CATEGORIES) {
    return createDefaultLifeWheelPreferences();
  }
  return { categories, scoresById };
}

export async function getLifeWheelPreferences(): Promise<LifeWheelUserPreferences> {
  const raw = await AsyncStorage.getItem(KEY_LIFE_WHEEL_PREFS);
  const parsed = parseStorageJson<unknown>(raw);
  if (!parsed || !isValidPrefs(parsed)) {
    return createDefaultLifeWheelPreferences();
  }
  return normalizePrefs(parsed);
}

export async function saveLifeWheelPreferences(
  prefs: LifeWheelUserPreferences,
): Promise<void> {
  await AsyncStorage.setItem(KEY_LIFE_WHEEL_PREFS, JSON.stringify(prefs));
}
