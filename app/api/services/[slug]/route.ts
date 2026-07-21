import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/services";


export const runtime = 'edge';
type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
      return NextResponse.json({ error: "Hizmet bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ item: service });
  } catch (error) {
    console.error("[api/services/slug]", error);
    return NextResponse.json({ error: "Hizmet alınamadı" }, { status: 500 });
  }
}
