import type { HabitItem } from '@/types/home';

/**
 * Mock weekly habits until a real source (sync / user prefs) exists.
 */
export const weekHabitsMockSnapshot: HabitItem[] = [
  { id: 'h1', label: 'Morning light within 30 min', done: true },
  { id: 'h2', label: 'Protein-forward breakfast', done: false },
  { id: 'h3', label: 'Evening wind-down', done: false },
  { id: 'h4', label: 'One screen-free hour', done: true },
];
