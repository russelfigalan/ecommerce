import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { CartItems } from "@/components/CartItems";
import CheckoutButton from "@/components/CheckoutButton";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <h1>Please log in to view your cart</h1>
      </>
    );
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
  });

  const stripeProducts = await Promise.all(
    cartItems.map(async (item) => {
      const price = await stripe.prices.retrieve(item.stripeId, {
        expand: ["product"],
      });

      const product = price.product as Stripe.Product;

      return {
        cartItemId: item.id,
        id: product.id,
        stripeId: price.id,
        name: product.name,
        image: product.images[0],
        price: price.unit_amount ?? 0,
        currency: price.currency,
        quantity: item.quantity,
      };
    })
  );
  // console.log(stripeProducts);
  // console.log(stripeProducts[0].price);

  // const totalPrice = stripeProducts.reduce((sum, product) => {
  //   return sum + (product.price * product.quantity) / 100;
  // }, 0);

  return (
    <>
      <h1>Cart Page</h1>
      {/* {stripeProducts.length === 0 && <p>Your cart is empty.</p>} */}
      <div>
        <CartItems initialProducts={stripeProducts} />
      </div>
      <div>
        <CheckoutButton cartItems={stripeProducts} />
      </div>
      ;
    </>
  );
}
