import type { HabitItem, TopThreeItem } from '@/types/home';
import { weekHabitsMockSnapshot } from '@/lib/mock/weekHabitsSnapshot';

/** Scroll order for the home feed (progress dots + list). */
export const HOME_SECTION_ORDER = [
  'morning',
  'todaysRead',
  'top3',
  'habits',
  'evening',
  'health',
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_ORDER)[number];

/** Home header chrome (title + subtitle). */
export const homeApp = {
  title: 'Albatross',
  subtitle:
    'Glide through check-in, choose what matters, and close the day without hurry — one quiet rhythm.',
} as const;

/** Soft lines between major Today sections — muted, low emphasis. */
export const homeBridgingLines = {
  afterMorning: 'Now, choose what matters most.',
  beforeTopThree: 'Keep it simple.',
  beforeEvening: 'Close the loop.',
} as const;

export const eveningReflectionPrompt =
  'What did you learn today? A few honest lines — what landed, what felt hard, and what you’re carrying forward.';

/** My Morning — sliders use this numeric range (1–10). */
export const myMorningSliderScale = {
  min: 1,
  max: 10,
  step: 1,
} as const;

export const myMorningIdentityLabel = 'Who are you leaning into today?';

export const myMorningIdentityOptions = [
  { value: 'calm-focused', label: 'Calm & Focused' },
  { value: 'creative-open', label: 'Creative & Open' },
  { value: 'present-grounded', label: 'Present & Grounded' },
  { value: 'energized-ready', label: 'Energized & Ready' },
  { value: 'gentle-kind', label: 'Gentle & Kind' },
  { value: 'bold-courageous', label: 'Bold & Courageous' },
  { value: 'curious-exploring', label: 'Curious & Exploring' },
  { value: 'patient-steady', label: 'Patient & Steady' },
] as const;

export const myMorningIntentionLabel = 'What are you moving toward today?';

export const myMorningIntentionPlaceholder =
  'A single line is enough…';

/** Section titles & descriptions */
export const homeSections = {
  morning: {
    eyebrow: 'Your day',
    title: 'My Morning',
    description:
      'Where are you, and how do you want to show up? Name the terrain before the day picks up speed.',
  },
  todaysRead: {
    eyebrow: 'Daily guidance',
    title: "Today's Read",
    /** After meaningful morning input — rule-based read. */
    description: 'How should you move today? Shaped by your check-in — not a script.',
    /** Before input — same card structure, placeholder copy inside Tone / Focus / Watch out. */
    descriptionIdle:
      'Once you’ve checked in, this becomes a simple guide for the day — calm, not prescriptive.',
    /** Placeholder lines (not fake personalization) — same labels as active state. */
    placeholderTone:
      'Your tone for the day will appear here after you check in.',
    placeholderFocus:
      'Direction shows up when you move a slider, choose a posture, or add one honest line.',
    placeholderWatchOut:
      'Nothing to watch for yet — just enough input to reflect you, not a template.',
    /** Soft link to Insights — bottom of card in both empty and active states. */
    insightsLink: 'See how your week is unfolding',
  },
  topThree: {
    eyebrow: 'Focus',
    title: "Today's Top Three",
    description: 'What actually matters today — three things, honestly chosen.',
  },
  health: {
    eyebrow: 'Body',
    title: 'Health Check-In',
    description:
      'Sleep, movement, recovery — a signal for awareness, not a verdict.',
  },
  habits: {
    eyebrow: 'Rhythm',
    title: "This Week's Habits",
    description: 'Small repeats that keep the week steady — no streak pressure.',
  },
  evening: {
    eyebrow: 'Close the loop',
    title: 'Evening Reflection',
    description: eveningReflectionPrompt,
  },
} as const;

/** Three reflection prompts — labels + mock hint lines (local-only for now). */
export const eveningReflectionRows = [
  {
    id: 'win',
    label: 'Something that landed',
    hint: 'A moment worth naming — even a quiet one.',
  },
  {
    id: 'challenge',
    label: 'What felt heavy',
    hint: 'Friction or fatigue — noticing is enough.',
  },
  {
    id: 'tomorrow',
    label: 'Carrying forward',
    hint: 'One soft intention for when you wake.',
  },
] as const;

/** Mock data for Today's Top Three (local state only; not persisted). */
export const topThreeMockItems: TopThreeItem[] = [
  {
    id: 't1',
    title: 'Move body for 20 minutes',
    completed: false,
    assignedSlot: null,
  },
  {
    id: 't2',
    title: 'Finish one focused block',
    completed: false,
    assignedSlot: null,
  },
  {
    id: 't3',
    title: 'Message someone you care about',
    completed: false,
    assignedSlot: null,
  },
];

/** Alias for data-layer re-exports */
export const topThreeDefaults = topThreeMockItems;

/** Mock weekly habits — single source in `lib/mock/weekHabitsSnapshot`. */
export const weekHabitsMockItems: HabitItem[] = weekHabitsMockSnapshot;
export const weekHabitsDefaults = weekHabitsMockItems;

