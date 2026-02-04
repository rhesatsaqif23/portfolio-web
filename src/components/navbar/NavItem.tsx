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
        "relative rounded-full px-4 py-2 text-base font-medium transition-all duration-300 shrink-0 cursor-pointer",
        isMobile ? "w-full max-w-fit mx-auto text-center" : "",
        isActive
          ? "text-white"
          : "text-white/70 hover:text-white hover:bg-white/10",
      )}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <motion.span
          layoutId={isMobile ? "nav-indicator-mobile" : "nav-indicator-desktop"}
          className="absolute inset-0 z-0 rounded-full bg-white/15 backdrop-blur-sm border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

export default NavItem;
