import AboutSection from "../components/about/AboutSection";
import AchievementSection from "../components/achievements/AchievementSection";
import Footer from "../components/common/Footer";
import ContactSection from "../components/contact/ContactSection";
import ExperienceSection from "../components/experience.tsx/ExperienceSection";
import Hero from "../components/hero/Hero";
import ProjectSection from "../components/projects/ProjectSection";
import TechStackSection from "../components/tech-stack/TechStackSection";
import { getAchievements } from "../lib/db/achievements";
import { getExperiences } from "../lib/db/experiences";
import { getProjects } from "../lib/db/projects";

export default async function Home() {
  const [experiences, projects, achievements] = await Promise.all([
    getExperiences(),
    getProjects(),
    getAchievements(),
  ]);

  return (
    <>
      <Hero />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection experiences={experiences} />
      <ProjectSection projects={projects} />
      <AchievementSection achievements={achievements} />
      <ContactSection />
      <Footer />
    </>
  );
}
