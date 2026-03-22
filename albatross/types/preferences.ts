/**
 * User-controlled app preferences (local only until sync exists).
 */
export interface Preferences {
  accentLight?: string;
  accentDark?: string;
  appearanceMode?: 'light' | 'dark' | 'auto';
  crisisModeEnabled?: boolean;
  /**
   * Insights / guidance intensity — 1 gentle … 5 more direct. Default 3.
   * Phase 1: persisted only; copy logic can read this later.
   */
  guidanceLevel?: number;
}

export const DEFAULT_GUIDANCE_LEVEL = 3;

export const GUIDANCE_LEVEL_MIN = 1;
export const GUIDANCE_LEVEL_MAX = 5;
