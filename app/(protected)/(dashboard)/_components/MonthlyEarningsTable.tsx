interface MonthlyEarning {
  month: string;
  earnings: number;
}

async function fetchEarningsData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/earnings-data`
  );
  const result = await response.json();

  return result.monthly as MonthlyEarning[];
}

export default async function MonthlyEarningsTable() {
  const data = await fetchEarningsData();

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
