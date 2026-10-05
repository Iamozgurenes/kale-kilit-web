import PocketBase from "pocketbase";

const POCKETBASE_URL =
  process.env.POCKETBASE_URL ??
  process.env.NEXT_PUBLIC_POCKETBASE_URL ??
  "https://db.kalekilitadana.com";

/** Server-only PocketBase client (API routes / Server Components). */
export function createPocketBase() {
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);
  pb.beforeSend = async (url, options) => ({
    url,
    options: {
      ...options,
      cache: "no-store",
    },
  });
  return pb;
}

export function getPocketBaseUrl() {
  return POCKETBASE_URL.replace(/\/$/, "");
}

export function getFileUrl(
  collectionIdOrName: string,
  recordId: string,
  filename?: string | null,
) {
  if (!filename) return null;
  return `${getPocketBaseUrl()}/api/files/${collectionIdOrName}/${recordId}/${encodeURIComponent(filename)}`;
}
