"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <h3 className="text-lg font-bold text-navy">Mesajınız Alındı</h3>
        <p className="text-sm text-black/60">
          En kısa sürede sizinle iletişime geçeceğiz. Acil durumlar için lütfen
          bizi doğrudan arayın.
        </p>
      </div>
    );
  }

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
        <Send className="h-5 w-5" />
        Mesaj Gönder
      </button>
    </form>
  );
}
