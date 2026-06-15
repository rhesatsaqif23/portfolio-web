import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import ThemeBackground from "../components/common/ThemeBackground";
import ClickSpark from "@/src/components/common/ClickSpark";
import { ThemeProvider } from "../components/common/ThemeProvider";
import Footer from "../components/common/Footer";
import { getProfile } from "../lib/data";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rhesa Tsaqif | Portfolio",
  description: "Mobile & Front-End Developer Portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <html
      lang="en"
      className={`${workSans.variable} relative`}
      suppressHydrationWarning
    >
      <body className="relative overflow-x-hidden text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            className="flex flex-col min-h-screen"
          >
            {/* BACKGROUND */}
            <ThemeBackground />

            {/* NAVBAR */}
            <Navbar />

            {/* PAGE CONTENT */}
            <main className="relative z-10 grow">{children}</main>

            {/* FOOTER */}
            <Footer profile={profile} />
          </ClickSpark>
        </ThemeProvider>
      </body>
    </html>
  );
}
