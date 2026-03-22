import type { MechanicScribeSchema, RecipeScribeSchema, ScribeMode } from "../types";
import { getScribePrompt } from "../prompts";
import { coerceMechanicScribeSchema, coerceRecipeScribeSchema } from "../schemas";
import { buildRecipeFallbackFromInput } from "../infer";

async function callOpenAIJson(prompt: string): Promise<unknown> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a strict JSON generator. Return ONLY valid JSON. Do not wrap in markdown. Do not include any extra keys.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`OpenAI error: ${resp.status}. ${text}`);
  }

  const json = (await resp.json()) as any;
  const content = json?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("OpenAI response did not include message content");
  }

  return JSON.parse(content);
}

function buildMechanicFallback(): MechanicScribeSchema {
  return {
    concern: "",
    likelyCauses: [],
    checks: [],
    tools: [],
  };
}

export async function scribeByMode(mode: ScribeMode, input: string): Promise<RecipeScribeSchema | MechanicScribeSchema> {
  if (mode === "recipe") {
    const fallback = buildRecipeFallbackFromInput(input);
    const prompt = getScribePrompt(mode, input);

    try {
      const parsed = await callOpenAIJson(prompt);
      const coerced = coerceRecipeScribeSchema(parsed, fallback);
      // Ensure tags are inferred even if the model returns empty tags.
      if (coerced.tags.length === 0) coerced.tags = buildRecipeFallbackFromInput(input).tags;
      // Ensure safe defaults
      if (!Number.isFinite(coerced.approxCalories)) coerced.approxCalories = fallback.approxCalories;
      if (!Number.isFinite(coerced.rating)) coerced.rating = 8;
      if (!coerced.title) coerced.title = fallback.title;
      return coerced;
    } catch {
      // Heuristic-only fallback when OpenAI is unavailable.
      return fallback;
    }
  }

  // mechanic mode
  const fallback = buildMechanicFallback();
  const prompt = getScribePrompt(mode, input);
  try {
    const parsed = await callOpenAIJson(prompt);
    return coerceMechanicScribeSchema(parsed, fallback);
  } catch {
    return fallback;
  }
}

