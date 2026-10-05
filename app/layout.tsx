import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import AppChrome from "@/components/layout/AppChrome";
import JsonLd from "@/components/seo/JsonLd";
import { SiteProvider } from "@/lib/site-context";
import { getAuthorizedBrands, getSiteSettings } from "@/lib/cms/queries";
import { getServices } from "@/lib/services";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.defaultSeoTitle,
      template: `%s | Adana Çilingir | ${site.name}`,
    },
    description: site.defaultSeoDescription,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    applicationName: site.name,
    category: "business",
    alternates: {
      canonical: site.url,
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
      url: site.url,
      siteName: site.name,
      title: site.defaultSeoTitle,
      description: site.defaultSeoDescription,
      images: [
        {
          url: "/genelog.png",
          width: 1200,
          height: 630,
          alt: `Adana çilingir ve anahtarcı — ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultSeoTitle,
      description: site.defaultSeoDescription,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [site, brands, services] = await Promise.all([
    getSiteSettings(),
    getAuthorizedBrands(),
    getServices().catch(() => []),
  ]);
  const GA_ID = site.gaId;
  const ADS_ID = site.adsId;
  const GTM_ID = site.gtmId;

  return (
    <html lang="tr" className={`${poppins.variable} h-full antialiased`}>
      <head>
        {GTM_ID ? (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-white text-foreground">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-gtag" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
          `}
            </Script>
          </>
        ) : null}
        <SiteProvider site={site} brands={brands} services={services}>
          <JsonLd site={site} />
          <AppChrome>{children}</AppChrome>
        </SiteProvider>
      </body>
    </html>
  );
}
