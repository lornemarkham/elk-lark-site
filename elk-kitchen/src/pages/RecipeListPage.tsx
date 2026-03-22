import { Link } from "react-router-dom";
import { loadRecipes, resetRecipeData } from "../lib/recipeStorage";
import { RecipeCard } from "../components/RecipeCard";

export function RecipeListPage() {
  const recipes = loadRecipes();

  function handleResetRecipeData() {
    resetRecipeData();
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-bark">ELK Kitchen</h1>
          <p className="mt-1 text-bark/70">Recipe memory — save before they slip away.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetRecipeData}
            className="inline-flex items-center justify-center rounded-xl border border-clay bg-cream px-4 py-2.5 text-sm font-medium text-bark transition hover:bg-clay/20"
          >
            Reset Recipe Data
          </button>
          <Link
            to="/add"
            className="inline-flex items-center justify-center rounded-xl bg-sage px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sage/90"
          >
            Add Recipe
          </Link>
        </div>
      </header>

      {recipes.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-clay bg-cream/50 p-8 text-center text-bark/70">
          No recipes yet. Add your first one.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
