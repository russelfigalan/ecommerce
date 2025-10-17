"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface StripePrice {
  id: string;
  unit_amount: number;
  currency: string;
}

interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  images?: string[];
  default_price?: StripePrice;
}

export default function ProductsData() {
  const [products, setProducts] = useState<StripeProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stripe Products</h1>
      <ul className="space-y-3">
        {products.map((p, index) => (
          <li
            key={p.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {p.images && p.images[0] && (
              <Image
                src={p.images[0]}
                alt={p.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                priority={index === 0}
              />
            )}
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            {p.default_price && (
              <p className="mt-2 font-medium">
                {p.default_price.unit_amount / 100}{" "}
                {p.default_price.currency.toUpperCase()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
