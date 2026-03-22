import type { LifeWheelDimension } from '@/types/wheel';

function joinAreaNames(labels: string[]): string {
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

export type YourFocusMessages = {
  primary: string;
  secondary?: string;
};

/**
 * Lowest score(s) → guidance copy connecting the wheel to weekly focus.
 */
export function buildYourFocusMessages(
  dimensions: LifeWheelDimension[],
): YourFocusMessages | null {
  if (dimensions.length === 0) return null;

  const min = Math.min(...dimensions.map((d) => d.value));
  const low = dimensions.filter((d) => d.value === min);
  const names = low.map((d) => d.label.trim()).filter(Boolean);
  if (names.length === 0) return null;

  if (low.length === 1) {
    return {
      primary: `${names[0]} is currently your lowest area — consider making this a focus this week.`,
    };
  }

  const list = joinAreaNames(names);
  return {
    primary: `${list} are your lowest areas — consider making one of them a focus this week.`,
    secondary:
      'You may be spreading yourself thin — choose one area to support.',
  };
}
