"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/src/types/project";
import { container } from "./motion";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectFilterBar from "./ProjectFilterBar";

interface Props {
  projects: Project[];
}

export default function ProjectSection({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-24"
    >
      {/* ================= TITLE ================= */}
      <SectionTitle
        title="Projects"
        subtitle="Selected projects showcasing my experience in mobile and web development."
      />

      {/* ================= FILTER (NAVBAR STYLE) ================= */}
      <ProjectFilterBar
        activeCategory={activeCategory}
        onChange={(val) => {
          setActiveCategory(val);
          setActiveProjectId(null);
        }}
      />

      {/* ================= GRID ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={undefined}
        whileInView="show"
        viewport={{
          once: false,
          amount: 0.25,
          margin: "-120px",
        }}
        className="
          mx-auto max-w-7xl
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={activeProjectId === project.id}
            onOpen={() => setActiveProjectId(project.id)}
            onClose={() => setActiveProjectId(null)}
          />
        ))}
      </motion.div>
    </section>
  );
}
