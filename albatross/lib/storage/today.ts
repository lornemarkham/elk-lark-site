import AsyncStorage from '@react-native-async-storage/async-storage';

import type { TodayEntry } from '@/types/todayEntry';

import { keyToday } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';

/** Load persisted Today data for a calendar date (`YYYY-MM-DD`). */
export async function getTodayEntry(date: string): Promise<TodayEntry | null> {
  const raw = await AsyncStorage.getItem(keyToday(date));
  return parseStorageJson<TodayEntry>(raw);
}

/** Persist a full Today snapshot (caller should set `entry.date`). */
export async function saveTodayEntry(entry: TodayEntry): Promise<void> {
  await AsyncStorage.setItem(keyToday(entry.date), JSON.stringify(entry));
}

export async function removeTodayEntry(date: string): Promise<void> {
  await AsyncStorage.removeItem(keyToday(date));
}
