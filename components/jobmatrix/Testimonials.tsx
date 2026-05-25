import { IconStar } from "./icons";

const items = [
  {
    quote:
      "Rojgar Sathi made switching careers feel manageable. The listings were accurate and I landed interviews within two weeks.",
    name: "Sarah Chen",
    role: "Product Manager · Northwind",
    initials: "SC",
  },
  {
    quote:
      "As a hiring lead, we consistently find strong candidates here. The UI is clean and the applicant flow just works.",
    name: "Marcus Webb",
    role: "Head of Talent · Brightline",
    initials: "MW",
  },
  {
    quote:
      "I love the category insights and salary tags. It saved me hours compared to bouncing between random job boards.",
    name: "Aisha Khan",
    role: "UX Researcher · Studio 14",
    initials: "AK",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          What do they say about us?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-slate-600">
          Real feedback from people who found their next role—or their next
          hire—through Rojgar Sathi.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-5 w-5" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200/80 pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
