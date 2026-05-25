import Link from "next/link";

import { Logo } from "@/components/Logo";

type Props = {
  backHref?: string;
  backLabel?: string;
  title: string;
  subtitle?: string;
};

export function JobPageHeader({
  backHref = "/",
  backLabel = "← Back to home",
  title,
  subtitle,
}: Props) {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo href="/" size="md" className="h-11 w-11" />
        <Link
          href={backHref}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          {backLabel}
        </Link>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
