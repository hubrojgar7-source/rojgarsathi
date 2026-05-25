import Link from "next/link";

const highlights = [
  {
    title: "For job seekers",
    text: "Browse verified openings, apply in minutes, and get guidance from our team when you need it.",
  },
  {
    title: "For employers",
    text: "Post roles, reach motivated candidates, and hire faster with listings that stay clear and up to date.",
  },
  {
    title: "Trusted support",
    text: "We stay with you from first search to interview—so finding work or talent feels simple, not stressful.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            About Us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your partner in finding the right job
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-base leading-relaxed text-slate-600 sm:text-lg">
          <p>
            <strong className="font-semibold text-slate-900">Rojgar Sathi</strong>{" "}
            is a dedicated job agency built to help people move forward in their
            careers. Our name means &ldquo;employment companion&rdquo;—and that is
            exactly what we aim to be for every candidate and employer who works
            with us.
          </p>
          <p>
            We provide jobs to people across many fields—from office and tech roles
            to sales, healthcare, creative work, and more. Whether you are starting
            out, changing careers, or looking for your next step, we connect you
            with real opportunities from companies that are actively hiring.
          </p>
          <p>
            For businesses, we act as a reliable hiring partner: you share your
            requirements, we help you reach the right talent, and together we build
            teams that last. Our platform makes it easy to post openings, review
            applicants, and fill positions without unnecessary delays.
          </p>
          <p>
            At Rojgar Sathi, we believe everyone deserves a fair chance at meaningful
            work. That is why we focus on clear job details, honest communication,
            and support at every stage—so you can focus on your future, not the
            paperwork.
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 text-center shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#categories"
            className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Browse open jobs
          </Link>
          <Link
            href="/post-job"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Post a job
          </Link>
        </div>
      </div>
    </section>
  );
}
