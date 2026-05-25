import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/Logo";
import type { StaffSession } from "@/lib/admin/types";

import { AdminNav } from "./AdminNav";

type Props = {
  session: StaffSession;
  children: ReactNode;
};

export function AdminShell({ session, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo href="/" size="sm" />
            <span className="hidden h-6 w-px bg-slate-200 sm:block" />
            <p className="text-sm font-semibold text-slate-700">Admin dashboard</p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
          >
            Back to site
          </Link>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8 lg:py-8">
        <AdminNav role={session.role} email={session.email} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
