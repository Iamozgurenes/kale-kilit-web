import { NextResponse } from "next/server";
import { getPostCategories, getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const limitParam = searchParams.get("limit");
    const withCategories = searchParams.get("categories") === "1";
    const limit = limitParam ? Number(limitParam) : undefined;

    const [items, categories] = await Promise.all([
      getPosts({
        category,
        limit: Number.isFinite(limit) ? limit : undefined,
      }),
      withCategories ? getPostCategories() : Promise.resolve(undefined),
    ]);

    return NextResponse.json({
      items,
      ...(categories ? { categories } : {}),
    });
  } catch (error) {
    console.error("[api/posts]", error);
    return NextResponse.json(
      { error: "Yazılar alınamadı", items: [], categories: ["Tümü"] },
      { status: 500 },
    );
  }
}
