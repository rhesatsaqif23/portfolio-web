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
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setActive(id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
