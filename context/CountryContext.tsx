"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface CountryContextType {
  country: string;
  setCountry: (country: string) => void;
}

const CountryContext = createContext<CountryContextType | null>(null);

export function CountryProvider({
  children,
  initialCountry = "US",
}: {
  children: React.ReactNode;
  initialCountry?: string;
}) {
  const [country, setCountryState] = useState(initialCountry);
  const { setLanguage } = useLanguage();

  const setCountry = (value: string) => {
    setCountryState(value);

    switch (value) {
      case "PH":
        setLanguage("ph");
        break;
      case "US":
      case "GB":
      case "CA":
      case "AU":
      case "SG":
        setLanguage("en");
        break;
      default:
        setLanguage("en");
    }

    // Save so user’s selection overrides auto-detection
    localStorage.setItem("userCountry", value);

    // Save cookie for server-side continuity
    document.cookie = `country=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  useEffect(() => {
    // On first render, check if user previously selected a country
    const stored = localStorage.getItem("userCountry");
    if (stored) {
      setCountry(stored);
    }
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be inside CountryProvider");
  return ctx;
}
