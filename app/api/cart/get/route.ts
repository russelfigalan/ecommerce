import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json([], { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cartItems: true },
    });

    const stripeIds = user?.cartItems.map((c) => c.stripeId) || [];

    if (stripeIds.length === 0) return NextResponse.json([]);

    const stripeProducts = await Promise.all(
      stripeIds.map(async (id) => {
        const price = await stripe.prices.retrieve(id);
        const product = await stripe.products.retrieve(price.product as string);

        return { id, product, price };
      })
    );

    const mergedCart = user?.cartItems.map((item) => {
      const data = stripeProducts.find((s) => s.id === item.stripeId);

      return {
        id: item.id,
        stripeId: item.stripeId,
        quantity: item.quantity,
        name: data?.product.name,
        image: data?.product.images[0],
        unit_amount: data?.price.unit_amount,
        currency: data?.price.currency,
      };
    });

    return NextResponse.json(mergedCart);
  } catch (error) {
    console.error("Error fetchin cart:", error);

    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
