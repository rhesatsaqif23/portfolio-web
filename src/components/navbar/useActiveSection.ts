"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "about",
  "stack",
  "experiences",
  "projects",
  "achievements",
  "contact",
];

export function useActiveSection() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px", // aktif saat section di tengah layar
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}
