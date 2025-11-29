// hooks/useConvertedPrice.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useCountry } from "@/context/CountryContext";
import { COUNTRY_TO_CURRENCY } from "@/lib/currencyMap";
import { fetchRates } from "@/lib/fetchRates";

type Return = {
  loading: boolean;
  convertedAmountMajor: number; // e.g. 1120.34
  currency: string;
  formatted?: string;
};

export default function useConvertedPrice(unitAmountUsdCents: number) {
  const { country } = useCountry();
  const currency = COUNTRY_TO_CURRENCY[country] || "USD";

  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRates()
      .then((rates) => {
        setRate(rates[currency] ?? (currency === "USD" ? 1 : null));
      })
      .catch(() => setRate(null))
      .finally(() => setLoading(false));
  }, [currency]);

  const convertedAmountMajor = useMemo(() => {
    if (!rate) {
      return unitAmountUsdCents / 100;
    }
    return (unitAmountUsdCents / 100) * rate;
  }, [unitAmountUsdCents, rate]);

  const formatted = useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(convertedAmountMajor);
    } catch {
      return `${currency} ${convertedAmountMajor.toFixed(2)}`;
    }
  }, [convertedAmountMajor, currency]);

  return {
    loading,
    convertedAmountMajor,
    currency,
    formatted,
  } as Return;
}
