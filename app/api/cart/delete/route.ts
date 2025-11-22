import prisma from "@/lib/db/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json(); // this will be the cartItem.id

  await prisma.cartItem.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
