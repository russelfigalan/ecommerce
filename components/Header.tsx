"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, CircleUserRound, ChevronDown, Search, Menu } from 'lucide-react';
import { MouseEventHandler, useState } from "react";
import SideBar from "@/components/SideBar";

export default function Header() {

    const [isShown, setIsShown] = useState<boolean>(false);

    const toggleSideBar: MouseEventHandler<HTMLButtonElement> = () => {
        setIsShown(!isShown);
    }

    return (
        <>
        <header className="flex flex-col justify-center-safe">
            <div className="p-[0.1rem_1rem_0.1rem_1rem] flex justify-around bg-[#bd5713] text-white font-medium">
                <p>Get Free Shipping</p>
                <p>Get Up To 50% Discount</p>
            </div>
            <div className="flex justify-between items-center-safe py-[1rem] pl-[1rem] pr-[2rem] font-bold">
                <Link href="/" prefetch={false} className="relative">
                    <Image src={"/logo/sample-ecommerce-logo1.png"} alt="logo" width={150} height={0} priority={true} className="w-auto h-auto" />
                </Link>
                <div className="hidden lg:flex flex-col justify-center-safe text-center">
                    <p className="font-medium">Deliver to</p>
                    <p>Philippines</p>
                </div>
                <form action="" className="relative hidden md:w-[50%] md:h-[30px] md:flex outline-3 outline-gray-500 rounded-full">
                    <button className="px-[0.5rem] flex flex-nowrap justify-center-safe items-center-safe bg-gray-200 w-fit font-medium text-icons-color rounded-es-full rounded-ss-full">Categories <ChevronDown size={20} strokeWidth={2.5}  className="" /></button>
                    <input type="text" placeholder="Search Product" className="font-normal bg-[#fff6f5] px-[0.5rem] w-full focus:outline-none rounded-se-[inherit] rounded-ee-[inherit]" />
                    <button className="absolute right-0 h-full px-3 bg-[#960000] rounded-se-[inherit] rounded-ee-[inherit]">
                        <Search color="#FFFFFF" />
                    </button>
                </form>
                <div className="hidden lg:block">
                    <p>Language</p>
                </div>
                <div className="flex items-center-safe gap-1 p-2 text-icons-color lg:border-3 border-gray-200 rounded-full">
                    <CircleUserRound className="w-[32px] h-auto lg:w-[24px]" />
                    <p className="hidden lg:block text-icons-color">Log in</p>
                    <ChevronDown size={20} strokeWidth={3} className="hidden lg:block place-self-end-safe" />
                </div>
                <div className="relative p-[10px] bg-gray-200 rounded-full">
                    <ShoppingCart color="#383838" />
                    <span className="absolute px-2 right-[-10px] top-[-9px] bg-[#a11a1a] text-white rounded-full">0</span>
                </div>
            </div>
            <nav className="flex justify-center-safe items-center-safe gap-5 h-[2.5rem] text-white bg-[#005e5e] font-medium">
                <Link href="/" className="">
                    <button onClick={toggleSideBar} className="flex justify-center-safe items-center-safe gap-[2px] cursor-pointer"><Menu size={16} />All
                    </button>
                </Link>
                <Link href="/products" className="h-full px-2 place-content-center-safe hover:bg-[#04ffff2a]">
                    Products
                </Link>
                <Link href="/categories" className="h-full px-2 place-content-center-safe hover:bg-[#04ffff2a]">
                    Categories
                </Link>
                <Link href="/about" className="h-full px-2 place-content-center-safe hover:bg-[#04ffff2a]">
                    About
                </Link>
            </nav>
        </header>
        <SideBar isShown={isShown} onButtonClick={toggleSideBar}  />
        </>
    )
}