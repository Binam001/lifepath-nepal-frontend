"use client";

import { Montserrat, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "../components/layout/Header";
import SmoothScroll from "../components/SmoothScroll";
import Footer from "../components/layout/Footer";
// import Preloader from "@/components/layout/Preloader";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
        className={`${poppins.variable} ${montserrat.variable} antialiased bg-white  overflow-x-hidden`}
      >
        {/* <Preloader> */}
        <SmoothScroll />
        {!isAuthPage && !isLearnPage && <Header />}
        <main className="min-h-screen">{children}</main>
        {!isAuthPage && !isLearnPage && <Footer />}
        {/* </Preloader> */}
      </body>
    </html>
  );
}
