import type { FocusTimeSlotIndex } from '@/types/focus';

/** Single source of truth for Today checklist + calendar Top Three blocks. */
export interface TopThreeItem {
  id: string;
  title: string;
  completed: boolean;
  /** Calendar time slot when placed (9 / 11 / 2); null when not on the timeline. */
  assignedSlot: FocusTimeSlotIndex | null;
}

export interface HabitItem {
  id: string;
  label: string;
  done: boolean;
}
