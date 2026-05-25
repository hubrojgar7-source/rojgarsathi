import Image from "next/image";
import Link from "next/link";

const founder = {
  name: "Jharana KC",
  role: "Founder of Rojgar Sathi",
  image: "/founder.jpg",
  bio: "Jharana KC founded Rojgar Sathi to make job searching simpler and more honest for people across Nepal. She leads the team with a focus on real opportunities, clear communication, and support for both job seekers and employers.",
};

export function TeamSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Our Team
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The people behind Rojgar Sathi
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
            We are a small, dedicated team working to connect talent with opportunity
            throughout Nepal.
          </p>
        </header>

        <div className="mx-auto mt-14 max-w-lg">
          <article className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm">
            <div className="relative aspect-[4/5] w-full bg-slate-200 sm:aspect-[5/4]">
              <Image
                src={founder.image}
                alt={`${founder.name}, ${founder.role}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 32rem"
                priority
              />
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {founder.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-blue-600">
                {founder.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {founder.bio}
              </p>
            </div>
          </article>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/#contact"
            className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
