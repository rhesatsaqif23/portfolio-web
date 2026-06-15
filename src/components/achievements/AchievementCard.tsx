"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { Achievement } from "@/src/types/achievement";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { item } from "./motion";

interface Props {
  achievement: Achievement;
}

function getRankInfo(title: string): {
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
} {
  const lower = title.toLowerCase();

  if (lower.startsWith("1st") || lower.startsWith("1 ") || lower.startsWith("first")) {
    return {
      icon: <Trophy className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 shrink-0 mt-0.5" />,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
    };
  }
  if (lower.startsWith("2nd") || lower.startsWith("2 ") || lower.startsWith("second")) {
    return {
      icon: <Trophy className="h-4 w-4 md:h-5 md:w-5 fill-gray-300 shrink-0 mt-0.5" />,
      color: "text-gray-300",
      bg: "bg-gray-300/10",
      border: "border-gray-300/30",
    };
  }
  if (lower.startsWith("3rd") || lower.startsWith("3 ") || lower.startsWith("third")) {
    return {
      icon: <Trophy className="h-4 w-4 md:h-5 md:w-5 fill-amber-700 shrink-0 mt-0.5" />,
      color: "text-amber-700",
      bg: "bg-amber-700/10",
      border: "border-amber-700/30",
    };
  }

  // Finalist / others
  return {
    icon: <Award className="h-4 w-4 md:h-5 md:w-5 text-cyan-300 shrink-0 mt-0.5" />,
    color: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
  };
}

export default function AchievementCard({ achievement }: Props) {
  const rank = getRankInfo(achievement.title);

  return (
    <motion.div variants={item}>
      <AccordionItem
        value={achievement.id}
        className="border-b border-white/10 last:border-b-0"
      >
        <AccordionTrigger className="px-4 md:px-5">
          <div className="flex items-center gap-3 md:gap-4">
            {rank.icon}
            <div className="text-left">
              <h3 className="text-sm md:text-base font-semibold text-white/90">
                {achievement.title}
              </h3>
              {achievement.eventName && (
                <p className="text-[13px] md:text-[15px] text-white/80">{achievement.eventName}</p>
              )}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="space-y-2 md:space-y-3 px-4 md:px-5 pb-3 md:pb-4">
            {achievement.organizer && (
              <p className="text-[13px] md:text-[15px] text-white/90">
                <span className="text-white/60">Organizer:</span> {achievement.organizer}
              </p>
            )}

            {achievement.description && (
              <p className="text-[13px] md:text-[15px] text-white/90 leading-relaxed">
                {achievement.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 md:gap-3 pt-0 md:pt-1">
              {achievement.category && (
                <span className={`rounded-full border ${rank.border} ${rank.bg} px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm ${rank.color}`}>
                  {achievement.category}
                </span>
              )}

              <span className="rounded-full border border-white/20 bg-white/6 px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm text-white/90">
                {new Date(achievement.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>

              {achievement.url && (
                <a
                  href={achievement.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm text-cyan-300/90 hover:bg-cyan-400/20 transition-colors"
                >
                  View Credential
                </a>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}
