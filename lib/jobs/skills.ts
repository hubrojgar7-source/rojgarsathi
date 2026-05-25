/** Comma-separated skills string → trimmed unique list for display. */
export function parseSkills(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return [];
  const seen = new Set<string>();
  const list: string[] = [];
  for (const part of raw.split(",")) {
    const skill = part.trim();
    if (!skill) continue;
    const key = skill.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    list.push(skill);
  }
  return list;
}

export function normalizeSkillsInput(raw: string): string {
  return parseSkills(raw).join(", ");
}
