import AboutSection from "../components/about/AboutSection";
import ExperienceSection from "../components/experience.tsx/ExperienceSection";
import Hero from "../components/hero/Hero";
import TechStackSection from "../components/tech-stack/TechStackSection";
import { createServerSupabase } from "../lib/supabase/server";
import { Experience } from "../types/experience";

export default async function Home() {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  const experiences: Experience[] =
    data?.map((item) => ({
      id: item.id,
      title: item.title,
      company: item.company,
      location: item.location,
      startDate: item.start_date,
      endDate: item.end_date,
      description: item.description ?? [],
      image: item.image,
    })) ?? [];

    console.log("SERVER experiences:", data);

  return (
    <div>
      <Hero />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection experiences={experiences} />
    </div>
  );
}
