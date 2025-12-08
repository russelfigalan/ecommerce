"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { requestPasswordChange } from "@/actions/change-password";

import { Form, FormLabel, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const PasswordSchema = z.object({
  oldPassword: z.string().min(1, "Required"),
  newPassword: z.string().min(6, "Minimum 6 characters"),
});

export function ChangePasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      requestPasswordChange(values.oldPassword, values.newPassword).then(
        (data) => {
          setError(data?.error || "");
          setSuccess(data?.success || "");
        }
      );
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Change Password</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={isPending} type="submit" className="w-full">
            Send Verification Link
          </Button>
        </form>
      </Form>
    </div>
  );
}
