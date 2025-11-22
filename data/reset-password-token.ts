import prisma from "@/lib/db/prisma";

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
