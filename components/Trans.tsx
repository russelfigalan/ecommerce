"use client";

import { useTranslate } from "@/hooks/useTranslate";

export default function Trans({ children }: { children: string }) {
  const { translated } = useTranslate(children);
  return <>{translated}</>;
}
