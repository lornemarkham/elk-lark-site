export type Season = "summer" | "winter";

/** Sep–Mar (inclusive) = winter, else summer */
export function getDefaultSeason(d: Date = new Date()): Season {
  const m = d.getMonth() + 1; // 1..12
  return m >= 9 || m <= 3 ? "winter" : "summer";
}
