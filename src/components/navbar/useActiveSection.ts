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
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        threshold: [0.3, 0.6, 0.9],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}
