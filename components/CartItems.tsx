"use client";

import { useState } from "react";
import { Quantity } from "@/components/Quantity";
import Image from "next/image";
import { Fragment } from "react";

interface Products {
  cartItemId: string;
  id: string;
  stripeId: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
}

export function CartItems({
  initialProducts,
}: {
  initialProducts: Products[];
}) {
  const [products, setProducts] = useState<Products[]>(initialProducts);

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleDelete = (cartItemId: string) => {
    setProducts((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const totalPrice = products.reduce(
    (sum, product) => sum + (product.price * product.quantity) / 100,
    0
  );

  if (products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <>
      <div>
        {products.map((product) => {
          return (
            <Fragment key={product.id}>
              <div className="flex">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-20 h-full object-cover"
                  priority
                  unoptimized
                />
                <div className="flex flex-col justify-center">
                  <h2>{product.name}</h2>
                  <p>${(product.price! / 100).toFixed(2)}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <Quantity
                    product={product}
                    onChange={(payload) =>
                      handleQuantityChange(
                        payload.cartItemId,
                        payload.newQuantity
                      )
                    }
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div>
        <h2>Total: ${totalPrice}</h2>
      </div>
    </>
  );
}
