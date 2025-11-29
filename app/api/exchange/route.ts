import { NextResponse } from "next/server";

let cache: { rates: Record<string, number>; ts: number } | null = null;
const TTL = 1000 * 60 * 60 * 12;

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.ts < TTL) {
    return NextResponse.json({ rates: cache.rates, cached: true });
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("Failed to fetch");

    const json = await res.json();
    const rates = json.rates || {};

    if (!rates || Object.keys(rates).length === 0) {
      throw new Error("Empty rates");
    }

    cache = { rates, ts: now };

    return NextResponse.json({ rates, cached: false });
  } catch (err) {
    if (cache) return NextResponse.json({ rates: cache.rates, cached: true });

    return NextResponse.json({ rates: { USD: 1 }, cached: false });
  }
}
