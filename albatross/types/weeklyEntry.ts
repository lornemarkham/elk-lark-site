/**
 * Weekly review + life wheel + patterns — keyed by `weekStart` (`YYYY-MM-DD`).
 */
export interface WeeklyWheelScore {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface WeeklyWheelBlock {
  scores: WeeklyWheelScore[];
  selectedCategoryId: string | null;
}

export interface WeeklyReflectionBlock {
  highlight: string;
  drainedYou: string;
  gratefulFor: string;
}

export interface WeeklyIntentionBlock {
  theme: string;
  outcome1: string;
  outcome2: string;
  outcome3: string;
  alignmentNote: string;
}

export interface WeeklyPatternsBlock {
  routineConsistency: number;
  sustainedEnergy: number;
  meaningfulConnection: number;
  deepFocusBlocks: number;
}

export interface WeeklyEntry {
  weekStart: string;
  wheel: WeeklyWheelBlock;
  reflection: WeeklyReflectionBlock;
  intention: WeeklyIntentionBlock;
  patterns: WeeklyPatternsBlock;
}
