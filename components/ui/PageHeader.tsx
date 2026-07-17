import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-inset ring-white/20">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
