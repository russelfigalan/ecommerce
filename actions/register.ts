"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/db/prisma";

import { RegisterSchema } from "@/schemas";

export const register = async (values: unknown) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma?.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await prisma?.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User registered successfully" };
};
