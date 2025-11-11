"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ stripeId }: { stripeId: string }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeId }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      window.dispatchEvent(new Event("cartUpdated"));
      console.log("Added to cart!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
