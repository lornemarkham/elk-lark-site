import { mockCalendarDayEvents } from '@/lib/mock/calendarDayEvents';
import type { CalendarEvent } from '@/types/calendar';

/**
 * Returns events for the given calendar day. Today: mock-only; later: merge remote sources.
 */
export function getCalendarDayEvents(_day: Date): CalendarEvent[] {
  return mockCalendarDayEvents;
}
