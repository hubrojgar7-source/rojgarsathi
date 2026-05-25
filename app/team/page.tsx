import { Header, SiteFooter, TeamSection } from "@/components/jobmatrix";

export const metadata = {
  title: "Our Team — Rojgar Sathi",
  description:
    "Meet the Rojgar Sathi team, led by founder Jharana KC.",
};

export default function TeamPage() {
  return (
    <div className="flex min-h-full flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">
        <TeamSection />
      </main>
      <SiteFooter />
    </div>
  );
}
