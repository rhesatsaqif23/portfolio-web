"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Achievement } from "@/src/types/achievement";
import SectionTitle from "../common/SectionTitle";
import AchievementCard from "./AchievementCard";
import { Accordion } from "../ui/accordion";
import { container } from "./motion";

interface Props {
  achievements: Achievement[];
}

export default function AchievementSection({ achievements }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-60px 0px" });

  return (
    <section
      id="achievements"
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-16 md:py-24"
    >
      <SectionTitle
        title="Achievements"
        subtitle="Awards, competitions, and key milestones from my journey."
      />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="mx-auto max-w-4xl"
      >
        <Accordion
          type="multiple"
          className="rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-xl overflow-hidden"
        >
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
