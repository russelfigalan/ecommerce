import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 100,
    });

    return NextResponse.json({ products: products.data });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
