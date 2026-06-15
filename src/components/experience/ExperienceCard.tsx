"use client";

import ImageWithFallback from "../common/ImageWithFallback";
import { Experience } from "@/src/types/experience";
import { formatMonthYear } from "@/src/utils/formatDate";
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
        p-5 md:p-6 lg:p-7
        transition-all duration-300
        hover:border-cyan-400/50
        hover:shadow-[0_0_48px_rgba(34,211,238,0.25)]
      "
    >
      <div className="relative z-10 flex flex-col gap-5 md:gap-6">
        <div className="flex gap-3 md:gap-4 lg:gap-5 items-center">
          <div
            className="
              relative shrink-0
              h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18
              rounded-full overflow-hidden
              border border-white/20 bg-black/20
            "
          >
            {experience.imageUrl ? (
              <ImageWithFallback
                src={experience.imageUrl}
                alt={experience.orgName}
                fill
                sizes="800px"
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-white/40 text-xs">
                {experience.orgName?.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center gap-1 md:gap-2">
            <div className="flex flex-col gap-0">
              <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl leading-tight">
                {experience.role}
              </h3>
              <p className="text-cyan-300/90 font-medium text-base md:text-lg lg:text-xl leading-tight">
                {experience.orgName}
              </p>
            </div>
            <span className="inline-flex self-start rounded-full border border-white/20 bg-white/5 px-3 py-1 md:px-3.5 md:py-1 text-xs md:text-sm font-medium text-white/80">
              {formatMonthYear(experience.startDate)} –{" "}
              {experience.endDate
                ? formatMonthYear(experience.endDate)
                : "Present"}
            </span>
          </div>
        </div>

        <ul className="space-y-2 md:space-y-2.5 text-sm text-white/80">
          {(experience.description ?? []).map((item, i) => (
            <li key={i} className="flex gap-2 md:gap-3 items-start">
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
