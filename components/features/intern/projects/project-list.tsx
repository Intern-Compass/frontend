"use client";
import { useState } from "react";

import { ProjectItem } from "@/components/features/intern/projects/project-item";
import { ProjectModal } from "./project-modal";
import projects from "@/components/features/intern/milestones/data.json";

import { X } from "lucide-react";

interface ProjectListProps {
  tab: "all" | "inProgress" | "completed" | "overdue";
}


export const ProjectList = ({ tab }: ProjectListProps) => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

const handleProjectClick = (projectId: string) => {
  const project = projects.find((p) => p.id === projectId) || null;
  setSelectedProject(project);
};


  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
    <ul className="w-full max-w-[984px]">
      {tab === "all"
        ? projects.map((project) => (
            <ProjectItem key={project.id} {...project} onClick={() => handleProjectClick(project.id)} />
          ))
        : tab === "inProgress" || tab === "completed" || tab === "overdue"
        ? projects
            .filter(({ status }) => status === tab)
            .map((project) => <ProjectItem key={project.id} {...project} onClick={() => handleProjectClick(project.id)} />
)
        : null}
    </ul>

    {selectedProject && (
        <div className="fixed inset-0 bg-muted flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-3/4 overflow-y-auto">
            <ProjectModal project={selectedProject} />
              <X size={24} onClick={handleCloseModal}
              className="absolute top-22 right-36 text-gray-500 hover:text-gray-700"/>
          </div>
        </div>
      )}
  </div>
);};
