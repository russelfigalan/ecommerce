// "use client";

import Image from "next/image";
// import { useEffect, useState } from "react";
import { getProducts } from "@/lib/stripe";

interface DefaultPrice {
  id: string;
  unit_amount: number;
  currency: string;
}

// interface StripeProduct {
//   id: string;
//   name: string;
//   description?: string;
//   images?: string[];
//   default_price?: StripePrice;
// }

export default async function ProductsData() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stripe Products</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start place-items-center gap-x-10 space-y-8">
        {products.map((p, index) => (
          <li
            key={p.id}
            className="h-fit border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {p.images && (
              <Image
                src={p.images[0]}
                alt={p.name}
                width={1000}
                height={1000}
                className="w-[200px] h-full object-cover place-self-center"
                priority={index === 0}
              />
            )}
            <h2 className="text-lg font-semibold line-clamp-2">{p.name}</h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {p.description}
            </p>
            {p.default_price && typeof p.default_price !== "string" ? (
              <p className="mt-2 font-medium">
                {(p.default_price as DefaultPrice).unit_amount / 100}{" "}
                {(p.default_price as DefaultPrice).currency.toUpperCase()}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
