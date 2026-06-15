"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ImageWithFallback from "../common/ImageWithFallback";
import { 
  MonitorSmartphone, 
  LayoutTemplate, 
  Server, 
  Database, 
  Settings, 
  Cloud, 
  Paintbrush, 
  Wrench, 
  Code 
} from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import { Skill, SkillCategory } from "@/src/types/skill";

interface Props {
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  mobile: "Mobile",
  web: "Web",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "Devops",
  deployment: "Cloud & Deployment",
  cloud: "Cloud & Deployment",
  cloud_deployment: "Cloud & Deployment",
  design: "Design",
  tools: "Tools",
  other: "Other",
};

const categoryIcons: Record<string, React.ElementType> = {
  "Mobile": MonitorSmartphone,
  "Frontend": LayoutTemplate,
  "Backend": Server,
  "Database": Database,
  "Devops": Settings,
  "Cloud & Deployment": Cloud,
  "Design": Paintbrush,
  "Tools": Wrench,
  "Other": Code,
};

const bentoClasses: Record<string, string> = {
  "Frontend": "lg:col-span-2 lg:row-span-1",
  "Tools": "lg:col-span-1 lg:row-span-1",
  "Devops": "lg:col-span-1 lg:row-span-1",
  "Cloud & Deployment": "lg:col-span-1 lg:row-span-1",
  "Backend": "lg:col-span-2 lg:row-span-1",
  "Database": "lg:col-span-1 lg:row-span-2",
  "Design": "lg:col-span-1 lg:row-span-1",
  "Mobile": "lg:col-span-2 lg:row-span-1",
};

const order = [
  "Frontend",
  "Tools",
  "Devops",
  "Cloud & Deployment",
  "Backend",
  "Database",
  "Design",
  "Mobile"
];

function groupByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce(
    (acc, s) => {
      let cat = s.category;
      if (cat === "cloud" || cat === "deployment") {
        cat = "cloud_deployment" as SkillCategory;
      }
      (acc[cat] ??= []).push(s);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );
}

export default function TechStackSection({ skills }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05, margin: "-60px 0px" });
  const grouped = groupByCategory(skills);

  const entries = Object.entries(grouped)
    .map(([category, categorySkills]) => {
      const label = categoryLabels[category] ?? category;
      return {
        category,
        skills: categorySkills,
        label,
        bentoClass: bentoClasses[label] || "lg:col-span-1 lg:row-span-1",
      };
    })
    .sort((a, b) => {
      const idxA = order.indexOf(a.label);
      const idxB = order.indexOf(b.label);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

  return (
    <section
      ref={ref}
      id="stack"
      className="relative min-h-screen px-6 sm:px-10 md:px-20 lg:px-28 py-16 md:py-24"
    >
      <SectionTitle
        title="Tech Stack"
        subtitle="Tools and technologies I rely on to craft performant and scalable products."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {entries.map(({ category, skills: categorySkills, label, bentoClass }) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{
              duration: 0.5,
              y: { type: "spring", stiffness: 220, damping: 26, mass: 0.7 },
            }}
            className={`
              group relative w-full rounded-2xl overflow-hidden
              border-2 border-white/10
              bg-slate-950/60 backdrop-blur-xl
              p-4 md:p-5
              transition-all duration-300
              hover:border-cyan-400/50
              hover:shadow-[0_12px_48px_rgba(34,211,238,0.15)]
              ${bentoClass}
            `}
          >
            {(() => {
              const BgIcon = categoryIcons[label] || Code;
              return (
                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 opacity-5 md:opacity-10 pointer-events-none transition-all duration-500 group-hover:opacity-[0.15] group-hover:scale-110 z-0">
                  <BgIcon className="w-40 h-40 md:w-56 md:h-56 text-cyan-300" strokeWidth={1} />
                </div>
              );
            })()}

            <div className="relative z-10">
              <h3 className="text-base md:text-lg font-bold text-white/90 mb-2 md:mb-3">
                {label}
              </h3>
              <div className="h-px w-full bg-white/10 mb-4 md:mb-6" />

            <div className={`grid gap-4 md:gap-y-8 md:gap-x-4 ${["Frontend", "Backend", "Mobile"].includes(label) ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
              {categorySkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex flex-col items-center gap-2 md:gap-3"
                >
                  {skill.iconUrl && (
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 shrink-0 transition-transform duration-300 group-hover:scale-110 rounded-md overflow-hidden bg-white/5">
                      <ImageWithFallback
                        src={skill.iconUrl}
                        alt={skill.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="text-xs md:text-sm font-semibold text-white/80 group-hover:text-white transition-colors text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
