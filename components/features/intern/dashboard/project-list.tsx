import { ProjectItem } from "@/components/features/intern/dashboard/project-item";

import type { ProjectItemProps } from "@/components/features/intern/dashboard/projects";

interface ProjectListProps {
  projects: ProjectItemProps[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <ul className="grid gap-4.5 grid-cols-[repeat(auto-fit,_minmax(220px,1fr))]">
      {projects.map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}
    </ul>
  );
};
