"use client";

import { motion } from "framer-motion";
import {
  Home,
  User,
  Layers,
  Briefcase,
  FolderGit2,
  Award,
  Mail,
} from "lucide-react";
import clsx from "clsx";
import { useActiveSection } from "./useActiveSection";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Stack", href: "#stack", icon: Layers },
  { label: "Experiences", href: "#experiences", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Achievements", href: "#achievements", icon: Award },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const scrollActive = useActiveSection();
  const [clicked, setClicked] = useState<string | null>(null);

  // priority: klik > scroll
  const active = clicked ?? scrollActive;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#0b1220]/70 backdrop-blur-xl px-4 py-2 shadow-lg shadow-black/40">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const Icon = item.icon;
          const isActive = active === id;

          return (
            <button
              key={item.label}
              onClick={() => {
                setClicked(id);
                document.getElementById(id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });

                // lepaskan kontrol setelah scroll selesai
                setTimeout(() => setClicked(null), 700);
              }}
              className={clsx(
                "relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium",
                "transition-colors duration-200",
                isActive
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2"
              >
                <Icon
                  className={clsx(
                    "h-4 w-4",
                    isActive ? "opacity-100" : "opacity-70"
                  )}
                />
                <span className="hidden md:inline">{item.label}</span>
              </motion.span>

              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-cyan-400/30 to-blue-500/30"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 38,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
