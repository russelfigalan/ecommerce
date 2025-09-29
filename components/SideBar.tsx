"use client";

import { X } from "lucide-react";
import { MouseEventHandler, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

interface SideBarProps {
  isShown: boolean;
  onButtonClick: MouseEventHandler;
}

const SideBar = ({ isShown, onButtonClick }: SideBarProps) => {
  const sidebarRef = useRef(null);

  useGSAP(
    () => {
      if (isShown) {
        gsap.to(sidebarRef.current, {
          x: 0,
        });
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(sidebarRef.current, {
          x: "-100%",
        });
        document.body.style.overflow = "unset";
      }
    },
    { dependencies: [isShown], scope: sidebarRef }
  );

  return (
    <>
      <aside
        ref={sidebarRef}
        className="w-full h-dvh fixed -translate-x-full top-0 bg-white overflow-hidden z-90"
      >
        <button onClick={onButtonClick} className="cursor-pointer">
          <X className="place-self-end-safe" />
        </button>
      </aside>
    </>
  );
};

export default SideBar;
