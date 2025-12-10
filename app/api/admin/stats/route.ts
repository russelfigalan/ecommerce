import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  const paymentIntents = await stripe.paymentIntents.list({ limit: 100 });
  const customers = await stripe.customers.list({ limit: 100 });

  const totalEarnings = paymentIntents.data
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + (p.amount_received ?? p.amount), 0) / 100;

  const totalOrders = paymentIntents.data.filter((p) => p.status === "succeeded").length;

  return NextResponse.json({
    totalEarnings,
    totalOrders,
    totalCustomers: customers.data.length,
  });
}
