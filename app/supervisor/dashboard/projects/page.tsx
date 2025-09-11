import { CreateProjectDialog } from "@/components/features/supervisor/projects/create-project-dialog";
import { ProjectList } from "@/components/features/supervisor/projects/project-list";

export default function ProjectsPage() {
  return (
    <div className="mx-[5%]">
      <div className="max-w-[984px] my-4 mx-auto">
        <CreateProjectDialog />
        <ProjectList />
      </div>
    </div>
  );
}
