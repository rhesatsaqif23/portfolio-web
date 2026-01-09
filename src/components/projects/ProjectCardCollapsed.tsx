"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/src/types/project";
import { supabaseImage } from "@/src/utils/supabaseImage";
import { useEffect, useRef, useState } from "react";

interface Props {
  project: Project;
  onOpen: () => void;
}

export default function ProjectCardCollapsed({ project, onOpen }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!visible && entry.intersectionRatio >= 0.1) {
          setVisible(true);
        }
        if (visible && entry.intersectionRatio === 0) {
          setVisible(false);
        }
      },
      { threshold: [0, 0.1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{
        opacity: { duration: 0.35, ease: "easeOut" },
        y: {
          type: "spring",
          stiffness: 220,
          damping: 26,
          mass: 0.7,
        },
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="
        group relative w-full rounded-2xl
        border-2 border-white/20
        bg-white/5 backdrop-blur-xl
        overflow-hidden
        transition-colors duration-300
        hover:border-cyan-400
        hover:shadow-[0_12px_48px_rgba(34,211,238,0.35)]
      "
    >
      {/* THUMB */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={supabaseImage(project.thumbnailUrl || "", 1200)}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {project.category && (
          <span
            className="
            absolute top-4 right-4
            rounded-full bg-slate-900/80
            border border-white/20
            px-3 py-1 text-xs text-white/80
          "
          >
            {project.category}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* TITLE */}
        <div className="flex items-start gap-2">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {project.title}
          </h3>
          {project.isFeatured && (
            <Star className="h-4 w-4 text-cyan-300 mt-1 shrink-0" />
          )}
        </div>

        <p className="text-white/75 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* ACTION BAR */}
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={onOpen}
            className="
              group/viewmore flex-1 inline-flex items-center justify-center gap-2
              rounded-xl border border-white/20 bg-white/5
              px-4 py-2 text-sm font-medium text-cyan-300
              transition-all duration-300 cursor-pointer
              hover:border-cyan-400 hover:bg-cyan-400/10 hover:scale-[1.03]
              hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]
            "
          >
            View More
            <ArrowRight className="h-4 w-4 transition-transform group-hover/viewmore:translate-x-1" />
          </button>

          <div className="flex gap-2">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="group/icon p-2 rounded-xl border border-white/20 bg-white/5
                           text-white/70 transition-all duration-300
                           hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10
                           hover:scale-[1.08] hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4 group-hover/icon:rotate-[-8deg]" />
              </Link>
            )}

            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                className="group/icon p-2 rounded-xl border border-white/20 bg-white/5
                           text-white/70 transition-all duration-300
                           hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10
                           hover:scale-[1.08] hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4 group-hover/icon:rotate-[-8deg]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
