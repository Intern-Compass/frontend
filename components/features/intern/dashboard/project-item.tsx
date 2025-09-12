import { format } from "date-fns";

import type { ProjectItemProps } from "@/components/features/intern/dashboard/projects";

export const ProjectItem = ({ title, description, date }: ProjectItemProps) => {
  return (
    <li className="p-5 border border-border bg-card rounded-[0.625rem]">
      <div className="space-y-2">
        <h3 className="font-medium leading-5">{title}</h3>
        <p className="text-sm leading-[21px]">{description}</p>
        <p className="text-xs leading-4 text-muted-foreground">
          {format(date, "d MMMM, yyyy")}
        </p>
      </div>
    </li>
  );
};
