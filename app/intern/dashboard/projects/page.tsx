import { ProjectWrapper } from "@/components/features/intern/projects/project-wrapper";
import { ProjectorIcon } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="mx-[5%]">
      <div className="max-w-[984px] mx-auto">
        <header className="my-10 bg-card rounded-2xl py-6 px-8">
          <h1 className="flex items-center gap-2 mb-4">
            <ProjectorIcon />
            <span className="text-2xl font-medium leading-8">Projects</span>
          </h1>
          <p className="text-sm leading-5">
            Get assigned projects by your supervisors.
          </p>
        </header>
        <main>
          <ProjectWrapper />
        </main>
      </div>
    </div>
  );
}
