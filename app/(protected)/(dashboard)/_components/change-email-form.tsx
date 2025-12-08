"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { requestEmailChange } from "@/actions/change-email";

import { Form, FormLabel, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";

const EmailSchema = z.object({
  email: z.string().email("Invalid email"),
});

export function ChangeEmailForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      requestEmailChange(values.email).then((data) => {
        setError(data?.error || "");
        setSuccess(data?.success || "");
      });
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Change Email</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
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
