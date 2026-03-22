/**
 * Home screen data access.
 * Today: re-exports from `constants/home`. Later: Supabase / local cache.
 */
export {
  eveningReflectionPrompt,
  eveningReflectionRows,
  myMorningIdentityOptions,
  myMorningSliderScale,
  topThreeDefaults,
  topThreeMockItems,
  weekHabitsDefaults,
  weekHabitsMockItems,
} from '@/constants/home';

export { getWeekHabitsSnapshot } from '@/lib/data/weekHabits';
