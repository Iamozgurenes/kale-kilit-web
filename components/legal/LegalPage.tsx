import type { ReactNode } from "react";
import PageHeader from "@/components/ui/PageHeader";
import type { BannerPath } from "@/lib/banner";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
  path: BannerPath;
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
  path,
}: LegalPageProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        path={path}
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-10 text-sm text-black/45">
            Son güncelleme: {updatedAt}
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-extrabold text-navy">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-black/65 sm:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
