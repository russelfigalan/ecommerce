import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stripeId } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existingCart = await prisma.cartItem.findUnique({
    where: { userId_stripeId: { userId: user.id, stripeId } },
  });

  if (existingCart) {
    await prisma.cartItem.update({
      where: { userId_stripeId: { userId: user.id, stripeId } },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: { userId: user.id, stripeId, quantity: 1 },
    });
  }

  return NextResponse.json({ success: true });
}
