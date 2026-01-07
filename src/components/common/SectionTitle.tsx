"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Masuk ketika cukup terlihat
        if (!visible && entry.intersectionRatio >= 0.6) {
          setVisible(true);
        }

        // Keluar hanya jika BENAR-BENAR tidak terlihat
        if (visible && entry.intersectionRatio === 0) {
          setVisible(false);
        }
      },
      {
        threshold: [0, 0.6],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

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
        <p className="text-white/80 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
