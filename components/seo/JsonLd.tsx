import { getSiteJsonLd } from "@/lib/seo";
import type { SiteSettings } from "@/lib/cms/types";

export default function JsonLd({ site }: { site: SiteSettings }) {
  const data = getSiteJsonLd(site);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
