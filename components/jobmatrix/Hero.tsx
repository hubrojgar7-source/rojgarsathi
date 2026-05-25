import Link from "next/link";

import { HeroSearchForm } from "@/components/jobs/HeroSearchForm";
import { buildJobsSearchUrl } from "@/lib/jobs/filters";

import { HeroVisual } from "./HeroVisual";

const quickTags = [
  { label: "Waiter / Hotel", category: "hotel-hospitality" },
  { label: "Teacher", category: "teaching-education" },
  { label: "Driver", category: "driver-delivery" },
  { label: "Office Admin", category: "office-admin" },
] as const;

type HeroProps = {
  defaultQuery?: string;
  defaultLocation?: string;
};

export function Hero({ defaultQuery = "", defaultLocation = "" }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/80 via-white to-white">
      {/* Background accents */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div>
          <h1 className="text-left text-4xl font-bold not-italic tracking-tight text-slate-900 sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08] xl:text-[3.35rem]">
            <span className="block">Discover Your</span>
            <span className="block">Dream Job with</span>
            <span className="block bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent lg:text-[1.06em]">
              Rojgar Sathi
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-left text-base not-italic font-normal leading-relaxed text-slate-600 sm:text-lg">
            Discover top opportunities with Rojgar Sathi. Connect with leading
            employers and take the next step in your career today.
          </p>

          <HeroSearchForm
            defaultQuery={defaultQuery}
            defaultLocation={defaultLocation}
          />

          <div className="mt-5 flex flex-wrap gap-2">
            {quickTags.map((tag) => (
              <Link
                key={tag.label}
                href={buildJobsSearchUrl({ category: tag.category })}
                className="rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-blue-600 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 sm:text-sm"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
