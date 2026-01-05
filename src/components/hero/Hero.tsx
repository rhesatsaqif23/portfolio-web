"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  HardDriveDownload,
  ChevronRight,
  Instagram,
} from "lucide-react";
import { useEffect, useState } from "react";
import DecorBackground from "../common/DecorBackground";

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
    const timeout = setTimeout(() => {
      if (!deleting && value.length < text.length) {
        setValue(text.slice(0, value.length + 1));
      } else if (deleting && value.length > 0) {
        setValue(text.slice(0, value.length - 1));
      } else if (!deleting && value.length === text.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && value.length === 0) {
        setDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timeout);
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

        {/* Name (Subtle Floating Only) */}
        <motion.h1
          variants={fadeUp}
          className="
            text-5xl md:text-6xl lg:text-7xl
            font-bold tracking-tight
            text-white
            will-change-transform
            animate-[float_8s_ease-in-out_infinite]
            [animation-delay:0.9s]
        "
        >
          Rhesa Tsaqif Adyatma
        </motion.h1>

        {/* Role (Typing Loop) */}
        <motion.h2
          variants={fadeUp}
          className="
            mt-6
            text-2xl md:text-3xl
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
        <motion.div variants={fadeUp} className="mt-16">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative inline-flex items-center justify-center
              overflow-hidden
              rounded-full
              bg-linear-to-r from-cyan-400 to-blue-500
              px-4 py-2.5 md:px-5 md:py-3
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

            {/* CENTER CONTENT */}
            <span
              className="
                relative z-10 inline-flex items-center gap-3
                transition-transform duration-300
                group-hover:-translate-x-3
              "
            >
              <HardDriveDownload className="h-5 w-5 md:h-6 md:w-6" />
              Download CV
            </span>

            {/* RIGHT ARROW (FIXED POSITION) */}
            <ChevronRight
              className="
              pointer-events-none
              absolute right-3 md:right-4
              h-5 w-5 md:h-6 md:w-6
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

/* ---------------- Social Icon ---------------- */

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className="
        relative flex
        h-12 w-12 md:h-14 md:w-14
        items-center justify-center
        rounded-full
        border-2 border-white/30
        bg-white/5 backdrop-blur
        text-white
        transition-colors duration-200
        hover:border-cyan-400
        hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]
      "
    >
      {icon}
    </motion.a>
  );
}
