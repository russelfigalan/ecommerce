"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface UserDropdownProps {
  isOpen: boolean;
}

export default function UserDropdown({ isOpen }: UserDropdownProps) {
  const userDropdownRef = useRef(null);
  const router = useRouter();

  const login_route = () => {
    router.push("/login");
  };

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

  const onClick = (provider: "google" | "github" | "facebook") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <>
      <div
        ref={userDropdownRef}
        className="w-fit h-0 bg-white font-normal absolute top-[100%] right-0 overflow-hidden hidden rounded-2xl border border-gray-200 z-50"
      >
        <div className="p-[20px] flex flex-col gap-3">
          <button
            onClick={login_route}
            className="px-[15px] py-[10px] place-items-center-safe rounded-full shadow-[0px_0px_1px_black] whitespace-nowrap cursor-pointer"
          >
            Continue with Email
          </button>
          <div className="flex items-center-safe text-center">
            <hr className="flex-1 border-2 border-t-0 border-gray-300" />
            <span className="mx-2">or</span>
            <hr className="flex-1 border-2 border-t-0 border-gray-300" />
          </div>
          <button
            onClick={() => onClick("google")}
            className="px-[15px] py-[10px] place-items-center-safe rounded-full shadow-[0px_0px_1px_black] cursor-pointer"
          >
            <FcGoogle />
          </button>
          <button
            onClick={() => onClick("github")}
            className="px-[15px] py-[10px] place-items-center-safe rounded-full shadow-[0px_0px_1px_black] cursor-pointer"
          >
            <FaGithub />
          </button>
          <button
            onClick={() => onClick("facebook")}
            className="px-[15px] py-[10px] place-items-center-safe rounded-full shadow-[0px_0px_1px_black] cursor-pointer"
          >
            <FaFacebook style={{ color: "#1877F2" }} />
          </button>
        </div>
      </div>
    </>
  );
}
