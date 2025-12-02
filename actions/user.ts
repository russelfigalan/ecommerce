"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

export async function saveProfileImage(url: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: url },
  });
}
