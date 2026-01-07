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

  const hasAnimatedLine = useRef(false);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  /* DETERMINE DIRECTION */
  useEffect(() => {
    const el = iconRef.current?.closest(".vertical-timeline-element");
    if (!el) return;

    const index = Array.from(el.parentElement?.children || []).indexOf(el);

    const updateDirection = () => {
      const isMobile = window.innerWidth < 1170;
      setDirection(isMobile ? "right" : index % 2 === 0 ? "left" : "right");
    };

    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => window.removeEventListener("resize", updateDirection);
  }, []);

  /* REPEATABLE VISIBILITY (100% out = hide) */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // true jika ADA bagian card di viewport
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0, // 0% terlihat pun masih dianggap visible
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* TIMELINE LINE ANIMATION (only once) */
  useEffect(() => {
    if (!visible || hasAnimatedLine.current) return;
    const timeline = document.querySelector(".vertical-timeline");
    timeline?.classList.add("animate-line");
    hasAnimatedLine.current = true;
  }, [visible]);

  /* OVERLAP BETWEEN CARDS */
  useEffect(() => {
    const calculateOverlap = () => {
      const element = iconRef.current?.closest(
        ".vertical-timeline-element"
      ) as HTMLElement;
      if (!element) return;

      const prev = element.previousElementSibling as HTMLElement;
      if (!prev) return;

      const prevCard = prev.querySelector(
        ".vertical-timeline-element-content"
      ) as HTMLElement;
      if (!prevCard) return;

      const prevHeight = prevCard.offsetHeight;
      const isMobile = window.innerWidth < 1170;
      const overlap = isMobile ? 0 : Math.min(prevHeight * 0.6, 400);

      element.style.marginTop = `-${overlap}px`;
    };

    calculateOverlap();
    window.addEventListener("resize", calculateOverlap);
    return () => window.removeEventListener("resize", calculateOverlap);
  }, []);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255,255,255,0.25)",
      }}
      iconStyle={{
        background: "transparent",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      icon={
        <motion.div
          ref={iconRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            visible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.5 }
          }
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center h-5 w-5"
        >
          <div
            className="
              absolute inset-0 rounded-full bg-cyan-400/20 blur-md
              opacity-0 group-hover:opacity-100
              transition-all duration-700
            "
          />
          <div
            className="
              relative flex items-center justify-center
              h-4 w-4 md:h-5 md:w-5
              rounded-full bg-cyan-400
              shadow-[0_0_8px_rgba(34,211,238,0.6)]
              hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]
              hover:scale-125
              transition-all duration-500
            "
          >
            <span
              className="
                absolute inset-0 rounded-full
                bg-linear-to-tr from-cyan-300 to-cyan-500
                opacity-40
              "
            />
          </div>
        </motion.div>
      }
    >
      <motion.div
        ref={cardRef}
        initial={{
          opacity: 0,
          x: direction === "left" ? -120 : 120,
        }}
        animate={
          visible
            ? {
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 25,
                },
              }
            : {
                opacity: 0,
                x: direction === "left" ? -120 : 120,
                transition: { duration: 0 },
              }
        }
      >
        <ExperienceCard experience={experience} />
      </motion.div>
    </VerticalTimelineElement>
  );
}
