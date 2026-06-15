export type DevRole =
  | "front-end developer"
  | "back-end developer"
  | "full-stack developer"
  | "android developer"
  | "mobile developer";

export interface CaseStudySection {
  title: string;
  description: string;
}

export interface CaseStudyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyTechCategory {
  category: string;
  items: { name: string }[];
}

export interface CaseStudyTeamMember {
  name: string;
  role: string;
  avatar?: string | null;
}

export interface CaseStudyGalleryItem {
  url: string;
  caption: string;
  alt: string;
}

export interface CaseStudyResult {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  projectId: string;
  role: DevRole;
  startDate: string | null;
  endDate: string | null;
  overview: string | null;
  problems: CaseStudySection[];
  solutions: CaseStudySection[];
  features: CaseStudyFeature[];
  contributions: string[];
  techStacks: CaseStudyTechCategory[];
  challenges: CaseStudySection[];
  results: CaseStudyResult[];
  futurePlans: string[];
  team: CaseStudyTeamMember[];
  gallery: CaseStudyGalleryItem[];
}
