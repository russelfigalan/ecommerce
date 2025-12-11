"use client";

import { Menu } from "lucide-react";

export default function Topbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header className="h-16 w-full bg-white dark:bg-neutral-950 border-b flex items-center px-6 justify-between">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800"
      >
        <Menu />
      </button>
    </header>
  );
}
