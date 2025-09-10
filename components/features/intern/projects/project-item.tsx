import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";

import { cn } from "@/lib/utils";

export interface ProjectItemProps {
  id: string;
  name: string;
  date: string;
  assigner: string;
  status: string;
}

export const ProjectItem = ({
  id,
  name,
  date,
  assigner,
  status,
}: ProjectItemProps) => {
  return (
    <li className="flex justify-between items-center gap-4 my-3.25 py-5 px-4.5 border border-border bg-card rounded-[0.625rem]">
      <div className="space-y-2">
        <h3 className="text-foreground font-medium leading-5">{name}</h3>
        <p className="text-secondary-foreground text-xs leading-4">
          Create compressive database for application
        </p>
        <span className="text-muted-foreground text-xs leading-4">
          {format(new Date(date), "MMMM d, yyyy")}
        </span>
      </div>
      <Badge
        className={cn(
          "capitalize font-medium text-xs leading-4 py-0.5 px-2.5 rounded-[9999px]",
          status === "inProgress" && "bg-warning-light text-warning-dark",
          status === "overdue" && "bg-error-light text-error-dark",
          status === "completed" && "bg-success-light text-success-dark"
        )}
      >
        {status === "inProgress" ? "In Progress" : status}
      </Badge>
    </li>
  );
};
