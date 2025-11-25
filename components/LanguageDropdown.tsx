// components/LanguageDropdown.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

const LANGS = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ph", label: "Filipino", flag: "🇵🇭" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200"
      >
        {LANGS.find((l) => l.code === language)?.flag ?? "🌐"}{" "}
        <span className="hidden sm:inline">{language.toUpperCase()}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50 overflow-hidden">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
