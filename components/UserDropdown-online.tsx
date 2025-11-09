"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub, FaFacebook } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserDropdownProps {
  isOpen: boolean;
}

export default function UserDropdownOnline({ isOpen }: UserDropdownProps) {
  const userDropdownRef = useRef(null);
  // const router = useRouter();

  // const login_route = () => {
  //   router.push("/login");
  // };

  useGSAP(
    () => {
      if (!isOpen) {
        gsap.to(userDropdownRef.current, {
          height: 0,
          y: 0,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(userDropdownRef.current, {
              display: "none",
            });
          },
        });
      } else {
        gsap.set(userDropdownRef.current, { display: "block", height: "0" });
        gsap.to(userDropdownRef.current, {
          height: "auto",
          y: 1,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [isOpen], scope: userDropdownRef }
  );

  //   const onClick = (provider: "google" | "github" | "facebook") => {
  //     signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  //   };
  const onClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div
        ref={userDropdownRef}
        className=" w-fit h-0 bg-white font-normal absolute top-[100%] right-0 overflow-hidden hidden rounded-2xl border border-gray-200 z-50"
      >
        <div className="min-w-[200px] p-[20px] flex flex-col gap-3">
          <button className="px-[15px] py-[10px] place-items-center-safe rounded-full shadow-[0px_0px_1px_black] whitespace-nowrap cursor-pointer">
            <Link href="/cart">Cart</Link>
          </button>
          <button onClick={onClick} type="submit" className="cursor-pointer">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
