import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export const runtime = 'edge';


type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ item: post });
  } catch (error) {
    console.error("[api/posts/slug]", error);
    return NextResponse.json({ error: "Yazı alınamadı" }, { status: 500 });
  }
}
