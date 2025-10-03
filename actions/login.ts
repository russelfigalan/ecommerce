"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (values: unknown) => {
  console.log(values);
};
