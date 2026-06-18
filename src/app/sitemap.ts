import { getProjects } from "@/src/lib/data";

const BASE_URL = "https://rhesatsaqif.vercel.app";

export default async function sitemap() {
  const projects = await getProjects();

  const projectEntries = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...projectEntries,
  ];
}
