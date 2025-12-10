"use client";

import { useEffect, useState } from "react";

interface MonthlyEarning {
  month: string;
  earnings: number;
}

export default function MonthlyEarningsTable() {
  const [data, setData] = useState<MonthlyEarning[]>([]);

  useEffect(() => {
    fetch("/api/admin/earnings-data")
      .then((r) => r.json())
      .then((d) => setData(d?.monthly ?? []))
      .catch(() => setData([]));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800 text-left">
            <th className="p-3 font-medium">Month</th>
            <th className="p-3 font-medium">Earnings</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.month}
              className="border-b border-gray-200 dark:border-neutral-800"
            >
              <td className="p-3">{row.month}</td>
              <td className="p-3 font-semibold">${row.earnings.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
