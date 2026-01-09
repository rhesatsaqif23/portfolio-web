"use client";

import { motion } from "framer-motion";
import React from "react";
import clsx from "clsx";
import useInView from "@/src/hooks/useInView";
import { Folder, Globe, Smartphone } from "lucide-react";

const categories = [
  { label: "All", value: "All", icon: Folder },
  { label: "Mobile", value: "Mobile App", icon: Smartphone },
  { label: "Website", value: "Web App", icon: Globe },
];

interface Props {
  activeCategory: string;
  onChange: (value: string) => void;
}

export default function ProjectFilterBar({ activeCategory, onChange }: Props) {
  const { ref, visible } = useInView<HTMLDivElement>(0.6);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 24,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex justify-center mb-12"
    >
      <div
        className="
          flex items-center gap-1
          rounded-full
          border border-white/15
          bg-[#0b1220]/70
          backdrop-blur-xl
          px-3 py-2
          shadow-lg shadow-black/40
        "
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.value;

          return (
            <button
              key={cat.value}
              onClick={() => onChange(cat.value)}
              className={clsx(
                "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
                "transition-colors duration-200 cursor-pointer",
                isActive
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2"
              >
                <Icon
                  className={clsx(
                    "h-4 w-4",
                    isActive ? "opacity-100" : "opacity-70"
                  )}
                />
                <span className="hidden sm:inline">{cat.label}</span>
              </motion.span>

              {isActive && (
                <motion.span
                  layoutId="project-filter-indicator"
                  className="
                    absolute inset-0 -z-10
                    rounded-full
                    bg-linear-to-r
                    from-cyan-400/30
                    to-blue-500/30
                  "
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 38,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
