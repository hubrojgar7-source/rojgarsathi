import Link from "next/link";

import { AuthControls } from "@/components/AuthControls";
import { Logo } from "@/components/Logo";

import { MobileNav } from "./MobileNav";
import { NAV_LINKS } from "./nav-links";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:gap-4 sm:px-6 lg:px-8">
        <Logo href="/" size="md" priority showLabel tagline="Dream big!" />

        <nav
          className="hidden items-center gap-5 text-sm font-medium text-slate-600 xl:flex xl:gap-7"
          aria-label="Primary"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-blue-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden xl:block">
            <AuthControls />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
