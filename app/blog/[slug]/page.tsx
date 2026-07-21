import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, PhoneCall, Tag } from "lucide-react";
import Button from "@/components/ui/Button";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import BlogCard from "@/components/ui/BlogCard";

export const runtime = 'edge';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Blog | Kale Kilit & Çilingir" };

  return {
    title: `${post.seoTitle || post.title} | Kale Kilit & Çilingir`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const related = (
    await getPosts({ category: post.category, limit: 4 }).catch(() => [])
  )
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="relative min-h-[320px] overflow-hidden bg-navy sm:min-h-[420px]">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/85 to-navy/45" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-transparent to-navy/35" />

        <div className="relative mx-auto flex min-h-[320px] max-w-6xl flex-col justify-end px-4 py-12 sm:min-h-[420px] sm:px-6 sm:py-16">
          <Link
            href="/blog"
            className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm Yazılar
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/15 px-3 py-1.5 font-semibold text-accent ring-1 ring-inset ring-accent/30">
              <Tag className="h-3.5 w-3.5" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/65">
              <CalendarDays className="h-4 w-4 text-accent" />
              {formattedDate}
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            {post.excerpt}
          </p>
        </div>
      </section>

      <article className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            {post.coverImage && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5 lg:hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            )}

            <div
              className="prose prose-neutral max-w-none text-black/70 prose-headings:text-navy prose-a:text-accent prose-li:marker:text-accent prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">
              {post.coverImage && (
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/5 lg:block">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
              )}

              <div className="rounded-2xl bg-navy p-6 text-white sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Acil Destek
                </p>
                <h2 className="mt-3 text-xl font-bold">
                  Kapıda mı kaldınız?
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  Yazıyı okurken ihtiyacınız olursa 7/24 bizi arayın.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={SITE.phoneHref} variant="primary" className="w-full">
                    <PhoneCall className="h-5 w-5" />
                    {SITE.phone}
                  </Button>
                  <Button href="/hizmetler" variant="secondary" className="w-full">
                    Hizmetleri Gör
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5 ring-1 ring-black/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy/40">
                  Kategori
                </p>
                <p className="mt-2 font-bold text-navy">{post.category}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy/40">
                  Yayın Tarihi
                </p>
                <p className="mt-2 text-sm text-black/60">{formattedDate}</p>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-navy">İlgili Yazılar</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <BlogCard
                  key={item.id}
                  title={item.title}
                  date={item.publishedAt}
                  category={item.category}
                  excerpt={item.excerpt}
                  href={`/blog/${item.slug}`}
                  coverImage={item.coverImage}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <CTA /> */}
    </>
  );
}
