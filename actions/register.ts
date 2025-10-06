"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  // const existingUser = await prisma?.user.findUnique({
  //   where: { email },
  // });

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
