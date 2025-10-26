"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";

export default function Dashboard() {
  const user = useCurrentUser();
  // const session = useSession();

  const onClick = () => {
    logout();
  };

  return (
    <>
      {JSON.stringify(user?.role)}
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </>
  );
}
