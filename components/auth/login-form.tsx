"use client";

import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { update } = useSession();
  const rawError = searchParams.get("error");
  const urlError =
    rawError === "OAuthAccountNotLinked"
      ? "Email already registered. Please login with your email and password."
      : rawError &&
          !["Callback", "OAuthCallback", "OAuthCallbackError"].includes(
            rawError
          )
        ? rawError
        : "";

  const form = useForm<z.infer<typeof LoginSchema> & { code?: string }>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      (async () => {
        try {
          const data = await login(values);

          if (data?.error) {
            form.reset();
            setError(data.error);
            return;
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
            return;
          }

          if (data?.success) {
            // ✅ Refresh session safely
            setError("");
            await update();
            router.push("/dashboard");
          }
        } catch (err) {
          if (err instanceof Error) {
            if (
              err.message.includes("NEXT_REDIRECT") ||
              err.message.includes("NEXT_AUTH_REDIRECT")
            ) {
              return; // ✅ successful login redirect — do nothing
            }
          }
          console.error(err);
          setError("An unexpected error occurred. Please try again.");
        }
      })();
      // login(values)
      //   .then((data) => {
      //     if (data?.error) {
      //       form.reset();
      //       setError(data.error);
      //     }

      //     if (data?.success) {
      //       form.reset();
      //       setSuccess(data.success);
      //     }

      //     if (data?.twoFactor) {
      //       setShowTwoFactor(true);
      //     }
      //   })
      //   .catch((err) => setError(err));
    });
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="fold-bold text-center">Log in</CardTitle>
          <CardDescription className="">Welcome back</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          value={field.value ?? ""}
                          placeholder="1234567890"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            value={field.value ?? ""}
                            placeholder="email@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            value={field.value ?? ""}
                            placeholder="********"
                            type="password"
                          />
                        </FormControl>
                        <Button
                          disabled={isPending}
                          size={"sm"}
                          variant={"link"}
                          asChild
                          className="px-0"
                        >
                          <Link href={"/reset-password"}>Forgot password?</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {(error || urlError) && <FormError message={error || urlError} />}
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit" className="w-full">
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant={"link"} asChild>
            <Link href={"/register"}>{`Don't have an account?`}</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
