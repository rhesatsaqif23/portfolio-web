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

const BASE_URL = "https://rhesatsaqif.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rhesa Tsaqif | Portfolio — Mobile & Full-Stack Developer",
    template: "%s | Rhesa Tsaqif",
  },
  description:
    "Full-stack Web & Mobile Developer from Indonesia. Specializing in Next.js, React, Kotlin Jetpack Compose, and building scalable, user-centered applications.",
  keywords: [
    "Rhesa Tsaqif",
    "rhesatsaqif",
    "portfolio",
    "web developer",
    "mobile developer",
    "front-end developer",
    "full-stack developer",
    "Next.js",
    "React",
    "Kotlin",
    "Jetpack Compose",
    "Universitas Brawijaya",
    "Indonesia",
  ],
  authors: { name: "Rhesa Tsaqif Adyatma" },
  creator: "Rhesa Tsaqif Adyatma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Rhesa Tsaqif",
    title: "Rhesa Tsaqif | Portfolio — Mobile & Full-Stack Developer",
    description:
      "Full-stack Web & Mobile Developer from Indonesia. Building scalable, user-centered applications with Next.js, React, and Kotlin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhesa Tsaqif | Portfolio",
    description:
      "Full-stack Web & Mobile Developer from Indonesia. Specializing in Next.js, React, and Kotlin Jetpack Compose.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rhesa Tsaqif Adyatma",
              url: BASE_URL,
              jobTitle: "Mobile & Full-Stack Developer",
              alumniOf: "Universitas Brawijaya",
              knowsAbout: [
                "Web Development",
                "Mobile Development",
                "Next.js",
                "React",
                "Kotlin",
                "Jetpack Compose",
                "TypeScript",
              ],
              sameAs: [
                "https://github.com/rhesatsaqif23",
                "https://linkedin.com/in/rhesa-tsaqif",
                "https://instagram.com/ats_tsaqif_23",
              ],
            }),
          }}
        />
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
