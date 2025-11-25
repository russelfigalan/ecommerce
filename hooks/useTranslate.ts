// hooks/useTranslate.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type UseTranslateReturn = {
  translated: string;
  loading: boolean;
  error: string | null;
};

const CLIENT_CACHE_TTL = 1000 * 60 * 60 * 24 * 30; // 30 days
const inFlight = new Map<string, Promise<string>>();

function clientCacheKey(text: string, target: string) {
  return `trans::${target}::${text}`;
}

export function useTranslate(text: string): UseTranslateReturn {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!text) {
        setTranslated("");
        return;
      }

      if (!language || language === "en") {
        setTranslated(text);
        return;
      }

      const key = clientCacheKey(text, language);
      try {
        // check local cache
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            value: string;
            ts: number;
          } | null;
          if (parsed && Date.now() - parsed.ts < CLIENT_CACHE_TTL) {
            setTranslated(parsed.value);
            return;
          } else {
            localStorage.removeItem(key);
          }
        }

        // dedupe in-flight translations
        if (inFlight.has(key)) {
          setLoading(true);
          const val = await inFlight.get(key)!;
          if (!cancelled && mountedRef.current) setTranslated(val);
          setLoading(false);
          return;
        }

        // start translation
        setLoading(true);
        const p = (async () => {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, target: language }),
          });
          if (!res.ok) {
            const txt = await res.text();
            throw new Error(txt || "Translation failed");
          }
          const json = await res.json();
          return json.translation as string;
        })();

        inFlight.set(key, p);
        const translatedText = await p;
        inFlight.delete(key);

        // persist to localStorage
        try {
          localStorage.setItem(
            key,
            JSON.stringify({ value: translatedText, ts: Date.now() })
          );
        } catch (e) {
          // ignore storage errors
        }

        if (!cancelled && mountedRef.current) setTranslated(translatedText);
      } catch (err: any) {
        console.error("useTranslate error:", err);
        setError(err?.message ?? "Error");
        setTranslated(text); // fallback
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [text, language]);

  return { translated, loading, error };
}
