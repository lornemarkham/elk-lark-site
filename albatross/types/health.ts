/**
 * Health Check-In snapshot shape — stable for mock data today and
 * Apple Health / HealthKit mapping later (same fields, different source).
 */
export type HealthMetricId = 'sleep' | 'activity' | 'recovery';

export interface HealthMetricSnapshot {
  id: HealthMetricId;
  label: string;
  /** Formatted for display (e.g. "7.5 hr", "42 min", "Good") */
  valueDisplay: string;
  /** Optional subtitle (e.g. time window, source hint) */
  helperHint?: string;
}
