import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { Suspense } from "react";
import { getData } from "@/lib/utils"

export default async function Home() {

  const products = await getData();

  return (
    <>
    <Hero />
    <Suspense>
      <Products products={products} />
    </Suspense>
    </>
  )
}
