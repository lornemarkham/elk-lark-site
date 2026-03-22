/**
 * Persisted calendar day: imported / external events only.
 * Top Three placements stay on `TodayEntry.topThree` — do not duplicate here.
 */
export type CalendarExternalEventSource =
  | 'mock'
  | 'apple'
  | 'google'
  | 'outlook';

export interface CalendarExternalEvent {
  id: string;
  title: string;
  /** ISO time or `HH:mm` string — keep consistent app-wide once integrations land. */
  startTime: string;
  endTime: string;
  source: CalendarExternalEventSource;
}

export interface CalendarDay {
  date: string;
  externalEvents: CalendarExternalEvent[];
}
