"use client";

import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

interface CheckoutButtonProps {
  cartItems: CartItemType[];
}

export default function CheckoutButton({ cartItems }: CheckoutButtonProps) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      <Button onClick={handleCheckout}>Proceed to checkout</Button>
    </>
  );
}
