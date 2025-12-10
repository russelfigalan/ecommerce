import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    // Fetch Stripe customers (max 100 for demo)
    const customers = await stripe.customers.list({
      limit: 100,
    });

    // Fetch payment history per customer
    const results = await Promise.all(
      customers.data.map(async (customer) => {
        // Total spent by customer
        const payments = await stripe.paymentIntents.list({
          customer: customer.id,
          limit: 100,
        });

        const totalSpent = payments.data
          .filter((p) => p.status === "succeeded")
          .reduce((sum, p) => sum + p.amount_received / 100, 0);

        return {
          id: customer.id,
          name: customer.name || "No name",
          email: customer.email || "No email",
          country: customer.address?.country || "N/A",
          totalSpent,
          created: new Date(customer.created * 1000),
        };
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error("CUSTOMERS API ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
