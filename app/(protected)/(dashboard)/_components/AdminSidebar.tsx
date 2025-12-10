"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ShoppingBag, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Earnings", href: "/admin/earnings", icon: BarChart3 },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Products (Stripe)", href: "/admin/products", icon: ShoppingBag },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-neutral-950 shadow-sm p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800"
              )}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
