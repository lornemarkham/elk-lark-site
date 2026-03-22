import { Link } from "react-router-dom";
import type { Recipe } from "../types/recipe";
import { TagChips } from "./TagChips";

type Props = { recipe: Recipe };

export function RecipeCard({ recipe }: Props) {
  const cardTags = recipe.tags.slice(0, 4);

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="block rounded-2xl border border-clay/80 bg-cream p-5 shadow-sm transition hover:border-sage/40 hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-bark">{recipe.title}</h2>
      <p className="mt-1 text-sm text-bark/70">by {recipe.author}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-bark/80">
        <span>~{recipe.approxCalories} cal</span>
        <span>★ {recipe.rating}/10</span>
        <span>{recipe.dateCooked}</span>
      </div>
      {cardTags.length > 0 && (
        <div className="mt-3 pointer-events-none">
          <TagChips tags={cardTags} variant="primary" />
        </div>
      )}
    </Link>
  );
}
