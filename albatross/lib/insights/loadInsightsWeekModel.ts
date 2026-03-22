import { mondayWeekStartForDate } from '@/lib/dates/calendar';
import { buildInsightsWeekModel } from '@/lib/insights/buildInsightsWeekModel';
import type { InsightsWeekModel } from '@/lib/insights/buildInsightsWeekModel';
import { loadTodayEntriesForWeek } from '@/lib/insights/loadWeekTodayEntries';
import { getAppContext } from '@/lib/storage/appContext';

/** Load AppContext week (or this week’s Monday) and derive Insights from stored Today entries. */
export async function loadInsightsWeekModel(): Promise<InsightsWeekModel> {
  const ctx = await getAppContext();
  const weekStart =
    ctx?.currentWeekStart ?? mondayWeekStartForDate(new Date());
  const rows = await loadTodayEntriesForWeek(weekStart);
  return buildInsightsWeekModel(weekStart, rows);
}
