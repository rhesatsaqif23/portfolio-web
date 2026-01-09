import { Achievement } from "@/src/types/achievement";
import { createServerSupabase } from "../supabase/server";

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }

  return (
    data?.map((item) => ({
      id: item.id,
      title: item.title,
      position: item.position,
      issuer: item.issuer,
      category: item.category,
      description: item.description,
      date: item.date,
      imageUrl: item.image_url,
      credentialUrl: item.credential_url,
      createdAt: item.created_at,
    })) ?? []
  );
}
