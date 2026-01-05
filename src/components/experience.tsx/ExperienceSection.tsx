"use client";

import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Experience } from "@/src/types/experience";
import ExperienceTimelineItem from "./ExperienceTimelineItem";
import SectionTitle from "../common/SectionTitle";

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  if (!experiences.length) return null;

  return (
    <section id="experiences" className="relative py-28 px-6 md:px-20 lg:px-28">
      <SectionTitle
        title="Experiences"
        subtitle="A journey through my professional, academic, and organizational experiences."
      />

      <VerticalTimeline lineColor="rgba(34,211,238,0.35)">
        {experiences.map((exp) => (
          <ExperienceTimelineItem key={exp.id} experience={exp} />
        ))}
      </VerticalTimeline>
    </section>
  );
}
