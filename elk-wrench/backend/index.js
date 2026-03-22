/**
 * Mechanic AI Scribe - Backend API
 *
 * Flow: Client sends transcript → we forward to OpenAI with a structured prompt
 *       → OpenAI returns JSON → we return that JSON to the client.
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3001;

// Allow frontend (Vite default: 5173) to call this API
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ---------------------------------------------------------------------------
// OpenAI client: lazy init so the server can start without OPENAI_API_KEY
// ---------------------------------------------------------------------------
function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return null;
  }
  return new OpenAI({ apiKey: key });
}

/**
 * POST /api/mechanic-scribe
 *
 * Request body: { transcript: string }
 * Response: JSON with customerConcern, likelyCauses, recommendedChecks, partsOrTools, shopNotes
 */
app.post("/api/mechanic-scribe", async (req, res) => {
  try {
    const openai = getOpenAI();
    if (!openai) {
      return res.status(503).json({
        error:
          "OPENAI_API_KEY is not set. Add it to backend/.env to use mechanic scribe.",
      });
    }

    const { transcript } = req.body;

    if (!transcript || typeof transcript !== "string") {
      return res.status(400).json({
        error: "Missing or invalid 'transcript' in request body",
      });
    }

    // Call OpenAI with a system prompt that forces structured JSON output
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a mechanic's scribe. Given rough mechanic notes or a transcript, output valid JSON only (no markdown, no extra text) with exactly these keys:
- customerConcern (string): What the customer said or what the main issue is
- likelyCauses (array of strings): Possible causes
- recommendedChecks (array of strings): Checks to perform
- partsOrTools (array of strings): Parts or tools needed
- shopNotes (string): Internal notes for the shop`,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "OpenAI returned no content" });
    }

    const structured = JSON.parse(content);
    return res.json(structured);
  } catch (err) {
    console.error("mechanic-scribe error:", err);

    if (err.status === 401) {
      return res.status(401).json({ error: "Invalid API key. Set OPENAI_API_KEY." });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded. Try again later." });
    }

    return res.status(500).json({
      error: err.message || "Something went wrong processing the transcript",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Mechanic Scribe API running at http://localhost:${PORT}`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn(
      "Warning: OPENAI_API_KEY is not set — POST /api/mechanic-scribe returns 503 until you add backend/.env",
    );
  }
});
