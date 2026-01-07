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

export default function ProjectCardExpanded({
  project,
  isActive,
  onClose,
}: Props) {
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
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            />

            {/* MODAL */}
            <motion.article
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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

                    transition-all duration-200 ease-out
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

                {/* IMAGE – 16:9 COVER */}
                <div
                  className="
                        relative
                        aspect-video
                        max-h-50 sm:max-h-60 md:max-h-70
                        rounded-xl
                        overflow-hidden
                        border border-white/10
                        mx-auto
                    "
                >
                  <Image
                    src={supabaseImage(project.thumbnailUrl || "", 1200)}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>

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
                            cursor-default

                            transition-all duration-150 ease-out
                            hover:border-cyan-400/70
                            hover:bg-cyan-400/10
                            hover:text-white
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
                <div className="pt-1">
                  <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </div>

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
                        transition-all duration-300
                        hover:border-cyan-400
                        hover:text-cyan-300
                        hover:bg-cyan-400/10
                        hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
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
                        transition-all duration-300
                        hover:border-cyan-400
                        hover:text-cyan-300
                        hover:bg-cyan-400/10
                        hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
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
