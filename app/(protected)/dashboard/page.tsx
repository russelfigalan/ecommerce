import { auth, signOut } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/" });
        }}
      >
        <button>Sign Out</button>
      </form>
    </>
  );
}
