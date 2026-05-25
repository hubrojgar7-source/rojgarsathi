import { Header, SiteFooter } from "@/components/jobmatrix";

export const metadata = {
  title: "Rojgar Hub — Rojgar Sathi",
  description:
    "Resources, tips, and community content for job seekers and employers on Rojgar Sathi.",
};

export default function RojgarHubPage() {
  return (
    <div className="flex min-h-full flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">
        <section className="border-b border-slate-100 bg-gradient-to-b from-blue-50/80 to-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Rojgar Hub
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Your space for career tips, guides, and community updates. More
              content is coming soon.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
