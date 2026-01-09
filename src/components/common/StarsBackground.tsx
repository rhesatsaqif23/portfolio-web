"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  o: number; // opacity
  s: number; // twinkle speed
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let rafId: number | null = null;
    let mounted = true;

    const prefersReduced = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    const getStarCount = () => {
      // scale with viewport area, clamp to keep resource usage reasonable
      const area = window.innerWidth * window.innerHeight;
      const base = Math.max(40, Math.min(140, Math.round(area / 12000)));
      return base;
    };

    const resize = () => {
      if (!mounted) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const count = prefersReduced ? Math.min(40, getStarCount()) : getStarCount();

      stars = Array.from({ length: count }, (): Star => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        o: Math.random(),
        s: Math.random() * 0.015 + 0.005,
      }));
    };

    const animate = () => {
      if (!mounted) return;
      if (prefersReduced) {
        // draw static stars and skip animation loop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${star.o})`;
          ctx.fill();
        });
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.o += star.s;
        if (star.o >= 1 || star.o <= 0) {
          star.s *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.o})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        if (!rafId && !prefersReduced) rafId = requestAnimationFrame(animate);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    // Start animation if not reduced
    if (!prefersReduced) rafId = requestAnimationFrame(animate);

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
  );
}
