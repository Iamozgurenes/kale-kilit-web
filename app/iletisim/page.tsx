import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "İletişim | Kale Kilit & Çilingir",
  description:
    "Kale Kilit & Çilingir ile telefon, WhatsApp veya iletişim formu üzerinden hemen iletişime geçin. 7/24 acil çilingir hizmeti.",
};

const CONTACT_ITEMS = [
  { icon: PhoneCall, label: "Telefon", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "E-posta", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Adres", value: SITE.address },
  { icon: Clock3, label: "Çalışma Saatleri", value: "7/24 Kesintisiz Hizmet" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Bize Ulaşın"
        description="Acil durumlar için hemen arayın, diğer talepleriniz için formu doldurun."
      />

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl bg-neutral-50 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-black/60 hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-black/60">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={SITE.phoneHref} variant="primary" className="w-full sm:w-auto">
                <PhoneCall className="h-5 w-5" />
                Hemen Ara
              </Button>
              <Button
                href={SITE.whatsappHref}
                variant="secondary"
                className="w-full text-navy! ring-navy/20! bg-navy/5! hover:bg-navy/10! sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
