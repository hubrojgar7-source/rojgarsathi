type Props = {
  defaultQuery?: string;
  defaultLocation?: string;
};

export function HeroSearchForm({
  defaultQuery = "",
  defaultLocation = "",
}: Props) {
  return (
    <form
      action="/"
      method="get"
      className="mt-8 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] sm:p-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label className="flex min-h-[52px] flex-1 cursor-text items-center gap-3 rounded-xl px-4 py-2 sm:min-h-0 sm:py-3">
          <span className="sr-only">Job title or keyword</span>
          <svg
            className="h-5 w-5 shrink-0 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={defaultQuery}
            placeholder="Job title, keyword..."
            className="w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>

        <div
          className="hidden w-px shrink-0 bg-slate-200 sm:my-2 sm:block sm:self-stretch"
          aria-hidden
        />

        <label className="flex min-h-[52px] flex-1 cursor-text items-center gap-3 rounded-xl px-4 py-2 sm:min-h-0 sm:py-3">
          <span className="sr-only">Location</span>
          <svg
            className="h-5 w-5 shrink-0 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <input
            type="text"
            name="location"
            defaultValue={defaultLocation}
            placeholder="Location"
            className="w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </label>

        <button
          type="submit"
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-colors hover:bg-blue-600 sm:min-h-0 sm:min-w-[120px] sm:self-stretch sm:px-5"
        >
          Find Job
        </button>
      </div>
    </form>
  );
}
