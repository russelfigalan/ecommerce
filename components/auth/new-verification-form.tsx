"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SyncLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <Card className="w-[360px] flex justify-center-safe items-center-safe text-center">
        <CardHeader className="w-full">
          <CardTitle>Email Confirmation</CardTitle>
          {!success && !error && (
            <CardDescription>Confirming email...</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex justify-center-safe items-center-safe">
          {!success && !error && <SyncLoader />}
          <FormSuccess message={success} />
          <FormError message={error} />
        </CardContent>
        <CardFooter>
          <Button variant={"link"} asChild>
            <Link href={"/login"}>Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
