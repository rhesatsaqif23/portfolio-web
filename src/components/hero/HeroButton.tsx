"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface HeroButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  shineDelay?: string; // Tambahkan prop ini
}

export default function HeroButton({
  href,
  label,
  icon,
  external,
  shineDelay = "0s",
}: HeroButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "group relative inline-flex items-center justify-center",
        "overflow-hidden rounded-full",
        "px-6 py-3 md:px-8 md:py-4",
        "text-sm md:text-base font-medium text-white",
        "transition-all duration-300 ease-out",
        "border-2 border-white/10",
        "bg-slate-950/60 backdrop-blur-xl",
        "hover:border-cyan-400",
        "hover:px-8 md:hover:px-10",
      )}
    >
      {/* SHINY EFFECT dengan animation-delay */}
      <span
        className="
          pointer-events-none absolute inset-0
          w-[200%] -left-[150%]
          bg-linear-to-r from-transparent via-white/20 to-transparent
          animate-[shine_4s_ease-in-out_infinite]
        "
        style={{ animationDelay: shineDelay }}
      />

      <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-3">
        <span className="text-cyan-400">{icon}</span>
        {label}
      </span>

      <ChevronRight
        className="
          absolute right-5 md:right-6
          h-5 w-5
          opacity-0 -translate-x-2
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0
          text-cyan-400
        "
      />
    </motion.a>
  );
}
