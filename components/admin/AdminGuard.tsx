"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { ADMIN_NAV } from "@/lib/admin/resources";
import { getAdminPb, isAdminAuthed } from "@/lib/admin/client";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    if (!isAdminAuthed()) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-navy text-white">
        Yükleniyor...
      </div>
    );
  }

  const logout = () => {
    getAdminPb().authStore.clear();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-dvh bg-[#f4f6fa] text-navy">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-black/5 bg-navy px-4 text-white lg:hidden">
        <span className="font-bold">Yönetim</span>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 hover:bg-white/10"
          aria-label="Menü"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="lg:grid lg:grid-cols-[240px_1fr]">
        <aside
          className={`${
            open ? "flex" : "hidden"
          } fixed inset-y-0 left-0 z-40 w-64 flex-col bg-navy text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-auto`}
        >
          <div className="border-b border-white/10 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Kale Kilit
            </p>
            <p className="mt-1 text-lg font-bold">Admin paneli</p>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {ADMIN_NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`mb-1 block rounded-xl px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-accent text-navy" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Çıkış
            </button>
          </div>
        </aside>

        <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
