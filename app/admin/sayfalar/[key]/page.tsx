"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import type { RecordModel } from "pocketbase";
import { getAdminPb } from "@/lib/admin/client";

const CONTENT_FIELDS: Record<string, { name: string; label: string; rows?: number }[]> = {
  home: [
    { name: "features_title", label: "Neden biz başlığı" },
    { name: "features_subtitle", label: "Neden biz alt metni", rows: 3 },
    { name: "process_title", label: "Süreç başlığı" },
    { name: "process_subtitle", label: "Süreç alt metni", rows: 3 },
    { name: "testimonials_title", label: "Yorumlar başlığı" },
    { name: "testimonials_subtitle", label: "Yorumlar alt metni", rows: 3 },
    { name: "faq_title", label: "SSS başlığı" },
    { name: "faq_subtitle", label: "SSS alt metni", rows: 3 },
  ],
  about: [
    { name: "story_title", label: "Hikaye başlığı" },
    { name: "story", label: "Hikaye paragrafları (her satır bir paragraf)", rows: 6 },
    { name: "mission", label: "Misyon", rows: 3 },
    { name: "vision", label: "Vizyon", rows: 3 },
    { name: "timeline_title", label: "Yolculuk başlığı" },
    { name: "timeline_subtitle", label: "Yolculuk alt metni" },
    { name: "values_title", label: "Değerler başlığı" },
    { name: "values_subtitle", label: "Değerler alt metni" },
    { name: "team_title", label: "Ekip başlığı" },
    { name: "team_text", label: "Ekip metni", rows: 4 },
    { name: "areas_title", label: "Bölgeler başlığı" },
    { name: "areas_note", label: "Bölgeler notu" },
  ],
  authorized: [
    { name: "list_title", label: "Liste başlığı" },
    { name: "list_subtitle", label: "Liste alt metni", rows: 3 },
    { name: "cta_eyebrow", label: "CTA etiket" },
    { name: "cta_title", label: "CTA başlığı" },
    { name: "cta_text", label: "CTA metni" },
  ],
  projects: [
    { name: "gallery_title", label: "Galeri başlığı" },
    { name: "gallery_subtitle", label: "Galeri alt metni" },
    { name: "cta_title", label: "Alt CTA başlığı" },
    { name: "cta_text", label: "Alt CTA metni", rows: 3 },
  ],
  blog: [
    { name: "list_title", label: "Liste başlığı" },
    { name: "list_subtitle", label: "Liste alt metni" },
  ],
  faq: [
    { name: "empty_title", label: "Cevap bulunamadı başlığı" },
    { name: "empty_text", label: "Cevap bulunamadı metni", rows: 3 },
  ],
  contact: [
    { name: "banner_text", label: "Üst uyarı metni" },
    { name: "info_title", label: "Bilgiler başlığı" },
    { name: "info_subtitle", label: "Bilgiler alt metni" },
    { name: "form_title", label: "Form başlığı" },
    { name: "areas_title", label: "Bölgeler başlığı" },
    { name: "areas_subtitle", label: "Bölgeler alt metni" },
    { name: "faq_title", label: "SSS başlığı" },
    { name: "faq_subtitle", label: "SSS alt metni" },
  ],
  kvkk: [{ name: "updated_at", label: "Son güncelleme" }],
  privacy: [{ name: "updated_at", label: "Son güncelleme" }],
  cookies: [{ name: "updated_at", label: "Son güncelleme" }],
  terms: [{ name: "updated_at", label: "Son güncelleme" }],
};

function contentValue(content: Record<string, unknown>, name: string) {
  const value = content[name];
  if (Array.isArray(value)) return value.join("\n");
  return String(value ?? "");
}

export default function EditPageAdmin() {
  const params = useParams<{ key: string }>();
  const router = useRouter();
  const [record, setRecord] = useState<RecordModel | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void getAdminPb()
      .collection("pages")
      .getFirstListItem(`key = "${params.key}"`)
      .then(setRecord)
      .catch(() => setMessage("Sayfa bulunamadı."));
  }, [params.key]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!record) return;
    setSaving(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const content: Record<string, unknown> = {
      ...((record.content as Record<string, unknown>) || {}),
    };
    for (const field of CONTENT_FIELDS[params.key] || []) {
      const raw = String(data.get(`content.${field.name}`) || "");
      content[field.name] = field.name === "story" ? raw.split("\n").map((line) => line.trim()).filter(Boolean) : raw;
    }

    const payload: Record<string, unknown> = {
      label: String(data.get("label") || ""),
      eyebrow: String(data.get("eyebrow") || ""),
      title: String(data.get("title") || ""),
      description: String(data.get("description") || ""),
      body: String(data.get("body") || ""),
      seo_title: String(data.get("seo_title") || ""),
      seo_description: String(data.get("seo_description") || ""),
      is_published: data.get("is_published") === "on",
      content,
    };

    const file = data.get("og_image");
    try {
      if (file instanceof File && file.size > 0) {
        const fd = new FormData();
        for (const [key, value] of Object.entries(payload)) {
          fd.append(key, typeof value === "string" ? value : JSON.stringify(value));
        }
        fd.set("is_published", payload.is_published ? "true" : "false");
        fd.append("og_image", file);
        const updated = await getAdminPb().collection("pages").update(record.id, fd);
        setRecord(updated);
      } else {
        const updated = await getAdminPb().collection("pages").update(record.id, payload);
        setRecord(updated);
      }
      setMessage("Kaydedildi.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (!record) return <p className="text-sm text-black/60">{message || "Yükleniyor..."}</p>;

  const content = (record.content && typeof record.content === "object" ? record.content : {}) as Record<
    string,
    unknown
  >;
  const extra = CONTENT_FIELDS[params.key] || [];
  const inputClass =
    "mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent";

  return (
    <div>
      <button type="button" onClick={() => router.push("/admin/sayfalar")} className="text-sm font-semibold text-navy/70">
        ← Tüm sayfalar
      </button>
      <h1 className="mt-3 text-2xl font-extrabold">{String(record.label || record.title)}</h1>
      <p className="mt-1 text-sm text-black/50">{String(record.path)}</p>

      <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-3xl space-y-4 rounded-2xl bg-white p-6 ring-1 ring-black/5">
        {message && <p className="rounded-xl bg-navy/5 px-4 py-3 text-sm">{message}</p>}

        <label className="block text-sm font-medium">
          Admin etiketi
          <input name="label" defaultValue={String(record.label || "")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Üst etiket (eyebrow)
          <input name="eyebrow" defaultValue={String(record.eyebrow || "")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Sayfa başlığı
          <input name="title" defaultValue={String(record.title || "")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Sayfa açıklaması
          <textarea name="description" rows={3} defaultValue={String(record.description || "")} className={inputClass} />
        </label>

        <div className="rounded-2xl bg-neutral-50 p-4">
          <h2 className="font-bold">SEO / Google</h2>
          <label className="mt-3 block text-sm font-medium">
            Meta title
            <input name="seo_title" defaultValue={String(record.seo_title || "")} className={inputClass} />
          </label>
          <label className="mt-3 block text-sm font-medium">
            Meta description
            <textarea name="seo_description" rows={3} defaultValue={String(record.seo_description || "")} className={inputClass} />
          </label>
          <label className="mt-3 block text-sm font-medium">
            Sosyal görsel (og)
            <input name="og_image" type="file" accept="image/*" className={inputClass} />
          </label>
        </div>

        {extra.length > 0 && (
          <div className="rounded-2xl bg-neutral-50 p-4">
            <h2 className="font-bold">Sayfa içeriği</h2>
            {extra.map((field) => (
              <label key={field.name} className="mt-3 block text-sm font-medium">
                {field.label}
                {field.rows ? (
                  <textarea
                    name={`content.${field.name}`}
                    rows={field.rows}
                    defaultValue={contentValue(content, field.name)}
                    className={inputClass}
                  />
                ) : (
                  <input
                    name={`content.${field.name}`}
                    defaultValue={contentValue(content, field.name)}
                    className={inputClass}
                  />
                )}
              </label>
            ))}
          </div>
        )}

        <label className="block text-sm font-medium">
          HTML gövde (yasal sayfalar veya ekstra metin)
          <textarea name="body" rows={10} defaultValue={String(record.body || "")} className={inputClass} />
        </label>
        <label className="flex items-center gap-3 text-sm font-medium">
          <input type="checkbox" name="is_published" defaultChecked={record.is_published !== false} />
          Yayında
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-navy hover:bg-accent/90 disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </div>
  );
}
