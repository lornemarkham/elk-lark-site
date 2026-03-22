import { Link, useParams } from "react-router-dom";
import { getRecipeById } from "../lib/recipeStorage";
import { TagChips } from "../components/TagChips";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? getRecipeById(id) : undefined;

  if (!recipe) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-bark/70">Recipe not found.</p>
        <Link to="/" className="mt-4 inline-block text-sage underline">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/" className="text-sm font-medium text-sage hover:underline">
        ← All recipes
      </Link>

      <article className="mt-6 rounded-2xl border border-clay bg-cream p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-bark">{recipe.title}</h1>
        <p className="mt-1 text-bark/70">by {recipe.author}</p>
        <p className="mt-2 text-sm text-bark/80">Cooked {recipe.dateCooked}</p>

        {recipe.tags.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-sage">Tags</p>
            <div className="mt-2">
              <TagChips tags={recipe.tags} variant="primary" />
            </div>
          </div>
        )}
        {(recipe.suggestedTags?.length ?? 0) > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-bark/50">Suggested tags</p>
            <div className="mt-2">
              <TagChips tags={recipe.suggestedTags ?? []} variant="secondary" />
            </div>
          </div>
        )}

        <dl className="mt-6 space-y-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-sage">Ingredients</dt>
            <dd className="mt-2 whitespace-pre-wrap text-bark">{recipe.ingredients}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-sage">Notes</dt>
            <dd className="mt-2 whitespace-pre-wrap text-bark">{recipe.notes}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-sage">Changes</dt>
            <dd className="mt-2 whitespace-pre-wrap text-bark">{recipe.changes}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-sage">Improvements</dt>
            <dd className="mt-2 whitespace-pre-wrap text-bark">{recipe.improveNextTime}</dd>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-clay pt-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-sage">Approx calories</dt>
              <dd className="mt-1 text-lg font-medium text-bark">{recipe.approxCalories}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-sage">Rating</dt>
              <dd className="mt-1 text-lg font-medium text-bark">{recipe.rating} / 10</dd>
            </div>
          </div>
        </dl>
      </article>
    </div>
  );
}
