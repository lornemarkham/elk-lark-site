import { timePartsToMinutes } from '@/components/calendar/timelineLayout';
import type { CalendarEvent } from '@/types/calendar';

export function sortEventsByStartTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort(
    (a, b) => timePartsToMinutes(a.start) - timePartsToMinutes(b.start),
  );
}
