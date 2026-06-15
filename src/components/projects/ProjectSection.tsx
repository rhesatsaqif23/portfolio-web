"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/src/types/project";
import { container } from "./motion";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectFilterBar from "./ProjectFilterBar";
import { Skeleton } from "../ui/skeleton";

function ProjectSkeletonCard() {
  return (
    <div className="w-full h-full">
      <article className="relative w-full h-full rounded-2xl flex flex-col border-2 border-white/10 bg-slate-950/60 backdrop-blur-xl overflow-hidden">
        <Skeleton className="h-56 sm:h-64 lg:h-72 w-full rounded-none" />
        <div className="p-4 md:p-5 lg:p-6 flex flex-col gap-3 md:gap-4 flex-grow">
          <Skeleton className="h-6 md:h-7 w-3/4 rounded-md" />
          <div className="space-y-2 mt-1 flex-grow">
            <Skeleton className="h-3 md:h-4 w-full" />
            <Skeleton className="h-3 md:h-4 w-5/6" />
            <Skeleton className="h-3 md:h-4 w-4/6" />
          </div>
          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        </div>
      </article>
    </div>
  );
}

interface Props {
  projects: Project[];
  showViewAll?: boolean;
}

export default function ProjectSection({ projects, showViewAll }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [fetchedProjects, setFetchedProjects] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeCategory === "All") {
      setFetchedProjects(null);
      return;
    }

    let isMounted = true;
    const fetchCategoryProjects = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/projects?category=${encodeURIComponent(activeCategory)}&limit=8`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (isMounted) {
          setFetchedProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch category projects", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategoryProjects();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const displayProjects = activeCategory === "All" ? projects : (fetchedProjects ?? []);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-16 md:py-24"
    >
      <SectionTitle
        title="Projects"
        subtitle="Selected projects showcasing my experience in mobile and web development."
      />

      <ProjectFilterBar
        activeCategory={activeCategory}
        onChange={(val) => {
          setActiveCategory(val);
          setActiveProjectId(null);
        }}
        showViewAll={showViewAll}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: false,
          amount: 0.25,
          margin: "-120px",
        }}
        className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProjectSkeletonCard key={i} />
          ))
        ) : displayProjects.length > 0 ? (
          displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeProjectId === project.id}
              onOpen={() => setActiveProjectId(project.id)}
              onClose={() => setActiveProjectId(null)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-white/40 py-12 md:py-16">
            No projects in this category yet.
          </div>
        )}
      </motion.div>
    </section>
  );
}
