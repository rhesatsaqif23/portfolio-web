import { createClient } from "@supabase/supabase-js";
import { Profile } from "@/src/types/profile";
import { Skill } from "@/src/types/skill";
import { Experience } from "@/src/types/experience";
import { Project } from "@/src/types/project";
import { Achievement } from "@/src/types/achievement";
import { Stat } from "@/src/types/stat";

function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .single();
  if (!data) return null;
  return {
    id: data.id,
    fullName: data.full_name,
    currentRole: data.current_role,
    currentRoles: data.current_roles ?? [],
    bioShort: data.bio_short,
    bioLong: data.bio_long,
    avatarUrl: data.avatar_url,
    cvUrl: data.cv_url,
    location: data.location,
    email: data.email,
    github: data.github,
    linkedin: data.linkedin,
    instagram: data.instagram,
  };
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    iconUrl: s.icon_url,
    sortOrder: s.sort_order,
  }));
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map((e) => ({
    id: e.id,
    orgName: e.org_name,
    role: e.role,
    startDate: e.start_date,
    endDate: e.end_date,
    description: e.description ?? [],
    type: e.type,
    imageUrl: e.image_url,
    sortOrder: e.sort_order,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProject(p: any): Project {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    descriptionShort: p.description_short,
    thumbnailUrl: p.thumbnail_url,
    techStacks: p.tech_stacks ?? [],
    isFeatured: p.is_featured ?? false,
    category: p.category,
    githubUrl: p.github_url,
    liveUrl: p.live_url,
    additionalLinks: p.additional_links,
    sortOrder: p.sort_order,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map(mapProject);
}

export async function getProjectsByCategory(category: string, max: number = 8): Promise<Project[]> {
  const supabase = createSupabaseClient();
  let query = supabase.from("projects").select("*").order("sort_order", { ascending: true });
  
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  
  if (max) {
    query = query.limit(max);
  }
  
  const { data } = await query;
  return (data ?? []).map(mapProject);
}

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    eventName: a.event_name,
    organizer: a.organizer,
    date: a.date,
    description: a.description,
    url: a.url,
    sortOrder: a.sort_order,
    category: a.category ?? null,
  }));
}

export async function getStats(): Promise<Stat[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []).map((s) => ({
    id: s.id,
    key: s.key,
    value: s.value,
    category: s.category,
    subValue: s.sub_value,
    icon: s.icon,
    sortOrder: s.sort_order,
  }));
}
