"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  variants: Variants;
}

export default function InfoItem({ icon, title, desc }: InfoItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className="
        group relative flex items-start gap-4
        rounded-xl border border-white/15
        bg-white/5 p-4 backdrop-blur-xl
        transition-colors duration-300
        hover:border-cyan-400
        hover:shadow-[0_0_32px_rgba(34,211,238,0.35)]
      "
    >
      {/* Icon */}
      <div
        className="
        relative z-10 text-cyan-300
        transition-transform duration-300
        group-hover:scale-110 group-hover:rotate-[-8deg]
      "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10">
        <p className="text-white font-medium">{title}</p>
        <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
