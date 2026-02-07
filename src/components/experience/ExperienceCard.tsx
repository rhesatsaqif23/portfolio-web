"use client";

import Image from "next/image";
import { Experience } from "@/src/types/experience";
import { formatMonthYear } from "@/src/utils/formatDate";
import { Calendar, CalendarClock } from "lucide-react";
import React from "react";

interface Props {
  experience: Experience;
}

function ExperienceCard({ experience }: Props) {
  return (
    <article
      className="
        group relative z-10 hover:z-30
        w-full max-w-2xl
        rounded-2xl border-2 border-white/10
        bg-slate-950/60 backdrop-blur-xl
        p-6 md:p-7
        transition-all duration-300
        hover:border-cyan-400/50
        hover:shadow-[0_0_48px_rgba(34,211,238,0.25)]
      "
    >
      <div className="relative z-10 flex flex-col gap-6">
        {/* HEADER: Logo & Text Info */}
        <div className="flex gap-4 md:gap-5 items-center">
          {/* LOGO */}
          <div
            className="
              relative shrink-0
              h-16 w-16 md:h-18 md:w-18
              rounded-full overflow-hidden
              border border-white/20 bg-black/20
              /* mt-1 dihapus agar benar-benar center */
            "
          >
            <Image
              src={experience.image}
              alt={experience.company}
              fill
              sizes="800px"
              className="object-cover"
            />
          </div>

          {/* TEXT INFO */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Date Section */}
            <div className="flex items-center gap-2 mb-4 text-sm sm:text-md font-medium text-white/80">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>
                {formatMonthYear(experience.startDate)} –{" "}
                {experience.endDate
                  ? formatMonthYear(experience.endDate)
                  : "Present"}
              </span>
            </div>

            {/* Title & Company */}
            <div className="flex flex-col">
              <h3
                className="
                  text-white font-bold
                  text-lg md:text-xl
                  leading-tight
                "
              >
                {experience.title}
              </h3>
              <p
                className="
                  text-cyan-300/90 font-medium
                  text-base md:text-lg
                  leading-tight
                "
              >
                {experience.company}
              </p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <ul className="space-y-2 text-sm text-white/80">
          {(experience.description ?? []).map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              {/* Glowing Cyan Bullet */}
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)] shrink-0" />

              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default React.memo(ExperienceCard);
