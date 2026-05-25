"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { canManageTeam, roleLabel } from "@/lib/admin/roles";
import type { StaffRole } from "@/lib/admin/types";

const baseLinks = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/team", label: "Team & roles", adminOnly: true },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/reviews", label: "Reviews" },
] as const;

type Props = {
  role: StaffRole;
  email: string;
};

export function AdminNav({ role, email }: Props) {
  const pathname = usePathname();
  const links = baseLinks.filter(
    (item) => !("adminOnly" in item && item.adminOnly) || canManageTeam(role),
  );

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Signed in as
        </p>
        <p className="mt-1 truncate text-sm font-medium text-slate-900">{email}</p>
        <span className="mt-2 inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
          {roleLabel(role)}
        </span>

        <nav className="mt-6 space-y-1" aria-label="Admin sections">
          {links.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
