"use server";

import prisma from "@/lib/db/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (existingToken.type === "email") {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  
    return { success: "Email verified!" };
  }

  if (existingToken.type === "password") {
    if (!existingToken.newPassword) {
      return { error: "Invalid token data!" }
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: existingToken.newPassword,
      }
    })

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })

    return { success: "Password updated successfully!" }
  }

  return { error: "Invalid verification type!" }

};
