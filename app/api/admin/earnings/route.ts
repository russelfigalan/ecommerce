import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    // Fetch all successful payments (limit artificially high for demo)
    const payments = await stripe.paymentIntents.list({
      limit: 100,
    });

    // Group by month
    const earnings: Record<string, number> = {};

    payments.data.forEach((p) => {
      if (p.status !== "succeeded") return;

      const date = new Date((p.created ?? 0) * 1000);
      const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar
      const year = date.getFullYear();

      const key = `${month} ${year}`;
      const amount = (p.amount_received ?? p.amount) / 100; // cents → dollars

      earnings[key] = (earnings[key] || 0) + amount;
    });

    return NextResponse.json({ earnings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 });
  }
}
