// components/ProvidersClientWrapper.tsx
"use client";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";

export default function ProvidersClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
