"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-C9LJQKVVJZ";
const STORAGE_KEY = "kale-kilit-cookie-consent";
const CONSENT_EVENT = "kale-cookie-accepted";

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        setEnabled(window.localStorage.getItem(STORAGE_KEY) !== null);
      } catch {
        setEnabled(false);
      }
    };

    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
