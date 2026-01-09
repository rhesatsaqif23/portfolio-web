import { Trophy, Medal, Award, Star } from "lucide-react";

export function resolvePosition(position: string) {
  const normalized = position.toLowerCase();

  if (normalized.includes("1st")) {
    return { label: position, icon: Trophy };
  }

  if (normalized.includes("2nd") || normalized.includes("3rd")) {
    return { label: position, icon: Medal };
  }

  if (normalized.includes("finalist")) {
    return { label: position, icon: Award };
  }

  return { label: position, icon: Star };
}
