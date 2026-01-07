import { createServerSupabase } from "../supabase/server";
import { Experience } from "@/src/types/experience";

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }

  return (
    data?.map((item) => ({
      id: item.id,
      title: item.title,
      company: item.company,
      location: item.location,
      startDate: item.start_date,
      endDate: item.end_date,
      description: item.description ?? [],
      image: item.image,
    })) ?? []
  );
}
