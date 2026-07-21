import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import CookieConsent from "@/components/layout/CookieConsent";
import ScrollToTop from "@/components/layout/ScrollToTop";
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
    default: "Kale Kilit & Çilingir | 7/24 Acil Çilingir Hizmeti",
    template: "%s | Kale Kilit & Çilingir",
  },
  description:
    "Kapıda mı kaldınız? 15 dakikada oradayız. Adana’da ev, oto ve kasa çilingir hizmetlerinde 7/24 hızlı ve güvenilir çözüm.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE.name,
    title: "Kale Kilit & Çilingir | 7/24 Acil Çilingir Hizmeti",
    description:
      "Adana genelinde 7/24 çilingir hizmeti. Ev, oto ve kasa çilingirliğinde hızlı çözüm.",
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
