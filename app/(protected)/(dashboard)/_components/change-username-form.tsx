"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateUsername } from "@/actions/update-username";

import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const UsernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export function ChangeUsernameForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: { username: "" },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof UsernameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateUsername(values).then((data) => {
        setError(data?.error || "");
        setSuccess(data?.success || "");
      });

      router.refresh();
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Change Username</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Username</FormLabel>
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
            Update Username
          </Button>
        </form>
      </Form>
    </div>
  );
}
