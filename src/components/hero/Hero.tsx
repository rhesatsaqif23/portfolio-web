"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Download,
  ChevronRight,
  Instagram,
} from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DecorBackground = dynamic(() => import("../common/DecorBackground"), {
  ssr: false,
});
import SocialIcon from "../common/SocialIcon";
import BlurText from "../common/BlurText";

/* ---------------- Variants ---------------- */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ---------------- Typing Loop ---------------- */

function TypingLoop({ text }: { text: string }) {
  const [value, setValue] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 50 : 80;
    let nestedTimeout: number | null = null;
    const timeout = window.setTimeout(() => {
      if (!deleting && value.length < text.length) {
        setValue(text.slice(0, value.length + 1));
      } else if (deleting && value.length > 0) {
        setValue(text.slice(0, value.length - 1));
      } else if (!deleting && value.length === text.length) {
        nestedTimeout = window.setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && value.length === 0) {
        setDeleting(false);
      }
    }, speed);

    return () => {
      clearTimeout(timeout);
      if (nestedTimeout) clearTimeout(nestedTimeout);
    };
  }, [value, deleting, text]);

  return (
    <>
      {value}
      <span className="animate-pulse ml-1">|</span>
    </>
  );
}

/* ---------------- Hero ---------------- */

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="flex flex-col items-center px-6"
      >
        {/* Intro */}
        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl text-white/80 tracking-wide mb-5"
        >
          Hello, I am
        </motion.p>

        {/* Name (Blur Text Reveal) */}
        <motion.div variants={fadeUp} className="mt-2">
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

        {/* Role (Typing Loop) */}
        <motion.h2
          variants={fadeUp}
          className="
            mt-6
            text-xl sm:text-2xl md:text-3xl
            font-semibold
            text-cyan-300
        "
        >
          <TypingLoop text="Mobile & Front-End Developer" />
        </motion.h2>

        {/* Social Icons */}
        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-wrap justify-center gap-4 md:gap-6"
        >
          <SocialIcon
            icon={<Mail className="h-5 md:h-6" />}
            href="mailto:atstsaqif23@gmail.com"
          />
          <SocialIcon
            icon={<Github className="h-5 md:h-6" />}
            href="https://github.com/rhesatsaqif23"
          />
          <SocialIcon
            icon={<Linkedin className="h-5 md:h-6" />}
            href="https://linkedin.com/in/rhesa-tsaqif"
          />
          <SocialIcon
            icon={<Instagram className="h-5 md:h-6" />}
            href="https://www.instagram.com/ats_tsaqif_23"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {/* Download CV */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative inline-flex items-center justify-center
              overflow-hidden
              rounded-full
              bg-linear-to-r from-cyan-400 to-blue-500
              px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3
              font-medium text-black
              text-sm md:text-base
              shadow-[0_0_18px_rgba(34,211,238,0.45)]
              transition-all duration-300
              hover:px-6 md:hover:px-8
              hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]
            "
          >
            {/* SHINY */}
            <span
              className="
                pointer-events-none absolute inset-0
                w-[200%]
                -left-[150%]
                bg-linear-to-r from-transparent via-white/45 to-transparent
                animate-[shine_2.6s_ease-in-out_infinite]
              "
            />

            <span
              className="
                relative z-10 inline-flex items-center gap-3
                transition-transform duration-300
                group-hover:-translate-x-3
              "
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              Download CV
            </span>

            <ChevronRight
              className="
                pointer-events-none
                absolute right-3 md:right-4
                h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6
                opacity-0
                transition-all duration-200
                group-hover:opacity-100
              "
            />
          </a>

          {/* Contact Me (Inverted) */}
          <a
            href="#contact"
            className="
              group relative inline-flex items-center justify-center
              overflow-hidden
              rounded-full
              border-2 border-white/60
              bg-transparent
              px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3
              font-medium text-white/80
              text-sm md:text-base
              transition-all duration-300
              hover:px-6 md:hover:px-8
              hover:border-cyan-300
              hover:text-cyan-300
              hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]
            "
          >
            {/* SHINY (lebih subtle) */}
            <span
              className="
                pointer-events-none absolute inset-0
                w-[200%]
                -left-[150%]
                bg-linear-to-r from-transparent via-cyan-300/25 to-transparent
                animate-[shine_3s_ease-in-out_infinite]
              "
            />

            <span
              className="
                relative z-10 inline-flex items-center gap-3
                transition-transform duration-300
                group-hover:-translate-x-3
              "
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              Contact Me
            </span>

            <ChevronRight
              className="
                pointer-events-none
                absolute right-3 md:right-4
                h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6
                opacity-0
                transition-all duration-200
                group-hover:opacity-100
              "
            />
          </a>
        </motion.div>
      </motion.div>
      <DecorBackground />
    </section>
  );
}
