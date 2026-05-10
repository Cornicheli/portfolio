import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import FaviconSwitcher from "@/components/layout/FaviconSwitcher";
import I18nProvider from "@/components/providers/I18nProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ChatBotLoader from "@/components/chatbot/ChatBotLoader";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const baseUrl = "https://gabriel-cornide.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Gabriel Cornide — Frontend Engineer",
  description:
    "Desarrollador Frontend Semi-Senior especializado en React, Next.js y TypeScript. 3+ años de experiencia en 4 empresas. Buenos Aires, AR.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Gabriel Cornide",
    "Buenos Aires",
  ],
  authors: [{ name: "Gabriel Cornide", url: baseUrl }],
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Gabriel Cornide — Frontend Engineer",
    description:
      "Desarrollador Frontend Semi-Senior especializado en React, Next.js y TypeScript.",
    siteName: "Gabriel Cornide Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Cornide — Frontend Engineer",
    description:
      "Desarrollador Frontend Semi-Senior especializado en React, Next.js y TypeScript.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>
            <FaviconSwitcher />
            {children}
            <ChatBotLoader />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
