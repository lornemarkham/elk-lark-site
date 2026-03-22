import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CalendarDay } from '@/types/calendarDay';

import { keyCalendarDay } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';

/**
 * External / imported events for a day. Top Three blocks come from `TodayEntry`, not here.
 */
export async function getCalendarDay(date: string): Promise<CalendarDay | null> {
  const raw = await AsyncStorage.getItem(keyCalendarDay(date));
  return parseStorageJson<CalendarDay>(raw);
}

export async function saveCalendarDay(day: CalendarDay): Promise<void> {
  await AsyncStorage.setItem(keyCalendarDay(day.date), JSON.stringify(day));
}

export async function removeCalendarDay(date: string): Promise<void> {
  await AsyncStorage.removeItem(keyCalendarDay(date));
}
