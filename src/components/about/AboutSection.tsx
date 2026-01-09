"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Smartphone, Sparkles, Award } from "lucide-react";
import ProfileCard from "./ProfileCard";
import InfoItem from "./InfoItem";
import {
  infoContainer,
  infoItem,
  profileReveal,
  sectionContainer,
  textReveal,
  titleFade,
} from "./motion";

/* About Section */

export default function AboutSection() {
  const ref = useRef(null);

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
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-24"
    >
      {/* TITLE */}
      <motion.h2
        variants={titleFade}
        className="
          text-center
          text-4xl md:text-5xl
          font-bold text-white
          mb-12
        "
      >
        About Me
      </motion.h2>

      {/* CONTENT */}
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
          {/* HEADING */}
          <h3 className="text-xl md:text-2xl font-bold text-white text-center md:text-start mb-4">
            Hi, I&apos;m <span className="text-cyan-300">Rhesa</span>
          </h3>

          <p className="text-base md:text-md text-white/80 leading-relaxed mb-4 text-justify">
            I’m an{" "}
            <span className="text-white font-semibold">
              Informatics Engineering student
            </span>{" "}
            at Universitas Brawijaya with a strong focus on{" "}
            <span className="text-white font-semibold">Mobile</span> and{" "}
            <span className="text-white font-semibold">
              Front-End Development
            </span>
            . I’m passionate about transforming ideas and designs into
            functional, responsive, and user-centered applications.
          </p>

          <p className="text-base md:text-md text-white/80 leading-relaxed mb-10 text-justify">
            I enjoy building software that solves real-world problems using{" "}
            <span className="text-white font-semibold">clean architecture</span>
            , maintainable code, and well-crafted interfaces. I’m continuously
            expanding my skills toward{" "}
            <span className="text-white font-semibold">
              full-stack development
            </span>
            , aiming to deliver scalable, end-to-end solutions that balance
            intuitive user experience with solid software engineering practices.
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
                desc="Informatics Engineering, Universitas Brawijaya (2023–Present)"
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
                title="Projects"
                desc="Build more than 9 Mobile & Web Applications"
              />
            </motion.div>

            <motion.div variants={infoItem}>
              <InfoItem
                variants={infoItem}
                icon={<Sparkles />}
                title="Personality"
                desc="Growth-oriented, Detail-oriented, Adaptable, Problem Solver"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
