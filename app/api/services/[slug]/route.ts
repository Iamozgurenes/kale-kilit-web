import { NextResponse } from "next/server";
import { LIVE_CACHE_CONTROL } from "@/lib/cms/live";
import { getServiceBySlug } from "@/lib/services";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
      return NextResponse.json(
        { error: "Hizmet bulunamadı" },
        { status: 404, headers: { "Cache-Control": LIVE_CACHE_CONTROL } },
      );
    }

    return NextResponse.json(
      { item: service },
      { headers: { "Cache-Control": LIVE_CACHE_CONTROL } },
    );
  } catch (error) {
    console.error("[api/services/slug]", error);
    return NextResponse.json(
      { error: "Hizmet alınamadı" },
      { status: 500, headers: { "Cache-Control": LIVE_CACHE_CONTROL } },
    );
  }
}
