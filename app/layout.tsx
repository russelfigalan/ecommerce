import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ProvidersClientWrapper from "@/components/ProvidersClientWrapper";
import { CountryProvider } from "@/context/CountryContext";
import { LanguageProvider } from "@/context/LanguageContext";

const dmSans = DM_Sans({
  weight: "400",
  variable: "--font-rochester",
  subsets: ["latin"],
});

async function detectCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return "US"; // fallback
    const data = await res.json();
    return data.country_code?.toUpperCase() || "US";
  } catch (e) {
    return "US";
  }
}

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "This is an ecommerce website project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const country = await detectCountry();

  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <ProvidersClientWrapper>
          <LanguageProvider>
            <CountryProvider>{children}</CountryProvider>
          </LanguageProvider>
        </ProvidersClientWrapper>
      </body>
    </html>
  );
}
