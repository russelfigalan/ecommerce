import { CURRENCY_DECIMALS } from "./currencyMap";

export function toMajor(unitAmountCents: number) {
  return unitAmountCents / 100; // cents -> USD major unit (e.g., 1299 -> 12.99)
}

/**
 * Convert an amount given in USD cents to a target currency minor unit (integer)
 * - unitAmountUsdCents: e.g. 1299 (USD $12.99)
 * - rate: exchange rate (1 USD = rate * targetCurrency)
 * - targetCurrency: "PHP", "GBP", etc.
 * returns integer minor units suitable for Stripe (e.g. PHP cents)
 */
export function convertUsdCentsToCurrencyMinor(
  unitAmountUsdCents: number,
  rate: number,
  targetCurrency: string
): number {
  const usdMajor = toMajor(unitAmountUsdCents); // 12.99
  const rawTargetMajor = usdMajor * rate; // e.g. 12.99 * 56 = 727.44
  const decimals = CURRENCY_DECIMALS[targetCurrency] ?? 2;
  const multiplier = 10 ** decimals;
  // round to nearest integer minor unit
  return Math.round(rawTargetMajor * multiplier);
}
