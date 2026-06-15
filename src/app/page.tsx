import AboutSection from "../components/about/AboutSection";
import AchievementSection from "../components/achievements/AchievementSection";
import Footer from "../components/common/Footer";
import ContactSection from "../components/contact/ContactSection";
import ExperienceSection from "../components/experience/ExperienceSection";
import Hero from "../components/hero/Hero";
import ProjectSection from "../components/projects/ProjectSection";
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

  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <>
      <Hero profile={profile} />
      <AboutSection profile={profile} stats={stats} />
      <TechStackSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectSection projects={featuredProjects} showViewAll />
      <AchievementSection achievements={achievements} />
      <ContactSection profile={profile} />
      <Footer profile={profile} />
    </>
  );
}
