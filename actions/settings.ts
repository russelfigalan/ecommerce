"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { currentUser } from "@/lib/current-user";

export const updateSettings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const validated = SettingsSchema.safeParse(values);

  if (!validated.success) {
    return { error: "Invalid fields!" };
  }

  const { email, username, password, newPassword } = validated.data;

  const user = await currentUser();
  if (!user) return { error: "Not authenticated." };

  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!existingUser) return { error: "User not found." };

  /** ----------------------
   * Update Email
   ---------------------- */
  if (email && email !== existingUser.email) {
    await prisma.user.update({
      where: { id: user.id },
      data: { email },
    });
    return { success: "Email updated!" };
  }

  /** ----------------------
   * Update Username
   ---------------------- */
  if (username && username !== existingUser.username) {
    await prisma.user.update({
      where: { id: user.id },
      data: { username },
    });
    return { success: "Username updated!" };
  }

  /** ----------------------
   * Update Password
   ---------------------- */
  if (newPassword) {
    if (!existingUser.password) {
      return { error: "Your account has no password set." };
    }

    if (!password) {
      return { error: "Please enter your current password." };
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!validPassword) {
      return { error: "Incorrect current password." };
    }

    const hashed = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    return { success: "Password updated!" };
  }

  return { error: "Nothing to update." };
};
