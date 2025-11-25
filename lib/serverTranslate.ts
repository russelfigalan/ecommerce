// lib/serverTranslate.ts
export async function translateServer(
  text: string,
  target: string,
  source = "auto"
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/translate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ text, target, source }),
    }
  );

  if (!res.ok) return text;

  const json = await res.json();
  return json.translation ?? text;
}
