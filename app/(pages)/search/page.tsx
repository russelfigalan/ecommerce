import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 100,
  });

  const filtered = products.data.filter((p) => {
    const name = p.name.toLowerCase();
    const description = (p.description || "").toLowerCase();
    const term = query.toLowerCase();

    return name.includes(term) || description.includes(term);
  });

  if (filtered.length === 0) {
    return (
      <>
        <h1>No results for "{query}"</h1>
      </>
    );
  }

  return (
    <>
      <h1>Results for: {query}</h1>

      <ProductCard products={filtered} />
    </>
  );
}
