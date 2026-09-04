import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { TrustBadges } from "@/components/layout/TrustBadges";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dey Opticals | Buy Premium Eyewear & Sunglasses in Kolkata, India",
  description: "Shop for the best premium eyeglasses, sunglasses, and contact lenses in India. Try it You'll like it. Get a free Home Eye Test today.",
  keywords: ["buy eyeglasses online Kolkata", "sunglasses online India", "contact lenses", "premium eyewear", "home eye test", "Dey Opticals"],
  openGraph: {
    title: "Dey Opticals | Try it You'll like it",
    description: "Premium eyewear, sunglasses, and contact lenses in India. Get a free Home Eye Test today.",
    url: "https://deyopticals.com",
    siteName: "Dey Opticals",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dey Opticals Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} font-body text-text bg-background antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <TrustBadges />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  );
}
