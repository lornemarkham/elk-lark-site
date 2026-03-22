import AsyncStorage from '@react-native-async-storage/async-storage';

import type { WeeklyEntry } from '@/types/weeklyEntry';

import { keyWeekly } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';

/** Load weekly bundle for the week starting `weekStart` (`YYYY-MM-DD`). */
export async function getWeeklyEntry(
  weekStart: string,
): Promise<WeeklyEntry | null> {
  const raw = await AsyncStorage.getItem(keyWeekly(weekStart));
  return parseStorageJson<WeeklyEntry>(raw);
}

export async function saveWeeklyEntry(entry: WeeklyEntry): Promise<void> {
  await AsyncStorage.setItem(keyWeekly(entry.weekStart), JSON.stringify(entry));
}

export async function removeWeeklyEntry(weekStart: string): Promise<void> {
  await AsyncStorage.removeItem(keyWeekly(weekStart));
}
