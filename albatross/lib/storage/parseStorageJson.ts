/** Safe JSON parse for AsyncStorage payloads — returns null on empty or invalid JSON. */
export function parseStorageJson<T>(raw: string | null): T | null {
  if (raw == null || raw === '') return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
