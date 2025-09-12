import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ProjectList } from "@/components/features/intern/dashboard/project-list";

export interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  date: string;
}

const projects = [
  {
    id: "1",
    title: "Design Database Schema",
    description: "Create compressive database for application",
    date: "2025-09-10",
  },
  {
    id: "2",
    title: "Design Database Schema",
    description: "Create compressive database for application",
    date: "2025-09-10",
  },
  {
    id: "3",
    title: "Design Database Schema",
    description: "Create compressive database for application",
    date: "2025-09-10",
  },
];

export const Projects = () => {
  return (
    <section className="mb-6">
      <header className="mb-4.5 flex justify-between items-center gap-4">
        <h2 className="text-lg leading-7">Projects</h2>

        <Button asChild variant="link" className="font-medium text-link">
          <Link href="/intern/dashboard/projects">View all</Link>
        </Button>
      </header>

      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="rounded-[0.625rem] p-5 border border-border bg-card h-[132px] flex items-center justify-center">
          <p className="text-muted-foreground leading-5 font-medium text-center">
            No assigned project
          </p>
        </div>
      )}
    </section>
  );
};
