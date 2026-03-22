/**
 * App-level date/session context (not user preferences).
 * Dates are ISO 8601 calendar dates: `YYYY-MM-DD`.
 */
export interface AppContext {
  currentDate: string;
  /** Monday (or configured week start) as `YYYY-MM-DD`. */
  currentWeekStart: string;
  timezone?: string;
}
