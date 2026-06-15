"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import BlurText from "../common/BlurText";
import HeroSocials from "./HeroSocials";
import HeroActions from "./HeroActions";
import { containerVariants, fadeUpVariants } from "./motion";
import TypingEffect from "../kokonutui/type-writer";
import Badge from "../common/Badge";
import { Profile } from "@/src/types/profile";

const DecorBackground = dynamic(() => import("../common/DecorBackground"), {
  ssr: false,
});

interface Props {
  profile: Profile | null;
}

export default function Hero({ profile }: Props) {
  const roles = (profile?.currentRoles?.length ?? 0) > 0
    ? profile!.currentRoles
    : ["Mobile Developer", "Front-End Developer"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="flex flex-col items-center px-4 md:px-6"
      >
        <motion.div variants={fadeUpVariants} className="mb-4 md:mb-6">
          <Badge text="Welcome to My Portofolio" />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="text-lg md:text-xl lg:text-2xl text-white/90 tracking-wide mb-4 md:mb-5"
        >
          Hello, I am
        </motion.p>

        <motion.div variants={fadeUpVariants} className="mt-1 md:mt-2">
          <BlurText
            text={profile?.fullName ?? "Rhesa Tsaqif Adyatma"}
            animateBy="words"
            direction="top"
            delay={140}
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl justify-center
              font-bold tracking-tight
              text-white
              animate-[float_10s_ease-in-out_infinite]
            "
          />
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="
            mt-4 md:mt-6
            text-lg md:text-xl lg:text-2xl xl:text-3xl
            font-semibold
            text-cyan-300
          "
        >
          <TypingEffect
            sequences={roles.map((role) => ({
              text: role,
              deleteAfter: true,
              pauseAfter: 2000,
            }))}
            typingSpeed={80}
            deleteSpeed={50}
            naturalVariance={true}
          />
        </motion.h2>

        <HeroSocials profile={profile} />
        <HeroActions cvUrl={profile?.cvUrl ?? null} />
      </motion.div>

      <DecorBackground />
    </section>
  );
}
