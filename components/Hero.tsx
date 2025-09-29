"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";

const images = [
  {
    url: "/img/hero1.webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    url: "/img/hero2.webp",
    text: "Maecenas molestie tempus libero, id hendrerit magna hendrerit eu",
  },
  {
    url: "/img/hero3.webp",
    text: "Aenean lacus odio, gravida aliquam dui dignissim, pellentesque euismod orci",
  },
  {
    url: "/img/hero4.webp",
    text: "Quisque et augue sed dui euismod fermentum",
  },
];

export default function Hero() {
  const [imageIndex, setImageIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const extendImages = useMemo(() => {
    return [images[images.length - 1], ...images, images[0]];
  }, []);

  const goLeft = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setImageIndex((prev) => prev - 1);
  }, [isAnimating]);

  const goRight = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setImageIndex((prev) => prev + 1);
  }, [isAnimating]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      if (!isPaused) {
        goRight();
      }
    }, 3000);
  }, [goRight, isPaused]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleManualNavigation = (direction: "left" | "right") => {
    if (direction === "left") {
      goLeft();
    } else {
      goRight();
    }

    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (isPaused) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }, [isPaused, startAutoplay, stopAutoplay]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = () => {
      setIsAnimating(false);

      if (imageIndex === 0) {
        setImageIndex(images.length);
      } else if (imageIndex === extendImages.length - 1) {
        setImageIndex(1);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [imageIndex, extendImages.length]);

  return (
    <>
      <section>
        <div
          ref={sliderRef}
          className="w-full h-[250px] md:h-[450px] relative flex overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {extendImages.map((img, index) => (
            <div
              className={`w-full h-[inherit] shrink-0 before:absolute before:inset-0 before:content-[''] before:bg-[#0000004f] before:z-0 flex flex-col justify-around items-center-safe ${isAnimating ? "transition=transform duration-500 ease-in-out" : ""}`}
              key={index}
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                transform: `translateX(-${imageIndex * 100}%)`,
              }}
            >
              <h1 className="w-[70%] text-white text-2xl md:text-6xl text-shadow-[0px_0px_10px_#000000] text-center z-10">
                {img.text}
              </h1>
              <button className="px-[1rem] py-[0.3rem] md:px-[3rem] md:py-[0.5rem] font-bold text-xs md:text-xl text-gray-700 bg-white shadow-[0px_0px_10px_#000000] rounded-full cursor-pointer z-10">
                See more
              </button>
            </div>
          ))}
          <div
            onClick={() => handleManualNavigation("left")}
            className="absolute left-0 h-[inherit] place-content-center-safe cursor-pointer"
          >
            <ChevronLeft
              color="#FFFFFF"
              strokeWidth={5}
              className="size-5 md:size-10"
            />
          </div>
          <div
            onClick={() => handleManualNavigation("right")}
            className="absolute right-0 h-[inherit] place-content-center-safe cursor-pointer"
          >
            <ChevronRight
              color="#FFFFFF"
              strokeWidth={5}
              className="size-5 md:size-10"
            />
          </div>
        </div>
      </section>
    </>
  );
}
