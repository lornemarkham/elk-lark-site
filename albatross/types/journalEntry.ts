/**
 * Daily journal — free-form capture keyed by `date` (`YYYY-MM-DD`).
 */
export interface JournalIdentityLines {
  line1: string;
  line2: string;
}

export interface JournalEntry {
  date: string;
  intention: string;
  identity: JournalIdentityLines;
  /** Typically three lines; length is not enforced at the type level. */
  gratitude: string[];
  freeWrite: string;
}
