import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropertyPlatform - Find Your Dream Property",
  description:
    "Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces. Buy, sell, and rent with confidence.",
  keywords: [
    "real estate",
    "property",
    "homes for sale",
    "apartments",
    "commercial property",
    "rentals",
    "real estate marketplace",
  ],
  authors: [{ name: "PropertyPlatform Team" }],
  openGraph: {
    title: "PropertyPlatform - Find Your Dream Property",
    description:
      "Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces.",
    url: "https://propertyplatform.com",
    siteName: "PropertyPlatform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PropertyPlatform - Find Your Dream Property",
    description:
      "Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
