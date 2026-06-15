"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useActiveSection } from "./useActiveSection";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import NavItem from "./NavItem";

// Configuration: Navigation Links
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experiences", href: "#experiences" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [clicked, setClicked] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const scrollActive = useActiveSection();
  const active = clicked ?? scrollActive;

  // Logic: Smooth Scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    requestAnimationFrame(() => {
      const top =
        el.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        25;
      window.scrollTo({ top, behavior: "smooth" });
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (clicked && scrollActive === clicked) {
      const t = setTimeout(() => setClicked(null), 0);
      return () => clearTimeout(t);
    }
  }, [scrollActive, clicked]);

  return (
    <div className="fixed top-3 md:top-4 lg:top-6 inset-x-0 z-50 flex justify-center px-3 md:px-4 lg:px-8 pointer-events-none">
      <motion.nav
        layout
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8,
        }}
        className={clsx(
          "pointer-events-auto relative flex flex-col",
          "border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-2xl shadow-black/40",
          "w-[95vw] md:w-[90vw] rounded-2xl",
          "lg:w-auto lg:rounded-full",
          "will-change-transform",
          isOpen ? "rounded-2xl" : "",
        )}
      >
        {/* Top Bar */}
        <motion.div
          layout="position"
          className={clsx(
            "flex items-center w-full",
            "justify-between px-3 md:px-4 lg:px-6 py-2",
            "lg:justify-center lg:gap-4 xl:gap-6 lg:px-6 lg:py-4",
          )}
        >
          {/* Logo Section */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 md:gap-3 lg:gap-4 shrink-0 cursor-pointer group"
          >
            <div className="relative h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full overflow-hidden border border-white/10 bg-black/20 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </button>

          {/* Desktop Divider */}
          <div className="hidden lg:block h-8 w-0.5 bg-white/10" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <NavItem
                  key={item.label}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => {
                    setClicked(id);
                    scrollToSection(id);
                  }}
                />
              );
            })}
          </div>

          {/* Mobile/Tablet Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 md:p-2 text-white/80 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="w-full overflow-hidden lg:hidden border-t border-white/10"
            >
              <div className="flex flex-col p-3 md:p-4 gap-1.5 md:gap-2">
                {navItems.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <NavItem
                      key={item.label}
                      label={item.label}
                      isActive={isActive}
                      isMobile={true}
                      onClick={() => {
                        setClicked(id);
                        scrollToSection(id);
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
