import crypto from "crypto";
import prisma from "@/lib/db/prisma";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { getResetPasswordTokenByEmail } from "@/data/reset-password-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import bcrypt from "bcryptjs";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generatePasswordChangeVerificationToken = async (
  email: string,
  newPassword: string
) => {
  const token = uuidv4();
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

  // delete existing password-change tokens for the same user
  await prisma.verificationToken.deleteMany({
    where: { email, type: "password" },
  });

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
      type: "password",
      newPassword: hashedPassword,
    },
  });

  return verificationToken;
};