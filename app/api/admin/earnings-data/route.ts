import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    // Fetch all successful payments
    const payments = await stripe.paymentIntents.list({
      limit: 100,
    });

    // Initialize 12 months of data (Jan–Dec)
    const monthly = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2025, i).toLocaleString("en-US", { month: "short" }),
      earnings: 0,
    }));

    payments.data.forEach((p) => {
      if (p.status !== "succeeded") return;

      const date = new Date(p.created * 1000);
      const monthIndex = date.getMonth(); // 0–11

      const amount = (p.amount_received ?? p.amount) / 100; // cents → dollars

      monthly[monthIndex].earnings += amount;
    });

    const totalEarnings = monthly.reduce((sum, m) => sum + m.earnings, 0);

    return NextResponse.json({
      totalEarnings,
      monthly,
    });
  } catch (err) {
    console.error("EARNINGS API ERROR:", err);
    return NextResponse.json(
      { monthly: [], totalEarnings: 0 },
      { status: 500 }
    );
  }
}
