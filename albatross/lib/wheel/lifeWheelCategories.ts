import type {
  LifeWheelCategoryDefinition,
  LifeWheelDimension,
  LifeWheelUserPreferences,
} from '@/types/wheel';

/**
 * Single source of truth for wheel category identity: labels, colors, and default scores.
 * Future: load overrides (e.g. user-chosen colors) here and merge into `toLifeWheelDimensions`.
 */
export const LIFE_WHEEL_CATEGORIES = [
  {
    id: 'work',
    label: 'Work & focus',
    color: '#9A7B6A',
    defaultScore: 7,
  },
  {
    id: 'health',
    label: 'Body & energy',
    color: '#6D8F7C',
    defaultScore: 6,
  },
  {
    id: 'relationships',
    label: 'Connection',
    color: '#A67C7C',
    defaultScore: 8,
  },
  {
    id: 'growth',
    label: 'Growth',
    color: '#7A7AA3',
    defaultScore: 5,
  },
  {
    id: 'rest',
    label: 'Rest',
    color: '#8E7A9A',
    defaultScore: 6,
  },
  {
    id: 'purpose',
    label: 'Purpose',
    color: '#9A8B6A',
    defaultScore: 7,
  },
] as const satisfies readonly LifeWheelCategoryDefinition[];

export type LifeWheelCategoryId = (typeof LIFE_WHEEL_CATEGORIES)[number]['id'];

/** Minimum / maximum spokes on the life wheel. */
export const WHEEL_MIN_CATEGORIES = 6;
export const WHEEL_MAX_CATEGORIES = 10;

const categoryById = new Map<string, LifeWheelCategoryDefinition>(
  LIFE_WHEEL_CATEGORIES.map((c) => [c.id, c]),
);

/**
 * Fixed palette for spoke positions (index 0…9). No user color picker yet.
 * First six align with `LIFE_WHEEL_CATEGORIES`; extra slots are calm, distinct hues.
 */
export const WHEEL_SPOKE_COLORS: readonly string[] = [
  ...LIFE_WHEEL_CATEGORIES.map((c) => c.color),
  '#6E8A9E',
  '#9A8B7A',
  '#8A7A8E',
  '#7A9A8A',
];

const SCORE_MIN = 0;
const SCORE_MAX = 10;

function clampScore(n: number): number {
  if (Number.isNaN(n)) return 6;
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(n)));
}

export function newWheelCategoryId(): string {
  return `wc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createDefaultLifeWheelPreferences(): LifeWheelUserPreferences {
  const categories = LIFE_WHEEL_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
  }));
  const scoresById: Record<string, number> = {};
  for (const c of LIFE_WHEEL_CATEGORIES) {
    scoresById[c.id] = c.defaultScore;
  }
  return { categories, scoresById };
}

/** Build dimensions for the radar / list from persisted preferences. */
export function lifeWheelDimensionsFromPreferences(
  prefs: LifeWheelUserPreferences,
): LifeWheelDimension[] {
  return prefs.categories.map((cat, i) => {
    const raw = prefs.scoresById[cat.id];
    const value =
      raw === undefined ? 6 : clampScore(raw);
    return {
      id: cat.id,
      label: cat.label,
      value,
      color: WHEEL_SPOKE_COLORS[i] ?? WHEEL_SPOKE_COLORS[WHEEL_SPOKE_COLORS.length - 1],
    };
  });
}

export function getLifeWheelCategory(
  id: string,
): LifeWheelCategoryDefinition | undefined {
  return categoryById.get(id);
}

/** Ordered category colors — wheel backdrop, gradients, etc. */
export function getLifeWheelCategoryColors(): readonly string[] {
  return LIFE_WHEEL_CATEGORIES.map((c) => c.color);
}

/**
 * Build runtime dimensions from the category config (mock / first paint).
 * Later: pass persisted scores `{ [id]: value }` instead of defaults.
 */
export function createInitialLifeWheelDimensions(): LifeWheelDimension[] {
  return LIFE_WHEEL_CATEGORIES.map((c) => ({
    id: c.id,
    label: c.label,
    value: c.defaultScore,
    color: c.color,
  }));
}

/**
 * Re-apply labels and colors from config onto existing scores (e.g. after config or i18n updates).
 * Preserves `value` for each known `id`.
 */
export function mergeLifeWheelDimensionsWithCategoryConfig(
  dimensions: LifeWheelDimension[],
): LifeWheelDimension[] {
  return dimensions.map((d) => {
    const cfg = categoryById.get(d.id);
    if (!cfg) return d;
    return {
      ...d,
      label: cfg.label,
      color: cfg.color,
    };
  });
}

/**
 * Build dimensions from persisted `{ categoryId: score }` maps (legacy 6-category layout).
 * Labels/colors always come from `LIFE_WHEEL_CATEGORIES`.
 */
export function lifeWheelDimensionsFromStoredScores(
  scoresById: Partial<Record<string, number>>,
): LifeWheelDimension[] {
  return LIFE_WHEEL_CATEGORIES.map((c) => {
    const raw = scoresById[c.id];
    const value =
      raw === undefined || Number.isNaN(raw)
        ? c.defaultScore
        : clampScore(raw);
    return {
      id: c.id,
      label: c.label,
      value,
      color: c.color,
    };
  });
}
