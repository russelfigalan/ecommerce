import { getProducts } from "@/lib/stripe";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const SubCategorySection = async ({ params }: Props) => {
  const { category, subcategory } = await params;
  const products = await getProducts();

  return (
    <>
      {/* <BreadCrumb /> */}
      <h1 className="capitalize">Category: {decodeURIComponent(category)}</h1>
      <p className="capitalize">
        Subcategory: {decodeURIComponent(subcategory)}
      </p>
      <ProductCard
        products={products}
        category={decodeURIComponent(category)}
        subcategory={decodeURIComponent(subcategory)}
      />
    </>
  );
};

export default SubCategorySection;
