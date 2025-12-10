"use client";

import { useEffect, useState } from "react";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Total Earnings", value: `$${stats.totalEarnings.toFixed(2)}` },
        { label: "Total Orders", value: stats.totalOrders },
        { label: "Total Customers", value: stats.totalCustomers },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-neutral-950 p-6 rounded-xl shadow-sm"
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm">{item.label}</p>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
