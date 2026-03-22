/** Time-of-day slot for Top Three blocks (maps to 9:00 / 11:00 / 2:00 PM). */
export type FocusTimeSlotIndex = 0 | 1 | 2;

export type FocusBlock = {
  id: string;
  title: string;
  /** 0 → 9:00, 1 → 11:00, 2 → 14:00 */
  slotIndex: FocusTimeSlotIndex;
  /** Minutes */
  duration: number;
};
