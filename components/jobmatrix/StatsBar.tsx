import {
  IconBriefcase,
  IconBuilding,
  IconSparkles,
  IconUsers,
} from "./icons";

const stats = [
  { label: "Live Job", value: "23,458", icon: IconBriefcase },
  { label: "Companies", value: "60,453", icon: IconBuilding },
  { label: "Candidates", value: "3,45,879", icon: IconUsers },
  { label: "New Job", value: "3,45,879", icon: IconSparkles },
];

export function StatsBar() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-500">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {value}
              </p>
              <p className="text-sm font-medium text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
