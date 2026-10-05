"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { RecordModel } from "pocketbase";
import { getAdminPb } from "@/lib/admin/client";
import type { AdminField, AdminResource } from "@/lib/admin/resources";
import { asStringList } from "@/lib/cms/types";

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function fieldValue(record: RecordModel | null, field: AdminField, defaults: Record<string, unknown>) {
  if (!record) return defaults[field.name] ?? (field.type === "bool" ? true : field.type === "list" ? [] : "");
  if (field.type === "list") return asStringList(record[field.name]).join("\n");
  if (field.type === "bool") return record[field.name] !== false;
  if (field.type === "date") {
    const value = record[field.name];
    return value ? String(value).slice(0, 10) : "";
  }
  if (field.type === "file") return "";
  return record[field.name] ?? "";
}

export default function RecordForm({
  resource,
  record,
}: {
  resource: AdminResource;
  record?: RecordModel | null;
}) {
  const router = useRouter();
  const pb = getAdminPb();
  const isEdit = Boolean(record);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(String(record?.title || record?.question || record?.name || ""));

  const initial = useMemo(() => {
    const values: Record<string, unknown> = {};
    for (const field of resource.fields) {
      values[field.name] = fieldValue(record ?? null, field, resource.defaults);
    }
    return values;
  }, [record, resource]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {};
    let hasFile = false;

    for (const field of resource.fields) {
      if (field.type === "file") {
        const file = data.get(field.name);
        const remove = data.get(`${field.name}__remove`) === "on";
        if (file instanceof File && file.size > 0) {
          payload[field.name] = file;
          hasFile = true;
        } else if (remove) {
          payload[field.name] = null;
        }
        continue;
      }
      if (field.type === "bool") {
        payload[field.name] = data.get(field.name) === "on";
        continue;
      }
      if (field.type === "list") {
        payload[field.name] = String(data.get(field.name) || "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        continue;
      }
      if (field.type === "number") {
        payload[field.name] = Number(data.get(field.name) || 0);
        continue;
      }
      payload[field.name] = String(data.get(field.name) || "").trim();
    }

    try {
      if (hasFile) {
        const fd = new FormData();
        for (const [key, value] of Object.entries(payload)) {
          if (value instanceof File) fd.append(key, value);
          else if (Array.isArray(value)) fd.append(key, JSON.stringify(value));
          else if (typeof value === "boolean") fd.append(key, value ? "true" : "false");
          else if (value === null) fd.append(key, "");
          else fd.append(key, String(value));
        }
        if (isEdit && record) await pb.collection(resource.collection).update(record.id, fd);
        else await pb.collection(resource.collection).create(fd);
      } else if (isEdit && record) {
        await pb.collection(resource.collection).update(record.id, payload);
      } else {
        await pb.collection(resource.collection).create(payload);
      }
      router.push(`/admin/${resource.key}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5 rounded-2xl bg-white p-6 ring-1 ring-black/5">
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {resource.fields.map((field) => {
        const name = field.name;
        const defaultValue = initial[name];
        const inputClass =
          "w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent";

        if (field.type === "bool") {
          return (
            <label key={name} className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                name={name}
                defaultChecked={Boolean(defaultValue)}
                className="h-4 w-4 accent-accent"
              />
              {field.label}
            </label>
          );
        }

        if (field.type === "file") {
          const current = record?.[name] ? pb.files.getURL(record, String(record[name])) : "";
          return (
            <div key={name} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {current ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current} alt="" className="h-28 rounded-xl object-cover ring-1 ring-black/5" />
              ) : null}
              <input type="file" name={name} accept="image/*" className={inputClass} />
              {current ? (
                <label className="flex items-center gap-2 text-xs text-black/60">
                  <input type="checkbox" name={`${name}__remove`} />
                  Görseli kaldır
                </label>
              ) : null}
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <label key={name} className="block space-y-1.5 text-sm font-medium">
              {field.label}
              <select name={name} defaultValue={String(defaultValue || "")} className={inputClass}>
                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        if (field.type === "textarea" || field.type === "editor" || field.type === "list") {
          return (
            <label key={name} className="block space-y-1.5 text-sm font-medium">
              {field.label}
              <textarea
                name={name}
                rows={field.rows || 5}
                defaultValue={String(defaultValue || "")}
                className={inputClass}
              />
              {field.help ? <span className="font-normal text-xs text-black/50">{field.help}</span> : null}
            </label>
          );
        }

        const isTitle = name === "title" || name === "question" || name === "name";
        const isSlug = field.type === "slug";

        return (
          <label key={name} className="block space-y-1.5 text-sm font-medium">
            {field.label}
            <input
              name={name}
              type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
              required={field.required}
              defaultValue={String(defaultValue ?? "")}
              className={inputClass}
              onChange={
                isTitle
                  ? (event) => {
                      setTitle(event.target.value);
                      if (!isEdit) {
                        const slugInput = event.currentTarget.form?.querySelector<HTMLInputElement>(
                          'input[name="slug"]',
                        );
                        if (slugInput && !slugInput.dataset.touched) {
                          slugInput.value = slugify(event.target.value);
                        }
                      }
                    }
                  : isSlug
                    ? (event) => {
                        event.currentTarget.dataset.touched = "1";
                      }
                    : undefined
              }
            />
            {isSlug && !isEdit ? (
              <span className="font-normal text-xs text-black/50">
                Başlıktan otomatik üretilir, isterseniz değiştirebilirsiniz. Örn: {slugify(title) || "ornek-metin"}
              </span>
            ) : null}
          </label>
        );
      })}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-navy hover:bg-accent/90 disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/admin/${resource.key}`)}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-navy/70 ring-1 ring-inset ring-navy/10"
        >
          Vazgeç
        </button>
      </div>
    </form>
  );
}
