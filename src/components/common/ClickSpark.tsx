"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  className?: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
}

export default function ClickSpark({
  children,
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 400,
  className = "",
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSpark: Spark = { id: Date.now(), x, y };
    setSparks((prev) => [...prev, newSpark]);

    // Cleanup spark setelah animasi selesai
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, duration);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative w-full h-full ${className}`}
      // Pastikan container ini tidak menghalangi interaksi elemen di dalamnya
      style={{ isolation: "isolate" }}
    >
      {children}

      <AnimatePresence>
        {sparks.map((spark) => (
          <SparkBurst
            key={spark.id}
            x={spark.x}
            y={spark.y}
            color={sparkColor}
            size={sparkSize}
            radius={sparkRadius}
            count={sparkCount}
            duration={duration}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sub-komponen untuk memecah burst menjadi partikel individu
const SparkBurst = ({
  x,
  y,
  color,
  size,
  radius,
  count,
  duration,
}: {
  x: number;
  y: number;
  color: string;
  size: number;
  radius: number;
  count: number;
  duration: number;
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 0,
        height: 0,
        zIndex: 9999, // Pastikan di atas elemen lain
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i * 360) / count;
        // Konversi polar ke cartesian
        const rad = (angle * Math.PI) / 180;
        const targetX = Math.cos(rad) * radius;
        const targetY = Math.sin(rad) * radius;

        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: targetX,
              y: targetY,
              opacity: 0,
              scale: [1, 0], // Membesar lalu mengecil
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: "50%",
              top: -size / 2, // Center anchor
              left: -size / 2, // Center anchor
            }}
          />
        );
      })}
    </div>
  );
};
