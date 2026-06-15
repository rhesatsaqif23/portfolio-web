"use client";

import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import Link from "next/link";
import { Profile } from "@/src/types/profile";

interface Props {
  profile: Profile | null;
}

export default function Footer({ profile }: Props) {
  const socials = [
    { name: "Email", href: `mailto:${profile?.email ?? "atstsaqif23@gmail.com"}`, icon: Mail },
    { name: "LinkedIn", href: profile?.linkedin ?? "https://linkedin.com/in/rhesa-tsaqif", icon: Linkedin },
    { name: "GitHub", href: profile?.github ?? "https://github.com/rhesatsaqif23", icon: Github },
    { name: "Instagram", href: profile?.instagram ?? "https://instagram.com/ats_tsaqif_23", icon: Instagram },
  ];

  const fullName = profile?.fullName ?? "RHESA TSAQIF ADYATMA";

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
          flex flex-col gap-4 md:gap-6
          md:flex-row items-center md:justify-between
        "
      >
        <div className="text-xs md:text-sm text-white/60 flex items-center gap-1">
          <span>©</span>
          <span>2026</span>
          <span className="text-white/60 font-medium">
            {fullName.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          {socials.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              aria-label={name}
              className="
                group relative
                flex h-8 w-8 md:h-10 md:w-10 items-center justify-center
                rounded-full
                bg-white/3
                border border-white/10
                text-white/80

                transition-all duration-300 ease-out
                hover:text-white
                hover:-translate-y-1
              "
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:scale-110" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
