import prisma from "@/lib/db/prisma";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return NextResponse.json({ error: "Missing token" });

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return NextResponse.json({ error: "Invalid token" });
  }

  if (existingToken.expires < new Date()) {
    return NextResponse.json({ error: "Token expired" });
  }

  // Now update the user's email
  await prisma.user.update({
    where: { email: existingToken.email }, // email requested to update to
    data: { email: existingToken.email },
  });

  // Cleanup token
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.redirect("/settings?success=email-updated");
}
