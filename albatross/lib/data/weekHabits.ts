import { weekHabitsMockSnapshot } from '@/lib/mock/weekHabitsSnapshot';
import type { HabitItem } from '@/types/home';

/**
 * Weekly habits list for the Habits card.
 * Later: replace with API / local store — keep `HabitItem[]` shape.
 */
export function getWeekHabitsSnapshot(): HabitItem[] {
  return weekHabitsMockSnapshot.map((h) => ({ ...h }));
}
