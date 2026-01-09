"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/src/types/achievement";
import SectionTitle from "../common/SectionTitle";
import AchievementCard from "./AchievementCard";
import { container } from "./motion";

interface Props {
  achievements: Achievement[];
}

export default function AchievementSection({ achievements }: Props) {
  return (
    <section
      id="achievements"
      className="
        relative
        scroll-mt-16
        py-12
        px-4
        sm:px-6
        md:px-20
        lg:px-28
      "
    >
      <SectionTitle
        title="Achievements"
        subtitle="Awards, competitions, and key milestones from my journey."
      />

      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="
            mx-auto max-w-4xl
            flex flex-col
            divide-y divide-white/10
        "
      >
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </motion.ul>
    </section>
  );
}
