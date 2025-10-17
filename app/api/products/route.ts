import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 10,
  });

  // Only send the data part (simplifies client-side use)
  return NextResponse.json(products.data);
}
