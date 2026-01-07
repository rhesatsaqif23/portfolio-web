"use client";

import { Project } from "@/src/types/project";
import ProjectCardCollapsed from "./ProjectCardCollapsed";
import ProjectCardExpanded from "./ProjectCardExpanded";

interface Props {
  project: Project;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function ProjectCard({
  project,
  isActive,
  onOpen,
  onClose,
}: Props) {
  return (
    <>
      <ProjectCardCollapsed project={project} onOpen={onOpen} />
      <ProjectCardExpanded
        project={project}
        isActive={isActive}
        onClose={onClose}
      />
    </>
  );
}
