"use client";

import { motion } from "framer-motion";
import { Download, Rocket } from "lucide-react";
import { fadeUpVariants } from "./motion";
import HeroButton from "./HeroButton";

interface Props {
  cvUrl: string | null;
}

export default function HeroActions({ cvUrl }: Props) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6"
    >
      <HeroButton
        href="/api/cv"
        label="View My CV"
        icon={<Download className="h-5 w-5" />}
        external
        shineDelay="0s"
      />

      <HeroButton
        href="/projects"
        label="View My Projects"
        icon={<Rocket className="h-5 w-5" />}
        shineDelay="0.3s"
      />
    </motion.div>
  );
}
