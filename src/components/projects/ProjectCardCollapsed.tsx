"use client";

import ImageWithFallback from "../common/ImageWithFallback";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/src/types/project";
import useInView from "@/src/hooks/useInView";
import React from "react";

const STORAGE = "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

function storageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${STORAGE}/${path}`;
}

interface Props {
  project: Project;
  onOpen: () => void;
}

function ProjectCardCollapsed({ project, onOpen }: Props) {
  const { ref, visible } = useInView<HTMLDivElement>(0.1);

  return (
    <div ref={ref} className="w-full h-full">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 40,
        }}
        transition={{
          opacity: { duration: 0.35, ease: "easeOut" },
          y: { type: "spring", stiffness: 220, damping: 26, mass: 0.7 },
        }}
        whileHover={{ y: -6, scale: 1.01 }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        onClick={onOpen}
        className="
          group relative w-full h-full rounded-2xl flex flex-col
          border-2 border-white/10
          bg-slate-950/60 backdrop-blur-xl
          overflow-hidden cursor-pointer
          transition-colors duration-300
          hover:border-cyan-400/50
          hover:shadow-[0_12px_48px_rgba(34,211,238,0.15)]
        "
      >
        <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-black/40 group/img">
          {project.thumbnailUrl && (
            <ImageWithFallback
              src={storageUrl(project.thumbnailUrl)}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="p-2 md:p-3 rounded-full border-2 border-white/20 bg-black/40 text-white hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
              >
                <ExternalLink className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="p-2 md:p-3 rounded-full border-2 border-white/20 bg-black/40 text-white hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            )}
          </div>

          {project.category && (
            <span
              className="
                absolute top-3 md:top-4 right-3 md:right-4 z-10
                rounded-full bg-black/70
                border-2 border-white/15
                px-2.5 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-white
                backdrop-blur-md
              "
            >
              {project.category}
            </span>
          )}
        </div>

        <div className="p-4 md:p-5 lg:p-6 flex flex-col gap-3 md:gap-4 flex-grow">
          <div className="flex items-start gap-2">
            <h3 className="text-white font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-3 flex-grow">
            {project.descriptionShort}
          </p>

          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1 md:mt-2">
            {project.techStacks.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/20 bg-white/10 px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-white/95"
              >
                {tech}
              </span>
            ))}
            {project.techStacks.length > 5 && (
              <span className="rounded-full border border-white/15 bg-black/30 px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-white/80">
                +{project.techStacks.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default React.memo(ProjectCardCollapsed);
