import "./globals.scss";
import "@/styles/App.scss";

import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { Header } from "../components/Header";
import { ReactNode } from "react";

const cormorant = Cormorant_Garamond({
  variable: "--font-abhaya-libre",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const popins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Truly Yours Catering",
  description: "Truly Yours Catering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.className}>
      <body className={cormorant.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
