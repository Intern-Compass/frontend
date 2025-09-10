import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Projects = () => {
    return (
      <section className="mb-6">
        <header className="mb-4.5 flex justify-between items-center gap-4">
          <h2 className="text-lg leading-7">Projects</h2>

          <Button asChild variant="link" className="font-medium text-link">
            <Link href="/intern/dashboard/projects">View all</Link>
          </Button>
        </header>

        <div className="rounded-[0.625rem] p-5 border border-border bg-card h-[132px] flex items-center justify-center">
          <p className="text-muted-foreground leading-5 font-medium text-center">
            No assigned project
          </p>
        </div>
      </section>
    );
}