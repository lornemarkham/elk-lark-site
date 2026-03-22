import type { ScribeMode } from "./types";
import { mechanicSchemaText, recipeSchemaText } from "./schemas";

export function getRecipeScribePrompt(input: string): string {
  return `Convert the messy user text into a clean recipe output JSON.

Rules:
- Output ONLY valid JSON. No markdown.
- Match the recipe schema exactly.
- Schema:
${recipeSchemaText}
- Use best-effort extraction from the text.
- If something is unclear, provide reasonable safe defaults:
  - approxCalories: estimate based on keywords (chicken -> higher, salad -> lower)
  - rating: default to 8
- tags: infer from content when possible (kimchi/ginger/sesame oil -> asian or sesame/ginger; romaine/sprouts -> fresh; chicken -> chicken; cabbage/carrot -> crunchy; salad -> salad)

TEXT:
${input}`;
}

export function getMechanicScribePrompt(input: string): string {
  return `Convert the messy user text into a clean mechanic output JSON.

Rules:
- Output ONLY valid JSON. No markdown.
- Match the mechanic schema exactly.
- Schema:
${mechanicSchemaText}

TEXT:
${input}`;
}

export function getScribePrompt(mode: ScribeMode, input: string): string {
  if (mode === "recipe") return getRecipeScribePrompt(input);
  return getMechanicScribePrompt(input);
}

