"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { UsernameSchema, ResetSchema, PasswordSchema } from "@/schemas/index";
import { updateUsername } from "@/actions/update-username";
import { updateEmail } from "@/actions/update-email";
import { updatePassword } from "@/actions/update-password";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export default function SettingsForm() {
  const [isPending, startTransition] = useTransition();

  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");

  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Username Form
  const usernameForm = useForm({
    resolver: zodResolver(UsernameSchema),
    defaultValues: { username: "" },
  });

  const handleUsername = (values: any) => {
    setUsernameError("");
    setUsernameSuccess("");

    startTransition(() => {
      updateUsername(values).then((data) => {
        setUsernameError(data.error || "");
        setUsernameSuccess(data.success || "");
      });
    });
  };

  // Email Form
  const emailForm = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const handleEmail = (values: any) => {
    setEmailError("");
    setEmailSuccess("");

    startTransition(() => {
      updateEmail(values).then((data) => {
        setEmailError(data.error || "");
        setEmailSuccess(data.success || "");
      });
    });
  };

  // Password Form
  const passwordForm = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: { password: "", newPassword: "" },
  });

  const handlePassword = (values: any) => {
    setPasswordError("");
    setPasswordSuccess("");

    startTransition(() => {
      updatePassword(values).then((data) => {
        setPasswordError(data.error || "");
        setPasswordSuccess(data.success || "");
      });
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      {/* USERNAME */}
      <Card>
        <CardHeader>
          <CardTitle>Change Username</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...usernameForm}>
            <form onSubmit={usernameForm.handleSubmit(handleUsername)} className="space-y-4">
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="Your new username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={usernameError} />
              <FormSuccess message={usernameSuccess} />

              <Button type="submit" disabled={isPending} className="w-full">
                Update Username
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* EMAIL */}
      <Card>
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="you@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={emailError} />
              <FormSuccess message={emailSuccess} />

              <Button type="submit" disabled={isPending} className="w-full">
                Update Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* PASSWORD */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handlePassword)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="password" placeholder="Current password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="password" placeholder="New password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={passwordError} />
              <FormSuccess message={passwordSuccess} />

              <Button type="submit" disabled={isPending} className="w-full">
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
