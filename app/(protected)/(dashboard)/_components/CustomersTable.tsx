"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  totalSpent: number;
  created: string;
}

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((r) => r.json())
      .then((d) => {
        console.log("CUSTOMERS FETCHED:", d);
        setCustomers(d ?? []);
      });
  }, []);

  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-neutral-800">
          <tr>
            <th className="p-3 text-left font-semibold">Name</th>
            <th className="p-3 text-left font-semibold">Email</th>
            <th className="p-3 text-left font-semibold">Country</th>
            <th className="p-3 text-left font-semibold">Total Spent</th>
            <th className="p-3 text-left font-semibold">Created</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-gray-200 dark:border-neutral-800"
            >
              <td className="p-3">{customer.name}</td>
              <td className="p-3 text-blue-600 underline">{customer.email}</td>
              <td className="p-3">{customer.country}</td>
              <td className="p-3">${customer.totalSpent.toFixed(2)}</td>
              <td className="p-3">
                {new Date(customer.created).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <p className="p-4 text-gray-500 text-sm">No customers found.</p>
      )}
    </div>
  );
}
