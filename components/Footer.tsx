import { ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-light py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-white/60 sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <span className="font-semibold">{SITE.name}</span>
        </div>
        <p>
          © {new Date().getFullYear()} {SITE.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
