import { healthCheckInMockSnapshot } from '@/lib/mock/healthCheckInSnapshot';
import type { HealthMetricSnapshot } from '@/types/health';

/**
 * Single entry point for Health Check-In metrics.
 * Swap implementation for HealthKit / cached sync — UI consumes `HealthMetricSnapshot[]` only.
 */
export function getHealthCheckInSnapshot(): HealthMetricSnapshot[] {
  return healthCheckInMockSnapshot;
}
