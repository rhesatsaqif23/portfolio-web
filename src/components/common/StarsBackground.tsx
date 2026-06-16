"use client";

import { cn } from "@/src/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";

// Interactive starry background with parallax effect and responsive density
interface StarsBackgroundProps {
  starColor?: string;
  starCount?: number;
  className?: string;
}

interface StarProps {
  x: number;
  y: number;
  r: number;
  o: number;
  s: number;
  v: number;
}

export default function StarsBackground({
  starColor = "#FFF",
  starCount = 100,
  className,
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<StarProps[]>([]);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initStars = useCallback(
    (width: number, height: number) => {
      const stars: StarProps[] = [];
      // Kurangi jumlah bintang di layar kecil (< 768px) agar tidak terlalu penuh
      const responsiveCount =
        width < 768 ? Math.floor(starCount * 0.5) : starCount;

      for (let i = 0; i < responsiveCount; i++) {
        const r = Math.random() * 1 + 0.5;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: r,
          o: Math.random(),
          s: Math.random() * 0.02 + 0.005,
          v: r * 0.2,
        });
      }
      starsRef.current = stars;
    },
    [starCount],
  );

  const handleResize = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;

    // Update dimensi canvas agar sesuai layar
    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    // Reset posisi mouse ke tengah
    mouseRef.current = { x: clientWidth / 2, y: clientHeight / 2 };

    // Re-init bintang agar menyebar ulang sesuai ukuran baru
    initStars(clientWidth, clientHeight);
  }, [initStars]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const parallaxX = (mouseRef.current.x - centerX) * 0.05;

      starsRef.current.forEach((star) => {
        star.o += star.s;
        if (star.o >= 1 || star.o <= 0) star.s = -star.s;

        star.y -= star.v;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        star.x += parallaxX * star.v * 0.1;

        if (star.x > canvas.width) star.x = 0;
        else if (star.x < 0) star.x = canvas.width;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.o));
        ctx.fill();
      });

      requestRef.current = requestAnimationFrame(render);
    };

    handleResize();
    render();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [starColor, handleResize]);

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 z-0 pointer-events-none", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
