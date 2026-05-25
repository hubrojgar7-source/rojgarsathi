import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export const metadata = {
  title: "Account suspended — Rojgar Sathi",
};

export default function BannedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Account suspended</h1>
        <p className="mt-3 text-slate-600">
          Your access to Rojgar Sathi has been restricted. If you believe this is a
          mistake, contact us at{" "}
          <a
            href="mailto:hubrojgar7@gmail.com"
            className="font-medium text-blue-600 hover:underline"
          >
            hubrojgar7@gmail.com
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
      </div>
    </main>
  );
}
