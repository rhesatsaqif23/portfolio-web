"use client";

import { useRef, useEffect, useState } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/src/types/experience";

interface Props {
  experience: Experience;
}

export default function ExperienceTimelineItem({ experience }: Props) {
  const iconRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Determine slide direction (Mobile: Right, Desktop: Alternating)
  useEffect(() => {
    const el = iconRef.current?.closest(".vertical-timeline-element");
    if (!el) return;
    const index = Array.from(el.parentElement?.children || []).indexOf(el);
    const updateDirection = () => {
      const isMobile = window.innerWidth < 768; // Match md breakpoint
      if (isMobile) {
        setDirection("right");
      } else {
        setDirection(index % 2 === 0 ? "left" : "right"); // Even=Right, Odd=Left logic
      }
    };
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => window.removeEventListener("resize", updateDirection);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <VerticalTimelineElement
      contentStyle={{ padding: 0 }}
      iconStyle={{ background: "transparent", boxShadow: "none" }}
      icon={
        <motion.div
          ref={iconRef}
          initial={{ scale: 0 }}
          animate={visible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex items-center justify-center h-full w-full"
        >
          {/* Dot Indicator */}
          <div className="relative h-5 w-5 md:h-6 md:w-6 rounded-full bg-[#0b1220] border-[3px] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] z-28" />
        </motion.div>
      }
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
        animate={
          visible
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: direction === "left" ? -50 : 50 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ExperienceCard experience={experience} />
      </motion.div>
    </VerticalTimelineElement>
  );
}
