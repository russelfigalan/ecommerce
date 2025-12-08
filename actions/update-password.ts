"use server";

import bcrypt from "bcryptjs";
import { PasswordSchema } from "@/schemas/index";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

export async function updatePassword(values: any) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const validated = PasswordSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid input" };

  const { password, newPassword } = validated.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.password) return { error: "User has no password set" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { error: "Current password is incorrect" };

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: "Password updated!" };
}
