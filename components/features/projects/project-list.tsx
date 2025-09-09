import { ProjectItem } from "@/components/features/projects/project-item";

import projects from "@/components/features/milestones/data.json";

interface ProjectListProps {
  tab: "all" | "inProgress" | "completed" | "overdue";
}

export const ProjectList = ({ tab }: ProjectListProps) => {
  return (
    <ul className="w-full max-w-[984px]">
      {tab === "all"
        ? projects.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))
        : tab === "inProgress" || tab === "completed" || tab === "overdue"
        ? projects
            .filter(({ status }) => status === tab)
            .map((project) => <ProjectItem key={project.id} {...project} />)
        : null}
    </ul>
  );
};
