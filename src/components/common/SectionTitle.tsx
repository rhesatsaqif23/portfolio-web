"use client";

import { motion } from "framer-motion";
import React from "react";
import useInView from "@/src/hooks/useInView";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  const { ref, visible } = useInView<HTMLDivElement>(0.6);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/80 text-md md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
