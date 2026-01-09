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
import { useEffect, useState } from "react";

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
  const [clicked, setClicked] = useState<string | null>(null);
  const scrollActive = useActiveSection();

  const active = clicked ?? scrollActive;

  useEffect(() => {
    if (clicked && scrollActive === clicked) {
      const t = setTimeout(() => setClicked(null), 0);
      return () => clearTimeout(t);
    }
  }, [scrollActive, clicked]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="
        fixed top-6 md:top-8
        left-1/2 -translate-x-1/2
        z-30
        max-w-[calc(100vw-1.5rem)]
      "
    >
      <div
        className="
          flex items-center gap-1
          rounded-full
          border border-white/15
          bg-[#0b1220]/70 backdrop-blur-xl
          px-2 py-2 md:px-4
          shadow-lg shadow-black/40

          overflow-x-auto
          scrollbar-none
          overscroll-x-contain
        "
      >
        {navItems.map((item) => {
          const id = item.href.slice(1);
          const Icon = item.icon;
          const isActive = active === id;

          return (
            <button
              key={item.label}
              onClick={() => {
                setClicked(id);
                document.getElementById(id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={clsx(
                "relative flex items-center gap-2 rounded-full",
                "px-3 py-2 md:px-3 md:py-3",
                "text-xs md:text-sm font-medium",
                "whitespace-nowrap",
                "transition-colors duration-200",
                isActive
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center gap-2"
              >
                <Icon
                  className={clsx(
                    "h-4 w-4",
                    isActive ? "opacity-100" : "opacity-70"
                  )}
                />
                {/* Label hanya desktop */}
                <span className="hidden xl:inline">{item.label}</span>
              </motion.span>

              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="
                    absolute inset-0 -z-10 rounded-full
                    bg-linear-to-r from-cyan-400/30 to-blue-500/30
                  "
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
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
