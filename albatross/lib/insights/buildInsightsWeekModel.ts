import { parseYMD } from '@/lib/dates/calendar';
import type { DatedTodayEntry } from '@/lib/insights/loadWeekTodayEntries';

const PATTERN_ENERGY_TASKS =
  'Energy ran a touch higher on days your three priorities moved forward.';
const PATTERN_MIDWEEK_STRESS = 'Stress often lifts a little mid-week — worth noticing, not fixing.';
const PATTERN_EVENING_REST =
  'Rest, sleep, or recovery show up often in what you write down — a quiet signal.';

const SUGGEST_FEWER_TASKS =
  'When finishing feels heavy, fewer — and lighter — priorities can help.';
const SUGGEST_STRESS =
  'A little less friction this week might be enough.';
const SUGGEST_FOCUS_BLOCK =
  'If you can, one early block of focus before the day fills in.';

export type InsightsWeekModel = {
  weekStart: string;
  /** Days in range with saved data */
  dayCount: number;
  avgEnergy: number | null;
  /** 0–100, null if no Top Three tasks in range */
  topThreeCompletionPct: number | null;
  habitsCompleted: number;
  habitsTotal: number;
  patterns: string[];
  suggestions: string[];
  isEmpty: boolean;
};

function mean(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function collectPatterns(rows: DatedTodayEntry[]): string[] {
  const patterns: string[] = [];
  if (rows.length < 2) {
    return patterns;
  }

  const completedCounts = rows.map(
    (r) => r.entry.topThree.filter((t) => t.completed).length,
  );

  const highTaskDays = rows.filter(
    (_, i) => completedCounts[i] >= 2,
  );
  const lowTaskDays = rows.filter((_, i) => completedCounts[i] < 2);
  if (highTaskDays.length >= 1 && lowTaskDays.length >= 1) {
    const eHigh = mean(highTaskDays.map((r) => r.entry.morning.energy));
    const eLow = mean(lowTaskDays.map((r) => r.entry.morning.energy));
    if (eHigh != null && eLow != null && eHigh > eLow + 0.5) {
      patterns.push(PATTERN_ENERGY_TASKS);
    }
  }

  const monTue = rows.filter((r) => {
    const dow = parseYMD(r.date).getDay();
    return dow === 1 || dow === 2;
  });
  const wedFri = rows.filter((r) => {
    const dow = parseYMD(r.date).getDay();
    return dow === 3 || dow === 4 || dow === 5;
  });
  if (monTue.length >= 1 && wedFri.length >= 1) {
    const early = mean(monTue.map((r) => r.entry.morning.stress));
    const mid = mean(wedFri.map((r) => r.entry.morning.stress));
    if (early != null && mid != null && mid > early + 1) {
      patterns.push(PATTERN_MIDWEEK_STRESS);
    }
  }

  const restRe =
    /\b(rest|sleep|reset|recover|recharge|exhaust|tired)\b/i;
  let restHits = 0;
  for (const { entry } of rows) {
    const blob = [
      entry.eveningReflection.win,
      entry.eveningReflection.challenge,
      entry.eveningReflection.betterTomorrow,
    ].join(' ');
    if (restRe.test(blob)) {
      restHits += 1;
    }
  }
  if (rows.length >= 2 && restHits >= Math.max(2, Math.ceil(rows.length * 0.35))) {
    patterns.push(PATTERN_EVENING_REST);
  }

  return patterns.slice(0, 3);
}

function collectSuggestions(
  avgEnergy: number | null,
  avgStress: number | null,
  topThreeCompletionPct: number | null,
  topThreeTaskTotal: number,
): string[] {
  const out: string[] = [];

  if (avgStress != null && avgStress > 6) {
    out.push(SUGGEST_STRESS);
  }

  if (
    topThreeTaskTotal > 0 &&
    topThreeCompletionPct != null &&
    topThreeCompletionPct < 60
  ) {
    out.push(SUGGEST_FEWER_TASKS);
  }

  if (avgEnergy != null && avgEnergy >= 7) {
    out.push(SUGGEST_FOCUS_BLOCK);
  }

  return out.slice(0, 2);
}

function aggregateMetrics(rows: DatedTodayEntry[]): {
  avgEnergy: number | null;
  avgStress: number | null;
  topThreeCompletionPct: number | null;
  topThreeTaskTotal: number;
  habitsCompleted: number;
  habitsTotal: number;
} {
  if (rows.length === 0) {
    return {
      avgEnergy: null,
      avgStress: null,
      topThreeCompletionPct: null,
      topThreeTaskTotal: 0,
      habitsCompleted: 0,
      habitsTotal: 0,
    };
  }

  const energies = rows.map((r) => r.entry.morning.energy);
  const stresses = rows.map((r) => r.entry.morning.stress);

  let completed = 0;
  let tasks = 0;
  for (const { entry } of rows) {
    for (const t of entry.topThree) {
      tasks += 1;
      if (t.completed) {
        completed += 1;
      }
    }
  }

  let habitsDone = 0;
  let habitsAll = 0;
  for (const { entry } of rows) {
    for (const h of entry.habits) {
      habitsAll += 1;
      if (h.completed) {
        habitsDone += 1;
      }
    }
  }

  return {
    avgEnergy: mean(energies),
    avgStress: mean(stresses),
    topThreeCompletionPct:
      tasks > 0 ? Math.round((100 * completed) / tasks) : null,
    topThreeTaskTotal: tasks,
    habitsCompleted: habitsDone,
    habitsTotal: habitsAll,
  };
}

/**
 * Derive Insights UI model from dated Today entries (current week only).
 */
export function buildInsightsWeekModel(
  weekStart: string,
  rows: DatedTodayEntry[],
): InsightsWeekModel {
  if (rows.length === 0) {
    return {
      weekStart,
      dayCount: 0,
      avgEnergy: null,
      topThreeCompletionPct: null,
      habitsCompleted: 0,
      habitsTotal: 0,
      patterns: [],
      suggestions: [],
      isEmpty: true,
    };
  }

  const {
    avgEnergy,
    avgStress,
    topThreeCompletionPct,
    topThreeTaskTotal,
    habitsCompleted,
    habitsTotal,
  } = aggregateMetrics(rows);

  return {
    weekStart,
    dayCount: rows.length,
    avgEnergy,
    topThreeCompletionPct,
    habitsCompleted,
    habitsTotal,
    patterns: collectPatterns(rows),
    suggestions: collectSuggestions(
      avgEnergy,
      avgStress,
      topThreeCompletionPct,
      topThreeTaskTotal,
    ),
    isEmpty: false,
  };
}
