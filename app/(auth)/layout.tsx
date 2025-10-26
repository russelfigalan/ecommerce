import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <main>{children}</main>
    </SessionProvider>
  );
}
