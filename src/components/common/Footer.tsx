"use client";

import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { Profile } from "@/src/types/profile";

interface Props {
  profile: Profile | null;
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experiences", href: "#experiences" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + document.documentElement.scrollTop - 25;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function Footer({ profile }: Props) {
  const email = profile?.email ?? "atstsaqif23@gmail.com";
  const github = profile?.github ?? "https://github.com/rhesatsaqif23";
  const linkedin = profile?.linkedin ?? "https://linkedin.com/in/rhesa-tsaqif";
  const instagram = profile?.instagram ?? "https://instagram.com/ats_tsaqif_23";
  const fullName = profile?.fullName ?? "Rhesa Tsaqif Adyatma";
  const tagline = profile?.bioShort ?? "Developer passionate about building performant and scalable mobile & web applications.";

  const socials = [
    { name: "Email", href: `mailto:${email}`, icon: Mail },
    { name: "LinkedIn", href: linkedin, icon: Linkedin },
    { name: "GitHub", href: github, icon: Github },
    { name: "Instagram", href: instagram, icon: Instagram },
  ];

  return (
    <footer className="relative bg-linear-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white pt-8 sm:pt-10 lg:pt-12 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8 mt-auto overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="absolute top-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Row 1: Tagline | Navigation | Contact */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-4 w-full">
          {/* Left: Tagline (50%) */}
          <div className="w-full lg:w-1/2 text-center xl:text-left xl:pr-8">
            <p className="text-white text-sm md:text-base leading-relaxed lg:max-w-md md:px-16 mx-auto font-medium">
              {tagline}
            </p>
          </div>

          {/* Right side wrapper: Navigation & Contact (50%) */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-center lg:justify-end gap-12 sm:gap-16 lg:gap-24 lg:pr-8">
            {/* Center-Right: Navigation */}
            <div className="text-center lg:text-start min-w-[140px]">
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide uppercase">
                Navigation
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollToSection(item.href.slice(1))}
                      className="text-white/80 hover:text-white text-xs sm:text-sm transition-colors font-medium cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Contact */}
            <div className="text-center lg:text-start min-w-[140px]">
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide uppercase">
                Contact
              </h4>
              <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 sm:gap-3 text-white/80 hover:text-white text-xs sm:text-sm transition-colors font-medium"
                >
                  <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <Mail className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                  </div>
                  <span>{email}</span>
                </a>
                {socials.filter(s => s.name !== "Email").map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3 text-white/80 hover:text-white text-xs sm:text-sm transition-colors font-medium"
                  >
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                      <Icon className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                    </div>
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Big name text */}
        <div className="text-center my-2 md:my-4 select-none">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] xl:text-[10rem] font-bold text-white leading-none tracking-wide">
            {fullName.toUpperCase()}
          </p>
        </div>

        {/* Row 3: Credit */}
        <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            Built with <span className="text-white font-bold">Next.js</span> and <span className="text-white font-bold">Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
