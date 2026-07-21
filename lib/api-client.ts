/** Browser-side helper: always call our Next.js API routes (not PocketBase). */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}
