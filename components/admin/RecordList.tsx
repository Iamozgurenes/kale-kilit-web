"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { RecordModel } from "pocketbase";
import { getAdminPb } from "@/lib/admin/client";
import type { AdminResource } from "@/lib/admin/resources";

export default function RecordList({ resource }: { resource: AdminResource }) {
  const [items, setItems] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const pb = getAdminPb();
      const result = await pb.collection(resource.collection).getFullList({
        sort: resource.sort || "-id",
      });
      setItems(result);
    } catch (err) {
      const detail =
        err && typeof err === "object" && "response" in err
          ? String((err as { response?: { message?: string } }).response?.message || "")
          : "";
      setError(detail || (err instanceof Error ? err.message : "Liste alınamadı."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource.collection]);

  const remove = async (id: string) => {
    if (!window.confirm("Bu kaydı silmek istiyor musunuz?")) return;
    await getAdminPb().collection(resource.collection).delete(id);
    await load();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">{resource.title}</h1>
          <p className="mt-1 text-sm text-black/60">{resource.description}</p>
        </div>
        {resource.key !== "mesajlar" && (
          <Link
            href={`/admin/${resource.key}/yeni`}
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-navy hover:bg-accent/90"
          >
            Yeni {resource.singular.toLowerCase()}
          </Link>
        )}
      </div>

      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-navy/60">
            <tr>
              {resource.columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={resource.columns.length + 1} className="px-4 py-8 text-black/50">
                  Yükleniyor...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={resource.columns.length + 1} className="px-4 py-8 text-black/50">
                  Kayıt yok.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-black/5">
                  {resource.columns.map((column) => (
                    <td key={column.key} className="max-w-[240px] truncate px-4 py-3">
                      {typeof item[column.key] === "boolean"
                        ? item[column.key]
                          ? "Evet"
                          : "Hayır"
                        : String(item[column.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/${resource.key}/${item.id}`}
                      className="mr-3 font-semibold text-navy hover:text-accent"
                    >
                      Düzenle
                    </Link>
                    <button
                      type="button"
                      onClick={() => void remove(item.id)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
