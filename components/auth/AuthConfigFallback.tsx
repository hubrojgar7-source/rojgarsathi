import Link from "next/link";

import { Logo } from "@/components/Logo";

type Props = {
  title: string;
  description: string;
};

export function AuthConfigFallback({ title, description }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <Logo href="/" size="xl" className="mb-8 h-24 w-24" />
      <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
