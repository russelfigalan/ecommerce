"use client";

import Stripe from "stripe";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  // CardAction,
  CardFooter,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";

import { useCountry } from "@/context/CountryContext";
import useConvertedPrice from "@/hooks/useConvertedPrice";

interface DefaultPrice {
  id: string;
  unit_amount: number;
  currency: string;
}

interface ProductListProps {
  products: Stripe.Product[];
  category?: string;
  subcategory?: string;
}

function ConvertedPrice({ amountUsdCents }: { amountUsdCents: number }) {
  const { convertedAmountMajor, currency, loading, formatted } =
    useConvertedPrice(amountUsdCents);

  if (loading) return <span>Loading...</span>;

  return <span>{formatted}</span>;
}

export const ProductCard = ({
  products,
  category,
  subcategory,
}: ProductListProps) => {
  const { country } = useCountry();
  // const params = useParams();
  // console.log(category);
  // console.log(products);
  // console.log(subcategory);

  const productData = (category?: string, subcategory?: string) => {
    return products.filter((p) => {
      const matchCategory = category ? p.metadata.category === category : true;
      const matchSubcategory = subcategory
        ? p.metadata.subcategory === subcategory
        : true;

      return matchCategory && matchSubcategory;
    });
  };

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-[repeat(auto-fit,250px)] place-items-start place-content-center gap-x-5 space-y-8">
          {productData(category, subcategory).map((data, index) => {
            // console.log(data);
            const price = data.default_price as DefaultPrice;
            const usdValue = price.unit_amount / 100;

            const { convertedAmountMajor, currency, loading, formatted } =
              useConvertedPrice(usdValue);

            return (
              <Card
                key={data.name}
                className="h-fit border p-4 gap-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={data.images[0]}
                  alt={data.name}
                  width={1000}
                  height={1000}
                  style={{ width: "200px", height: "200px" }}
                  className="object-contain place-self-center"
                  priority={index === 0}
                  unoptimized
                />
                <CardHeader className="w-full justify-start px-0">
                  <CardTitle className="line-clamp-1">{data.name}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {data.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  {/* {!loading ? (
                    <>
                      {currency === "USD" ? "$" : ""}
                      {convertedAmountMajor.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {currency !== "USD" ? currency : ""}
                    </>
                  ) : (
                    <span>{formatted}</span>
                  )} */}
                  <ConvertedPrice amountUsdCents={price.unit_amount} />
                </CardContent>
                <CardFooter className="px-0 self-center">
                  <AddToCartButton stripeId={price.id} />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
