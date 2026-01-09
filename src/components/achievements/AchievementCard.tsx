"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Achievement } from "@/src/types/achievement";
import { resolvePosition } from "@/src/utils/resolvePosition";

interface Props {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const { icon: Icon, label } = resolvePosition(achievement.position);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ENTER
        if (!visible && entry.intersectionRatio >= 0.05) {
          setVisible(true);
        }

        // EXIT (benar-benar keluar layar)
        if (visible && entry.intersectionRatio === 0) {
          setVisible(false);
        }
      },
      {
        threshold: [0, 0.05],
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{
        opacity: {
          duration: visible ? 0.45 : 0.25,
          ease: "easeOut",
        },
        y: {
          type: "spring",
          stiffness: 220,
          damping: 26,
          mass: 0.8,
        },
      }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="
        group relative
        grid grid-cols-[0.15fr_1fr]
        gap-6
        px-6 py-6
        rounded-2xl
        border border-transparent
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:bg-white/8
        hover:backdrop-blur-lg
        hover:border-white/12
        hover:shadow-[0_0_56px_rgba(34,211,238,0.14)]
      "
    >
      {/* LEFT */}
      <div className="relative flex flex-col items-center gap-3 pt-1">
        <div className="relative flex items-center justify-center h-10 w-10">
          <Icon className="h-7 w-7 text-white/85 transition-all duration-500 group-hover:scale-110 group-hover:text-cyan-300" />
          <span className="absolute inset-0 rounded-full blur-lg bg-cyan-400/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <span className="text-md font-medium text-white/90 text-center">
          {label}
        </span>
      </div>

      {/* CONTENT */}
      <div className="space-y-2.5">
        <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-cyan-300 transition-colors">
          {achievement.title}
        </h3>

        <p className="text-white/80">{achievement.issuer}</p>

        {achievement.description && (
          <p className="text-sm text-white/65 leading-relaxed max-w-2xl">
            {achievement.description}
          </p>
        )}

        <div className="pt-3 flex flex-wrap gap-2">
          {achievement.date && (
            <span className="rounded-full border border-white/20 bg-white/6 px-3 py-1 text-xs text-white/75">
              {new Date(achievement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          )}

          {achievement.category && (
            <span className="rounded-full border border-white/20 bg-white/6 px-3 py-1 text-xs text-white/75">
              {achievement.category}
            </span>
          )}
        </div>
      </div>

      <span className="absolute bottom-0 left-6 right-6 h-px bg-white/10 group-hover:opacity-0 transition-opacity" />
    </motion.li>
  );
}
