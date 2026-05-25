import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-blue-500 py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
      >
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 200">
          <path
            fill="white"
            d="M0 120 C200 40 400 180 600 100 C800 20 1000 160 1200 80 V200 H0Z"
          />
          <path
            fill="white"
            opacity="0.35"
            d="M0 160 C250 80 450 200 700 120 C950 40 1100 180 1200 140 V200 H0Z"
          />
        </svg>
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get Your Dream Job Here
        </h2>
        <p className="mt-3 text-base text-blue-100 sm:text-lg">
          Create a free profile, get matched to roles, and apply in minutes.
        </p>
        <Link
          href="#"
          className="mt-8 inline-flex rounded-xl bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-900/10 transition-transform hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
