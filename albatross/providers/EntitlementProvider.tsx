import React, { createContext, useContext, useMemo } from 'react';

/**
 * Product entitlements — free vs paid (stub).
 *
 * Later: subscribe to `subscriptionState`, remote config, or Supabase profile flags.
 * Pair with `lib/entitlements/featureGate.ts` for consistent gating.
 */
export type EntitlementTier = 'free' | 'paid';

export interface EntitlementContextValue {
  tier: EntitlementTier;
  /** Future: replace with real checks against subscription + experiments */
  canAccess: (featureId: string) => boolean;
}

const EntitlementContext = createContext<EntitlementContextValue | undefined>(
  undefined,
);

export function EntitlementProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<EntitlementContextValue>(
    () => ({
      tier: 'free',
      canAccess: () => true,
    }),
    [],
  );

  return (
    <EntitlementContext.Provider value={value}>
      {children}
    </EntitlementContext.Provider>
  );
}

export function useEntitlements(): EntitlementContextValue {
  const ctx = useContext(EntitlementContext);
  if (!ctx) {
    throw new Error('useEntitlements must be used within EntitlementProvider');
  }
  return ctx;
}
