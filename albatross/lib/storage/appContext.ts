import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AppContext } from '@/types/appContext';

import { KEY_APP_CONTEXT } from '@/lib/storage/keys';
import { parseStorageJson } from '@/lib/storage/parseStorageJson';

export async function getAppContext(): Promise<AppContext | null> {
  const raw = await AsyncStorage.getItem(KEY_APP_CONTEXT);
  return parseStorageJson<AppContext>(raw);
}

export async function saveAppContext(context: AppContext): Promise<void> {
  await AsyncStorage.setItem(KEY_APP_CONTEXT, JSON.stringify(context));
}

export async function clearAppContext(): Promise<void> {
  await AsyncStorage.removeItem(KEY_APP_CONTEXT);
}
