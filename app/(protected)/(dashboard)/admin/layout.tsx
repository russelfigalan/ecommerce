"use client";

import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import Sidebar from "../_components/AdminSidebar";
import Topbar from "../_components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null!);

  useGSAP(
    () => {
      if (!sidebarRef.current) return;

      gsap.to(sidebarRef.current, {
        x: sidebarOpen ? 0 : -250,
        duration: 0.35,
        ease: "power3.out",
      });

      const handleOutsideClick = (e: MouseEvent) => {
        if (hamburgerRef?.current.contains(e.target as Node)) return;

        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(e.target as Node)
        ) {
          setSidebarOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    { dependencies: [sidebarOpen] }
  );

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-neutral-900">
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full bg-white dark:bg-neutral-950 shadow-sm p-4 flex flex-col space-y-4 w-64 z-50"
        style={{ transform: "translateX(-300px" }}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </aside>

      <div className="flex-1 flex flex-col">
        <Topbar toggleSidebar={toggleSidebar} btnRef={hamburgerRef} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
