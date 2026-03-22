import type { MechanicScribeSchema, RecipeScribeSchema } from "./types";

export const recipeSchemaText = `You MUST output a single JSON object that matches exactly this recipe shape:
{
  "title": string,
  "ingredients": string[],
  "notes": string,
  "changes": string,
  "improveNextTime": string,
  "approxCalories": number,
  "rating": number,
  "tags": string[]
}`;

export const mechanicSchemaText = `You MUST output a single JSON object that matches exactly this mechanic shape:
{
  "concern": string,
  "likelyCauses": string[],
  "checks": string[],
  "tools": string[]
}`;

export function coerceRecipeScribeSchema(input: unknown, fallback: RecipeScribeSchema): RecipeScribeSchema {
  const obj = input as Record<string, unknown> | null | undefined;
  if (!obj || typeof obj !== "object") return fallback;

  const title = typeof obj.title === "string" ? obj.title.trim() : fallback.title;

  const ingredients = Array.isArray(obj.ingredients) ? obj.ingredients.map((v) => String(v)).filter(Boolean) : fallback.ingredients;
  const notes = typeof obj.notes === "string" ? obj.notes : fallback.notes;
  const changes = typeof obj.changes === "string" ? obj.changes : fallback.changes;
  const improveNextTime = typeof obj.improveNextTime === "string" ? obj.improveNextTime : fallback.improveNextTime;

  const approxCaloriesRaw = typeof obj.approxCalories === "number" ? obj.approxCalories : Number(obj.approxCalories);
  const approxCalories = Number.isFinite(approxCaloriesRaw) ? approxCaloriesRaw : fallback.approxCalories;

  const ratingRaw = typeof obj.rating === "number" ? obj.rating : Number(obj.rating);
  const rating = Number.isFinite(ratingRaw) ? ratingRaw : fallback.rating;

  const tags = Array.isArray(obj.tags) ? obj.tags.map((v) => String(v)).filter(Boolean) : fallback.tags;

  return {
    ...fallback,
    title,
    ingredients,
    notes,
    changes,
    improveNextTime,
    approxCalories,
    rating,
    tags,
  };
}

export function coerceMechanicScribeSchema(input: unknown, fallback: MechanicScribeSchema): MechanicScribeSchema {
  const obj = input as Record<string, unknown> | null | undefined;
  if (!obj || typeof obj !== "object") return fallback;

  const concern = typeof obj.concern === "string" ? obj.concern.trim() : fallback.concern;

  const likelyCauses = Array.isArray(obj.likelyCauses) ? obj.likelyCauses.map((v) => String(v)).filter(Boolean) : fallback.likelyCauses;
  const checks = Array.isArray(obj.checks) ? obj.checks.map((v) => String(v)).filter(Boolean) : fallback.checks;
  const tools = Array.isArray(obj.tools) ? obj.tools.map((v) => String(v)).filter(Boolean) : fallback.tools;

  return {
    ...fallback,
    concern,
    likelyCauses,
    checks,
    tools,
  };
}

