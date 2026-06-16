"use client";

import ImageWithFallback from "../common/ImageWithFallback";
import TiltedCard from "../common/TiltedCard";
import { useRouter } from "next/navigation";
import { ExternalLink, Github, ArrowUpRight, Folder, Globe, Smartphone } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Project } from "@/src/types/project";
import { Skill } from "@/src/types/skill";
import HeroButton from "../hero/HeroButton";
import React, { useState } from "react";

const STORAGE =
  "https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public";

function storageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${STORAGE}/${path}`;
}

interface Props {
  project: Project;
  index: number;
  skills: Skill[];
}

function ProjectCardHorizontal({ project, index, skills }: Props) {
  const imageLeft = index % 2 === 0;
  const [cardHovered, setCardHovered] = useState(false);
  const router = useRouter();

  const slugHref = project.slug ? `/projects/${project.slug}` : "#";

  function handleCardClick() {
    if (project.slug) router.push(slugHref);
  }

  function handleCardKeyDown(e: React.KeyboardEvent) {
    if ((e.key === "Enter" || e.key === " ") && project.slug) {
      e.preventDefault();
      router.push(slugHref);
    }
  }

  const skillMap = React.useMemo(() => {
    const map = new Map<string, string | null>();
    skills.forEach((s) => map.set(s.name, s.iconUrl));
    return map;
  }, [skills]);

  const thumbnailSrc = project.thumbnailUrl
    ? storageUrl(project.thumbnailUrl)
    : "/images/fallback-icon.png";

  const categoryIcons: Record<string, React.ElementType> = {
    "Web App": Globe,
    "Mobile App": Smartphone,
  };
  const CategoryIcon = categoryIcons[project.category ?? ""] ?? Folder;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="w-full">
      <div
        role="link"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className="block cursor-pointer"
      >
        <motion.article
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => setCardHovered(false)}
          className={`
            relative w-full
            rounded-2xl
            backdrop-blur-xl
          `}
        >
          {/* Background gradient from image side */}
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
              imageLeft
                ? "bg-gradient-to-l from-slate-900/95 via-slate-950/80 to-slate-950/40"
                : "bg-gradient-to-r from-slate-900/95 via-slate-950/80 to-slate-950/40"
            }`}
          />

          <div
            className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${
              imageLeft ? "" : "md:[direction:rtl]"
            }`}
          >
            {/* ── Image Side ── */}
            <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[400px] [direction:ltr] flex items-center justify-center">
              <div className="relative w-full h-full block">
                <TiltedCard
                  imageSrc={thumbnailSrc}
                  altText={project.title}
                  captionText={project.title}
                  containerHeight="100%"
                  containerWidth="100%"
                  rotateAmplitude={2}
                  scaleOnHover={1.02}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
            </div>

            {/* ── Info Side ── */}
            <div className="flex flex-col justify-center p-5 md:p-7 lg:p-8 gap-3 md:gap-4 [direction:ltr]">
              {/* Title with cyan + arrow on card hover */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
                <h3
                  className={`font-bold text-2xl md:text-3xl lg:text-[2rem] leading-tight transition-colors duration-300 ${
                    cardHovered ? "text-cyan-300" : "text-white"
                  }`}
                >
                  {project.title}
                </h3>
                <ArrowUpRight
                  className={`h-5 w-5 md:h-6 md:w-6 shrink-0 transition-all duration-300 ${
                    cardHovered
                      ? "text-cyan-300 opacity-100 translate-x-0"
                      : "text-cyan-300 opacity-0 -translate-x-2"
                  }`}
                />
              </motion.div>

              {/* Category */}
              {project.category && (
                <motion.span variants={itemVariants} className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-white/90">
                  <CategoryIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  {project.category}
                </motion.span>
              )}

              {/* Description */}
              <motion.p variants={itemVariants} className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-4">
                {project.descriptionShort}
              </motion.p>

              {/* Tech stack badges with icons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 md:gap-2">
                {project.techStacks.map((tech) => {
                  const iconUrl = skillMap.get(tech);
                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 pl-0.5 pr-2.5 md:pl-1 md:pr-3 py-0.5 md:py-1"
                    >
                      <span className="relative h-5 w-5 md:h-6 md:w-6 shrink-0 rounded-sm overflow-hidden">
                        <ImageWithFallback
                          src={iconUrl ? storageUrl(iconUrl) : "/images/fallback-icon.png"}
                          alt={tech}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </span>
                      <span className="text-[10px] md:text-xs font-medium text-white/90">
                        {tech}
                      </span>
                    </span>
                  );
                })}
              </motion.div>

              {/* Buttons below tech stack */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                {project.liveUrl && (
                  <HeroButton
                    href={project.liveUrl}
                    label="View Live Demo"
                    icon={<ExternalLink className="h-4 w-4" />}
                    external={true}
                    size="sm"
                    className="max-w-[220px]"
                  />
                )}
                {project.githubUrl && (
                  <HeroButton
                    href={project.githubUrl}
                    label="View on GitHub"
                    icon={<Github className="h-4 w-4" />}
                    external={true}
                    size="sm"
                    className="max-w-[220px]"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default React.memo(ProjectCardHorizontal);
