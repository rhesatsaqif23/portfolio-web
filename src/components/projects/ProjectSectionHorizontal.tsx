"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "@/src/types/project";
import { Skill } from "@/src/types/skill";
import SectionTitle from "../common/SectionTitle";
import ProjectCardHorizontal from "./ProjectCardHorizontal";
import ProjectFilterBar from "./ProjectFilterBar";
import { Skeleton } from "../ui/skeleton";
import { Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";

function HorizontalSkeletonCard() {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-950/60 backdrop-blur-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[400px] bg-black/40">
          <Skeleton className="absolute inset-0 rounded-none" />
        </div>
        <div className="flex flex-col justify-center p-5 md:p-7 lg:p-8 gap-4 md:gap-5">
          <Skeleton className="h-7 w-3/4 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  projects: Project[];
  skills: Skill[];
  showViewAll?: boolean;
}

export default function ProjectSectionHorizontal({ projects, skills, showViewAll }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
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
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 pt-12 md:pt-16 pb-16 md:pb-20"
    >
      <SectionTitle
        title="Projects"
        subtitle="Selected projects showcasing my experience in mobile and web development."
      />

      <ProjectFilterBar
        activeCategory={activeCategory}
        onChange={(val) => setActiveCategory(val)}
      />

      <div className="mx-auto max-w-7xl flex flex-col gap-12 md:gap-16">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <HorizontalSkeletonCard key={i} />
          ))
        ) : displayProjects.length > 0 ? (
          displayProjects.map((project, index) => (
            <ProjectCardHorizontal
              key={project.id}
              project={project}
              index={index}
              skills={skills}
            />
          ))
        ) : (
          <div className="text-center text-white/60 py-12 md:py-16">
            No projects in this category yet.
          </div>
        )}
      </div>

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
