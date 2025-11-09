import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <main>{children}</main>
      </SessionProvider>
    </>
  );
}
