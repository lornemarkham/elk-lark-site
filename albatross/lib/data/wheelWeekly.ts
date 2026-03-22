/**
 * Weekly wheel / life-balance data access — mock today; later: local store or API.
 */
export type {
  LifeWheelCategoryDefinition,
  LifeWheelDimension,
  LifeWheelDimensionDetail,
} from '@/types/wheel';
export {
  createInitialLifeWheelDimensions,
  getLifeWheelCategory,
  getLifeWheelCategoryColors,
  LIFE_WHEEL_CATEGORIES,
  lifeWheelDimensionsFromStoredScores,
  mergeLifeWheelDimensionsWithCategoryConfig,
} from '@/lib/wheel/lifeWheelCategories';
export {
  getLifeWheelDimensionDetail,
  mockLifeWheelDimensionDetails,
  mockLifeWheelDimensions,
  mockLifeWheelInsights,
  mockWeeklyIntentionExtraPrompt,
  mockWeeklyIntentionThemeDefault,
  mockWeeklyIntentionThemeOptions,
  mockWeeklyOutcomeFields,
  mockWeeklyPatternSliders,
  mockWeeklyReflectionPrompts,
  wheelWeeklySections,
} from '@/lib/mock/wheelWeekly';
