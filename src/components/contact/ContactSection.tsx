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
import { Profile } from "@/src/types/profile";

interface Props {
  profile: Profile | null;
}

export default function ContactSection({ profile }: Props) {
  const { ref: headerRef, visible: headerVisible } =
    useInView<HTMLDivElement>(0.25);
  const { ref: cardRef, visible: cardVisible } =
    useInView<HTMLDivElement>(0.15);

  const email = profile?.email ?? "atstsaqif23@gmail.com";
  const location = profile?.location ?? "Malang, East Java, Indonesia";

  const socialLinks = [
    {
      name: "LinkedIn",
      href: profile?.linkedin ?? "https://linkedin.com/in/rhesa-tsaqif",
      icon: <Linkedin className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "GitHub",
      href: profile?.github ?? "https://github.com/rhesatsaqif23",
      icon: <Github className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      name: "Instagram",
      href: profile?.instagram ?? "https://www.instagram.com/ats_tsaqif_23",
      icon: <Instagram className="h-4 w-4 md:h-5 md:w-5" />,
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-16 md:py-24"
    >
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
        className="text-center mb-3 md:mb-4 lg:mb-8"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 lg:mb-8">
          Get In Touch
        </h2>
        <p className="max-w-3xl mx-auto text-sm md:text-md lg:text-lg text-white leading-relaxed">
          Have a project or idea in mind? I&apos;m open to internships,
          collaborations, and opportunities in software development. Feel free
          to reach out and let&apos;s create something meaningful together.
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
          href={`mailto:${email}`}
          className="
            group relative inline-flex items-center justify-center
            overflow-hidden
            rounded-full
            bg-linear-to-r from-cyan-400 to-blue-500
            px-3 md:px-4 lg:px-5 py-2 md:py-2.5 lg:py-3
            font-medium text-black
            text-xs md:text-sm lg:text-base

            shadow-[0_0_18px_rgba(34,211,238,0.45)]
            transition-all duration-300

            hover:px-5 md:hover:px-6 lg:hover:px-8
            hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]

            active:scale-[0.97]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-cyan-400/60
        "
        >
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
                relative z-10 inline-flex items-center gap-2 md:gap-3
                transition-transform duration-300
                group-hover:-translate-x-3
            "
          >
            <Mail className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            Email Me
          </span>

          <ChevronRight
            className="
                pointer-events-none
                absolute right-2 md:right-3 lg:right-4
                h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6
                opacity-0
                transition-all duration-200
                group-hover:opacity-100
            "
          />
        </a>
      </motion.div>

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
          mt-6 md:mt-8 lg:mt-12 mx-auto max-w-5xl
          rounded-2xl border-2 border-white/10
          bg-slate-950/60 backdrop-blur-xl
          p-6 md:p-8 lg:p-12
          transition-colors duration-300
          hover:border-cyan-400/50
          hover:shadow-[0_12px_48px_rgba(34,211,238,0.15)]
        "
      >
        <div
          className="
            flex flex-col md:flex-row md:justify-between md:items-start
            gap-8 md:gap-12 lg:gap-16
          "
        >
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
            className="flex-1 space-y-3 md:space-y-4"
          >
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-white/80 mb-2 md:mb-3">
                EMAIL
              </h3>
              <Link
                href={`mailto:${email}`}
                className="
                group relative inline-flex flex-col justify-center
                text-white transition-all duration-300 py-1
            "
              >
                <div className="relative h-[1.6em] overflow-hidden">
                  <div
                    className="
                        flex items-center gap-2 md:gap-3
                        transition-transform duration-200 ease-out
                        group-hover:-translate-y-[40%] group-hover:opacity-0
                        will-change-transform will-change-opacity
                    "
                  >
                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base">{email}</span>
                  </div>

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
                    <span className="text-sm md:text-base font-semibold text-white">
                      Send Me an Email
                    </span>
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                </div>
              </Link>
            </div>

            <div>
              <h3 className="text-xs md:text-sm font-semibold text-white/80 mb-2 md:mb-3">
                LOCATION
              </h3>
              <div className="flex items-center gap-2 md:gap-3 text-white">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-white" />
                <span className="text-sm md:text-base">{location}</span>
              </div>
            </div>
          </motion.div>

          <div className="hidden md:block w-px bg-white/10 self-stretch" />

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
            <h3 className="text-xs md:text-sm font-semibold text-white/80 mb-2 md:mb-3">SOCIAL</h3>

            <div className="flex flex-col gap-4 md:gap-5">
              {socialLinks.map((item, i) => (
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
                        text-white transition-all duration-300
                    "
                  >
                    <div className="relative h-[1.6em] overflow-hidden w-max">
                      <div
                        className="
                            flex items-center gap-2 md:gap-3 transition-transform duration-200 ease-out
                            group-hover:-translate-y-[40%] group-hover:opacity-0
                        "
                      >
                        {item.icon}
                        <span className="text-sm md:text-base">Follow on {item.name}</span>
                      </div>

                      <div
                        className="
                            pointer-events-none absolute left-0 top-0 flex items-center gap-2
                            translate-y-[40%] opacity-0
                            group-hover:translate-y-0 group-hover:opacity-100
                            transition-all duration-250 ease-[cubic-bezier(0.25,1,0.3,1)]
                        "
                      >
                        <span className="text-sm md:text-base font-semibold text-white whitespace-nowrap">
                          Follow on {item.name}
                        </span>
                        <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
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
