import { Profile } from "@/src/types/profile";
import { Skill } from "@/src/types/skill";
import { Experience } from "@/src/types/experience";
import { Project } from "@/src/types/project";
import { Achievement } from "@/src/types/achievement";
import { Stat } from "@/src/types/stat";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [] as unknown as T;
  return res.json();
}

export function fetchProfile(): Promise<Profile | null> {
  return fetchJson<Profile | null>(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/profile`,
  );
}

export function fetchSkills(): Promise<Skill[]> {
  return fetchJson<Skill[]>(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/skills`);
}

export function fetchExperiences(): Promise<Experience[]> {
  return fetchJson<Experience[]>(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/experiences`,
  );
}

export function fetchProjects(): Promise<Project[]> {
  return fetchJson<Project[]>(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/projects`,
  );
}

export function fetchAchievements(): Promise<Achievement[]> {
  return fetchJson<Achievement[]>(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/achievements`,
  );
}

export function fetchStats(): Promise<Stat[]> {
  return fetchJson<Stat[]>(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/stats`);
}
