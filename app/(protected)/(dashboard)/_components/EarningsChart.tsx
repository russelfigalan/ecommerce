"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EarningsChart() {
  const [data, setData] = useState<{ month: string; earnings: any }[]>([]);

  useEffect(() => {
    fetch("/api/admin/earnings")
      .then((res) => res.json())
      .then((res) => {
        if (res.earnings) {
          const formatted = Object.keys(res.earnings).map((key) => ({
            month: key,
            earnings: res.earnings[key],
          }));
          setData(formatted);
        }
      });
  }, []);

  return (
    <div className="w-full h-[350px] bg-white dark:bg-neutral-900 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Earnings</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="earnings" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
