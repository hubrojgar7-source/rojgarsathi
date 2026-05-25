import { ScrollToJobsOnSearch } from "@/components/jobs/ScrollToJobsOnSearch";
import {
  CategoryGrid,
  CtaBanner,
  Header,
  Hero,
  ReviewsSection,
  SiteFooter,
  StatsBar,
} from "@/components/jobmatrix";
import {
  hasActiveFilters,
  parseJobSearchParams,
} from "@/lib/jobs/filters";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const raw = await searchParams;
  const filters = parseJobSearchParams(raw);
  const shouldScroll = hasActiveFilters(filters);

  return (
    <div className="flex min-h-full flex-col bg-white text-slate-900">
      <ScrollToJobsOnSearch shouldScroll={shouldScroll} />
      <Header />
      <main className="flex-1">
        <Hero
          defaultQuery={filters.q ?? ""}
          defaultLocation={filters.location ?? ""}
        />
        <StatsBar />
        <CategoryGrid filters={filters} />
        <ReviewsSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
