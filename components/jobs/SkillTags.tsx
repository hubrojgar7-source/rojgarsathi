import { parseSkills } from "@/lib/jobs/skills";

type Props = {
  skills: string | null | undefined;
  size?: "sm" | "md";
};

export function SkillTags({ skills, size = "md" }: Props) {
  const list = parseSkills(skills);
  if (list.length === 0) return null;

  const pill =
    size === "sm"
      ? "rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-800"
      : "rounded-xl bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-800";

  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((skill) => (
        <li key={skill} className={pill}>
          {skill}
        </li>
      ))}
    </ul>
  );
}
