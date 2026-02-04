"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import BlurText from "../common/BlurText";
import HeroSocials from "./HeroSocials";
import HeroActions from "./HeroActions";
import { containerVariants, fadeUpVariants } from "./motion";
import TypingEffect from "../kokonutui/type-writer";

const DecorBackground = dynamic(() => import("../common/DecorBackground"), {
  ssr: false,
});

export default function Hero() {
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
        className="flex flex-col items-center px-6"
      >
        {/* Intro */}
        <motion.p
          variants={fadeUpVariants}
          className="text-xl md:text-2xl text-white/80 tracking-wide mb-5"
        >
          Hello, I am
        </motion.p>

        {/* Name (Blur Text Reveal) */}
        <motion.div variants={fadeUpVariants} className="mt-2">
          <BlurText
            text="Rhesa Tsaqif Adyatma"
            animateBy="words"
            direction="top"
            delay={140}
            className="
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl justify-center
              font-bold tracking-tight
              text-white
              animate-[float_10s_ease-in-out_infinite]
            "
          />
        </motion.div>

        {/* Role (Advanced Typing Loop) */}
        <motion.h2
          variants={fadeUpVariants}
          className="
            mt-6
            text-xl sm:text-2xl md:text-3xl
            font-semibold
            text-cyan-300
          "
        >
          <TypingEffect
            sequences={[
              { text: "Mobile Developer", deleteAfter: true, pauseAfter: 2000 },
              {
                text: "Front-End Developer",
                deleteAfter: true,
                pauseAfter: 2000,
              },
            ]}
            typingSpeed={80}
            deleteSpeed={50}
            naturalVariance={true}
          />
        </motion.h2>

        {/* Social Icons */}
        <HeroSocials />

        {/* CTA Buttons */}
        <HeroActions />
      </motion.div>

      <DecorBackground />
    </section>
  );
}
