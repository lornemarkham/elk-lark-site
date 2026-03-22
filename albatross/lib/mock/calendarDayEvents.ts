import type { CalendarEvent } from '@/types/calendar';

/** Mock feeds — stand in for Google / Apple / internal “Albatross” calendars later. */
export const mockCalendarSources = {
  personal: 'personal',
  work: 'work',
  wellness: 'wellness',
  albatross: 'albatross',
} as const;

/**
 * Single-day mock agenda (6am–6pm window). Replace with API merge logic when ready.
 */
export const mockCalendarDayEvents: CalendarEvent[] = [
  {
    id: 'e1',
    sourceId: mockCalendarSources.wellness,
    title: 'Morning routine',
    start: { hour: 7, minute: 0 },
    end: { hour: 8, minute: 30 },
    variant: 'bloom',
    eventType: 'focus',
    topThreeLinkId: null,
  },
  {
    id: 'e2',
    sourceId: mockCalendarSources.work,
    title: 'Team meeting',
    start: { hour: 10, minute: 0 },
    end: { hour: 11, minute: 0 },
    variant: 'mist',
    eventType: 'external',
    topThreeLinkId: null,
  },
  {
    id: 'e3',
    sourceId: mockCalendarSources.work,
    title: 'Deep work',
    start: { hour: 11, minute: 30 },
    end: { hour: 12, minute: 30 },
    variant: 'dune',
    eventType: 'focus',
    topThreeLinkId: null,
  },
  {
    id: 'e4',
    sourceId: mockCalendarSources.personal,
    title: 'Lunch',
    start: { hour: 12, minute: 45 },
    end: { hour: 13, minute: 45 },
    variant: 'clay',
    eventType: 'external',
    topThreeLinkId: null,
  },
  {
    id: 'e5',
    sourceId: mockCalendarSources.wellness,
    title: 'Walk',
    start: { hour: 15, minute: 0 },
    end: { hour: 15, minute: 45 },
    variant: 'bloom',
    eventType: 'focus',
    topThreeLinkId: null,
  },
  {
    id: 'e6',
    sourceId: mockCalendarSources.work,
    title: 'Weekly review',
    start: { hour: 16, minute: 0 },
    end: { hour: 17, minute: 0 },
    variant: 'mist',
    eventType: 'external',
    topThreeLinkId: null,
  },
];
