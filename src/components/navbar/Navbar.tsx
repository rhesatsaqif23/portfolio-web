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
        100;
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
    <div className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 md:px-8">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={clsx(
          "relative flex flex-col",
          "border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl shadow-black/50",
          "transition-all duration-500 ease-in-out",
          "w-[95vw] md:w-[90vw] rounded-2xl",
          "lg:w-auto lg:rounded-full",
          isOpen ? "rounded-3xl" : "",
        )}
      >
        {/* Top Bar */}
        <div
          className={clsx(
            "flex items-center w-full transition-all duration-300",
            "justify-between px-4 py-2 md:px-6 md:py-3",
            "lg:justify-center lg:gap-4 xl:gap-6 lg:px-6 lg:py-4",
          )}
        >
          {/* Logo Section */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 md:gap-4 shrink-0 cursor-pointer group"
          >
            <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm md:text-base font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              Rhesa Tsaqif
            </span>
          </button>

          {/* Desktop Divider (Hidden on sm/md) */}
          <div className="hidden lg:block h-8 w-0.5 bg-white/10" />

          {/* Desktop Navigation (Hidden on sm/md) */}
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

          {/* Mobile/Tablet Toggle (Hidden on lg+) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Dropdown Menu (lg:hidden) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden lg:hidden border-t border-white/5"
            >
              <div className="flex flex-col p-4 gap-2">
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
