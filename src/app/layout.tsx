import "@/styles/App.scss";

import type { Metadata } from "next";
import { Header } from "../components/Header";
import { ReactNode } from "react";
import { cormorant } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Truly Yours Catering",
  description: "Truly Yours Catering",
  icons: {
    icon: "/tyc.svg",
  },
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
