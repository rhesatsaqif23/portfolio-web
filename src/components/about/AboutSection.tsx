"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Rocket, Code2, BookOpen } from "lucide-react";
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
import { Profile } from "@/src/types/profile";
import { Stat } from "@/src/types/stat";

interface Props {
  profile: Profile | null;
  stats: Stat[];
}

const statConfig: Record<string, { icon: React.ElementType; title: string }> = {
  years_experience: { icon: GraduationCap, title: "Years Experience" },
  projects_shipped: { icon: Rocket, title: "Projects Shipped" },
  technologies_explored: { icon: Code2, title: "Technologies Explored" },
  gpa: { icon: BookOpen, title: "GPA" },
};

export default function AboutSection({ profile, stats }: Props) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 0.15,
    margin: "-10% 0px -10% 0px",
  });

  const displayStats = stats.filter((s) => statConfig[s.key]);

  return (
    <motion.section
      ref={ref}
      id="about"
      variants={sectionContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-16 md:py-24"
    >
      <motion.h2
        variants={titleFade}
        className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12"
      >
        About Me
      </motion.h2>

      <motion.div
        className="
          mx-auto grid max-w-7xl items-center gap-8 md:gap-y-12
          md:grid-cols-[0.75fr_1.5fr] md:gap-x-12 xl:gap-x-8
        "
      >
        <motion.div variants={profileReveal} className="flex justify-center">
          <ProfileCard />
        </motion.div>

        <motion.div variants={textReveal} className="pr-0 md:pr-6 lg:pr-10">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center md:text-start mb-3 md:mb-4">
            Hi, I&apos;m <span className="text-cyan-300">{profile?.fullName?.split(" ")[0] ?? "Rhesa"}</span>
          </h3>

          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-3 md:mb-4 text-justify">
            {profile?.bioLong?.split("\n")[0] ?? "I'm a developer passionate about building great software."}
          </p>

          {profile?.bioLong?.split("\n")[1] && (
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 md:mb-10 text-justify">
              {profile.bioLong.split("\n")[1]}
            </p>
          )}

          <motion.div
            variants={infoContainer}
            className="grid gap-3 md:gap-4 sm:grid-cols-2"
          >
            {displayStats.length > 0
              ? displayStats.map((stat) => {
                const config = statConfig[stat.key];
                const Icon = config.icon;
                return (
                  <motion.div key={stat.key} variants={infoItem}>
                    <InfoItem
                      icon={<Icon />}
                      title={config.title}
                      desc={`${stat.value}`}
                    />
                  </motion.div>
                );
              })
              : [
                { icon: GraduationCap, title: "Education", desc: "Informatics Engineering, Universitas Brawijaya (2023–Present)" },
                { icon: Rocket, title: "Projects", desc: "Building Mobile & Web Applications" },
                { icon: Code2, title: "Main Focus", desc: "Mobile Development, Front-End Development" },
                { icon: BookOpen, title: "GPA", desc: "3.78 / 4.00" },
              ].map((item, i) => (
                <motion.div key={i} variants={infoItem}>
                  <InfoItem icon={<item.icon />} title={item.title} desc={item.desc} />
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
