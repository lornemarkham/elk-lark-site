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
 * Rule-based copy from morning sliders + identity + intention. No network, no AI.
 * Call only when `!isMorningAtDefaults(m)`.
 */
export function buildTodaysRead(m: MorningInputs): TodaysReadGuidance {
  const { mood, energy, stress, intention } = m;
  const chosen = chosenStateLabel(m.identity);
  const intent = intention.trim();
  const intentClip =
    intent.length > 72 ? `${intent.slice(0, 69)}…` : intent;

  let tone: string;
  let focus: string;
  let watchOut: string;

  // Branches combine mood, energy, and stress; identity and intention layer on after.
  if (stress >= 7) {
    tone =
      stress >= 8
        ? 'Stress is carrying a lot of weight — the day will reward a narrower, kinder scope.'
        : 'Stress is elevated — keep the frame small and recoverable.';
    focus =
      mood <= 4
        ? 'Protect one honest pause; let mood stay soft while you trim what can wait.'
        : energy <= 4
          ? 'Shrink the list to what truly needs you; pair moves with rest, not proof.'
          : 'Channel energy into fewer commitments so pressure has somewhere to land.';
    watchOut =
      'Watch for saying yes on reflex — friction is information, not failure.';
  } else if (mood <= 4) {
    tone =
      'Mood is running low — take pressure off and let progress be quiet.';
    focus =
      energy <= 4
        ? 'One small win is enough; rest isn’t the opposite of showing up.'
        : 'Use the energy you have on one meaningful task, then reassess gently.';
    watchOut =
      'Be gentle if momentum feels slow — that’s still a valid day.';
  } else if (energy >= 7 && stress <= 4 && mood >= 6) {
    tone = 'Mood and energy are giving you room — steer it with intention.';
    focus =
      'Put your first real block on something that matters before the day fragments.';
    watchOut =
      'Bright days can hide overcommitment — watch for scattering.';
  } else if (energy <= 4 && stress >= 5) {
    tone = 'Energy is modest while demand feels higher — pace is protective.';
    focus =
      'Finish one thing before the next; treat short breaks as non-negotiable.';
    watchOut =
      'Pushing through fatigue often costs more than it yields.';
  } else if (energy >= 7 && stress <= 4) {
    tone = 'You have useful energy — name a priority before noise picks it for you.';
    focus =
      'Let momentum build around one anchor task, not around every ping.';
    watchOut =
      'Spreading thin will blunt the impact of a strong battery.';
  } else if (energy <= 4) {
    tone = 'Energy is on the low side — smaller moves are the right scale.';
    focus =
      'Protect one pocket of genuine rest; trade quantity for steadiness.';
    watchOut =
      'Watch for self-judgment on slow days — sustainability beats sprinting.';
  } else {
    tone =
      mood >= 7
        ? 'You’re in a workable, slightly lighter range — steady beats heroic.'
        : 'You’re in a workable range — anchor before the day accelerates.';
    focus =
      'Prioritize one meaningful task and guard the time around it.';
    watchOut =
      stress >= 5
        ? 'Mid-level stress can still stack quietly — notice when the calendar tightens.'
        : 'Autopilot scheduling can overload a day that felt “fine.”';
  }

  if (chosen) {
    focus = `As ${chosen}: ${focus}`;
  }

  if (intentClip) {
    focus = `Hold “${intentClip}” in view — ${focus}`;
  }

  return { tone, focus, watchOut };
}
