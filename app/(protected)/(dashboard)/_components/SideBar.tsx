import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { currentUser } from "@/lib/current-user";

export default async function SideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-muted p-4 space-y-4">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <User color="#ffffff" />
          </AvatarFallback>
        </Avatar>

        <nav>
          <div>{user?.name}</div>
          <Link href="/" className="block p-2 hover:bg-accent">
            Home
          </Link>
          <Link href="/user/account" className="block p-2 hover:bg-accent">
            Account / Profile
          </Link>
          <Link href="/user/cart" className="block p-2 hover:bg-accent">
            Cart
          </Link>
          <Link href="/user/purchases" className="block p-2 hover:bg-accent">
            Purchases
          </Link>
        </nav>

        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="text-sm text-red-500 hover:underline"
          >
            Sign Out
          </button>
        </form>
      </aside>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
