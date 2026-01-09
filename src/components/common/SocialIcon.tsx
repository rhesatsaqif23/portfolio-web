import { motion } from "framer-motion";

export default function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className="
        relative flex
        h-12 w-12 md:h-14 md:w-14
        items-center justify-center
        rounded-full
        border-2 border-white/30
        bg-white/5 backdrop-blur
        text-white
        transition-colors duration-200
        hover:border-cyan-400
        hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]
      "
    >
      {icon}
    </motion.a>
  );
}