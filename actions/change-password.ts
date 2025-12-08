"use server";

import bcrypt from "bcryptjs";
import { currentUser } from "@/lib/current-user";
import { generatePasswordChangeVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const requestPasswordChange = async (
  oldPassword: string,
  newPassword: string
) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  if (!user.password)
    return { error: "Your account does not support password login" };

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return { error: "Incorrect current password" };
  }

  const token = await generatePasswordChangeVerificationToken(
    user.email!,
    newPassword
  );

  // Reuse same email template
  await sendVerificationEmail(user.email!, token.token);

  return { success: "Check your email to confirm password change" };
};
