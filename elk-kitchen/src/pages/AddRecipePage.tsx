import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Recipe, RecipeAuthor } from "../types/recipe";
import { addRecipe, newRecipeId } from "../lib/recipeStorage";
import { generateSuggestedTags } from "../lib/suggestedTags";

const emptyForm = {
  title: "",
  author: "Lorne" as RecipeAuthor,
  dateCooked: "",
  ingredients: "",
  notes: "",
  changes: "",
  improveNextTime: "",
  approxCalories: "",
  rating: "",
  tagsRaw: "",
};

function parseTagsCommaSeparated(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function AddRecipePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [scribeInput, setScribeInput] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleConvertToRecipe() {
    // Fake scribe: ignore textarea input and hardcode a structured recipe.
    setIsConverting(true);
    setConvertError(null);
    try {
      const fakeDateCooked = new Date().toISOString().slice(0, 10);

      setForm((f) => ({
        ...f,
        author: "Lorne",
        dateCooked: fakeDateCooked,
        title: "ELK Crunch Bowl v1",
        ingredients: `Romaine
Soybean sprouts
Carrot
Red onion
Purple cabbage
Cucumber
Crispy noodles
Chicken
Kimchi`,
        notes: "Fresh, crunchy, super delicious. Purple cabbage added great color and crunch.",
        changes: "Added purple cabbage and cucumber. Added kimchi at the end.",
        improveNextTime: "Reduce soy slightly. Try lime. Add peanuts.",
        approxCalories: "550",
        rating: "9",
        tagsRaw: "asian, light, crunchy, chicken, fresh, weeknight, salad",
      }));
    } catch (e: any) {
      setConvertError(e?.message ?? "Failed to convert");
    } finally {
      setIsConverting(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const calories = Number(form.approxCalories);
    const rating = Number(form.rating);
    const tags = parseTagsCommaSeparated(form.tagsRaw);
    const draft: Pick<Recipe, "title" | "ingredients" | "notes"> = {
      title: form.title.trim(),
      ingredients: form.ingredients.trim(),
      notes: form.notes.trim(),
    };
    const suggestedTags = generateSuggestedTags(draft);
    const recipe: Recipe = {
      id: newRecipeId(),
      title: draft.title,
      author: form.author,
      dateCooked: form.dateCooked.trim(),
      ingredients: draft.ingredients,
      notes: draft.notes,
      changes: form.changes.trim(),
      improveNextTime: form.improveNextTime.trim(),
      approxCalories: Number.isFinite(calories) ? calories : 0,
      rating: Number.isFinite(rating) ? rating : 0,
      tags,
      suggestedTags: suggestedTags.length > 0 ? suggestedTags : undefined,
    };
    addRecipe(recipe);
    navigate("/");
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-clay bg-white px-3 py-2 text-bark shadow-sm focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage";
  const labelClass = "block text-sm font-medium text-bark";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/" className="text-sm font-medium text-sage hover:underline">
        ← Cancel
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-bark">Add recipe</h1>
      <p className="mt-1 text-sm text-bark/70">Saved in this browser only (localStorage).</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="scribeInput" className={labelClass}>
            Describe what you cooked (messy is fine)
          </label>
          <textarea
            id="scribeInput"
            name="scribeInput"
            rows={6}
            className={inputClass}
            placeholder="e.g. I threw together romaine with sprouts, a bunch of stuff, soy + ginger, forgot kimchi then added it later."
            value={scribeInput}
            onChange={(e) => setScribeInput(e.target.value)}
          />

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleConvertToRecipe}
              disabled={isConverting}
              className="rounded-xl bg-clay px-4 py-2.5 text-sm font-semibold text-bark shadow-sm transition hover:bg-clay/80 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConverting ? "Converting..." : "Convert to Recipe"}
            </button>

            {convertError ? <p className="text-sm text-red-600">{convertError}</p> : <div />}
          </div>
        </div>

        <div>
          <label htmlFor="title" className={labelClass}>
            Title *
          </label>
          <input id="title" name="title" required className={inputClass} value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="author" className={labelClass}>
            Author *
          </label>
          <select id="author" name="author" required className={inputClass} value={form.author} onChange={handleChange}>
            <option value="Lorne">Lorne</option>
            <option value="Kathy">Kathy</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateCooked" className={labelClass}>
            Date cooked *
          </label>
          <input
            id="dateCooked"
            name="dateCooked"
            type="date"
            required
            className={inputClass}
            value={form.dateCooked}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ingredients" className={labelClass}>
            Ingredients *
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            required
            rows={8}
            className={inputClass}
            value={form.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="notes" className={labelClass}>
            Notes
          </label>
          <textarea id="notes" name="notes" rows={4} className={inputClass} value={form.notes} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="changes" className={labelClass}>
            Changes
          </label>
          <textarea id="changes" name="changes" rows={3} className={inputClass} value={form.changes} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="improveNextTime" className={labelClass}>
            Improve next time
          </label>
          <textarea
            id="improveNextTime"
            name="improveNextTime"
            rows={3}
            className={inputClass}
            value={form.improveNextTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tagsRaw" className={labelClass}>
            Tags (comma separated)
          </label>
          <input
            id="tagsRaw"
            name="tagsRaw"
            type="text"
            className={inputClass}
            placeholder="asian, light, quick, soup"
            value={form.tagsRaw}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="approxCalories" className={labelClass}>
              Approx calories
            </label>
            <input
              id="approxCalories"
              name="approxCalories"
              type="number"
              min={0}
              className={inputClass}
              value={form.approxCalories}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rating" className={labelClass}>
              Rating (0–10)
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              min={0}
              max={10}
              step={0.5}
              className={inputClass}
              value={form.rating}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-xl bg-sage py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sage/90 sm:w-auto sm:px-8"
          >
            Save recipe
          </button>
        </div>
      </form>
    </div>
  );
}
