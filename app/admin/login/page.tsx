"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getAdminPb } from "@/lib/admin/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const pb = getAdminPb();

    try {
        await pb.collection("_superusers").authWithPassword(email, password);
      router.replace("/admin");
    } catch {
      setError("Giriş başarısız. E-posta veya şifreyi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-navy px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">
          Kale Kilit
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-navy">Yönetim paneli</h1>
        <p className="mt-2 text-sm text-black/60">
          PocketBase superuser bilgilerinizle giriş yapın.
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <label className="mt-6 block text-sm font-medium text-navy">
          E-posta
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-navy">
          Şifre
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-bold text-navy hover:bg-accent/90 disabled:opacity-60"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş yap"}
        </button>
      </form>
    </div>
  );
}
