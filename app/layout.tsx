import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollToTop from "@/components/layout/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
    template: "%s | Adana Çilingir | Kale Kilit",
  },
  description:
    "Adana çilingir ve anahtarcı hizmeti: kapıda kaldınız mı? 7/24 acil çilingir, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde ortalama 15 dakikada yanınızdayız.",
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  category: "business",
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.url,
    siteName: SITE.name,
    title: "Adana Çilingir & Anahtarcı | 7/24 Acil | Kale Kilit",
    description:
      "Adana çilingir ve anahtarcı: 7/24 acil müdahale, ev-oto-kasa açma, anahtar çoğaltma. Çukurova ve Adana genelinde hızlı, hasarsız çözüm.",
    images: [
      {
        url: "/genelog.png",
        width: 1200,
        height: 630,
        alt: "Adana çilingir ve anahtarcı — Kale Kilit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adana Çilingir & Anahtarcı | 7/24 Acil",
    description:
      "Adana’da 7/24 acil çilingir ve anahtarcı. Ev, oto, kasa açma ve anahtar çoğaltma.",
    images: ["/genelog.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logoico.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logoico.svg" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "llms-txt": "/llms.txt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-foreground">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
        <ScrollToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
