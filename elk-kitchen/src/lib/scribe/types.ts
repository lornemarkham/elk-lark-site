export type ScribeMode = "recipe" | "mechanic";

export type ScribeRequest = {
  mode: ScribeMode;
  input: string;
};

export type RecipeScribeSchema = {
  title: string;
  ingredients: string[];
  notes: string;
  changes: string;
  improveNextTime: string;
  approxCalories: number;
  rating: number;
  tags: string[];
};

export type MechanicScribeSchema = {
  concern: string;
  likelyCauses: string[];
  checks: string[];
  tools: string[];
};

