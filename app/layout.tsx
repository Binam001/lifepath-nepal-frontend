"use client";

import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { Montserrat, Poppins, Playfair_Display } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/layout/Footer";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { RecaptchaProvider } from "@/components/providers/RecaptchaProvider";
// import Tracker from "@/components/Tracker/Tracker";

const SitePreloader = dynamic(() => import("@/components/ui/site-preloader"), {
  ssr: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Helvetica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Helvetica-Oblique.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Helvetica-BoldOblique.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-helvetica",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isLearnPage = pathname?.includes("/learn");

  return (
    <html lang="en">
      <head>
        <title>LifePath - Your Career Growth Journey</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${helvetica.variable} ${playfair.variable} antialiased bg-white overflow-x-hidden`}
      >
        <QueryProvider>
          <RecaptchaProvider>
            {/* <Tracker /> */}
            {/* <Preloader> */}
            <SitePreloader />
            <SmoothScroll />
            {!isAuthPage && !isLearnPage && <Header />}
            {/* <Tracker /> */}
            <main className="min-h-screen">{children}</main>
            {!isAuthPage && !isLearnPage && <Footer />}
            {/* </Preloader> */}
          </RecaptchaProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
