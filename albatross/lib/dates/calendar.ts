/**
 * Local calendar helpers for `YYYY-MM-DD` strings (no UTC shift for date-only values).
 */

export function parseYMD(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Add calendar days to a YMD string. */
export function addDaysYMD(dateStr: string, days: number): string {
  const d = parseYMD(dateStr);
  d.setDate(d.getDate() + days);
  return formatYMD(d);
}

/** Monday of the week containing `d` (local), as `YYYY-MM-DD`. */
export function mondayWeekStartForDate(d: Date = new Date()): string {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = copy.getDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  copy.setDate(copy.getDate() + offset);
  return formatYMD(copy);
}
