import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DN-COIN",
  description: "Mining platform for DN Coin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
