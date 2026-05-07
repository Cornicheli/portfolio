import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import FaviconSwitcher from "@/components/FaviconSwitcher";
import I18nProvider from "@/components/I18nProvider";
import ChatBotLoader from "@/components/ChatBotLoader";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gabriel Cornide — Frontend Engineer",
  description: "Desarrollador Frontend Semi-Senior especializado en React, Next.js y TypeScript.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/faviconBlack.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
        <I18nProvider>
          <FaviconSwitcher />
          {children}
          <ChatBotLoader />
        </I18nProvider>
      </body>
    </html>
  );
}
