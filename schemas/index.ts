import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password should have a minimum of 6 characters!",
  }),
});

export const PasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Input current password"
  }),
  newPassword: z.string().min(6, {
    message: "Input new password"
  })
})

export const UsernameSchema = z.object({
  username: z.string().min(1, {
    message: "Please input a username"
  })
})

export const SettingsSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(20).optional(),
  password: z.string().optional(), // current password
  newPassword: z.string().min(6).optional(),

  actionType: z.enum(["username", "email", "password"]).optional(),
});