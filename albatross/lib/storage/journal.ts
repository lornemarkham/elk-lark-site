import AsyncStorage from '@react-native-async-storage/async-storage';

import type { JournalEntry } from '@/types/journalEntry';

import { keyJournal } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';

/** Load journal entry for `date` (`YYYY-MM-DD`). */
export async function getJournalEntry(date: string): Promise<JournalEntry | null> {
  const raw = await AsyncStorage.getItem(keyJournal(date));
  return parseStorageJson<JournalEntry>(raw);
}

export async function saveJournalEntry(entry: JournalEntry): Promise<void> {
  await AsyncStorage.setItem(keyJournal(entry.date), JSON.stringify(entry));
}

export async function removeJournalEntry(date: string): Promise<void> {
  await AsyncStorage.removeItem(keyJournal(date));
}
