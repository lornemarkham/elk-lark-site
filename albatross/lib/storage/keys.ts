/** Namespace prefix for all Albatross AsyncStorage keys. */
export const STORAGE_PREFIX = '@albatross';

export function keyToday(date: string): string {
  return `${STORAGE_PREFIX}/today/${date}`;
}

export function keyWeekly(weekStart: string): string {
  return `${STORAGE_PREFIX}/weekly/${weekStart}`;
}

export function keyJournal(date: string): string {
  return `${STORAGE_PREFIX}/journal/${date}`;
}

export function keyCalendarDay(date: string): string {
  return `${STORAGE_PREFIX}/calendar-day/${date}`;
}

export const KEY_PREFERENCES = `${STORAGE_PREFIX}/preferences`;

export const KEY_APP_CONTEXT = `${STORAGE_PREFIX}/app-context`;

export const KEY_LIFE_WHEEL_PREFS = `${STORAGE_PREFIX}/life-wheel-preferences`;
