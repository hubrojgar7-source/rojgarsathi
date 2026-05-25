"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { NAV_LINKS } from "./nav-links";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          aria-label="Close menu"
          onClick={close}
        />
      ) : null}

      <div
        id="mobile-nav-panel"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
          <p className="text-sm font-semibold text-slate-900">Menu</p>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
          <ul className="space-y-1">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4">
          {!isLoaded ? (
            <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
          ) : isSignedIn ? (
            <div className="space-y-3">
              <Link
                href="/post-job"
                onClick={close}
                className="flex w-full items-center justify-center rounded-xl border border-blue-500 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                Post a Job
              </Link>
              <Link
                href="/#categories"
                onClick={close}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Find Jobs
              </Link>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span className="text-sm font-medium text-slate-600">Account</span>
                <UserButton
                  appearance={{
                    elements: { avatarBox: "h-9 w-9" },
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <Link
                href="/sign-in"
                onClick={close}
                className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                onClick={close}
                className="flex w-full items-center justify-center rounded-xl border border-blue-500 bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
