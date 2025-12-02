import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";
import "server-only";

export async function currentUser() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}
