"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Layers, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/src/types/project";
import { supabaseImage } from "@/src/utils/supabaseImage";
import { techStack } from "@/src/data/techStack";
import ModalPortal from "../common/ModalPortal";

const techMap = Object.fromEntries(
  techStack.map((t) => [t.name.toLowerCase(), t])
);

interface Props {
  project: Project;
  isActive: boolean;
  onClose: () => void;
}

import React from "react";

function ProjectCardExpanded({ project, isActive, onClose }: Props) {
  return (
    <ModalPortal>
      <AnimatePresence>
        {isActive && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            />

            {/* MODAL */}
            <motion.article
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                fixed z-50
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[92vw] max-w-2xl
                rounded-2xl
                border border-white/15
                bg-slate-900/90 backdrop-blur-xl
                overflow-hidden
                will-change-transform
              "
            >
              {/* CLOSE */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="
                  absolute top-4 right-4 z-10
                  p-2 rounded-lg
                  border border-white/20
                  bg-white/5
                  text-white/70
                  cursor-pointer

                  transition-[transform,background-color,border-color,color]
                  duration-150 ease-out
                  hover:text-white
                  hover:border-white/80
                  hover:bg-white/10
                  hover:scale-110
                  active:scale-95
                "
              >
                <X className="h-4 w-4" />
              </button>

              {/* CONTENT */}
              <div className="p-6 sm:p-7 space-y-5">
                {/* TITLE */}
                <header className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-base text-white/80">
                      {project.subtitle}
                    </p>
                  )}
                </header>

                {/* IMAGE */}
                <motion.div
                  whileHover={{ scale: 1.045 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className="
                    relative
                    aspect-video
                    max-h-50 sm:max-h-60 md:max-h-70
                    rounded-xl
                    overflow-hidden
                    border border-white/10
                    mx-auto
                    will-change-transform
                  "
                >
                  <Image
                    src={supabaseImage(project.thumbnailUrl || "", 1200)}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-center"
                  />

                  {/* overlay */}
                  <div
                    className="
                    pointer-events-none
                    absolute inset-0
                    bg-black/0
                    transition-colors duration-150
                    hover:bg-black/20
                  "
                  />
                </motion.div>

                {/* DESCRIPTION */}
                <p className="text-sm text-white/90 leading-relaxed">
                  {project.description}
                </p>

                {/* TECH STACK */}
                <section className="flex flex-wrap gap-2 sm:gap-3">
                  {project.techStack.map((tech) => {
                    const t = techMap[tech.toLowerCase()];
                    return (
                      <span
                        key={tech}
                        className="
                          inline-flex items-center gap-2
                          rounded-lg
                          bg-white/5
                          border border-white/15
                          px-3 py-1.5
                          text-xs sm:text-sm text-white/85

                          transition-[transform,background-color,border-color,color]
                          duration-120 ease-out
                          hover:border-cyan-400/70
                          hover:bg-cyan-400/10
                          hover:text-white
                          hover:scale-[1.05]
                        "
                      >
                        {t ? (
                          <Image
                            src={t.icon}
                            alt={t.name}
                            width={16}
                            height={16}
                          />
                        ) : (
                          <Layers className="h-4 w-4 text-cyan-300" />
                        )}
                        {tech}
                      </span>
                    );
                  })}
                </section>

                {/* DIVIDER */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

                {/* ACTIONS */}
                <footer className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="
                        inline-flex items-center justify-center gap-3
                        rounded-xl
                        bg-white/5
                        border border-white/20
                        px-6 py-2.5
                        text-sm font-medium text-white/80

                        transition-[transform,background-color,border-color,color,box-shadow]
                        duration-150 ease-out
                        hover:border-cyan-400
                        hover:text-cyan-300
                        hover:bg-cyan-400/10
                        hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]
                        hover:scale-[1.03]
                      "
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Demo
                    </Link>
                  )}

                  {project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      className="
                        inline-flex items-center justify-center gap-3
                        rounded-xl
                        bg-white/5
                        border border-white/20
                        px-6 py-2.5
                        text-sm font-medium text-white/80

                        transition-[transform,background-color,border-color,color,box-shadow]
                        duration-150 ease-out
                        hover:border-cyan-400
                        hover:text-cyan-300
                        hover:bg-cyan-400/10
                        hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]
                        hover:scale-[1.03]
                      "
                    >
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </Link>
                  )}
                </footer>
              </div>
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default React.memo(ProjectCardExpanded);
