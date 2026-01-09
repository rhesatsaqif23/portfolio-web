"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import useInView from "@/src/hooks/useInView";

export default function ContactSection() {
  const { ref: headerRef, visible: headerVisible } =
    useInView<HTMLDivElement>(0.25);
  const { ref: cardRef, visible: cardVisible } =
    useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="contact"
      className="relative scroll-mt-8 py-24 px-8 md:px-20 lg:px-28"
    >
      {/* HEADER */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: headerVisible ? 1 : 0,
          y: headerVisible ? 0 : 40,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="text-center mb-4 md:mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-8">
          Get In Touch
        </h2>
        <p className="max-w-3xl mx-auto text-md md:text-lg text-white/80 leading-relaxed">
          Have a project or idea in mind? I’m open to internships,
          collaborations, and opportunities in software development. Feel free
          to reach out and let’s create something meaningful together.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: headerVisible ? 1 : 0,
          y: headerVisible ? 0 : 20,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex justify-center"
      >
        <a
          href="mailto:atstsaqif23@gmail.com"
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

            active:scale-[0.97]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-cyan-400/60
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
            <Mail className="h-5 w-5 md:h-6 md:w-6" />
            Email Me
          </span>

          {/* RIGHT ARROW */}
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

      {/* CARD */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: cardVisible ? 1 : 0,
          y: cardVisible ? 0 : 40,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
    mt-8 md:mt-12 mx-auto max-w-5xl
    rounded-2xl border border-white/10 bg-white/4
    backdrop-blur-lg
    p-8 md:p-12
    shadow-[0_0_40px_rgba(34,211,238,0.1)]
  "
      >
        <div
          className="
            flex flex-col md:flex-row md:justify-between md:items-start
            gap-10 md:gap-16
          "
        >
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: cardVisible ? 1 : 0,
              y: cardVisible ? 0 : 40,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-1 space-y-4"
          >
            {/* EMAIL */}
            <div>
              <h3 className="text-sm font-semibold text-white/60 mb-3">
                EMAIL
              </h3>
              <Link
                href="mailto:atstsaqif23@gmail.com"
                className="
                group relative inline-flex flex-col justify-center
                text-white/80 transition-all duration-300 py-1
            "
              >
                <div className="relative h-[1.6em] overflow-hidden">
                  {/* default */}
                  <div
                    className="
                        flex items-center gap-3
                        transition-transform duration-200 ease-out
                        group-hover:-translate-y-[40%] group-hover:opacity-0
                        will-change-transform will-change-opacity
                    "
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-base">atstsaqif23@gmail.com</span>
                  </div>

                  {/* hover */}
                  <div
                    className="
                        pointer-events-none
                        absolute left-0 top-0 flex items-center gap-2
                        translate-y-[40%] opacity-0
                        group-hover:translate-y-0 group-hover:opacity-100
                        transition-all duration-250 ease-[cubic-bezier(0.25,1,0.3,1)]
                        will-change-transform will-change-opacity
                    "
                  >
                    <span className="text-md font-bold text-white/90">
                      Send Me an Email
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/90" />
                  </div>
                </div>
              </Link>
            </div>

            {/* LOCATION */}
            <div>
              <h3 className="text-sm font-semibold text-white/60 mb-3">
                LOCATION
              </h3>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-white/80" />
                <span>Malang, East Java, Indonesia</span>
              </div>
            </div>
          </motion.div>

          {/* DIVIDER */}
          <div className="hidden md:block w-px bg-white/10 self-stretch" />

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: cardVisible ? 1 : 0,
              y: cardVisible ? 0 : 40,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-1"
          >
            <h3 className="text-sm font-semibold text-white/60 mb-3">SOCIAL</h3>

            <div className="flex flex-col gap-5">
              {[
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/rhesa-tsaqif",
                  icon: <Linkedin className="h-5 w-5" />,
                },
                {
                  name: "GitHub",
                  href: "https://github.com/rhesatsaqif23",
                  icon: <Github className="h-5 w-5" />,
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/ats_tsaqif_23",
                  icon: <Instagram className="h-5 w-5" />,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: cardVisible ? 1 : 0,
                    y: cardVisible ? 0 : 15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="
                        group relative inline-flex flex-col justify-center
                        text-white/80 transition-all duration-300
                    "
                  >
                    <div className="relative h-[1.6em] overflow-hidden">
                      {/* default */}
                      <div
                        className="
                            flex items-center gap-3 transition-transform duration-200 ease-out
                            group-hover:-translate-y-[40%] group-hover:opacity-0
                        "
                      >
                        {item.icon}
                        <span className="text-base">Follow on {item.name}</span>
                      </div>

                      {/* hover */}
                      <div
                        className="
                            pointer-events-none absolute left-0 top-0 flex items-center gap-2
                            translate-y-[40%] opacity-0
                            group-hover:translate-y-0 group-hover:opacity-100
                            transition-all duration-250 ease-[cubic-bezier(0.25,1,0.3,1)]
                        "
                      >
                        <span className="text-md font-semibold text-white/90">
                          Follow on {item.name}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-white/90" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
