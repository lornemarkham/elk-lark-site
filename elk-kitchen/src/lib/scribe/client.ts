import type { MechanicScribeSchema, RecipeScribeSchema, ScribeMode } from "./types";

export async function scribe(mode: ScribeMode, input: string): Promise<RecipeScribeSchema | MechanicScribeSchema> {
  const resp = await fetch("/api/scribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, input }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(text || `Scribe request failed (${resp.status})`);
  }

  return (await resp.json()) as RecipeScribeSchema | MechanicScribeSchema;
}

