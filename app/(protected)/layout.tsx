// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

export default function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  return (
    <>
      {/* <SessionProvider session={session}> */}
      <div>{children}</div>
      {/* </SessionProvider> */}
    </>
  );
}
