import AboutSection from "../components/about/AboutSection";
import AchievementSection from "../components/achievements/AchievementSection";
import ContactSection from "../components/contact/ContactSection";
import ExperienceSection from "../components/experience/ExperienceSection";
import Hero from "../components/hero/Hero";
import ProjectSectionHorizontal from "../components/projects/ProjectSectionHorizontal";
import TechStackSection from "../components/tech-stack/TechStackSection";
import { getProfile, getSkills, getExperiences, getProjects, getAchievements, getStats } from "../lib/data";

export default async function Home() {
  const [profile, skills, experiences, projects, achievements, stats] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperiences(),
    getProjects(),
    getAchievements(),
    getStats(),
  ]);

  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <>
      <Hero profile={profile} />
      <AboutSection profile={profile} stats={stats} />
      <TechStackSection skills={skills} />
      <ProjectSectionHorizontal projects={featuredProjects} skills={skills} showViewAll />
      <ExperienceSection experiences={experiences} />
      <AchievementSection achievements={achievements} />
      <ContactSection profile={profile} />
    </>
  );
}
