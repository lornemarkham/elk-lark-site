/**
 * Feature gating — free vs paid (placeholder).
 *
 * Later:
 * - Define feature keys (e.g. `ai_coach`, `advanced_insights`)
 * - Check `EntitlementProvider` / subscription snapshot
 * - Return `{ allowed, reason }` for UI (paywall vs soft lock)
 */
export const FeatureId = {
  HOME_CORE: 'home_core',
  /** Example paid feature — wire when product definition exists */
  AI_COACH: 'ai_coach',
} as const;

export type FeatureIdType = (typeof FeatureId)[keyof typeof FeatureId];

export function canAccessFeature(
  _featureId: FeatureIdType,
  _tier: 'free' | 'paid',
): boolean {
  return true;
}
