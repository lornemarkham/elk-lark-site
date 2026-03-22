import type { Recipe } from "../types/recipe";

/**
 * Placeholder "AI" tag suggestions from keywords in title, ingredients, and notes.
 * Not real AI — simulates future behavior.
 */
export function generateSuggestedTags(recipe: Pick<Recipe, "title" | "ingredients" | "notes">): string[] {
  const text = `${recipe.title}\n${recipe.ingredients}\n${recipe.notes}`.toLowerCase();
  const out: string[] = [];

  function add(tag: string) {
    if (!out.includes(tag)) out.push(tag);
  }

  if (text.includes("kimchi")) add("kimchi");
  if (text.includes("ginger")) add("ginger");
  if (text.includes("sesame oil")) add("sesame");
  if (text.includes("romaine") || text.includes("sprouts")) add("fresh");
  if (text.includes("chicken")) add("chicken");
  if (text.includes("salad")) add("salad");
  if (text.includes("cabbage") || text.includes("carrot")) add("crunchy");
  if (text.includes("soy") || text.includes("ginger") || text.includes("kimchi")) add("asian");

  return out;
}
