"use client"

import Image from "next/image"
import { useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function Hero() {



    return (
        <>
            <section>
                <div className="w-full h-[250px] relative flex overflow-hidden">
                    <Image src={"/img/hero1.webp"} alt="" width={1000} height={1000} className="absolute top-0 right-0" />
                    <Image src={"/img/hero2.webp"} alt="" width={1000} height={1000} className="absolute top-0 right-full" />
                    <Image src={"/img/hero3.webp"} alt="" width={1000} height={1000} className="absolute top-0 right-[calc(100%*2)]" />
                    <Image src={"/img/hero4.webp"} alt="" width={1000} height={1000} className="absolute top-0 right-[calc(100%*3)]" />
                </div>
            </section>
        </>
    )
}