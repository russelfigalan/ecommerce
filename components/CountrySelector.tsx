"use client";

import { useCountry } from "@/context/CountryContext";

const countries = [
  { name: "Philippines", code: "PH" },
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Singapore", code: "SG" },
];

export default function CountrySelector() {
  const { country, setCountry } = useCountry();

  return (
    <select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="border p-2 rounded"
    >
      {countries.map((n) => (
        <option key={n.code} value={n.code}>
          {n.name}
        </option>
      ))}
    </select>
  );
}
