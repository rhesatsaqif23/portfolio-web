"use client";

import { useRef, useEffect, useState } from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion, useInView } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "@/src/types/experience";

interface Props {
  experience: Experience;
}

export default function ExperienceTimelineItem({ experience }: Props) {
  const iconRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(iconRef, { amount: 0.25, once: false });

  const hasAnimatedRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Tentukan arah animasi (berdasarkan urutan odd/even)
  useEffect(() => {
    const el = iconRef.current?.closest(".vertical-timeline-element");
    if (!el) return;

    const index = Array.from(el.parentElement?.children || []).indexOf(el);
    const updateDirection = () => {
      const isMobile = window.innerWidth < 1170;
      const dir = isMobile ? "right" : index % 2 === 0 ? "left" : "right";
      setDirection(dir);
    };

    requestAnimationFrame(updateDirection);
    window.addEventListener("resize", updateDirection);

    return () => window.removeEventListener("resize", updateDirection);
  }, []);

  // ENTER
  useEffect(() => {
    if (!inView) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  // EXIT (saat 100% keluar layar)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const fullyOut = rect.bottom <= 0 || rect.top >= window.innerHeight;
      if (fullyOut) {
        requestAnimationFrame(() => setVisible(false));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Garis timeline (hanya sekali)
  useEffect(() => {
    const timeline = document.querySelector(".vertical-timeline");
    if (!timeline) return;
    if (inView && !hasAnimatedRef.current) {
      timeline.classList.add("animate-line");
      hasAnimatedRef.current = true;
    }
  }, [inView]);

  // Overlap antar card
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

  useEffect(() => {
    calculateOverlap();
    const handleResize = () => calculateOverlap();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
              h-3.5 w-3.5 md:h-4 md:w-4
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
