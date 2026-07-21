import PocketBase from "pocketbase";

const POCKETBASE_URL =
  process.env.POCKETBASE_URL ?? "https://app-kale-kilit-db.pjyhpm.easypanel.host";

/** Server-only PocketBase client (API routes / Server Components). */
export function createPocketBase() {
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);
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
