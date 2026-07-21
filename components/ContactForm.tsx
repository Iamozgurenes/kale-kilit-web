"use client";

import type { FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      "Merhaba, Kale Kilit & Çilingir web sitesinden yazıyorum.",
      "",
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      subject ? `Konu: ${subject}` : null,
      "",
      "Mesaj:",
      message,
    ].filter((line) => line !== null);

    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-navy">
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-navy">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-navy">
          Konu
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="Örn: Ev Çilingiri"
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-navy">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="resize-none rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-navy shadow-lg shadow-accent/30 transition-transform active:scale-95 hover:bg-accent/90"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp ile Gönder
      </button>
    </form>
  );
}
