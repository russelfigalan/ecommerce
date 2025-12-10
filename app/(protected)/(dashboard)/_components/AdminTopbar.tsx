"use client";

import { Menu } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white dark:bg-neutral-950 border-b flex items-center px-6 justify-between">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800">
        <Menu />
      </button>
    </header>
  );
}
