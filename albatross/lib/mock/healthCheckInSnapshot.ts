import type { HealthMetricSnapshot } from '@/types/health';

/**
 * Placeholder snapshot until Apple Health (or similar) is wired in.
 * Keep labels/value strings aligned with what HealthKit adapters will produce.
 */
export const healthCheckInMockSnapshot: HealthMetricSnapshot[] = [
  {
    id: 'sleep',
    label: 'Sleep',
    valueDisplay: '7.5 hr',
    helperHint: 'Last night',
  },
  {
    id: 'activity',
    label: 'Activity',
    valueDisplay: '42 min',
    helperHint: 'Today',
  },
  {
    id: 'recovery',
    label: 'Recovery',
    valueDisplay: 'Good',
    helperHint: 'Readiness',
  },
];
