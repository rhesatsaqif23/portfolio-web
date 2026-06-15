"use client";

import ImageWithFallback from "../common/ImageWithFallback";
import Link from "next/link";
import { ExternalLink, Github, Layers, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/src/types/project";
import ModalPortal from "../common/ModalPortal";

const STORAGE = "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

function storageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${STORAGE}/${path}`;
}

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
            />

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
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="
                  absolute top-4 right-4 z-10
                  p-2 rounded-md
                  border border-white/20
                  bg-white/5
                  text-white/80
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

              <div className="p-6 sm:p-7 space-y-5">
                <header className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    {project.title}
                  </h2>
                </header>

                {project.thumbnailUrl && (
                  <motion.div
                    whileHover={{ scale: 1.045 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                    className="
                      relative aspect-video
                      max-h-50 sm:max-h-60 md:max-h-70
                      rounded-xl overflow-hidden
                      border border-white/10 mx-auto
                      will-change-transform
                    "
                  >
                  <ImageWithFallback
                    src={storageUrl(project.thumbnailUrl)}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                  />
                  </motion.div>
                )}

                <p className="text-sm text-white/90 leading-relaxed">
                  {project.descriptionShort}
                </p>

                <section className="flex flex-wrap gap-2 sm:gap-3">
                  {project.techStacks.map((tech) => (
                    <span
                      key={tech}
                      className="
                        inline-flex items-center gap-2
                        rounded-lg bg-white/5
                        border border-white/15
                        px-3 py-1.5
                        text-xs sm:text-sm text-white/85
                        transition-[transform,background-color,border-color,color]
                        duration-120 ease-out
                        hover:border-cyan-400/70
                        hover:bg-cyan-400/10 hover:text-white
                        hover:scale-[1.05]
                      "
                    >
                      <Layers className="h-4 w-4 text-cyan-300" />
                      {tech}
                    </span>
                  ))}
                </section>

                {project.liveUrl || project.githubUrl ? (
                  <>
                    <div className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

                    <footer className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="
                            inline-flex items-center justify-center gap-3
                            rounded-md bg-white/5 border border-white/20
                            px-6 py-2.5 text-sm font-medium text-white/80
                            transition-[transform,background-color,border-color,color,box-shadow]
                            duration-150 ease-out
                            hover:border-cyan-400 hover:text-cyan-300
                            hover:bg-cyan-400/10
                            hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]
                            hover:scale-[1.03]
                          "
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Live Demo
                        </Link>
                      )}

                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="
                            inline-flex items-center justify-center gap-3
                            rounded-md bg-white/5 border border-white/20
                            px-6 py-2.5 text-sm font-medium text-white/80
                            transition-[transform,background-color,border-color,color,box-shadow]
                            duration-150 ease-out
                            hover:border-cyan-400 hover:text-cyan-300
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
                  </>
                ) : null}
              </div>
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default React.memo(ProjectCardExpanded);
