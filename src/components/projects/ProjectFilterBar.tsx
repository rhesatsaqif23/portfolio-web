"use client";

import { motion } from "framer-motion";
import React from "react";
import clsx from "clsx";
import { Folder, Globe, Smartphone, ListTodo } from "lucide-react";
import HeroButton from "../hero/HeroButton";

const categories = [
  { label: "All", value: "All", icon: Folder },
  { label: "Web", value: "Web App", icon: Globe },
  { label: "Mobile", value: "Mobile App", icon: Smartphone },
];

interface Props {
  activeCategory: string;
  onChange: (value: string) => void;
  showViewAll?: boolean;
}

export default function ProjectFilterBar({ activeCategory, onChange, showViewAll }: Props) {
  return (
    <div className="relative flex items-center justify-center max-w-7xl mx-auto mb-8 md:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="
            inline-flex items-center gap-2 md:gap-4
            rounded-full
            border border-white/10
            bg-slate-950/60
            backdrop-blur-xl
            px-2 md:px-3 py-1.5 md:py-2
            shadow-2xl shadow-black/40
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
                  "relative flex items-center gap-1.5 md:gap-2 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-md font-medium",
                  "transition-colors duration-200 cursor-pointer",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5",
                )}
              >
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-1.5 md:gap-2 z-10"
                >
                  <Icon
                    className={clsx(
                      "h-3.5 w-3.5 md:h-4 md:w-4",
                      isActive ? "opacity-100" : "opacity-70",
                    )}
                  />
                  <span className="hidden sm:inline">{cat.label}</span>
                </motion.span>

                {isActive && (
                  <motion.span
                    layoutId="project-filter-indicator"
                    className="
                      absolute inset-0 z-0
                      rounded-full
                      bg-linear-to-r
                      from-cyan-400/30
                      to-blue-500/30
                      border border-white/5
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

      {showViewAll && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute right-0"
        >
          <HeroButton
            href="/projects"
            label="View All"
            icon={<ListTodo className="h-4 w-4" />}
            size="sm"
          />
        </motion.div>
      )}
    </div>
  );
}
