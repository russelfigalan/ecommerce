// context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type LangCode = "en" | "es" | "zh" | "ja" | "de" | "ph" | string;

interface LanguageContextType {
  language: LangCode;
  setLanguage: (l: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LangCode>("en");

  useEffect(() => {
    // init from localStorage or navigator
    try {
      const stored = localStorage.getItem("preferred_language");
      if (stored) {
        setLanguageState(stored);
        return;
      }
    } catch (e) {
      // ignore
    }
    const nav =
      typeof navigator !== "undefined"
        ? navigator.language?.split("-")[0]
        : "en";
    const supported = ["en", "es", "zh", "ja", "de", "ph"];
    setLanguageState(supported.includes(nav) ? nav : "en");
  }, []);

  const setLanguage = (l: LangCode) => {
    setLanguageState(l);
    try {
      localStorage.setItem("preferred_language", l);
    } catch (e) {}
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
