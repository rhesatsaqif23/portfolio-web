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
  size?: "default" | "sm";
}

export default function HeroButton({
  href,
  label,
  icon,
  external,
  shineDelay = "0s",
  size = "default",
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
        size === "default" ? "px-6 py-3 md:px-8 md:py-4" : "px-4 py-2 md:px-5 md:py-2.5",
        "font-medium text-white",
        size === "default" ? "text-sm md:text-base" : "text-xs md:text-sm",
        "transition-all duration-300 ease-out",
        "border-2 border-white/10",
        "bg-slate-950/60 backdrop-blur-xl",
        "hover:border-cyan-400",
        size === "default" ? "hover:px-8 md:hover:px-10" : "hover:px-6 md:hover:px-7",
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

      <span className={clsx("relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:-translate-x-3", size === "sm" && "gap-2")}>
        <span className="text-cyan-400">{icon}</span>
        {label}
      </span>

      <ChevronRight
        className={clsx(
          "absolute",
          size === "default" ? "right-5 md:right-6" : "right-3 md:right-4",
          size === "default" ? "h-5 w-5" : "h-4 w-4",
          "opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400"
        )}
      />
    </motion.a>
  );
}
