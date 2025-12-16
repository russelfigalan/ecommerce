import { getProducts } from "@/lib/stripe";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const CategorySection = async ({ params }: Props) => {
  const { category, subcategory } = await params;
  const products = await getProducts();
  const categoryDecoded = decodeURIComponent(category);
  return (
    <>
      <h1 className="capitalize">Category: {decodeURIComponent(category)}</h1>
      <ProductCard
        products={products}
        category={categoryDecoded}
        subcategory={subcategory}
      />
    </>
  );
};

export default CategorySection;
