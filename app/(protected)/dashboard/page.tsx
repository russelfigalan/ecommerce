"use client";

// import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";

export default function Dashboard() {
  // const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <>
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </>
  );
}
