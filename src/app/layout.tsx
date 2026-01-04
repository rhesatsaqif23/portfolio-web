import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import StarsBackground from "../components/StarsBackground";
import Navbar from "../components/navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rhesa Tsaqif | Portfolio",
  description: "Mobile & Front-End Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative overflow-x-hidden text-white">
        {/* BACKGROUND LAYER */}
        <div className="fixed inset-0 -z-10">
          {/* IMAGE */}
          <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat" />

          {/* DARK GRADIENT */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-[#020617]/60 to-[#020617]/90" />

          {/* STARS */}
          <StarsBackground />
        </div>

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
