"use server";

import { ResetSchema } from "@/schemas/index";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

export async function updateEmail(values: any) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const validated = ResetSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid email address" };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { email: validated.data.email },
  });

  return { success: "Email updated!" };
}
