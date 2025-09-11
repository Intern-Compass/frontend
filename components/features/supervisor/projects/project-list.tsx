import { ProjectItem } from "@/components/features/supervisor/projects/project-item";

const projects = [
  {
    id: "1",
    name: "Design Database Schema",
    assignee: "Fikunayo",
    description: "Create compressive database for application",
    date: "2025-09-01",
    status: "completed"
  },
  {
    id: "2",
    name: "Design Database Schema",
    assignee: "Fikunayo",
    description: "Create compressive database for application",
    date: "2025-09-01",
    status: "completed"
  },
  {
    id: "3",
    name: "Design Database Schema",
    assignee: "Fikunayo",
    description: "Create compressive database for application",
    date: "2025-09-01",
    status: "completed"
  },
  {
    id: "4",
    name: "Design Database Schema",
    assignee: "Fikunayo",
    description: "Create compressive database for application",
    date: "2025-09-01",
    status: "completed"
  },
];

export const ProjectList = () => {
    return (
        <ul className="space-y-3.75 my-8">
            {projects.map((project, index) => <ProjectItem key={index} {...project} />)}
        </ul>
    )
}