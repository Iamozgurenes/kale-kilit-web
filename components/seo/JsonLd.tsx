import { getSiteJsonLd } from "@/lib/seo";

export default function JsonLd() {
  const data = getSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
