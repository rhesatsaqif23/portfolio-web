import AboutSection from "../components/about/AboutSection";
import Hero from "../components/Hero";
import TechStackSection from "../components/tech-stack/TechStackSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <TechStackSection />
    </div>
  );
}
