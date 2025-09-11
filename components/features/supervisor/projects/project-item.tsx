import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { RemoveProjectDialog } from "./remove-project-dialog";

interface ProjectItemProps {
  id: string;
  name: string;
  assignee: string;
  description: string;
  date: string;
  status: string;
}

export const ProjectItem = ({
  id,
  name,
  assignee,
  description,
  date,
  status,
}: ProjectItemProps) => {
  return (
    <li className="flex flex-col gap-y-4 gap-x-10 border border-border bg-card py-5 px-6 rounded-[0.625rem] sm:flex-row sm:items-center">
      <div className="w-full flex flex-wrap justify-between items-center gap-4">
        <div>
          <div id={id} className="block">
            <h3 className="font-medium leading-5">{name}</h3>
            <p className="font-medium leading-5 mb-1">
              Assigned intern: {assignee ?? "Nil"}
            </p>
            <p className="text-xs leading-4 text-secondary-foreground mb-2">
              {description}
            </p>
            <span className="text-xs leading-4 text-muted-foreground">
              {format(date, "d MMMM, yyyy")}
            </span>
          </div>
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
      </div>
      <RemoveProjectDialog />
    </li>
  );
};
