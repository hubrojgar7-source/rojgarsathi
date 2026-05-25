import { AdminShell } from "@/components/admin/AdminShell";
import { requireStaff } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin — Rojgar Sathi",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireStaff();

  return <AdminShell session={session}>{children}</AdminShell>;
}
