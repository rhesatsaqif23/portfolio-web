"use client";

import { motion } from "framer-motion";
import { Download, ChevronRight, Mail } from "lucide-react";
import { fadeUpVariants } from "./motion";

export default function HeroActions() {
  return (
    <motion.div
      variants={fadeUpVariants}
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
  );
}
