"use client";

import { motion, Variants, Easing } from "framer-motion";
import { GraduationCap, Smartphone, Sparkles, Award } from "lucide-react";
import ProfileCard from "./ProfileCard";
import InfoItem from "./InfoItem";

/* ---------------- Variants ---------------- */

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
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

const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: easeOutExpo,
    },
  },
};

/* ---------------- About Section ---------------- */

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative min-h-screen
        px-6 sm:px-10 lg:px-20 xl:px-28
        py-24 md:py-28
      "
    >
      {/* ================= TITLE ================= */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.6 }}
        className="
          text-center
          text-4xl md:text-5xl
          font-bold text-white
          mb-10 md:mb-14
        "
      >
        About Me
      </motion.h2>

      {/* ================= CONTENT ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        className="
          mx-auto
          grid max-w-7xl items-center
          gap-y-12
          md:grid-cols-[0.75fr_1.5fr]
          md:gap-x-12
          xl:gap-x-8
        "
      >
        {/* ================= PROFILE CARD (LEFT) ================= */}
        <motion.div
          variants={fadeScale}
          className="flex justify-center"
        >
          <ProfileCard />
        </motion.div>

        {/* ================= TEXT (RIGHT) ================= */}
        <motion.div variants={fadeUp} className="pr-0 md:pr-6 lg:pr-10">
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

          <p className="text-lg text-white/70 leading-relaxed mb-10">
            I specialize in translating ideas and UI/UX designs into functional,
            scalable, and user-centered applications. Through real-world
            projects, competitions, and team collaboration, I continuously
            sharpen both my technical and problem-solving skills.
          </p>

          {/* ================= INFO LIST ================= */}
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
            <InfoItem
              variants={fadeUp}
              icon={<GraduationCap />}
              title="Education"
              desc="Informatics Engineering, Universitas Brawijaya (2023–2027)"
            />
            <InfoItem
              variants={fadeUp}
              icon={<Award />}
              title="GPA"
              desc="3.92 / 4.00"
            />
            <InfoItem
              variants={fadeUp}
              icon={<Smartphone />}
              title="Main Focus"
              desc="Mobile Development, Front-End Development"
            />
            <InfoItem
              variants={fadeUp}
              icon={<Sparkles />}
              title="Character"
              desc="Ambitious, Fast Learner, Detail-oriented"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
