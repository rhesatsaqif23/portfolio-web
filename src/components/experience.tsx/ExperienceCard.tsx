"use client";

import Image from "next/image";
import { Experience } from "@/src/types/experience";
import { formatMonthYear } from "@/src/utils/formatDate";
import { ArrowRight } from "lucide-react";

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <article
      className="
        group relative z-10 hover:z-30
        w-full max-w-2xl
        rounded-2xl border-2 border-white/25
        bg-white/5 backdrop-blur-xl
        p-6 md:p-7
        transition-all duration-300
        hover:border-cyan-400
        hover:shadow-[0_0_48px_rgba(34,211,238,0.45)]
      "
    >
      <div className="relative z-10 flex flex-col gap-5">
        {/* HEADER */}
        <div className="flex gap-5 items-center">
          {/* LOGO */}
          <div
            className="
              relative shrink-0
              h-14 w-14 md:h-16 md:w-16
              rounded-full overflow-hidden
              border border-white/20 bg-white/10
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
          <div className="flex-1">
            <div className="flex flex-col leading-tight">
              <h3
                className="
                  text-white font-semibold
                  text-base sm:text-lg md:text-xl
                  leading-tight
                "
              >
                {experience.title}
              </h3>
              <p
                className="
                  text-cyan-300 font-medium
                  text-base sm:text-lg md:text-xl
                  leading-tight
                "
              >
                {experience.company}
              </p>
            </div>

            {/* DATE */}
            <span
              className="
                inline-flex mt-2
                rounded-full border border-cyan-400/40
                bg-cyan-400/10
                px-3 py-1
                text-xs sm:text-sm font-medium text-cyan-300
              "
            >
              {formatMonthYear(experience.startDate)} –{" "}
              {experience.endDate
                ? formatMonthYear(experience.endDate)
                : "Present"}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <ul className="space-y-2 text-xs md:text-sm text-white/85">
          {(experience.description ?? []).map((item, i) => (
            <li key={i} className="flex gap-3">
              <ArrowRight className="mt-1 h-4 w-4 text-cyan-300 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
