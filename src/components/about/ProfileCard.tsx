"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null);

  /* RAW MOTION */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* SPRING SMOOTHING */
  const x = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 18 });

  /* 3D ROTATION */
  const rotateX = useTransform(y, [-150, 150], [14, -14]);
  const rotateY = useTransform(x, [-150, 150], [-14, 14]);

  /* LIGHT POSITION */
  const lightX = useTransform(x, [-150, 150], ["30%", "70%"]);
  const lightY = useTransform(y, [-150, 150], ["30%", "70%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;

    mouseX.set(dx);
    mouseY.set(dy);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="perspective-[1200px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="
          relative group
          w-60 md:w-70
          rounded-2xl
          bg-linear-to-br from-white/10 to-white/5
          backdrop-blur-xl
          shadow-[0_50px_100px_rgba(0,0,0,0.45)]
          transition-shadow duration-500
          hover:shadow-[0_70px_140px_rgba(34,211,238,0.25)]
        "
      >
        {/* DYNAMIC LIGHT REFLECTION */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([lx, ly]) =>
                `radial-gradient(
                  circle at ${lx} ${ly},
                  rgba(255,255,255,0.25),
                  transparent 55%
                )`
            ),
          }}
        />

        {/* CARD IMAGE */}
        <motion.img
          src="/images/id_card.png"
          alt="Profile Card"
          draggable={false}
          className="relative z-10 w-full rounded-2xl"
          style={{
            translateX: useTransform(x, [-150, 150], [-8, 8]),
            translateY: useTransform(y, [-150, 150], [-8, 8]),
          }}
        />
      </motion.div>
    </div>
  );
}
