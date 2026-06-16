export type DevRole =
  | "front-end developer"
  | "back-end developer"
  | "full-stack developer"
  | "android developer"
  | "mobile developer";

export interface CaseStudySection {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyResult {
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudyGalleryItem {
  url: string;
  caption: string;
  alt: string;
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
  results: CaseStudyResult[];
  gallery: CaseStudyGalleryItem[];
}
