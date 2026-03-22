/**
 * Calendar domain — events may eventually be merged from several providers
 * (device calendar, work account, Albatross-native blocks, etc.).
 */
export type CalendarSourceId = string;

export interface TimeParts {
  hour: number;
  minute: number;
}

/** External calendar vs Albatross-native planning block. */
export type CalendarEventKind = 'external' | 'focus';

export interface CalendarEvent {
  id: string;
  /** Which feed this row came from — used when merging multiple sources later. */
  sourceId: CalendarSourceId;
  title: string;
  start: TimeParts;
  end: TimeParts;
  /** Visual bucket for soft color variation in the timeline. */
  variant: 'bloom' | 'mist' | 'dune' | 'clay';
  /** Distinguishes imported calendar vs Albatross focus blocks. */
  eventType: CalendarEventKind;
  /** When set, mirrors a Today “Top Three” item (`id` from Top Three data) — link logic TBD. */
  topThreeLinkId?: string | null;
  /** Created via Today → Assign time (shared FocusBlock store). */
  fromFocusStore?: boolean;
  /** When `fromFocusStore`, which fixed slot (9 / 11 / 2) — for layout animation / keys. */
  focusSlotIndex?: 0 | 1 | 2;
  /** Local completion (FocusBlock or mock row). */
  completed?: boolean;
}
