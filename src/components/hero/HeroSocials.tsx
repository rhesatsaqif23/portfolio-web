"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import SocialIcon from "../common/SocialIcon";
import { fadeUpVariants } from "./motion";

export default function HeroSocials() {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="mt-14 flex flex-wrap justify-center gap-4 md:gap-6"
    >
      <SocialIcon
        icon={<Mail className="h-5 md:h-6" />}
        href="mailto:atstsaqif23@gmail.com"
      />
      <SocialIcon
        icon={<Github className="h-5 md:h-6" />}
        href="https://github.com/rhesatsaqif23"
      />
      <SocialIcon
        icon={<Linkedin className="h-5 md:h-6" />}
        href="https://linkedin.com/in/rhesa-tsaqif"
      />
      <SocialIcon
        icon={<Instagram className="h-5 md:h-6" />}
        href="https://www.instagram.com/ats_tsaqif_23"
      />
    </motion.div>
  );
}
