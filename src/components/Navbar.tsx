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

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Stack", href: "#tech", icon: Layers },
  { label: "Experiences", href: "#experiences", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Achievements", href: "#achievements", icon: Award },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        className="
          flex items-center gap-1
          rounded-full
          border border-white/15
          bg-[#0b1220]/70 backdrop-blur-xl
          px-4 py-2
          shadow-lg shadow-black/40
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={clsx(
                "group relative flex items-center gap-2",
                "rounded-full px-2 py-2 text-sm font-medium",
                "text-white/70 transition-colors duration-300",
                "hover:text-white hover:bg-white/5",
                "will-change-transform"
              )}
            >
              <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="hidden md:inline">{item.label}</span>

              {/* Sci-fi glow */}
              <span
                className="
                  pointer-events-none absolute inset-0
                  rounded-full opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                  bg-gradient-to-r from-cyan-400/20 to-blue-500/20
                "
              />
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
}
