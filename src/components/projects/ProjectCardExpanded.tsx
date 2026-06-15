"use client";

import ImageWithFallback from "../common/ImageWithFallback";
import Link from "next/link";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroButton from "../hero/HeroButton";
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
                w-[92vw] max-w-5xl
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

              <div className="p-6 sm:p-7 md:p-10 grid md:grid-cols-2 gap-8 md:gap-10 max-h-[85vh] overflow-y-auto">
                {/* Left Column */}
                <div className="flex flex-col space-y-5 md:space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {project.title}
                  </h2>
                  {project.thumbnailUrl && (
                    <div
                      className="
                        relative aspect-video w-full
                        rounded-xl overflow-hidden
                        border border-white/10
                        group/thumb
                      "
                    >
                      <ImageWithFallback
                        src={storageUrl(project.thumbnailUrl)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-105"
                      />
                    </div>
                  )}
                  {/* View Case Study – below image */}
                  {project.slug && (
                    <div className="flex justify-center">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="
                          group relative inline-flex flex-col justify-center
                          text-white/80 transition-all duration-300 py-1 w-fit
                        "
                      >
                        <div className="relative h-[1.6em] overflow-hidden">
                          <div
                            className="
                              flex items-center gap-2 md:gap-3
                              transition-transform duration-200 ease-out
                              group-hover:-translate-y-[40%] group-hover:opacity-0
                              will-change-transform will-change-opacity
                            "
                          >
                            <span className="text-sm md:text-base font-semibold text-white">View Case Study</span>
                            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          </div>
                          <div
                            className="
                              pointer-events-none
                              absolute left-0 top-0 flex items-center gap-2
                              translate-y-[40%] opacity-0
                              group-hover:translate-y-0 group-hover:opacity-100
                              transition-all duration-250 ease-[cubic-bezier(0.25,1,0.3,1)]
                              will-change-transform will-change-opacity
                            "
                          >
                            <span className="text-sm md:text-base font-bold text-cyan-300">View Case Study</span>
                            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-cyan-300" />
                          </div>
                        </div>
                        <div className="h-px w-full bg-cyan-400/0 transition-colors duration-300 group-hover:bg-cyan-400/50 mt-1" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="flex flex-col space-y-6 md:space-y-8 justify-center">
                  <div className="flex items-center gap-3">
                    {project.category && (
                      <span className="inline-flex items-center rounded-full border border-cyan-400/40 px-3 py-1 text-xs md:text-sm font-semibold text-cyan-300 bg-cyan-400/10">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <p className="text-sm md:text-base text-white/90 leading-relaxed">
                    {project.descriptionShort}
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-xs md:text-sm font-semibold text-white uppercase">Tech Stack</h3>
                    <section className="flex flex-wrap gap-2">
                      {project.techStacks.map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-full border border-white/20 bg-white/10 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium text-white
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </section>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                    {project.liveUrl && (
                      <HeroButton
                        href={project.liveUrl}
                        label="View Live Demo"
                        icon={<ExternalLink className="h-4 w-4" />}
                        external={true}
                        size="sm"
                        className="w-full"
                      />
                    )}
                    {project.githubUrl && (
                      <HeroButton
                        href={project.githubUrl}
                        label="View on GitHub"
                        icon={<Github className="h-4 w-4" />}
                        external={true}
                        size="sm"
                        className="w-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          </>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}

export default React.memo(ProjectCardExpanded);
