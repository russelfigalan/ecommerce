"use client";

import { useState } from "react";
import Sidebar from "../_components/AdminSidebar";
import Topbar from "../_components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-neutral-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
