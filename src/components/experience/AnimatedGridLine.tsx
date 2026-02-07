"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React from "react";

export default function AnimatedGridLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const positionClass = "left-6 md:left-1/2";

  return (
    <>
      {/* Background Track */}
      <div
        className={`absolute top-0 bottom-0 w-1 -translate-x-1/2 bg-cyan-950/40 rounded-full ${positionClass}`}
        aria-hidden="true"
      />

      {/* Animated Fill */}
      <motion.div
        className={`absolute top-0 w-1 -translate-x-1/2 bg-gradient-to-b from-cyan-300 via-cyan-500 to-cyan-800 origin-top rounded-full ${positionClass}`}
        style={{ height: progressHeight }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 w-full h-full shadow-[0_0_20px_2px_rgba(34,211,238,0.6)]" />
      </motion.div>

      {/* Glowing Comet */}
      <motion.div
        className={`absolute -translate-x-1/2 z-10 ${positionClass}`}
        style={{ top: progressHeight }}
        aria-hidden="true"
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-cyan-300 blur-[1px]"
          style={{
            boxShadow: "0 0 25px 5px rgba(34, 211, 238, 0.8)",
            transform: "translateY(-50%)",
          }}
        />
      </motion.div>
    </>
  );
}
