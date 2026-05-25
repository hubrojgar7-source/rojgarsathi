"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-white px-4 py-16 text-center text-slate-900">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page could not load. Try again, or return home.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-slate-400">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
