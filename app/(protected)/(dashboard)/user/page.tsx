"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function Dashboard() {
  const user = useCurrentUser();
  // const session = useSession();
  // console.log(user);

  return <>
    <div>
      <h2>User Page</h2>
    </div>
  </>
}
