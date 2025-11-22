import prisma from "@/lib/db/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, quantity } = await req.json();

  const updatedQuantity = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });

  return NextResponse.json(updatedQuantity);
}
