import { Logo } from "@/components/Logo";

export function TopBanner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 bg-slate-800 px-4 py-2.5 text-center text-xs leading-snug text-slate-200 sm:text-sm">
      <Logo href="/" size="xs" className="h-7 w-7 shrink-0" />
      <span className="max-w-xl">Post jobs, find work, and connect with employers across Nepal.</span>
    </div>
  );
}
