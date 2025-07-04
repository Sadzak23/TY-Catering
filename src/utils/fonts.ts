// utils/fonts.ts
import { Cormorant_Garamond, Poppins, Mr_De_Haviland } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  variable: "--font-abhaya-libre",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
export const handwriting = Mr_De_Haviland({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});
