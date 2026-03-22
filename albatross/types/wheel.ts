/** Single spoke on the life wheel — value is typically 1–10 for radar depth. */
export interface LifeWheelDimension {
  id: string;
  label: string;
  value: number;
  /**
   * Category accent — resolved from `LIFE_WHEEL_CATEGORIES` today;
   * later: merge user color overrides from storage.
   */
  color: string;
}

/**
 * Product definition for one wheel category — single source for id, label, and color.
 * Default scores bootstrap mock / first-run UI until persisted scores exist.
 */
export interface LifeWheelCategoryDefinition {
  id: string;
  label: string;
  /** Wheel, list markers, and detail accents — soft, distinct hues (hex). */
  color: string;
  /** Initial / mock score (0–10); runtime values live on `LifeWheelDimension.value`. */
  defaultScore: number;
}

/**
 * Copy + hooks for the selected segment (mock today).
 * Later: weekly refresh, AI-generated insight, habit / coaching links.
 */
export interface LifeWheelDimensionDetail {
  insight: string;
  relatedHabitIds?: string[];
  intentionAnchorId?: string;
}

/** Persisted wheel shape: 6–10 categories, optional score cache by id. */
export interface LifeWheelUserPreferences {
  categories: Array<{ id: string; label: string }>;
  /** Latest scores per category id (0–10). */
  scoresById: Record<string, number>;
}

export interface WeeklyReflectionPrompt {
  id: string;
  label: string;
  placeholder: string;
}

export interface WeeklyOutcomeField {
  id: string;
  label: string;
  placeholder: string;
}

export interface WeeklyPatternSlider {
  id: string;
  label: string;
  /** Mock default 1–10 */
  defaultValue: number;
}
