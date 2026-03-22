import type {
  LifeWheelDimension,
  LifeWheelDimensionDetail,
  WeeklyOutcomeField,
  WeeklyPatternSlider,
  WeeklyReflectionPrompt,
} from '@/types/wheel';
import type { SelectOption } from '@/components/ui/Dropdown';
import { createInitialLifeWheelDimensions } from '@/lib/wheel/lifeWheelCategories';

/** Mock dimensions — scores and colors from `LIFE_WHEEL_CATEGORIES`; replace with stored values later. */
export const mockLifeWheelDimensions: LifeWheelDimension[] =
  createInitialLifeWheelDimensions();

/**
 * Per-segment copy and future hooks (habits, coaching, AI insight).
 * Keep keys aligned with `LIFE_WHEEL_CATEGORIES` / `mockLifeWheelDimensions[].id`.
 */
export const mockLifeWheelDimensionDetails: Record<
  string,
  LifeWheelDimensionDetail
> = {
  work: {
    insight:
      'Momentum is there — protect a few deep-focus blocks so the week doesn’t blur together.',
    relatedHabitIds: ['h-focus'],
  },
  health: {
    insight:
      'You’ve been consistent, but your energy has felt uneven. Small resets mid-week could help.',
    relatedHabitIds: ['h-move', 'h-sleep'],
  },
  relationships: {
    insight:
      'Connection feels present; one intentional conversation often matters more than many quick ones.',
    intentionAnchorId: 'connection',
  },
  growth: {
    insight:
      'Curiosity is alive — pick one small stretch so progress doesn’t feel scattered.',
  },
  rest: {
    insight:
      'You’re not underwater, but recovery is thin — guard one slow evening.',
    relatedHabitIds: ['h-winddown'],
  },
  purpose: {
    insight:
      'Direction is clear enough; tie a few daily choices back to what matters most.',
    intentionAnchorId: 'purpose',
  },
};

/** Fallback when a spoke uses a custom id not in the mock catalog. */
export const GENERIC_WHEEL_DIMENSION_INSIGHT =
  'Notice what small shifts this week — one gentle change can rebalance how the whole wheel feels.';

export function getLifeWheelDimensionDetail(
  dimensionId: string,
): LifeWheelDimensionDetail {
  return (
    mockLifeWheelDimensionDetails[dimensionId] ?? {
      insight: GENERIC_WHEEL_DIMENSION_INSIGHT,
    }
  );
}

/** @deprecated Use `mockLifeWheelDimensionDetails[id].insight` */
export const mockLifeWheelInsights: Record<string, string> = Object.fromEntries(
  Object.entries(mockLifeWheelDimensionDetails).map(([id, d]) => [id, d.insight]),
);

export const mockWeeklyReflectionPrompts: WeeklyReflectionPrompt[] = [
  {
    id: 'highlight',
    label: 'What was the highlight of your week?',
    placeholder: 'A moment, conversation, or small win…',
  },
  {
    id: 'drain',
    label: 'What drained you most — and what might you adjust?',
    placeholder: 'Name it honestly, without judgment…',
  },
  {
    id: 'gratitude',
    label: 'What are you quietly grateful for right now?',
    placeholder: 'Even one line is enough…',
  },
];

export const mockWeeklyIntentionThemeOptions: readonly SelectOption[] = [
  { value: 'steady-rhythm', label: 'Steady rhythm' },
  { value: 'deeper-focus', label: 'Deeper focus' },
  { value: 'softer-pace', label: 'Softer pace' },
  { value: 'connection', label: 'Connection' },
  { value: 'health-first', label: 'Health first' },
  { value: 'creative-push', label: 'Creative push' },
] as const;

export const mockWeeklyIntentionThemeDefault: string | null = 'steady-rhythm';

export const mockWeeklyOutcomeFields: WeeklyOutcomeField[] = [
  {
    id: 'o1',
    label: 'Outcome 1',
    placeholder: 'One result you want to see by week’s end…',
  },
  {
    id: 'o2',
    label: 'Outcome 2',
    placeholder: 'Something that would make the week feel honest…',
  },
  {
    id: 'o3',
    label: 'Outcome 3',
    placeholder: 'A third anchor — optional but clarifying…',
  },
];

export const mockWeeklyIntentionExtraPrompt =
  'What would make next week feel aligned with that theme?';

export const mockWeeklyPatternSliders: WeeklyPatternSlider[] = [
  { id: 'consistency', label: 'Routine consistency', defaultValue: 6 },
  { id: 'energy', label: 'Sustained energy', defaultValue: 6 },
  { id: 'social', label: 'Meaningful connection', defaultValue: 7 },
  { id: 'focus', label: 'Deep focus blocks', defaultValue: 5 },
];

/** Section chrome — titles match product language for the Wheel tab. */
export const wheelWeeklySections = {
  lifeWheel: {
    eyebrow: 'Balance',
    title: 'Life wheel',
    description:
      'Choose an area to reflect. Rename spokes or add named areas (up to ten). After you score, Your Focus highlights the lowest area(s) — the chart is a snapshot, not a scorecard.',
  },
  reflection: {
    eyebrow: 'Look back',
    title: 'Weekly reflection',
    description: 'Short prompts to close the week with clarity.',
  },
  intention: {
    eyebrow: 'Look ahead',
    title: 'Weekly intention',
    description: 'Choose a theme, then name three outcomes you’re steering toward.',
  },
  patterns: {
    eyebrow: 'Rhythm',
    title: 'Weekly patterns',
    description: 'How the week felt in motion — adjust as a mood check, not a verdict.',
  },
} as const;
