import Link from "next/link";

const posts = [
  {
    date: "January 23, 2024",
    title: "Career Growth: Strategies for Advancing in Your Field",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    date: "February 02, 2024",
    title: "Remote Interviews: How to Stand Out on Video",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    date: "February 18, 2024",
    title: "Salary Negotiation Without Burning Bridges",
    gradient: "from-indigo-400 to-violet-600",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Read our blog
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Practical guides on interviews, resumes, and growing your career.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`h-48 bg-gradient-to-br ${post.gradient} relative`}
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
              </div>
              <div className="p-6">
                <time className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {post.date}
                </time>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                  <Link href="#" className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="#"
            className="inline-flex rounded-lg border border-blue-500 px-6 py-2.5 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-50"
          >
            Read all blog posts
          </Link>
        </div>
      </div>
    </section>
  );
}
