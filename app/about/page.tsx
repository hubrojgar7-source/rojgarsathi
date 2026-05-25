import { AboutSection } from "@/components/jobmatrix/AboutSection";
import { Header, SiteFooter } from "@/components/jobmatrix";

export const metadata = {
  title: "About Us — Rojgar Sathi",
  description:
    "Learn about Rojgar Sathi, your employment companion for job seekers and employers in Nepal.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
