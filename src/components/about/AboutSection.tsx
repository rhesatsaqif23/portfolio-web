"use client";

import { motion, Variants, Easing, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Smartphone, Sparkles, Award } from "lucide-react";
import ProfileCard from "./ProfileCard";
import InfoItem from "./InfoItem";

/* ---------------- Animation ---------------- */

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const sectionContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const titleFade: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeOutExpo },
  },
};

const profileReveal: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.15,
      ease: easeOutExpo,
    },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.2,
      ease: easeOutExpo,
    },
  },
};

const infoContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

const infoItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
};

/* ---------------- About Section ---------------- */

export default function AboutSection() {
  const ref = useRef(null);

  // hanya trigger keluar animasi kalau section benar-benar keluar viewport
  const isInView = useInView(ref, {
    amount: 0.15,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.section
      ref={ref}
      id="about"
      variants={sectionContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="
        relative scroll-mt-24 min-h-screen
        px-6 sm:px-10 lg:px-20 xl:px-28 py-4
      "
    >
      {/* ================= TITLE ================= */}
      <motion.h2
        variants={titleFade}
        className="
          text-center
          text-4xl md:text-5xl
          font-bold text-white
          mb-8
        "
      >
        About Me
      </motion.h2>

      {/* ================= CONTENT ================= */}
      <motion.div
        className="
          mx-auto
          grid max-w-7xl items-center
          gap-y-12
          md:grid-cols-[0.75fr_1.5fr]
          md:gap-x-12
          xl:gap-x-8
        "
      >
        {/* Profile */}
        <motion.div variants={profileReveal} className="flex justify-center">
          <ProfileCard />
        </motion.div>

        {/* Text */}
        <motion.div variants={textReveal} className="pr-0 md:pr-6 lg:pr-10">
          <p className="text-lg text-white/80 leading-relaxed mb-4">
            I’m{" "}
            <span className="text-white font-semibold">
              Rhesa Tsaqif Adyatma
            </span>
            , an Informatics Engineering student at{" "}
            <span className="text-cyan-300 font-medium">
              Universitas Brawijaya
            </span>{" "}
            with a strong focus on <span className="text-white">Mobile</span>{" "}
            and <span className="text-white">Front-End Development</span>.
          </p>

          <p className="text-lg text-white/80 leading-relaxed mb-10">
            I specialize in translating ideas and UI/UX designs into functional,
            scalable, and user-centered applications through real-world
            projects, team collaboration, and continuous learning.
          </p>

          {/* Info */}
          <motion.div
            variants={infoContainer}
            className="grid gap-4 md:gap-6 sm:grid-cols-2"
          >
            <motion.div variants={infoItem}>
              <InfoItem
                variants={infoItem}
                icon={<GraduationCap />}
                title="Education"
                desc="Informatics Engineering, Universitas Brawijaya (2023–2027)"
              />
            </motion.div>

            <motion.div variants={infoItem}>
              <InfoItem
                variants={infoItem}
                icon={<Smartphone />}
                title="Main Focus"
                desc="Mobile Development, Front-End Development, Software Engineering"
              />
            </motion.div>

            <motion.div variants={infoItem}>
              <InfoItem
                variants={infoItem}
                icon={<Award />}
                title="GPA"
                desc="3.92 / 4.00"
              />
            </motion.div>

            <motion.div variants={infoItem}>
              <InfoItem
                variants={infoItem}
                icon={<Sparkles />}
                title="Character"
                desc="Ambitious, Fast Learner, Detail-oriented"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
