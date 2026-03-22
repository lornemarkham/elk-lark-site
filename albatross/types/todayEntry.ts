/**
 * Persisted snapshot for the Today flow (My Morning → Top Three → habits → evening).
 * `date` is `YYYY-MM-DD` in the user’s calendar.
 */
export interface TodayMorningBlock {
  mood: number;
  energy: number;
  stress: number;
  chosenState: string | null;
  intention: string;
}

export interface TodayTopThreeItem {
  id: string;
  title: string;
  completed: boolean;
  /** Timeline slot index when placed; null if unscheduled. */
  assignedSlot: number | null;
}

export interface TodayHealthCheckIn {
  sleepLabel?: string;
  activityLabel?: string;
  recoveryLabel?: string;
}

export interface TodayHabitItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface TodayEveningReflection {
  win: string;
  challenge: string;
  betterTomorrow: string;
  energy: number;
  presence: number;
  courage: number;
  vulnerability: number;
}

export interface TodayEntry {
  date: string;
  morning: TodayMorningBlock;
  topThree: TodayTopThreeItem[];
  healthCheckIn: TodayHealthCheckIn;
  habits: TodayHabitItem[];
  eveningReflection: TodayEveningReflection;
}
