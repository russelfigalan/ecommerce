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
import { Button } from "@/components/ui/button";

interface UserDropdownProps {
  isOpen: boolean;
}

export default function AdminDropdown({ isOpen }: UserDropdownProps) {
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

  const onClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div
        ref={userDropdownRef}
        className="w-fit h-0 bg-white font-normal absolute top-[100%] right-0 overflow-hidden hidden rounded-2xl border border-gray-200 z-50"
      >
        <Button variant={"outline"} className="cursor-pointer">
          <Link href="/admin">Admin Dashboard</Link>
        </Button>
      </div>
    </>
  );
}
