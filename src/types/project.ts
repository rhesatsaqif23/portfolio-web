export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string
  category: string;
  description?: string;
  thumbnailUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  techStack: string[];
  isFeatured: boolean;
  createdAt: string;
}
