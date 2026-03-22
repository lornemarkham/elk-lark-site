import type { Recipe } from "../types/recipe";

const STORAGE_KEY = "elk-kitchen-recipes";

const SEED_RECIPE: Recipe = {
  id: "seed-elk-crunch-bowl-v1",
  title: "ELK Crunch Bowl v1",
  author: "Lorne",
  dateCooked: "2026-03-19",
  tags: ["asian", "light", "crunchy", "chicken", "weeknight", "fresh", "salad"],
  suggestedTags: ["sesame", "ginger", "kimchi", "healthy", "colorful"],
  ingredients: `Romaine
Soybean sprouts
Carrot
Red onion
Purple cabbage
Cucumber
Crispy noodles
Chicken
Kimchi

Dressing:
Soy sauce
Sesame oil
Vinegar
Fresh grated ginger
Optional chili oil`,
  notes:
    "Fresh, crunchy, super delicious. Purple cabbage added great color and crunch. Cucumber worked well added fresh at serving. Crispy noodles added right before serving.",
  changes:
    "Added purple cabbage. Added cucumber per serving. Forgot kimchi at first, then added it after.",
  improveNextTime:
    "Maybe reduce soy slightly. Try lime. Add peanuts or sesame seeds.",
  approxCalories: 550,
  rating: 9,
};

function normalizeRecipe(raw: unknown): Recipe {
  const r = raw as Record<string, unknown>;
  return {
    id: String(r.id ?? ""),
    title: String(r.title ?? ""),
    author: r.author === "Kathy" ? "Kathy" : "Lorne",
    dateCooked: String(r.dateCooked ?? ""),
    ingredients: String(r.ingredients ?? ""),
    notes: String(r.notes ?? ""),
    changes: String(r.changes ?? ""),
    improveNextTime: String(r.improveNextTime ?? ""),
    approxCalories: Number(r.approxCalories) || 0,
    rating: Number(r.rating) || 0,
    tags: Array.isArray(r.tags) ? r.tags.map(String).filter(Boolean) : [],
    suggestedTags: Array.isArray(r.suggestedTags)
      ? r.suggestedTags.map(String).filter(Boolean)
      : undefined,
  };
}

function parseRecipes(raw: string | null): Recipe[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeRecipe);
  } catch {
    return [];
  }
}

function backfillSeedRecipeTags(recipes: Recipe[]): Recipe[] {
  let changed = false;
  const next = recipes.map((recipe) => {
    if (recipe.id !== SEED_RECIPE.id) return recipe;

    const needsTags = recipe.tags.length === 0;
    const needsSuggested = (recipe.suggestedTags?.length ?? 0) === 0;
    if (!needsTags && !needsSuggested) return recipe;

    changed = true;
    return {
      ...recipe,
      tags: needsTags ? [...SEED_RECIPE.tags] : recipe.tags,
      suggestedTags: needsSuggested ? [...(SEED_RECIPE.suggestedTags ?? [])] : recipe.suggestedTags,
    };
  });

  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return next;
}

export function loadRecipes(): Recipe[] {
  const existing = parseRecipes(localStorage.getItem(STORAGE_KEY));
  if (existing.length === 0) {
    const seeded = [SEED_RECIPE];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return backfillSeedRecipeTags(existing);
}

export function saveRecipes(recipes: Recipe[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function resetRecipeData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getRecipeById(id: string): Recipe | undefined {
  return loadRecipes().find((r) => r.id === id);
}

export function addRecipe(recipe: Recipe): void {
  const recipes = loadRecipes();
  saveRecipes([recipe, ...recipes]);
}

export function newRecipeId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `recipe-${Date.now()}`;
}
