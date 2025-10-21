"use client";

import Stripe from "stripe";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DefaultPrice {
  id: string;
  unit_amount: number;
  currency: string;
}

// interface Product {
//   id: string;
//   name: string;
//   description: string | null;
//   image: string | null;
//   price: number; // <– your interface requires price
//   currency: string;
// }

interface ProductListProps {
  products: Stripe.Product[];
  category?: string;
  subcategory?: string;
}

export const ProductCard = ({
  products,
  category,
  subcategory,
}: ProductListProps) => {
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
                  className="w-[200px] h-full object-cover place-self-center"
                  priority={index === 0}
                />
                <CardHeader className="w-full justify-start px-0">
                  <CardTitle className="line-clamp-2">{data.name}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {data.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  {/* <CardDescription className="line-clamp-3 self-start">
                    {data.description}
                  </CardDescription> */}
                  {(data.default_price as DefaultPrice).unit_amount / 100}{" "}
                  {(data.default_price as DefaultPrice).currency.toUpperCase()}
                </CardContent>
                <CardFooter className="px-0 self-center">
                  <Button>Add to Cart</Button>
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
