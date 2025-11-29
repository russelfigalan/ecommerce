// lib/currencyMap.ts
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  PH: "PHP",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  SG: "SGD",
};

export const CURRENCY_DECIMALS: Record<string, number> = {
  // number of minor units for the currency (Stripe requires integer minor units)
  USD: 2,
  PHP: 2,
  GBP: 2,
  CAD: 2,
  AUD: 2,
  SGD: 2,
  // extend if needed
};
