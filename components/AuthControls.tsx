"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function AuthControls() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2 sm:gap-3" aria-hidden>
        <div className="h-9 flex-1 max-w-[7rem] animate-pulse rounded-lg bg-slate-100 sm:max-w-[9rem]" />
        <div className="h-9 w-20 shrink-0 animate-pulse rounded-lg bg-slate-100 sm:w-24" />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/post-job"
          className="hidden rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-50 sm:inline-flex"
        >
          Post a Job
        </Link>
        <Link
          href="/#categories"
          className="inline-flex rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-colors hover:bg-blue-600"
        >
          Find Job
        </Link>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className="rounded-lg border border-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-50 sm:px-4"
      >
        Sign up
      </Link>
    </div>
  );
}
