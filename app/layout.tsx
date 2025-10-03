import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  weight: "400",
  variable: "--font-rochester",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "This is an ecommerce website project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>{children}</body>
    </html>
  );
}
