import type { CalendarEvent, TimeParts } from '@/types/calendar';

/** Visible window [start, end) in 24h — matches “6am–6pm” daily strip. */
export const TIMELINE_START_HOUR = 6;
export const TIMELINE_END_HOUR = 18;

export const TIMELINE_TOTAL_MINUTES =
  (TIMELINE_END_HOUR - TIMELINE_START_HOUR) * 60;

export const DEFAULT_HOUR_ROW_HEIGHT = 56;

/**
 * Minutes from 6:00am for `date`’s clock time, or `null` if outside the visible
 * [6:00, 18:00) window (matches event positioning).
 */
export function getNowMinutesInTimelineWindow(date = new Date()): number | null {
  const totalMin = date.getHours() * 60 + date.getMinutes();
  const start = TIMELINE_START_HOUR * 60;
  const end = TIMELINE_END_HOUR * 60;
  if (totalMin < start || totalMin >= end) return null;
  return totalMin - start;
}


export function timePartsToMinutes(parts: TimeParts): number {
  return parts.hour * 60 + parts.minute;
}

/** Local clock minutes since midnight (minute resolution). */
export function clockMinutesFromMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * `true` when the event’s end is before the current clock time (same day, minute resolution).
 * Ongoing and future events are `false`.
 */
export function hasEventEnded(
  event: Pick<CalendarEvent, 'end'>,
  date = new Date(),
): boolean {
  return timePartsToMinutes(event.end) < clockMinutesFromMidnight(date);
}

/**
 * `true` when local clock time falls in [start, end) (minute resolution).
 */
export function isEventActiveNow(
  event: Pick<CalendarEvent, 'start' | 'end'>,
  date = new Date(),
): boolean {
  const nowMin = clockMinutesFromMidnight(date);
  const startMin = timePartsToMinutes(event.start);
  const endMin = timePartsToMinutes(event.end);
  return nowMin >= startMin && nowMin < endMin;
}

/** Minutes from 6:00am; clamped to the visible window. */
export function minutesFromTimelineStart(parts: TimeParts): number {
  const day = timePartsToMinutes(parts);
  const start = TIMELINE_START_HOUR * 60;
  const end = TIMELINE_END_HOUR * 60;
  const rel = day - start;
  return Math.max(0, Math.min(TIMELINE_TOTAL_MINUTES, rel));
}

export function eventDurationMinutes(event: CalendarEvent): number {
  const a = timePartsToMinutes(event.start);
  const b = timePartsToMinutes(event.end);
  return Math.max(0, b - a);
}

export function hourLabels(): number[] {
  const out: number[] = [];
  for (let h = TIMELINE_START_HOUR; h < TIMELINE_END_HOUR; h += 1) {
    out.push(h);
  }
  return out;
}

export function formatHourLabel(hour24: number): string {
  const h = hour24 % 12;
  const label = h === 0 ? 12 : h;
  const suffix = hour24 < 12 || hour24 === 24 ? 'am' : 'pm';
  return `${label}${suffix}`;
}

export function formatTimeParts(parts: TimeParts): string {
  const h = parts.hour % 12 || 12;
  const m = parts.minute.toString().padStart(2, '0');
  const suffix = parts.hour < 12 ? 'am' : 'pm';
  return `${h}:${m} ${suffix}`;
}

/** Minutes from 6:00am (0 … TIMELINE_TOTAL_MINUTES). */
export function timelineOffsetToTimeParts(offsetMinutes: number): TimeParts {
  const total = TIMELINE_START_HOUR * 60 + offsetMinutes;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return { hour: h, minute: m };
}

/** Snap to 15-minute grid and clamp into the visible window. */
export function snapOffsetMinutes(
  offsetMinutes: number,
  minDurationMinutes: number,
): number {
  const snapped = Math.round(offsetMinutes / 15) * 15;
  return Math.max(
    0,
    Math.min(TIMELINE_TOTAL_MINUTES - minDurationMinutes, snapped),
  );
}
