"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DecorBackground() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* PARALLAX (scroll-based) */
  const yLeft = useTransform(scrollYProgress, [0, 1], [140, -360]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-120, 300]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 hidden md:block overflow-hidden"
    >
      {/* LEFT DECOR */}
      <motion.img
        src="/images/decor1.png"
        alt=""
        style={{ y: yLeft }}
        initial={{ opacity: 0, x: "-95%" }}
        animate={{
          opacity: 1,
          x: "-50%",
          rotate: [0, 8, -6, 0],
          translateX: [0, 26, -18, 0],
          translateY: [0, -22, 14, 0],
        }}
        transition={{
          opacity: { duration: 1.7, ease: "easeOut" },
          x: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },

          rotate: {
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
          },
          translateX: {
            duration: 22,
            ease: "easeInOut",
            repeat: Infinity,
          },
          translateY: {
            duration: 26,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="
          absolute
          top-[60%]
          -translate-y-1/2
          w-[clamp(380px,70vw,62vw)]
          opacity-95
        "
      />

      {/* RIGHT DECOR */}
      <motion.img
        src="/images/decor2.png"
        alt=""
        style={{ y: yRight }}
        initial={{ opacity: 0, x: "95%" }}
        animate={{
          opacity: 1,
          x: "50%",
          rotate: [0, -9, 7, 0],
          translateX: [0, -24, 16, 0],
          translateY: [0, 20, -14, 0],
        }}
        transition={{
          opacity: { duration: 1.7, ease: "easeOut" },
          x: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },

          rotate: {
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          },
          translateX: {
            duration: 24,
            ease: "easeInOut",
            repeat: Infinity,
          },
          translateY: {
            duration: 28,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
        className="
          absolute
          top-[46%]
          right-0
          -translate-y-1/2
          w-[clamp(380px,70vw,62vw)]
          opacity-95
        "
      />
    </div>
  );
}
