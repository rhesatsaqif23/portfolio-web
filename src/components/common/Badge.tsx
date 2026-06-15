"use client";

import React from "react";
import clsx from "clsx";

interface BadgeProps {
  text?: string;
  className?: string;
}

export default function Badge({ text, className }: BadgeProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 md:gap-3",
        "rounded-full px-3 md:px-4 py-1 md:py-1.5",
        "border border-white/10",
        "bg-card/40 backdrop-blur-md",
        "text-xs md:text-sm lg:text-md xl:text-lg font-medium text-foreground",
        "shadow-sm shadow-black/20",
        className,
      )}
    >
      {/* Dot Indicator */}
      <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-primary" />
      </span>

      <span>{text}</span>
    </div>
  );
}
