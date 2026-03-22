import { myMorningIdentityOptions } from '@/constants/home';
import { DEFAULT_MORNING_INPUTS, type MorningInputs } from '@/types/morning';

export type TodaysReadGuidance = {
  tone: string;
  focus: string;
  watchOut: string;
};

function chosenStateLabel(identity: string | null): string | null {
  if (!identity) return null;
  return (
    myMorningIdentityOptions.find((o) => o.value === identity)?.label ?? null
  );
}

/**
 * True when nothing has been personalized yet (initial slider positions, no identity, no intention).
 */
export function isMorningAtDefaults(m: MorningInputs): boolean {
  return (
    m.mood === DEFAULT_MORNING_INPUTS.mood &&
    m.energy === DEFAULT_MORNING_INPUTS.energy &&
    m.stress === DEFAULT_MORNING_INPUTS.stress &&
    m.identity === DEFAULT_MORNING_INPUTS.identity &&
    m.intention.trim() === ''
  );
}

/**
 * Rule-based copy from morning sliders + identity. No network, no AI.
 * Call only when `!isMorningAtDefaults(m)`.
 */
export function buildTodaysRead(m: MorningInputs): TodaysReadGuidance {
  const { mood, energy, stress } = m;
  const chosen = chosenStateLabel(m.identity);

  let tone: string;
  let focus: string;
  let watchOut: string;

  // Priority: stress → mood → energy patterns → blended fatigue → steady default
  if (stress >= 7) {
    tone = 'Stress is elevated — keep things simple today.';
    focus =
      'Reduce friction, shorten your list, and protect time for real recovery.';
    watchOut = 'Defer what can wait; not every request needs a yes today.';
  } else if (mood <= 4) {
    tone = 'Your mood is running low — take pressure off.';
    focus = 'Focus on one small win. Progress can be quiet.';
    watchOut = 'Be gentle if momentum feels slow — that’s still a valid day.';
  } else if (energy >= 7 && stress <= 4) {
    tone = 'You have strong energy today.';
    focus =
      'Channel it into one meaningful task before you stack on more.';
    watchOut = 'Spreading too thin will dull the impact of that energy.';
  } else if (energy <= 4 && stress >= 5) {
    tone = 'Energy is modest while demand feels higher.';
    focus = 'Protect short breaks and finish one thing before the next.';
    watchOut = 'Watch for pushing through fatigue — pace is protective.';
  } else {
    tone = 'You’re in a steady range today.';
    focus = 'Prioritize one meaningful task and protect your time.';
    watchOut = 'Avoid overloading your schedule on autopilot.';
  }

  if (chosen) {
    focus = `You chose to lead as ${chosen}. ${focus}`;
  }

  return { tone, focus, watchOut };
}
