import { addDaysYMD } from '@/lib/dates/calendar';
import { getTodayEntry } from '@/lib/storage/today';
import type { TodayEntry } from '@/types/todayEntry';

export type DatedTodayEntry = { date: string; entry: TodayEntry };

/** Load persisted Today entries for each day of the week starting `weekStart` (Monday, YMD). */
export async function loadTodayEntriesForWeek(
  weekStart: string,
): Promise<DatedTodayEntry[]> {
  const out: DatedTodayEntry[] = [];
  for (let i = 0; i < 7; i++) {
    const date = addDaysYMD(weekStart, i);
    const entry = await getTodayEntry(date);
    if (entry) {
      out.push({ date, entry });
    }
  }
  return out;
}
