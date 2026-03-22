/**
 * Subscription / billing state (placeholder).
 *
 * Future wiring:
 * - RevenueCat, Expo IAP, or native StoreKit / Play Billing
 * - Persist status in secure storage + reconcile with backend
 * - Feed results into `EntitlementProvider` (tier + feature flags)
 */
export type SubscriptionStatus = 'none' | 'active' | 'grace' | 'expired';

export interface SubscriptionSnapshot {
  status: SubscriptionStatus;
  /** Future: product sku, renewal date, trial flags */
}

export function getSubscriptionSnapshot(): SubscriptionSnapshot {
  return { status: 'none' };
}
