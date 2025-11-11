"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface QuantityProps {
  product: {
    cartItemId: string;
    id: string;
    stripeId: string;
    name: string;
    image: string;
    price: number;
    currency: string;
    quantity: number;
  };
  onChange?: (payload: { cartItemId: string; newQuantity: number }) => void;
  onDelete?: (cartItemId: string) => void;
}

export function Quantity({ product, onChange, onDelete }: QuantityProps) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isPending, setIsPending] = useState(false);

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onChange?.({ cartItemId: product.cartItemId, newQuantity });

    await fetch("/api/cart/quantity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product.cartItemId,
        quantity: newQuantity,
      }),
    });
  };

  const deleteFromCart = async () => {
    setIsPending(true);
    await fetch("/api/cart/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.cartItemId }),
    });
    onDelete?.(product.cartItemId);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size={"sm"}
          disabled={quantity <= 1}
          onClick={() => updateQuantity(quantity - 1)}
        >
          -
        </Button>
        <span>{quantity}</span>
        <Button
          variant="outline"
          size={"sm"}
          onClick={() => updateQuantity(quantity + 1)}
        >
          +
        </Button>
      </div>
      <Button
        variant={"main"}
        size="sm"
        onClick={deleteFromCart}
        disabled={isPending}
      >
        Remove
      </Button>
    </div>
  );
}
