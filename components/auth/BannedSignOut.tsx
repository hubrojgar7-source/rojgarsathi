"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

import { hasClerkPublishableKey } from "@/lib/supabase/env";

export function BannedSignOut() {
  if (!hasClerkPublishableKey()) {
    return (
      <Link
        href="/"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Back to home
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <SignOutButton>
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Sign out
        </button>
      </SignOutButton>
      <Link
        href="/"
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Home
      </Link>
    </div>
  );
}
