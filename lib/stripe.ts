import Stripe from "stripe";

// Ensure the secret key exists
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}

// Create the Stripe instance (specify API version)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

// ✅ Cache the products globally in the server
export const getProducts = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 10,
  });
  return response.data;
};
