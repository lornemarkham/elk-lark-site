import type { RecipeScribeSchema } from "./types";

function addUnique(out: string[], tag: string) {
  const t = tag.trim();
  if (!t) return;
  const lower = t.toLowerCase();
  if (out.includes(lower)) return;
  out.push(lower);
}

function normalizeText(input: string): string {
  return input.toLowerCase();
}

export function inferRecipeTagsFromText(input: string): string[] {
  const text = normalizeText(input);
  const out: string[] = [];

  if (text.includes("kimchi")) addUnique(out, "kimchi");
  if (text.includes("ginger")) addUnique(out, "ginger");
  if (text.includes("sesame oil")) addUnique(out, "sesame");
  if (text.includes("romaine") || text.includes("sprouts")) addUnique(out, "fresh");
  if (text.includes("chicken")) addUnique(out, "chicken");
  if (text.includes("salad")) addUnique(out, "salad");
  if (text.includes("cabbage") || text.includes("carrot")) addUnique(out, "crunchy");

  // simple cross-category heuristic
  if (text.includes("soy") || text.includes("ginger") || text.includes("kimchi")) addUnique(out, "asian");

  return out;
}

export function estimateCaloriesFromText(input: string): number {
  const text = normalizeText(input);

  if (text.includes("chicken") && (text.includes("salad") || text.includes("romaine"))) return 480;
  if (text.includes("salad") || text.includes("sprouts") || text.includes("romaine")) return 400;
  if (text.includes("chicken")) return 550;
  if (text.includes("noodle") || text.includes("pasta")) return 650;

  return 500;
}

export function buildRecipeFallbackFromInput(input: string): RecipeScribeSchema {
  const text = normalizeText(input);

  const firstLine = input
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0) || "Converted Recipe";

  const ingredientsFromLines = input
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^ingredients?:/i.test(l))
    .slice(0, 12);

  const ingredients =
    ingredientsFromLines.length >= 2 ? ingredientsFromLines : input.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12);

  const tags = inferRecipeTagsFromText(input);

  return {
    title: firstLine.length > 2 ? firstLine : "Converted Recipe",
    ingredients,
    notes: input.trim(),
    changes: "",
    improveNextTime: "",
    approxCalories: estimateCaloriesFromText(text),
    rating: 8,
    tags,
  };
}

