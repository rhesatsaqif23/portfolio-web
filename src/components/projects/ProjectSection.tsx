"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/src/types/project";
import { container } from "./motion";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";
import ProjectFilterBar from "./ProjectFilterBar";
import { Skeleton } from "../ui/skeleton";
import Badge from "../common/Badge";
import { Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";

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
        const res = await fetch(`/api/projects?category=${encodeURIComponent(activeCategory)}`);
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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-4 md:mb-6"
      >
        <Badge text="My Projects Showcase" />
      </motion.div>

      <SectionTitle
        title="Selected Projects"
        subtitle="A curated collection of projects I've built across mobile and web development, ranging from full-stack platforms and real-time applications to AI-powered tools and community-driven solutions."
      />

      <ProjectFilterBar
        activeCategory={activeCategory}
        onChange={(val) => {
          setActiveCategory(val);
          setActiveProjectId(null);
        }}
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

      {showViewAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mt-12 md:mt-16 lg:mt-20"
        >
          <Link
            href="/projects"
            className="
              group relative inline-flex items-center justify-center
              overflow-hidden
              rounded-full
              bg-linear-to-r from-cyan-400 to-blue-500
              px-6 md:px-8 lg:px-10 py-3 md:py-3.5 lg:py-4
              font-medium text-black
              text-sm md:text-base lg:text-lg

              shadow-[0_0_18px_rgba(34,211,238,0.45)]
              transition-all duration-300

              hover:px-8 md:hover:px-10 lg:hover:px-12
              hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]

              active:scale-[0.97]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-cyan-400/60
            "
          >
            <span
              className="
                pointer-events-none absolute inset-0
                w-[200%]
                -left-[150%]
                bg-linear-to-r from-transparent via-white/45 to-transparent
                animate-[shine_2.6s_ease-in-out_infinite]
              "
            />

            <span
              className="
                relative z-10 inline-flex items-center gap-2 md:gap-3
                transition-transform duration-300
                group-hover:-translate-x-3
              "
            >
              <Rocket className="h-5 w-5 md:h-6 md:w-6" />
              View All Projects
            </span>

            <ChevronRight
              className="
                pointer-events-none
                absolute right-3 md:right-4 lg:right-5
                h-5 w-5 md:h-6 md:w-6
                opacity-0
                transition-all duration-200
                group-hover:opacity-100
              "
            />
          </Link>
        </motion.div>
      )}
    </section>
  );
}
