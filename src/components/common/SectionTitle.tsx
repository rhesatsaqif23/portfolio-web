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

  // ENTER: muncul saat 60% terlihat
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // EXIT: sembunyikan kalau benar-benar keluar layar
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const fullyOut = rect.bottom <= 0 || rect.top >= window.innerHeight;
      if (fullyOut) setVisible(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        visible
          ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            }
          : { opacity: 0, y: 40, transition: { duration: 0 } }
      }
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
