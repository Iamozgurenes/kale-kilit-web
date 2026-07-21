import { NextResponse } from "next/server";
import { getServices } from "@/lib/services";


export const runtime = 'edge';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;

    const services = await getServices({
      limit: Number.isFinite(limit) ? limit : undefined,
    });

    return NextResponse.json({ items: services });
  } catch (error) {
    console.error("[api/services]", error);
    return NextResponse.json(
      { error: "Hizmetler alınamadı", items: [] },
      { status: 500 },
    );
  }
}
