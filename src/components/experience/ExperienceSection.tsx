"use client";

import { useRef } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Experience } from "@/src/types/experience";
import ExperienceTimelineItem from "./ExperienceTimelineItem";
import SectionTitle from "../common/SectionTitle";
import AnimatedGridLine from "./AnimatedGridLine";

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  // 1. Gunakan HTMLDivElement karena ref dipasang di elemen div wrapper
  const timelineRef = useRef<HTMLDivElement>(null);

  if (!experiences.length) return null;

  return (
    <section
      id="experiences"
      className="relative min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 py-24 pb-40"
    >
      <SectionTitle
        title="Experiences"
        subtitle="A journey through my professional, academic, and organizational experiences."
      />

      <div
        ref={timelineRef}
        className="
          relative z-10 mt-10 sm:mt-20
          
          /* --- Global Cleanups --- */
          [&_.vertical-timeline::before]:hidden
          [&_.vertical-timeline-element-content-arrow]:hidden
          [&_.vertical-timeline-element-content]:shadow-none!
          [&_.vertical-timeline-element-content]:bg-transparent!
          
          /* --- Mobile Layout (< 768px) --- */
          /* Hide dot, align content left */
          [&_.vertical-timeline-element-icon]:hidden 
          [&_.vertical-timeline-element-content]:ml-12! 
          [&_.vertical-timeline-element-content]:w-[calc(100%-3rem)]!
          
          /* --- Tablet & Desktop Layout (>= 768px) --- */
          /* Show dot centered */
          md:[&_.vertical-timeline-element-icon]:block 
          md:[&_.vertical-timeline-element-icon]:left-1/2! 
          md:[&_.vertical-timeline-element-icon]:-translate-x-1/2!
          md:[&_.vertical-timeline-element-icon]:ml-0!
          
          /* Reset margins & set width for zig-zag */
          md:[&_.vertical-timeline-element-content]:ml-0! 
          md:[&_.vertical-timeline-element-content]:w-[44%]!
          
          /* Force Zig-Zag Floats (Odd=Left, Even=Right) */
          md:[&_.vertical-timeline-element:nth-child(odd)_.vertical-timeline-element-content]:float-left
          md:[&_.vertical-timeline-element:nth-child(even)_.vertical-timeline-element-content]:float-right
        "
      >
        {/* 2. Fix Type Passing: Force casting untuk menghindari error type mismatch */}
        <AnimatedGridLine
          containerRef={timelineRef as unknown as React.RefObject<HTMLElement>}
        />

        <VerticalTimeline animate={false} lineColor="transparent">
          {experiences.map((exp) => (
            <ExperienceTimelineItem key={exp.id} experience={exp} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
