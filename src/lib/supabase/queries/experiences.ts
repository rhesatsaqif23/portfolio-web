import { Experience } from "@/src/types/experience";
import { supabase } from "../client";

export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data;
}
