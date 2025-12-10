"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  active: boolean;
  default_price: {
    id: string;
    unit_amount: number | null;
    currency: string;
  } | null;
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 dark:border-neutral-800">
            <th className="pb-2">Product</th>
            <th className="pb-2">Price</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-b border-gray-200 dark:border-neutral-800"
            >
              <td className="py-3">{p.name}</td>

              <td className="py-3">
                {p.default_price
                  ? `${(p.default_price.unit_amount ?? 0) / 100} ${p.default_price.currency.toUpperCase()}`
                  : "No price"}
              </td>

              <td className="py-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    p.active
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {p.active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-neutral-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
