import AdminGuard from "@/components/admin/AdminGuard";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Yönetim paneli",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
