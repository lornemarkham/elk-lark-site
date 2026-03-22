/** Morning check-in values (1–10 sliders + identity + intention). Shared with Today’s Read. */
export type MorningInputs = {
  mood: number;
  energy: number;
  stress: number;
  identity: string | null;
  intention: string;
};

export const DEFAULT_MORNING_INPUTS: MorningInputs = {
  mood: 5,
  energy: 5,
  stress: 5,
  identity: null,
  intention: '',
};
