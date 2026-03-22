import type { FocusBlock } from '@/types/focus';
import type { CalendarEvent } from '@/types/calendar';

const SLOT_START_HOURS: readonly [number, number, number] = [9, 11, 14];

/** Row index 0–2 from `focus-slot-{n}` id (Top Three line). */
export function parseFocusBlockRow(blockId: string): number | null {
  const m = /^focus-slot-(\d)$/.exec(blockId);
  if (!m) return null;
  const n = Number(m[1]);
  return n >= 0 && n <= 2 ? n : null;
}

/** Maps shared FocusBlock → timeline row; `completed` comes from the linked Top Three item. */
export function focusBlockToCalendarEvent(
  block: FocusBlock,
  completed: boolean,
): CalendarEvent {
  const startHour = SLOT_START_HOURS[block.slotIndex];
  const start = { hour: startHour, minute: 0 };
  const endTotalMin = startHour * 60 + block.duration;
  const end = {
    hour: Math.floor(endTotalMin / 60),
    minute: endTotalMin % 60,
  };
  return {
    id: block.id,
    sourceId: 'albatross',
    title: block.title,
    start,
    end,
    variant: 'dune',
    eventType: 'focus',
    topThreeLinkId: null,
    fromFocusStore: true,
    focusSlotIndex: block.slotIndex,
    completed,
  };
}
