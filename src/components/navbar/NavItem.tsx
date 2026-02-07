"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

function NavItem({
  label,
  isActive,
  onClick,
  isMobile = false,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative rounded-full px-4 py-2 text-md font-medium transition-all duration-300 shrink-0 cursor-pointer",
        isMobile ? "w-full max-w-fit mx-auto text-center" : "",
        isActive
          ? "text-white"
          : "text-white/60 hover:text-white hover:bg-white/5",
      )}
    >
      <motion.span
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 block"
      >
        {label}
      </motion.span>
      {isActive && (
        <motion.span
          layoutId={isMobile ? "nav-indicator-mobile" : "nav-indicator-desktop"}
          className="absolute inset-0 z-0 rounded-full bg-linear-to-r from-cyan-400/30 to-blue-500/30 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
        />
      )}
    </button>
  );
}

export default NavItem;
