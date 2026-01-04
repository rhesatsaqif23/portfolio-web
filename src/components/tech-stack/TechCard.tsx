"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TechCardProps {
  name: string;
  icon: string;
  color: string;
}

export default function TechCard({ name, icon, color }: TechCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="
        group relative aspect-square
        rounded-2xl
        border-2 border-white/20
        bg-[#0b1220]/85
        backdrop-blur-xl
        flex flex-col items-center justify-center
        gap-4
        overflow-hidden
        transition-colors duration-300
      "
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 0 0 2px ${color}, 0 0 28px ${color}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* CENTER GLOW */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}66, transparent 65%)`,
        }}
      />

      {/* ICON (RESPONSIVE) */}
      <div className="relative w-[42%] aspect-square z-10">
        <Image
          src={icon}
          alt={name}
          fill
          className="
            object-contain
            grayscale
            transition-all duration-300
            group-hover:grayscale-0
            group-hover:scale-110
          "
        />
      </div>

      {/* TEXT */}
      <p className="
        relative z-10
        text-sm
        font-medium
        text-white/75
        transition-colors duration-300
        group-hover:text-white
      ">
        {name}
      </p>
    </motion.div>
  );
}
