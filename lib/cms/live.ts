import { connection } from "next/server";

export const LIVE_CACHE_CONTROL = "no-store, no-cache, must-revalidate";

/** Opt the current request out of static rendering so CMS edits appear immediately. */
export async function ensureLive() {
  await connection();
}
