export type RecipeAuthor = "Lorne" | "Kathy";

export type Recipe = {
  id: string;
  title: string;
  author: RecipeAuthor;
  dateCooked: string;
  ingredients: string;
  notes: string;
  changes: string;
  improveNextTime: string;
  approxCalories: number;
  rating: number;
  tags: string[];
  suggestedTags?: string[];
};
