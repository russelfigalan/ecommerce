"use server";

import { currentUser } from "@/lib/current-user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const requestEmailChange = async (newEmail: string) => {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const token = await generateVerificationToken(newEmail);

  await sendVerificationEmail(newEmail, token.token);

  return { success: "Verification email sent!" };
};
