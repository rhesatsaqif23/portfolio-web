"use client";

import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import Link from "next/link";

const socials = [
  {
    name: "Email",
    href: "mailto:atstsaqif23@gmail.com",
    icon: Mail,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/rhesa-tsaqif",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/rhesatsaqif23",
    icon: Github,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ats_tsaqif_23",
    icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        border-t border-white/10
        bg-[#050B14]
      "
    >
      <div
        className="
          mx-auto max-w-7xl
          px-6 md:px-20 lg:px-28
          py-6
          flex flex-col gap-6
          md:flex-row items-center md:justify-between
        "
      >
        {/* LEFT */}
        <div className="text-sm text-white/80 flex items-center gap-1">
          <span>©</span>
          <span>2026</span>
          <span className="text-white/80 font-medium">Rhesa Tsaqif Adyatma</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {socials.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              aria-label={name}
              className="
                group relative
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-white/3
                border border-white/10
                text-white/70

                transition-all duration-300 ease-out
                hover:text-white
                hover:-translate-y-1
              "
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
