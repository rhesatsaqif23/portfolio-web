import ProjectSection from "../../components/projects/ProjectSection";
import { getProjects } from "../../lib/data";

export const metadata = {
  title: "All Projects | Rhesa Tsaqif",
  description: "All projects by Rhesa Tsaqif Adyatma",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-16 md:pt-24">
      <ProjectSection projects={projects} showViewAll={false} />
    </div>
  );
}
