"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Type definition
interface CountryContextType {
  country: string;
  setCountry: (country: string) => void;
}

// Create the context
const CountryContext = createContext<CountryContextType | null>(null);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState("Loading...");

  const setCountry = (value: string) => {
    setCountryState(value);
    // Persist in localStorage
    localStorage.setItem("userCountry", value);
    // Optional: persist in cookie
    document.cookie = `userCountry=${value}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
  };

  useEffect(() => {
    // 1️⃣ Check localStorage first
    const stored = localStorage.getItem("userCountry");
    if (stored) {
      setCountryState(stored);
      return;
    }

    // 2️⃣ Otherwise, detect country client-side via ipapi.co
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detected = data.country_name || "Philippines"; // fallback
        setCountry(detected);
      })
      .catch(() => setCountry("Philippines")); // fallback on error
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

// Custom hook for convenience
export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used inside CountryProvider");
  return ctx;
}
