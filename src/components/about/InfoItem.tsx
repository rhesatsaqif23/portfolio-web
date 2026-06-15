"use client";

import { motion } from "framer-motion";

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function InfoItem({ icon, title, desc }: InfoItemProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{
        y: { type: "spring", stiffness: 220, damping: 26, mass: 0.7 },
      }}
      className="
        group relative flex items-center justify-between gap-3 md:gap-4
        rounded-2xl border-2 border-white/10
        bg-slate-950/60 p-4 md:p-5 backdrop-blur-xl
        transition-all duration-300
        hover:border-cyan-400/50
        hover:shadow-[0_12px_48px_rgba(34,211,238,0.15)]
      "
    >
      <div className="flex items-center gap-3 md:gap-5 z-10">
        <div
          className="
            text-cyan-300
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-[-8deg]
          "
        >
          {icon}
        </div>
        <p className="text-white/90 font-medium text-sm md:text-base">{title}</p>
      </div>

      <div className="relative z-10 text-right max-w-[50%]">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight drop-shadow-sm leading-none">{desc}</p>
      </div>
    </motion.div>
  );
}
