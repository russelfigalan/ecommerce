"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";

export default function Dashboard() {
  const user = useCurrentUser();
  // const session = useSession();
  console.log(user);

  const onClick = () => {
    logout();
  };

  return <></>;
}
