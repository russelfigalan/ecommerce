import { getProducts } from "@/lib/stripe";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function ProductsPage({ params }: Props) {
  const products = await getProducts();
  const { category, subcategory } = await params;

  return (
    <>
      <ProductCard
        products={products}
        category={category}
        subcategory={subcategory}
      />
    </>
  );
}
