"use client";

import { useCountry } from "@/context/CountryContext";

const countries = [
  "Philippines",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
];

export default function CountrySelector() {
  const { country, setCountry } = useCountry();

  return (
    <select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="border p-2 rounded"
    >
      {countries.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
