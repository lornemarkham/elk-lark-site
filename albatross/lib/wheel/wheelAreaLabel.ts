/** Labels that are not allowed — too generic or placeholder-only. */
const FORBIDDEN_NORMALIZED = new Set(['new area', 'area']);

/**
 * True if the user-provided label is acceptable to save (non-empty, not a placeholder).
 */
export function isValidAreaLabel(raw: string): boolean {
  const t = raw.trim();
  if (!t) return false;
  const key = t.toLowerCase();
  if (FORBIDDEN_NORMALIZED.has(key)) return false;
  return true;
}

/** For migrating old stored data. */
export function isForbiddenStoredLabel(label: string): boolean {
  return FORBIDDEN_NORMALIZED.has(label.trim().toLowerCase());
}
