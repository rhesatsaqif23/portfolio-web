import { Project } from "@/src/types/project";
import { createServerSupabase } from "../supabase/server";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return (
    data?.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      subtitle: item.subtitle,
      category: item.category,
      description: item.description,
      thumbnailUrl: item.thumbnail_url,
      demoUrl: item.demo_url,
      repoUrl: item.repo_url,
      techStack: item.tech_stack ?? [],
      isFeatured: item.is_featured,
      createdAt: item.created_at,
    })) ?? []
  );
}
