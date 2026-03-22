export const insightsCopy = {
  /** Supporting line under the Insights title */
  pageSubtitle: 'What patterns are emerging?',
  sectionIntroPatterns:
    'Light observations — nothing to fix, just to notice.',
  sectionIntroSuggestions:
    'Gentle ideas — take what fits, leave the rest.',
  /** Snapshot card — ties Today to Insights */
  weekSnapshotIntro:
    'A quiet look at how the week has been unfolding — from your daily check-ins.',
  weekCardEyebrow: 'Your week',
  weekCardTitle: 'At a glance',
  metricAvgEnergy: 'Energy (average)',
  metricTopThree: 'Your three — completed',
  metricHabits: 'Habits — small wins',
  /** Empty week — no saved days in range yet */
  emptyHeading: 'Your insights are building',
  emptySubtext:
    'A few days of check-ins will start to reveal patterns.',
  /** Subtle position in the week — honest, not gamified */
  emptyWeekPosition: 'Day 1 of your week',
  emptyEncouragement:
    'Nothing to interpret yet — that’s alright.',
  /** Shown with day count (0–7); not a “pattern”, just progress */
  weekDaysProgress: (daysCollected: number) =>
    `${daysCollected} of 7 days with check-ins`,
  weekProgressEncouragement:
    'Patterns like to arrive slowly — that’s alright.',
  patternsPlaceholder:
    'Not enough to name a pattern yet — a little more rhythm will help.',
  suggestionsPlaceholder:
    'Suggestions will surface as the week takes clearer shape.',
  guidanceTitle: 'How the nudges feel',
  guidanceLevelHint:
    'Softer or more direct — you can change this anytime. Nothing here is fixed.',
  guidanceSliderLabel: (value: number) =>
    `Guidance strength (${value} of 5)`,
} as const;
