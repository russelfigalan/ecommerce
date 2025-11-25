// app/api/translate/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client (server only)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

declare global {
  var __translationCache:
    | Map<string, { value: string; ts: number }>
    | undefined;
}

type ReqBody = {
  text: string;
  target: string;
  source?: string;
};

const SERVER_CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

// Initialize global cache
if (!globalThis.__translationCache) {
  globalThis.__translationCache = new Map();
}
const cache = globalThis.__translationCache;

function cacheKey(text: string, source: string, target: string) {
  return `${source}::${target}::${text}`;
}

export async function POST(req: Request) {
  try {
    const { text, target, source = "auto" } = (await req.json()) as ReqBody;

    if (!text || !target) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Check server cache
    const key = cacheKey(text, source, target);
    const entry = cache.get(key);
    const now = Date.now();

    if (entry && now - entry.ts < SERVER_CACHE_TTL) {
      return NextResponse.json({ translation: entry.value, cached: true });
    }

    // Call OpenAI Responses API
    let translated = "";
    try {
      const response = await client.responses.create({
        model: "gpt-4o-mini", // stable text model
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Translate this text into ${target}. Return ONLY the translation without quotes or extra text:\n\n${text}`,
              },
            ],
          },
        ],
      });
      translated = response.output_text || text;
    } catch (err: any) {
      console.error("OpenAI API error:", err);
      return NextResponse.json(
        { error: "OpenAI connection error. Check API key or network." },
        { status: 500 }
      );
    }

    // Save to cache
    cache.set(key, { value: translated, ts: now });

    return NextResponse.json({ translation: translated, cached: false });
  } catch (err: any) {
    console.error("Translation API route error:", err);
    return NextResponse.json(
      { error: err?.message || "Translation failed" },
      { status: 500 }
    );
  }
}
