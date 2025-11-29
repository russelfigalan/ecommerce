export async function fetchRates() {
  try {
    const res = await fetch("/api/exchange", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch exchange rates");
    const json = await res.json();
    return json.rates || {};
  } catch (err) {
    console.error("Failed to load rates", err);
    return {};
  }
}
