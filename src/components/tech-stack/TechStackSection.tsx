"use client";

import { motion, Variants, Easing } from "framer-motion";
import TechCard from "../tech-stack/TechCard";
import { techStack } from "@/src/data/techStack";
import SectionTitle from "../common/SectionTitle";

/* Variants */

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

/* Tech Stack Section */
export default function TechStackSection() {
  return (
    <section
      id="stack"
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-24"
    >
      <SectionTitle
        title="Tech Stack"
        subtitle="Tools and technologies I rely on to craft performant and scalable products."
      />

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="
          mx-auto max-w-7xl
          flex flex-wrap justify-center
          gap-6
        "
      >
        {techStack.map((tech) => (
          <motion.div key={tech.name} variants={fadeUp} className="w-40">
            <TechCard {...tech} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
