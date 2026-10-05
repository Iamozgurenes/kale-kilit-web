import { NextResponse } from "next/server";
import { LIVE_CACHE_CONTROL } from "@/lib/cms/live";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json(
        { error: "Yazı bulunamadı" },
        { status: 404, headers: { "Cache-Control": LIVE_CACHE_CONTROL } },
      );
    }

    return NextResponse.json(
      { item: post },
      { headers: { "Cache-Control": LIVE_CACHE_CONTROL } },
    );
  } catch (error) {
    console.error("[api/posts/slug]", error);
    return NextResponse.json(
      { error: "Yazı alınamadı" },
      { status: 500, headers: { "Cache-Control": LIVE_CACHE_CONTROL } },
    );
  }
}
