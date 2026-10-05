import PageHeader from "@/components/ui/PageHeader";
import type { BannerPath } from "@/lib/banner";
import type { CmsPage } from "@/lib/cms/types";

export default function LegalHtml({
  page,
  path,
}: {
  page: CmsPage;
  path: BannerPath;
}) {
  const updatedAt = String(page.content.updated_at || "");

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow || "Yasal"}
        title={page.title}
        description={page.description}
        path={path}
      />
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {updatedAt ? (
            <p className="mb-10 text-sm text-black/60">Son güncelleme: {updatedAt}</p>
          ) : null}
          <div
            className="space-y-4 text-sm leading-relaxed text-black/65 sm:text-base [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-navy [&_p]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        </div>
      </section>
    </>
  );
}
