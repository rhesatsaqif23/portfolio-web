"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import SocialIcon from "../common/SocialIcon";
import { fadeUpVariants } from "./motion";
import { Profile } from "@/src/types/profile";

interface Props {
  profile: Profile | null;
}

export default function HeroSocials({ profile }: Props) {
  const socials = [
    { icon: <Mail className="h-4 md:h-5 lg:h-6" />, href: `mailto:${profile?.email ?? "atstsaqif23@gmail.com"}` },
    { icon: <Github className="h-4 md:h-5 lg:h-6" />, href: profile?.github ?? "https://github.com/rhesatsaqif23" },
    { icon: <Linkedin className="h-4 md:h-5 lg:h-6" />, href: profile?.linkedin ?? "https://linkedin.com/in/rhesa-tsaqif" },
    { icon: <Instagram className="h-4 md:h-5 lg:h-6" />, href: profile?.instagram ?? "https://www.instagram.com/ats_tsaqif_23" },
  ];

  return (
    <motion.ul
      variants={fadeUpVariants}
      className="mt-10 md:mt-14 flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6"
    >
      {socials.map((social, i) => (
        <li key={i}>
          <SocialIcon icon={social.icon} href={social.href} />
        </li>
      ))}
    </motion.ul>
  );
}
