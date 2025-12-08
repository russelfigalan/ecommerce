"use server";

import { UsernameSchema } from "@/schemas/index";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

export async function updateUsername(values: any) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const validated = UsernameSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid username" };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username: validated.data.username },
  });

  return { success: "Username updated!" };
}
