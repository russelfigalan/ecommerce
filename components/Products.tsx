"use client"

import Image from "next/image";

export default function Products({products}: ProductListData) {

    const productList = products;
    console.log(productList)

  return (
    <>
        {productList.map(data => (
            <div key={data.id} className="w-[200px] h-fit">
                <Image src={data.images[0]} key={data.slug} alt={data.title} width={0} height={0} className="w-full h-auto" unoptimized />
                {/* <img src={data.images[0]} key={data.slug} alt={data.title} /> */}
            </div>
        ))}
    </>
  )
}