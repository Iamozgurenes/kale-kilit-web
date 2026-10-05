"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { RecordModel } from "pocketbase";
import { getAdminPb } from "@/lib/admin/client";
import { asStringList } from "@/lib/cms/types";

export default function SettingsPage() {
  const [record, setRecord] = useState<RecordModel | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void getAdminPb()
      .collection("site_settings")
      .getFirstListItem('key = "default"')
      .then(setRecord)
      .catch(() => setMessage("Ayar kaydı bulunamadı."));
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!record) return;
    setSaving(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const payload = {
      site_name: String(data.get("site_name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      address: String(data.get("address") || ""),
      whatsapp_number: String(data.get("whatsapp_number") || ""),
      whatsapp_message: String(data.get("whatsapp_message") || ""),
      url: String(data.get("url") || ""),
      geo_lat: Number(data.get("geo_lat") || 0),
      geo_lng: Number(data.get("geo_lng") || 0),
      footer_tagline: String(data.get("footer_tagline") || ""),
      working_hours: String(data.get("working_hours") || ""),
      service_areas: String(data.get("service_areas") || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      default_seo_title: String(data.get("default_seo_title") || ""),
      default_seo_description: String(data.get("default_seo_description") || ""),
      ga_id: String(data.get("ga_id") || ""),
      ads_id: String(data.get("ads_id") || ""),
      gtm_id: String(data.get("gtm_id") || ""),
    };
    try {
      const updated = await getAdminPb().collection("site_settings").update(record.id, payload);
      setRecord(updated);
      setMessage("Kaydedildi.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (!record) {
    return <p className="text-sm text-black/60">{message || "Yükleniyor..."}</p>;
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent";

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Site ayarları</h1>
      <p className="mt-2 text-sm text-black/60">
        Telefon, adres, WhatsApp, varsayılan SEO ve analiz kodları tüm sitede kullanılır.
      </p>

      <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-3xl space-y-4 rounded-2xl bg-white p-6 ring-1 ring-black/5">
        {message && <p className="rounded-xl bg-navy/5 px-4 py-3 text-sm">{message}</p>}
        {[
          ["site_name", "Site adı"],
          ["phone", "Telefon"],
          ["email", "E-posta"],
          ["address", "Adres"],
          ["whatsapp_number", "WhatsApp numarası (90...)"],
          ["url", "Site URL"],
          ["working_hours", "Çalışma saatleri"],
          ["ga_id", "Google Analytics ID"],
          ["ads_id", "Google Ads ID"],
          ["gtm_id", "Google Tag Manager ID"],
        ].map(([name, label]) => (
          <label key={name} className="block text-sm font-medium">
            {label}
            <input name={name} defaultValue={String(record[name] || "")} className={inputClass} />
          </label>
        ))}
        <label className="block text-sm font-medium">
          WhatsApp varsayılan mesajı
          <textarea name="whatsapp_message" rows={3} defaultValue={String(record.whatsapp_message || "")} className={inputClass} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Enlem
            <input name="geo_lat" type="number" step="any" defaultValue={String(record.geo_lat || "")} className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            Boylam
            <input name="geo_lng" type="number" step="any" defaultValue={String(record.geo_lng || "")} className={inputClass} />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Footer açıklaması
          <textarea name="footer_tagline" rows={3} defaultValue={String(record.footer_tagline || "")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Hizmet bölgeleri (her satır bir ilçe)
          <textarea
            name="service_areas"
            rows={8}
            defaultValue={asStringList(record.service_areas).join("\n")}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium">
          Varsayılan SEO başlığı
          <input name="default_seo_title" defaultValue={String(record.default_seo_title || "")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          Varsayılan SEO açıklaması
          <textarea name="default_seo_description" rows={3} defaultValue={String(record.default_seo_description || "")} className={inputClass} />
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
